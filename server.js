require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 8);
const MAX_FIELD_LENGTH = Number(process.env.MAX_FIELD_LENGTH || 250);
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const leadRateStore = new Map();
const uploadDir = path.join(__dirname, "data", "claim-uploads");

const upload = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      try {
        await fs.mkdir(uploadDir, { recursive: true });
        cb(null, uploadDir);
      } catch (error) {
        cb(error);
      }
    },
    filename: (_req, file, cb) => {
      const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      cb(null, safeName);
    }
  }),
  limits: { files: 5, fileSize: 6 * 1024 * 1024 }
});

app.set("trust proxy", true);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
  next();
});

function requiredFields(payload, fields) {
  return fields.filter((field) => !payload[field]);
}

function isAllowedOrigin(req) {
  if (!ALLOWED_ORIGINS.length) return true;
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  return ALLOWED_ORIGINS.some((allowed) => origin === allowed || referer.startsWith(allowed));
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
}

function sanitizeValue(value) {
  return String(value)
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, MAX_FIELD_LENGTH);
}

function sanitizePayload(payload, allowedFields) {
  const clean = {};
  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      clean[field] = sanitizeValue(payload[field]);
    }
  }
  return clean;
}

function isLikelyBot(payload) {
  if (payload.website) return true;
  const loadedAt = Number(payload["form-loaded-at"]);
  if (!Number.isNaN(loadedAt) && loadedAt > 0) {
    const elapsed = Date.now() - loadedAt;
    if (elapsed >= 0 && elapsed < 1500) return true;
  }
  return false;
}

function isValidPhone(phone) {
  return /^\+?[0-9\s-]{8,20}$/.test(phone);
}

function isValidDateString(value) {
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

async function verifyTurnstileToken(token, remoteIp) {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new URLSearchParams();
  body.append("secret", TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (remoteIp && remoteIp !== "unknown") body.append("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });
  if (!response.ok) return false;
  const result = await response.json();
  return Boolean(result.success);
}

function consumeRateLimitToken(key) {
  const now = Date.now();
  const entry = leadRateStore.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  entry.count += 1;
  leadRateStore.set(key, entry);
  return entry.count <= RATE_LIMIT_MAX_REQUESTS;
}

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status}): ${text}`);
  }
}

async function appendLeadToLocalFile(type, payload) {
  const dataDir = path.join(__dirname, "data");
  const leadsFile = path.join(dataDir, "leads.ndjson");
  const record = {
    type,
    receivedAt: new Date().toISOString(),
    ...payload
  };
  await fs.mkdir(dataDir, { recursive: true });
  await fs.appendFile(leadsFile, `${JSON.stringify(record)}\n`, "utf8");
}

async function sendEmailViaResend(type, payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;
  if (!apiKey || !from || !to) {
    return { status: "skipped", reason: "resend_not_configured" };
  }

  const html = `
    <h2>New ${type} lead</h2>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
    <pre>${JSON.stringify(payload, null, 2)}</pre>
  `;

  await postJson(
    "https://api.resend.com/emails",
    {
      from,
      to: [to],
      subject: `ADT Website ${type} lead`,
      html
    },
    { Authorization: `Bearer ${apiKey}` }
  );
  return { status: "sent" };
}

async function sendToWebhook(url, payload, label) {
  if (!url) return { status: "skipped", reason: `${label}_not_configured` };
  await postJson(url, payload);
  return { status: "sent" };
}

async function processLead(type, payload) {
  const priority = String(payload.priority || payload.urgency || "standard").toLowerCase();
  const productHint = String(payload.product || payload["incident-type"] || "").toLowerCase();
  const routeBucket = productHint.includes("motor")
    ? "motor-team"
    : productHint.includes("medical")
      ? "medical-team"
      : productHint.includes("liability") || productHint.includes("wiba")
        ? "compliance-team"
        : type === "claim"
          ? "claims-team"
          : "advisory-team";
  const enrichedPayload = {
    ...payload,
    source: "adtwebsite",
    leadType: type,
    routeBucket,
    priority,
    timestamp: new Date().toISOString()
  };

  const results = {};
  results.local = await appendLeadToLocalFile(type, enrichedPayload).then(
    () => ({ status: "saved" }),
    (error) => ({ status: "error", error: error.message })
  );
  results.email = await sendEmailViaResend(type, enrichedPayload).catch((error) => ({
    status: "error",
    error: error.message
  }));
  results.crm = await sendToWebhook(process.env.CRM_WEBHOOK_URL, enrichedPayload, "crm").catch((error) => ({
    status: "error",
    error: error.message
  }));
  results.sheets = await sendToWebhook(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    enrichedPayload,
    "sheets"
  ).catch((error) => ({
    status: "error",
    error: error.message
  }));

  return results;
}

app.post("/api/leads/quote", async (req, res) => {
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, message: "Origin not allowed." });
  }

  const ip = getClientIp(req);
  if (!consumeRateLimitToken(`quote:${ip}`)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  if (isLikelyBot(req.body)) {
    return res.json({ ok: true, accepted: true });
  }

  const cleaned = sanitizePayload(req.body, [
    "full-name",
    "business-type",
    "product",
    "phone",
    "operations-region",
    "callback-time",
    "urgency",
    "page",
    "userAgent",
    "formId"
  ]);
  const missing = requiredFields(cleaned, ["full-name", "business-type", "product", "phone"]);
  if (missing.length) {
    return res.status(400).json({ ok: false, message: "Missing required fields", missing });
  }
  if (!isValidPhone(cleaned.phone)) {
    return res.status(400).json({ ok: false, message: "Invalid phone number format." });
  }

  const token = sanitizeValue(req.body["cf-turnstile-response"] || "");
  const turnstileOk = await verifyTurnstileToken(token, ip);
  if (!turnstileOk) {
    return res.status(400).json({ ok: false, message: "Security verification failed. Please try again." });
  }

  try {
    const delivery = await processLead("quote", cleaned);
    return res.json({ ok: true, delivery });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
});

app.post("/api/leads/claim", upload.array("claim-documents", 5), async (req, res) => {
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, message: "Origin not allowed." });
  }

  const ip = getClientIp(req);
  if (!consumeRateLimitToken(`claim:${ip}`)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  if (isLikelyBot(req.body)) {
    return res.json({ ok: true, accepted: true });
  }

  const cleaned = sanitizePayload(req.body, [
    "policy-number",
    "incident-type",
    "incident-date",
    "claim-contact",
    "priority",
    "page",
    "userAgent",
    "formId"
  ]);
  const missing = requiredFields(cleaned, ["policy-number", "incident-type", "incident-date", "claim-contact"]);
  if (missing.length) {
    return res.status(400).json({ ok: false, message: "Missing required fields", missing });
  }
  if (!isValidPhone(cleaned["claim-contact"])) {
    return res.status(400).json({ ok: false, message: "Invalid contact number format." });
  }
  if (!isValidDateString(cleaned["incident-date"])) {
    return res.status(400).json({ ok: false, message: "Invalid incident date." });
  }

  const token = sanitizeValue(req.body["cf-turnstile-response"] || "");
  const turnstileOk = await verifyTurnstileToken(token, ip);
  if (!turnstileOk) {
    return res.status(400).json({ ok: false, message: "Security verification failed. Please try again." });
  }

  try {
    const attachmentNames = Array.isArray(req.files) ? req.files.map((file) => file.filename) : [];
    const delivery = await processLead("claim", { ...cleaned, attachmentNames });
    return res.json({ ok: true, delivery });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
});

app.post("/api/leads/status-check", async (req, res) => {
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, message: "Origin not allowed." });
  }

  const ip = getClientIp(req);
  if (!consumeRateLimitToken(`status:${ip}`)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  if (isLikelyBot(req.body)) {
    return res.json({ ok: true, accepted: true });
  }

  const cleaned = sanitizePayload(req.body, [
    "status-reference",
    "status-contact",
    "status-callback-time",
    "page",
    "userAgent",
    "formId"
  ]);
  const missing = requiredFields(cleaned, ["status-reference", "status-contact"]);
  if (missing.length) {
    return res.status(400).json({ ok: false, message: "Missing required fields", missing });
  }
  if (!isValidPhone(cleaned["status-contact"])) {
    return res.status(400).json({ ok: false, message: "Invalid contact number format." });
  }

  try {
    const delivery = await processLead("status-check", cleaned);
    return res.json({ ok: true, delivery });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
});

app.get("/api/blog/posts", async (_req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "blog-posts.json");
    const json = await fs.readFile(filePath, "utf8");
    const posts = JSON.parse(json);
    res.json({ ok: true, posts });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "adtwebsite", uptimeSeconds: Math.floor(process.uptime()) });
});

app.listen(PORT, () => {
  console.log(`ADT website running at http://localhost:${PORT}`);
});

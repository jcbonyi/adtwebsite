import { appendFile, mkdir } from "fs/promises";
import path from "path";

const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 600000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 8);
const MAX_FIELD_LENGTH = Number(process.env.MAX_FIELD_LENGTH || 250);
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

const leadRateStore = new Map<string, { count: number; resetAt: number }>();

export function sanitizeValue(value: unknown): string {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, MAX_FIELD_LENGTH);
}

export function sanitizePayload(
  payload: Record<string, unknown>,
  allowedFields: string[]
): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      clean[field] = sanitizeValue(payload[field]);
    }
  }
  return clean;
}

export function isLikelyBot(payload: Record<string, unknown>): boolean {
  if (payload.website) return true;
  const loadedAt = Number(payload["form-loaded-at"]);
  if (!Number.isNaN(loadedAt) && loadedAt > 0) {
    const elapsed = Date.now() - loadedAt;
    if (elapsed >= 0 && elapsed < 1500) return true;
  }
  return false;
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[0-9\s-]{8,20}$/.test(phone);
}

export function consumeRateLimitToken(key: string): boolean {
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

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new URLSearchParams();
  body.append("secret", TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body }
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

export async function saveLeadLocally(type: string, payload: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  const record = { type, ...payload, receivedAt: new Date().toISOString() };
  await appendFile(path.join(dataDir, "leads.ndjson"), JSON.stringify(record) + "\n");
}

export async function deliverLead(
  type: string,
  payload: Record<string, string>
): Promise<void> {
  await saveLeadLocally(type, payload);

  const tasks: Promise<void>[] = [];

  if (process.env.RESEND_API_KEY) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "ADT Insurance <no-reply@adtinsurance.co.ke>",
          to: process.env.RESEND_TO || "info@adtinsurance.co.ke",
          subject: `New ${type} lead from ADT website`,
          text: Object.entries(payload)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        }),
      }).then(() => undefined)
    );
  }

  if (process.env.CRM_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...payload }),
      }).then(() => undefined)
    );
  }

  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...payload }),
      }).then(() => undefined)
    );
  }

  await Promise.allSettled(tasks);
}

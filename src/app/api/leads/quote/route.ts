import { NextRequest, NextResponse } from "next/server";
import {
  sanitizePayload,
  isLikelyBot,
  isValidPhone,
  consumeRateLimitToken,
  verifyTurnstileToken,
  deliverLead,
} from "@/lib/leads";

const FIELDS = ["name", "phone", "email", "product", "details", "contactMethod", "website", "form-loaded-at", "turnstile-token"];

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!consumeRateLimitToken(`quote:${ip}`)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (isLikelyBot(payload)) {
      return NextResponse.json({ ok: true });
    }

    const clean = sanitizePayload(payload, FIELDS);

    if (!clean.name || !clean.phone || !clean.product) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidPhone(clean.phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstileToken(clean["turnstile-token"] || "", ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    await deliverLead("quote", clean);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

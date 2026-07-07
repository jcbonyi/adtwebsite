import { NextRequest, NextResponse } from "next/server";
import {
  sanitizePayload,
  isLikelyBot,
  isValidPhone,
  consumeRateLimitToken,
  deliverLead,
} from "@/lib/leads";

const FIELDS = [
  "name", "phone", "email", "policyNumber", "incidentType", "incidentDate",
  "description", "website", "form-loaded-at",
];

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!consumeRateLimitToken(`claim:${ip}`)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (isLikelyBot(payload)) {
      return NextResponse.json({ ok: true });
    }

    const clean = sanitizePayload(payload, FIELDS);

    if (!clean.name || !clean.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidPhone(clean.phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    await deliverLead("claim", clean);
    return NextResponse.json({ ok: true, reference: `ADT-CLM-${Date.now().toString(36).toUpperCase()}` });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

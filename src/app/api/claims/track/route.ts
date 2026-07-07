import { NextRequest, NextResponse } from "next/server";

const DEMO_CLAIMS: Record<string, { status: string; updates: { date: string; message: string }[] }> = {
  "ADT-CLM-DEMO": {
    status: "Under Assessment",
    updates: [
      { date: "2026-07-01", message: "Claim received and assigned to Claims Officer James K." },
      { date: "2026-07-02", message: "Documents verified. Sent to insurer for assessment." },
      { date: "2026-07-05", message: "Surveyor inspection scheduled for 8 July 2026." },
    ],
  },
};

export async function POST(request: NextRequest) {
  try {
    const { claimNumber, phone } = await request.json();

    if (!claimNumber || !phone) {
      return NextResponse.json({ error: "Claim number and phone required" }, { status: 400 });
    }

    const normalizedClaim = String(claimNumber).trim().toUpperCase();
    const claim = DEMO_CLAIMS[normalizedClaim];

    if (claim) {
      return NextResponse.json({
        found: true,
        claimNumber: normalizedClaim,
        status: claim.status,
        updates: claim.updates,
      });
    }

    return NextResponse.json({
      found: false,
      message:
        "Claim not found in our system. Please contact the claims desk at +254 785 227 772 or submit a status check request.",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

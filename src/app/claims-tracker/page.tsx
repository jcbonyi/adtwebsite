"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface ClaimUpdate {
  date: string;
  message: string;
}

export default function ClaimsTrackerPage() {
  const [claimNumber, setClaimNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    status?: string;
    updates?: ClaimUpdate[];
    message?: string;
    claimNumber?: string;
  } | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/claims/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimNumber, phone }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ found: false, message: "Unable to connect. Please call +254 785 227 772." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="container-adt max-w-xl">
        <div className="section-head-center mb-8">
          <p className="eyebrow mb-3">Claims Tracker</p>
          <h1 className="text-3xl md:text-4xl">Track Your Claim</h1>
          <p className="mt-4 text-gray-500">
            Enter your claim reference and phone number for status updates.
          </p>
        </div>

        <form onSubmit={handleTrack} className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Claim Number</label>
            <input
              type="text"
              value={claimNumber}
              onChange={(e) => setClaimNumber(e.target.value)}
              placeholder="e.g. ADT-CLM-DEMO"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-adt-blue focus:outline-none focus:ring-2 focus:ring-adt-blue/20"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 7XX XXX XXX"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-adt-blue focus:outline-none focus:ring-2 focus:ring-adt-blue/20"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Searching..." : "Track Claim"}
          </button>
          <p className="text-xs text-gray-400 text-center">
            Demo reference: ADT-CLM-DEMO
          </p>
        </form>

        {result && (
          <div className="mt-8">
            {result.found ? (
              <div className="rounded-[var(--radius-card)] border border-adt-blue/30 bg-adt-blue/5 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-bold">{result.claimNumber}</h2>
                  <span className="rounded-full bg-adt-blue px-3 py-1 text-xs font-semibold text-white">
                    {result.status}
                  </span>
                </div>
                <div className="space-y-4">
                  {result.updates?.map((update, i) => (
                    <div key={i} className="flex gap-3 border-l-2 border-adt-blue/30 pl-4">
                      <div>
                        <p className="text-xs text-gray-400">{update.date}</p>
                        <p className="text-sm">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-[var(--radius-card)] border border-gray-300/50 bg-gray-50 p-6 text-center">
                <Search className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-gray-600">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

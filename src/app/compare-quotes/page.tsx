"use client";

import { useState } from "react";
import Link from "next/link";

const DEMO_QUOTES = [
  {
    insurer: "ICEA LION",
    premium: 58000,
    excess: 25000,
    benefits: ["Own damage", "Theft", "Third party", "Windscreen"],
    exclusions: ["Wear and tear", "Unlicensed drivers", "Racing"],
    claimsRating: 4.5,
  },
  {
    insurer: "CIC Insurance",
    premium: 52000,
    excess: 30000,
    benefits: ["Own damage", "Theft", "Third party", "Road rescue"],
    exclusions: ["Mechanical breakdown", "Drunk driving", "War risks"],
    claimsRating: 4.2,
  },
  {
    insurer: "Jubilee Insurance",
    premium: 61000,
    excess: 20000,
    benefits: ["Own damage", "Theft", "Third party", "Entertainment unit"],
    exclusions: ["Consequential loss", "Unroadworthy vehicle", "Overloading"],
    claimsRating: 4.7,
  },
];

export default function CompareQuotesPage() {
  const [product, setProduct] = useState("Motor Comprehensive");
  const [showResults, setShowResults] = useState(false);

  return (
    <section className="section-padding">
      <div className="container-adt">
        <div className="section-head-center mb-12">
          <p className="eyebrow mb-3">Compare Insurance Quotes</p>
          <h1 className="text-3xl md:text-4xl">Side-by-Side Comparison</h1>
          <p className="mt-4 text-gray-500">
            Compare premiums, benefits, excess, and exclusions from leading insurers.
          </p>
        </div>

        {!showResults ? (
          <div className="mx-auto max-w-lg rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Insurance Product</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm"
              >
                <option>Motor Comprehensive</option>
                <option>Motor Third Party</option>
                <option>Medical Individual</option>
                <option>Domestic Package</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => setShowResults(true)}
              className="btn-primary w-full"
            >
              Compare Quotes
            </button>
            <p className="mt-4 text-center text-xs text-gray-400">
              For personalised comparisons,{" "}
              <Link href="/#quote" className="text-adt-blue hover:underline">
                request a full quote
              </Link>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-4 text-left text-sm font-semibold">Insurer</th>
                  <th className="p-4 text-left text-sm font-semibold">Annual Premium</th>
                  <th className="p-4 text-left text-sm font-semibold">Excess</th>
                  <th className="p-4 text-left text-sm font-semibold">Benefits</th>
                  <th className="p-4 text-left text-sm font-semibold">Exclusions</th>
                  <th className="p-4 text-left text-sm font-semibold">Claims Rating</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_QUOTES.map((q) => (
                  <tr key={q.insurer} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">{q.insurer}</td>
                    <td className="p-4 text-adt-blue font-bold">KES {q.premium.toLocaleString()}</td>
                    <td className="p-4 text-sm">KES {q.excess.toLocaleString()}</td>
                    <td className="p-4">
                      <ul className="text-xs space-y-1">
                        {q.benefits.map((b) => (
                          <li key={b} className="text-adt-green">✓ {b}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">
                      <ul className="text-xs space-y-1">
                        {q.exclusions.map((e) => (
                          <li key={e} className="text-gray-400">✗ {e}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">
                      <span className="rounded-full bg-gold/20 px-2 py-1 text-xs font-semibold text-gold">
                        {q.claimsRating}/5
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 text-center">
              <Link href="/#quote" className="btn-primary">
                Get Personalised Quotes
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

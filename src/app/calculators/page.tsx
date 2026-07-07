"use client";

import { useState } from "react";

function MotorCalculator() {
  const [value, setValue] = useState(1500000);
  const [type, setType] = useState("comprehensive");
  const rate = type === "comprehensive" ? 0.04 : 0.015;
  const estimate = Math.round(value * rate);

  return (
    <div id="motor" className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6">
      <h3 className="mb-4 text-xl font-bold">Motor Insurance Premium Estimate</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Vehicle Value (KES)</label>
          <input
            type="range"
            min={500000}
            max={10000000}
            step={100000}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-adt-blue"
          />
          <p className="text-sm text-gray-500">KES {value.toLocaleString()}</p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Cover Type</label>
          <div className="flex gap-2">
            {["comprehensive", "third-party"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  type === t ? "bg-adt-blue text-white" : "bg-gray-100"
                }`}
              >
                {t.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-adt-blue/5 p-4 text-center">
          <p className="text-sm text-gray-500">Estimated Annual Premium</p>
          <p className="text-3xl font-bold text-adt-blue">KES {estimate.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-400">Indicative only. Get an exact quote from ADT.</p>
        </div>
      </div>
    </div>
  );
}

function MedicalCalculator() {
  const [members, setMembers] = useState(4);
  const [tier, setTier] = useState("standard");
  const rates: Record<string, number> = { basic: 35000, standard: 55000, premium: 85000 };
  const estimate = rates[tier] * members;

  return (
    <div id="medical" className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6">
      <h3 className="mb-4 text-xl font-bold">Medical Insurance Estimate</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Family Members</label>
          <input
            type="number"
            min={1}
            max={10}
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Cover Tier</label>
          <div className="flex flex-wrap gap-2">
            {["basic", "standard", "premium"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  tier === t ? "bg-adt-blue text-white" : "bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-adt-blue/5 p-4 text-center">
          <p className="text-sm text-gray-500">Estimated Annual Premium</p>
          <p className="text-3xl font-bold text-adt-blue">KES {estimate.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function RetirementCalculator() {
  const [age, setAge] = useState(35);
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(25);
  const rate = 0.08 / 12;
  const months = years * 12;
  const futureValue = monthly * ((Math.pow(1 + rate, months) - 1) / rate);

  return (
    <div id="retirement" className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6">
      <h3 className="mb-4 text-xl font-bold">Retirement Planning Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Current Age: {age}</label>
          <input type="range" min={25} max={55} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-adt-blue" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Monthly Savings (KES)</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full rounded-xl border border-gray-300 px-4 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Years to Retirement: {years}</label>
          <input type="range" min={5} max={35} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-adt-blue" />
        </div>
        <div className="rounded-xl bg-gold/10 p-4 text-center">
          <p className="text-sm text-gray-500">Projected Retirement Fund (8% p.a.)</p>
          <p className="text-3xl font-bold text-gold">KES {Math.round(futureValue).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function EducationCalculator() {
  const [years, setYears] = useState(10);
  const [cost, setCost] = useState(500000);
  const [monthly, setMonthly] = useState(15000);
  const inflation = 0.07;
  const futureCost = cost * Math.pow(1 + inflation, years);
  const rate = 0.08 / 12;
  const months = years * 12;
  const saved = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
  const gap = Math.max(0, futureCost - saved);

  return (
    <div id="education" className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6">
      <h3 className="mb-4 text-xl font-bold">Education Savings Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Years Until University: {years}</label>
          <input type="range" min={1} max={18} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-adt-blue" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Current Annual Education Cost (KES)</label>
          <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} className="w-full rounded-xl border border-gray-300 px-4 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Monthly Savings (KES)</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full rounded-xl border border-gray-300 px-4 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-500">Future Cost (7% inflation)</p>
            <p className="text-lg font-bold">KES {Math.round(futureCost).toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-adt-blue/5 p-3 text-center">
            <p className="text-xs text-gray-500">Projected Savings</p>
            <p className="text-lg font-bold text-adt-blue">KES {Math.round(saved).toLocaleString()}</p>
          </div>
        </div>
        {gap > 0 && (
          <p className="text-sm text-gray-500">Funding gap: KES {Math.round(gap).toLocaleString()} — speak with ADT about education savings plans.</p>
        )}
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <section className="section-padding">
      <div className="container-adt">
        <div className="section-head-center mb-12">
          <p className="eyebrow mb-3">Insurance Calculators</p>
          <h1 className="text-3xl md:text-4xl">Plan Your Coverage</h1>
          <p className="mt-4 text-gray-500">
            Indicative estimates to help you plan. Contact ADT for exact quotations.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <MotorCalculator />
          <MedicalCalculator />
          <RetirementCalculator />
          <EducationCalculator />
        </div>
      </div>
    </section>
  );
}

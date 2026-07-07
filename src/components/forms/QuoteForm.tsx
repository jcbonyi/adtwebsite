"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const PRODUCTS = [
  "Personal Insurance", "Motor Insurance", "Medical Insurance", "Travel Insurance",
  "Home Insurance", "Personal Accident", "Business Insurance", "Fire Insurance",
  "WIBA", "Group Medical", "Goods in Transit", "Marine Cargo",
  "Contractors All Risk", "Public Liability", "Professional Indemnity",
];

const STEPS = ["Basic Details", "Insurance Need", "Contact Preference", "Submit"];

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [formLoadedAt] = useState(Date.now());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    details: "",
    contactMethod: "phone",
    website: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 0) return form.name && form.phone;
    if (step === 1) return form.product;
    if (step === 2) return form.contactMethod;
    return true;
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, "form-loaded-at": formLoadedAt }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-adt-green/30 bg-adt-green/5 p-8 text-center">
        <Check className="mx-auto mb-4 text-adt-green" size={48} />
        <h3 className="mb-2 text-xl font-bold">Quote Request Received</h3>
        <p className="text-gray-500">
          Our team will contact you within 30 minutes during business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6 md:p-8" id="quote">
      <h2 className="mb-2 text-2xl font-bold">Get a Free Quote</h2>
      <p className="mb-6 text-sm text-gray-500">Complete in 4 easy steps — quote in 30 minutes</p>

      <div className="mb-8 flex gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`mb-1 h-1.5 rounded-full transition-colors ${
                i <= step ? "bg-adt-blue" : "bg-gray-300"
              }`}
            />
            <p className={`text-xs ${i <= step ? "text-adt-blue font-semibold" : "text-gray-400"}`}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="min-h-[200px]">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-adt-blue focus:outline-none focus:ring-2 focus:ring-adt-blue/20"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-adt-blue focus:outline-none focus:ring-2 focus:ring-adt-blue/20"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-adt-blue focus:outline-none focus:ring-2 focus:ring-adt-blue/20"
                placeholder="you@email.com"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="mb-2 block text-sm font-medium">What insurance do you need? *</label>
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => update("product", p)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    form.product === p
                      ? "bg-adt-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Additional Details</label>
              <textarea
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-adt-blue focus:outline-none focus:ring-2 focus:ring-adt-blue/20"
                placeholder="Tell us about your coverage needs..."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="mb-2 block text-sm font-medium">Preferred Contact Method</label>
            {["phone", "whatsapp", "email"].map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                  form.contactMethod === method
                    ? "border-adt-blue bg-adt-blue/5"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={form.contactMethod === method}
                  onChange={(e) => update("contactMethod", e.target.value)}
                  className="accent-adt-blue"
                />
                <span className="capitalize font-medium">{method}</span>
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3 text-sm">
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            {form.email && <p><strong>Email:</strong> {form.email}</p>}
            <p><strong>Product:</strong> {form.product}</p>
            <p><strong>Contact via:</strong> {form.contactMethod}</p>
            {form.details && <p><strong>Details:</strong> {form.details}</p>}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {status === "error" && (
        <p className="mb-4 text-sm text-red-600">Something went wrong. Please try again or call us.</p>
      )}

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {status === "loading" ? "Submitting..." : "Submit Quote Request"}
          </button>
        )}
      </div>
    </div>
  );
}

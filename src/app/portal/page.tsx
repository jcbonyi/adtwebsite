import Link from "next/link";
import { FileText, Shield, RefreshCw, Edit, Download } from "lucide-react";

const PORTAL_FEATURES = [
  { icon: Shield, title: "View Policies", description: "Access all active policies in one dashboard." },
  { icon: Download, title: "Download Documents", description: "Certificates, schedules, and receipts on demand." },
  { icon: FileText, title: "Track Claims", description: "Real-time claim status and document uploads." },
  { icon: RefreshCw, title: "Renew Policies", description: "One-click renewal with advisor review." },
  { icon: Edit, title: "Request Changes", description: "Update beneficiaries, vehicles, or coverage limits." },
];

export default function PortalPage() {
  return (
    <section className="section-padding">
      <div className="container-adt">
        <div className="section-head-center mb-12">
          <p className="eyebrow mb-3">Customer Portal</p>
          <h1 className="text-3xl md:text-4xl">Your Insurance Dashboard</h1>
          <p className="mt-4 text-gray-500">
            Manage policies, track claims, and download documents — all in one place.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTAL_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6"
            >
              <feature.icon className="mb-3 text-adt-blue" size={24} />
              <h3 className="mb-2 font-bold">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-md rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-8 text-center">
          <h2 className="mb-4 text-xl font-bold">Sign In to Your Portal</h2>
          <p className="mb-6 text-sm text-gray-500">
            Client portal powered by Supabase with JWT authentication. Contact ADT to activate your account.
          </p>
          <Link href="/portal/login" className="btn-primary w-full">
            Sign In
          </Link>
          <p className="mt-4 text-xs text-gray-400">
            New client? Your advisor will send portal credentials after policy placement.
          </p>
        </div>
      </div>
    </section>
  );
}

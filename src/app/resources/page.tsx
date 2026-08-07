import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Scale,
  Search,
  Shield,
  Bot,
} from "lucide-react";
import { InsuranceAssistant } from "@/components/chat/InsuranceAssistant";

export const metadata: Metadata = {
  title: "Resources & Tools",
  description:
    "ADT Insurance tools — quote comparison, claims tracker, knowledge hub, client portal, and AI advisor.",
};

const TOOLS = [
  {
    href: "/knowledge-hub",
    title: "Knowledge Hub",
    description: "Guides, claims tips, and risk management articles.",
    icon: BookOpen,
  },
  {
    href: "/compare-quotes",
    title: "Compare Quotes",
    description: "Side-by-side premiums, benefits, excess, and exclusions.",
    icon: Scale,
  },
  {
    href: "/claims-tracker",
    title: "Track a Claim",
    description: "Check claim status with your reference number.",
    icon: Search,
  },
  {
    href: "/portal",
    title: "Client Portal",
    description: "View policies, documents, and claim updates.",
    icon: Shield,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-adt">
          <div className="section-head-center mb-12">
            <p className="eyebrow mb-3">Resources</p>
            <h1 className="text-3xl md:text-4xl">Tools to Plan and Manage Cover</h1>
            <p className="mt-4 text-gray-500">
              Secondary tools live here so the homepage stays focused on quotes and claims.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6 transition-all hover:border-adt-blue/40 hover:shadow-lg"
              >
                <tool.icon className="mb-3 text-adt-blue" size={24} />
                <h2 className="mb-2 font-bold group-hover:text-adt-blue">{tool.title}</h2>
                <p className="text-sm text-gray-500">{tool.description}</p>
              </Link>
            ))}
          </div>

          <div
            id="ai-advisor"
            className="mt-16 scroll-mt-28 rounded-[var(--radius-card)] border border-gray-300/50 bg-navy-900 p-8 text-white md:p-10"
          >
            <div className="mb-6 max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-gold">
                <Bot size={22} />
                <p className="eyebrow text-gold">AI Insurance Advisor</p>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">
                Ask coverage questions anytime
              </h2>
              <p className="text-white/70">
                Get recommended covers and claims guidance. For urgent claims,
                use WhatsApp or call the claims desk — a human is always available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InsuranceAssistant startOpen />
    </>
  );
}

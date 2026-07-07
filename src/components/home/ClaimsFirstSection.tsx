"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileUp,
  Search,
  BookOpen,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { CLAIMS_FEATURES, CLAIMS_TIMELINE } from "@/lib/data/content";
import { BRAND_MESSAGE } from "@/lib/constants";

const FEATURE_ICONS = [FileUp, Search, BookOpen, MessageCircle, UserCheck];

export function ClaimsFirstSection() {
  return (
    <section className="section-padding bg-navy-900 text-white" id="claims">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3 text-gold">Claims Before Sales</p>
          <h2 className="text-3xl text-white md:text-4xl">
            When Claims Happen, We Stand With You
          </h2>
          <p className="mt-4 text-white/70">{BRAND_MESSAGE}</p>
        </div>

        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CLAIMS_FEATURES.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <Icon className="mb-3 text-gold" size={24} />
                <h3 className="mb-2 text-sm font-bold text-white">{feature.title}</h3>
                <p className="text-xs text-white/60">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mb-12">
          <h3 className="mb-8 text-center text-xl font-bold text-white">
            Claims Process Timeline
          </h3>
          <div className="grid gap-6 md:grid-cols-4">
            {CLAIMS_TIMELINE.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-navy-900">
                  {item.step}
                </div>
                <h4 className="mb-2 font-bold text-white">{item.title}</h4>
                <p className="text-sm text-white/60">{item.description}</p>
                {i < CLAIMS_TIMELINE.length - 1 && (
                  <div className="absolute right-0 top-6 hidden h-0.5 w-full bg-gold/30 md:block translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#quote" className="btn-gold">
            Report a Claim Online
          </Link>
          <Link href="/claims-tracker" className="btn-outline">
            Track Your Claim
          </Link>
        </div>
      </div>
    </section>
  );
}

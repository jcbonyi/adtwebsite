"use client";

import { motion } from "framer-motion";
import { Star, Building2, Play } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/content";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3">Client Testimonials</p>
          <h2 className="text-3xl md:text-4xl">Trusted by Families and Businesses</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[var(--radius-card)] border border-gray-300/50 bg-gray-50 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                {t.type === "corporate" && (
                  <Building2 size={16} className="text-adt-blue" />
                )}
                {t.type === "video" && (
                  <Play size={16} className="text-adt-blue" />
                )}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <blockquote className="mb-4 text-gray-700">&ldquo;{t.quote}&rdquo;</blockquote>
              <div>
                <p className="font-semibold text-navy-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

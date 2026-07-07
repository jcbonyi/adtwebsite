"use client";

import { motion } from "framer-motion";
import { WHY_CHOOSE_ADT } from "@/lib/data/why-choose";

export function WhyChooseSection() {
  return (
    <section className="section-padding bg-white" id="why-adt">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3">Why Choose ADT</p>
          <h2 className="text-3xl md:text-4xl">
            Kenya&apos;s Most Customer-Focused Insurance Brokerage
          </h2>
          <p className="mt-4 text-gray-500">
            Independent advice, competitive quotes, and claims support that puts you first.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_ADT.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-[var(--radius-card)] border border-gray-300/50 bg-gray-50 p-6 transition-all hover:border-adt-blue/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-adt-blue/10 text-adt-blue transition-colors group-hover:bg-adt-blue group-hover:text-white">
                <item.icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

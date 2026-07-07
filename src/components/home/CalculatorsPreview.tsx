"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Car, Heart, GraduationCap, PiggyBank } from "lucide-react";

const CALCULATORS = [
  { slug: "motor", name: "Motor Premium Estimate", icon: Car },
  { slug: "medical", name: "Medical Insurance Estimate", icon: Heart },
  { slug: "retirement", name: "Retirement Planning", icon: PiggyBank },
  { slug: "education", name: "Education Savings", icon: GraduationCap },
];

export function CalculatorsPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3">Insurance Calculators</p>
          <h2 className="text-3xl md:text-4xl">Plan Your Coverage with Confidence</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CALCULATORS.map((calc, i) => (
            <motion.div
              key={calc.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/calculators#${calc.slug}`}
                className="group flex flex-col items-center rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-6 text-center transition-all hover:border-adt-blue/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-adt-blue/10 text-adt-blue group-hover:bg-adt-blue group-hover:text-white transition-colors">
                  <calc.icon size={24} />
                </div>
                <h3 className="font-bold">{calc.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/calculators" className="btn-primary inline-flex items-center gap-2">
            <Calculator size={18} />
            View All Calculators
          </Link>
        </div>
      </div>
    </section>
  );
}

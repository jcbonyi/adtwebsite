"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";

const FEATURED_SLUGS = [
  "motor-insurance-kenya",
  "medical-insurance-kenya",
  "business-insurance",
  "wiba-insurance-kenya",
  "marine-cargo-insurance-kenya",
  "personal-insurance",
] as const;

export function ProductsHub() {
  const featured = FEATURED_SLUGS.map((slug) => getProductBySlug(slug)).filter(Boolean);

  return (
    <section className="section-padding bg-gray-50" id="products">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3">Insurance Products</p>
          <h2 className="text-3xl md:text-4xl">Cover That Matches Your Needs</h2>
          <p className="mt-4 text-gray-500">
            High-intent cover for individuals and businesses — with claims support on every policy.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) =>
            product ? (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/insurance/${product.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-5 transition-all hover:border-adt-blue/40 hover:shadow-lg"
                >
                  <span className="mb-3 text-2xl">{product.icon}</span>
                  <h3 className="mb-2 text-base font-bold">{product.name}</h3>
                  <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-2">
                    {product.overview}
                  </p>
                  <span className="flex items-center gap-1 text-sm font-semibold text-adt-blue transition-all group-hover:gap-2">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ) : null
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/insurance" className="btn-primary inline-flex items-center gap-2">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

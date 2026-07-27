import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INSURANCE_PRODUCTS } from "@/lib/data/products";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Insurance Products",
  description:
    "Browse personal and business insurance products from ADT Africa Insurance Brokers — motor, medical, WIBA, marine, and more.",
  openGraph: {
    title: `All Insurance Products | ${SITE.shortName}`,
    url: `${SITE.domain}/insurance`,
  },
};

export default function AllInsurancePage() {
  const personal = INSURANCE_PRODUCTS.filter((p) => p.category === "personal");
  const business = INSURANCE_PRODUCTS.filter((p) => p.category === "business");

  return (
    <section className="section-padding">
      <div className="container-adt">
        <div className="section-head-center mb-12">
          <p className="eyebrow mb-3">Insurance Marketplace</p>
          <h1 className="text-3xl md:text-4xl">All Insurance Products</h1>
          <p className="mt-4 text-gray-500">
            Independent advice and competitive quotes across personal and business cover.
          </p>
        </div>

        <div className="mb-14">
          <h2 className="mb-6 text-xl font-bold">Personal Insurance</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personal.map((product) => (
              <Link
                key={product.slug}
                href={`/insurance/${product.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-5 transition-all hover:border-adt-blue/40 hover:shadow-lg"
              >
                <span className="mb-3 text-2xl">{product.icon}</span>
                <h3 className="mb-2 font-bold">{product.name}</h3>
                <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-2">{product.overview}</p>
                <span className="flex items-center gap-1 text-sm font-semibold text-adt-blue">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-xl font-bold">Business Insurance</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {business.map((product) => (
              <Link
                key={product.slug}
                href={`/insurance/${product.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-5 transition-all hover:border-adt-blue/40 hover:shadow-lg"
              >
                <span className="mb-3 text-2xl">{product.icon}</span>
                <h3 className="mb-2 font-bold">{product.name}</h3>
                <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-2">{product.overview}</p>
                <span className="flex items-center gap-1 text-sm font-semibold text-adt-blue">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/#quote" className="btn-primary">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

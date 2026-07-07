import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, SEO_LANDING_SLUGS } from "@/lib/data/products";
import { SITE, BRAND_MESSAGE } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.overview,
    keywords: product.keywords,
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.overview,
      url: `${SITE.domain}/insurance/${slug}`,
    },
  };
}

export default async function InsuranceProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-navy-900 py-16 text-white">
        <div className="container-adt">
          <p className="eyebrow mb-3 text-gold">{BRAND_MESSAGE}</p>
          <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
            {product.name}
          </h1>
          <p className="max-w-2xl text-lg text-white/80">{product.overview}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#quote" className="btn-primary">
              Get a Free Quote
            </Link>
            <Link href="/#claims" className="btn-outline">
              Report a Claim
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-adt grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Benefits</h2>
            <ul className="space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-adt-blue/10 text-xs text-adt-blue">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold">Coverage Highlights</h2>
            <ul className="space-y-3">
              {product.coverageHighlights.map((c) => (
                <li key={c} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold">●</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-adt max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {product.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-[var(--radius-card)] border border-gray-300/50 bg-white p-5"
              >
                <summary className="cursor-pointer font-semibold text-navy-900 group-open:text-adt-blue">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-900 text-center text-white">
        <div className="container-adt">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Ready for {product.name}?
          </h2>
          <p className="mb-8 text-white/70">
            Get competitive quotes from 20+ insurers in 30 minutes. Claims support included.
          </p>
          <Link href="/#quote" className="btn-gold">
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}

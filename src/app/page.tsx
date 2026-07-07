import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { ProductsHub } from "@/components/home/ProductsHub";
import { ClaimsFirstSection } from "@/components/home/ClaimsFirstSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CalculatorsPreview } from "@/components/home/CalculatorsPreview";
import { KnowledgeHubPreview } from "@/components/home/KnowledgeHubPreview";
import { TrustComplianceSection } from "@/components/home/TrustComplianceSection";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getBlogPosts } from "@/lib/blog";
import { SITE, BRAND_MESSAGE } from "@/lib/constants";

function BrandMarquee() {
  return (
    <div className="overflow-hidden bg-navy-900 py-3 text-white/80" aria-hidden="true">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-widest">
            ADT &bull; CLAIMS BEFORE SALES &bull; SEAMLESS SERVICE &bull; PROMPT ACTION &bull; TAILORED COVER &bull;
          </span>
        ))}
      </div>
    </div>
  );
}

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency",
        name: SITE.name,
        url: SITE.domain,
        logo: `${SITE.domain}/assets/images/adt-logo.png`,
        description: BRAND_MESSAGE,
        telephone: SITE.phoneTel,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kilindini Plaza, Moi Avenue",
          addressLocality: "Mombasa",
          addressCountry: "KE",
        },
        areaServed: "Kenya",
        priceRange: "$$",
      },
      {
        "@type": "LocalBusiness",
        name: SITE.name,
        image: `${SITE.domain}/assets/images/hero-biz.png`,
        "@id": SITE.domain,
        url: SITE.domain,
        telephone: SITE.phoneTel,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kilindini Plaza, Moi Avenue",
          addressLocality: "Mombasa",
          addressCountry: "KE",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      },
      {
        "@type": "WebSite",
        name: SITE.shortName,
        url: SITE.domain,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.domain}/knowledge-hub?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd />
      <HeroSection />
      <BrandMarquee />
      <WhyChooseSection />
      <ProductsHub />
      <ClaimsFirstSection />
      <TestimonialsSection />
      <CalculatorsPreview />
      <KnowledgeHubPreview posts={posts} />
      <TrustComplianceSection />

      <section className="section-padding bg-gray-50">
        <div className="container-adt">
          <div className="mx-auto max-w-2xl">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}

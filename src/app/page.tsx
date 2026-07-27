import { HeroSection } from "@/components/home/HeroSection";
import { ProductsHub } from "@/components/home/ProductsHub";
import { ClaimsFirstSection } from "@/components/home/ClaimsFirstSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustComplianceSection } from "@/components/home/TrustComplianceSection";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SITE, BRAND_MESSAGE } from "@/lib/constants";

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

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <ClaimsFirstSection />
      <ProductsHub />
      <TestimonialsSection />
      <TrustComplianceSection />

      <section className="section-padding bg-gray-50" id="quote">
        <div className="container-adt">
          <div className="mx-auto max-w-2xl">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}

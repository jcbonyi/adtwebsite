import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { TopBar, Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyQuoteWidget } from "@/components/layout/StickyQuoteWidget";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SITE, BRAND_MESSAGE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} | Insurance Made Simple. Claims Made Faster.`,
    template: `%s | ${SITE.shortName}`,
  },
  description:
    "Kenya's most customer-focused insurance brokerage. Expert advice, competitive quotes from 20+ insurers, and dedicated claims support. Insurance Broker Kenya.",
  keywords: [
    "Insurance Broker Kenya",
    "Motor Insurance Kenya",
    "Medical Insurance Kenya",
    "Marine Insurance Kenya",
    "Business Insurance Kenya",
    "Claims Assistance Kenya",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE.domain,
    siteName: SITE.shortName,
    title: `${SITE.name} | Claims Before Sales`,
    description: BRAND_MESSAGE,
    images: [{ url: "/assets/images/hero-biz.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: BRAND_MESSAGE,
    images: ["/assets/images/hero-biz.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Script
          id="adt-loading-gate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem("adt-loader-seen")&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("adt-loading");}}catch(e){}})();`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <LoadingScreen />
        <TopBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyQuoteWidget />
        <WhatsAppButton />
      </body>
    </html>
  );
}

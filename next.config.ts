import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "adtinsurance.co.ke" },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/knowledge-hub", permanent: true },
      { source: "/blog-post.html", destination: "/knowledge-hub", permanent: true },
      { source: "/claims-support-kenya.html", destination: "/#claims", permanent: true },
      { source: "/motor-insurance-mombasa.html", destination: "/insurance/motor-insurance-kenya", permanent: true },
      { source: "/medical-insurance-advisory.html", destination: "/insurance/medical-insurance-kenya", permanent: true },
      { source: "/corporate-insurance-services.html", destination: "/insurance/business-insurance", permanent: true },
      { source: "/sme-insurance-kenya.html", destination: "/insurance/business-insurance", permanent: true },
      { source: "/domestic-package-insurance.html", destination: "/insurance/home-insurance", permanent: true },
      { source: "/logistics-insurance-advisory.html", destination: "/insurance/marine-cargo-insurance-kenya", permanent: true },
      { source: "/how-claims-work.html", destination: "/#claims", permanent: true },
      { source: "/resources.html", destination: "/knowledge-hub", permanent: true },
      { source: "/case-studies.html", destination: "/#trust", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

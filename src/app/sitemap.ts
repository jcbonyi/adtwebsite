import type { MetadataRoute } from "next";
import { INSURANCE_PRODUCTS, SEO_LANDING_SLUGS } from "@/lib/data/products";
import { getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const base = SITE.domain;

  const staticPages = [
    "",
    "/calculators",
    "/claims-tracker",
    "/compare-quotes",
    "/knowledge-hub",
    "/portal",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...SEO_LANDING_SLUGS.map((slug) => ({
      url: `${base}/insurance/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${base}/knowledge-hub/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

import { readFile } from "fs/promises";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  content: string[];
}

let cachedPosts: BlogPost[] | null = null;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts;
  try {
    const filePath = path.join(process.cwd(), "data", "blog-posts.json");
    const raw = await readFile(filePath, "utf-8");
    cachedPosts = JSON.parse(raw) as BlogPost[];
    return cachedPosts;
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export function mapCategoryToHub(category: string): string {
  const map: Record<string, string> = {
    Claims: "Claims Tips",
    Compliance: "Business Risk Management",
    SME: "Business Risk Management",
    Motor: "Motor Insurance",
    Medical: "Insurance Guides",
    Corporate: "Business Risk Management",
    Logistics: "Marine Insurance",
    Finance: "Personal Finance",
    Retirement: "Retirement Planning",
  };
  return map[category] || "Insurance Guides";
}

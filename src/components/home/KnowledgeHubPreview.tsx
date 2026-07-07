"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface KnowledgeHubPreviewProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    image: string;
  }[];
}

export function KnowledgeHubPreview({ posts }: KnowledgeHubPreviewProps) {
  return (
    <section className="section-padding bg-gray-50" id="knowledge">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3">ADT Knowledge Hub</p>
          <h2 className="text-3xl md:text-4xl">Insurance Learning Centre</h2>
          <p className="mt-4 text-gray-500">
            Guides, claims tips, and risk management resources from our advisory team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/knowledge-hub/${post.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-gray-300/50 bg-white transition-all hover:shadow-lg"
              >
                <img
                  src={`/${post.image}`}
                  alt=""
                  className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-semibold text-adt-blue">{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mb-2 font-bold line-clamp-2 group-hover:text-adt-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/knowledge-hub" className="btn-primary inline-flex items-center gap-2">
            Explore Knowledge Hub <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

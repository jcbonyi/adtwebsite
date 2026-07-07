import { Suspense } from "react";
import Link from "next/link";
import { getBlogPosts, mapCategoryToHub } from "@/lib/blog";
import { KNOWLEDGE_CATEGORIES } from "@/lib/data/content";
import { KnowledgeHubSearch } from "@/components/knowledge/KnowledgeHubSearch";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function KnowledgeHubPage({ searchParams }: Props) {
  const params = await searchParams;
  const posts = await getBlogPosts();
  const query = params.q?.toLowerCase() || "";
  const category = params.category || "";

  const filtered = posts.filter((post) => {
    const hubCategory = mapCategoryToHub(post.category);
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);
    const matchesCategory = !category || hubCategory === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="section-padding">
      <div className="container-adt">
        <div className="section-head-center mb-12">
          <p className="eyebrow mb-3">ADT Knowledge Hub</p>
          <h1 className="text-3xl md:text-4xl">Insurance Learning Centre</h1>
          <p className="mt-4 text-gray-500">
            Guides, claims tips, and risk management resources from our advisory team.
          </p>
        </div>

        <Suspense fallback={<div className="mb-8 h-12" />}>
          <KnowledgeHubSearch />
        </Suspense>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <Link
            href="/knowledge-hub"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              !category ? "bg-adt-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </Link>
          {KNOWLEDGE_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/knowledge-hub?category=${encodeURIComponent(cat)}`}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                category === cat ? "bg-adt-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No articles found. Try a different search.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article key={post.slug}>
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
                      <span className="font-semibold text-adt-blue">
                        {mapCategoryToHub(post.category)}
                      </span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mb-2 font-bold line-clamp-2 group-hover:text-adt-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts, mapCategoryToHub } from "@/lib/blog";
import { SITE } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE.domain}/knowledge-hub/${slug}`,
      images: [{ url: `/${post.image}` }],
    },
  };
}

export default async function KnowledgeHubArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: SITE.name },
    image: `${SITE.domain}/${post.image}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="section-padding">
        <div className="container-adt max-w-3xl">
          <div className="mb-6">
            <Link href="/knowledge-hub" className="text-sm text-adt-blue hover:underline">
              ← Knowledge Hub
            </Link>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
            <span className="font-semibold text-adt-blue">{mapCategoryToHub(post.category)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mb-6 text-3xl font-extrabold md:text-4xl">{post.title}</h1>

          <img
            src={`/${post.image}`}
            alt=""
            className="mb-8 w-full rounded-[var(--radius-card)] object-cover max-h-96"
          />

          <div className="prose prose-gray max-w-none">
            {post.content.map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-8 mb-4 text-xl font-bold text-navy-900">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={i} className="ml-4 text-gray-600 list-disc">
                    {paragraph.replace("- ", "")}
                  </li>
                );
              }
              return (
                <p key={i} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-gray-300 pt-8">
              <h2 className="mb-6 text-xl font-bold">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/knowledge-hub/${r.slug}`}
                    className="rounded-xl border border-gray-300/50 p-4 hover:border-adt-blue/40 transition-colors"
                  >
                    <p className="text-sm font-semibold line-clamp-2 hover:text-adt-blue">
                      {r.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{r.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

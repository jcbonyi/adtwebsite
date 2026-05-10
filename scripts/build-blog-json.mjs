import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "insights");
const outputFile = path.join(process.cwd(), "data", "blog-posts.json");

function markdownToParagraphs(markdown) {
  return markdown
    .split(/\n\s*\n/g)
    .map((chunk) => chunk.replace(/^#+\s/gm, "").trim())
    .filter(Boolean);
}

async function run() {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const fullPath = path.join(contentDir, entry.name);
    const source = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(source);
    const slug = entry.name.replace(/\.md$/, "");
    posts.push({
      slug,
      title: data.title || slug,
      category: data.category || "Insights",
      excerpt: data.excerpt || "",
      author: data.author || "ADT Advisory Desk",
      publishedAt: data.publishedAt || new Date().toISOString().slice(0, 10),
      content: markdownToParagraphs(content)
    });
  }

  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  console.log(`Built ${posts.length} blog posts to ${outputFile}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

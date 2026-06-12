async function fetchPosts() {
  try {
    const response = await fetch("/api/blog/posts");
    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    return data.posts || [];
  } catch (_error) {
    const fallback = await fetch("data/blog-posts.json");
    return fallback.json();
  }
}

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function formatDate(dateInput) {
  return new Date(dateInput).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function setMetaTag(name, content, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? "property" : "name";
  let node = document.querySelector(`meta[${attr}="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function getServiceLinks(post) {
  const title = `${post.title} ${post.category}`.toLowerCase();
  const links = [];
  if (title.includes("motor") || title.includes("fleet")) {
    links.push({ label: "Motor Insurance Advisory", href: "motor-insurance-mombasa.html" });
  }
  if (title.includes("claim")) {
    links.push({ label: "How Claims Work", href: "how-claims-work.html" });
  }
  if (title.includes("wiba") || title.includes("liability") || title.includes("compliance")) {
    links.push({ label: "Corporate Insurance Services", href: "corporate-insurance-services.html" });
  }
  if (!links.length) {
    links.push({ label: "Insurance Solutions", href: "index.html#services" });
  }
  return links;
}

async function renderBlogList() {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return;

  blogList.innerHTML = '<p class="insight-loading">Loading insights…</p>';
  const posts = await fetchPosts();
  blogList.innerHTML = posts
    .map(
      (post) => `
      <article class="insight-card">
        <img class="insight-card-image" src="${post.image || "assets/images/advisory-meeting.jpg"}" alt="" loading="lazy">
        <p class="eyebrow">${post.category}</p>
        <h3><a href="blog-post.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <p class="insight-card-meta">${formatDate(post.publishedAt)} · ${post.author}</p>
        <a class="text-link insight-card-link" href="blog-post.html?slug=${encodeURIComponent(post.slug)}">Read Insight</a>
      </article>
    `
    )
    .join("");
}

async function renderBlogPost() {
  const postTitle = document.getElementById("post-title");
  if (!postTitle) return;

  const slug = getQueryParam("slug");
  const posts = await fetchPosts();
  const post = posts.find((item) => item.slug === slug);

  const postCategory = document.getElementById("post-category");
  const postMeta = document.getElementById("post-meta");
  const postContent = document.getElementById("post-content");

  if (!post) {
    postTitle.textContent = "Insight not found";
    if (postMeta) postMeta.textContent = "Please return to the insights page and choose another article.";
    if (postContent) postContent.innerHTML = '<p><a class="text-link" href="blog.html">Back to Insights</a></p>';
    return;
  }

  document.title = `${post.title} | ADT Insurance Insights`;
  const description = post.excerpt || post.title;
  const image = post.image
    ? new URL(post.image, window.location.href).href
    : "https://adtinsurance.co.ke/assets/images/advisory-meeting.jpg";
  setMetaTag("description", description);
  setMetaTag("og:title", post.title, true);
  setMetaTag("og:description", description, true);
  setMetaTag("og:type", "article", true);
  setMetaTag("og:image", image, true);
  setMetaTag("twitter:card", "summary_large_image");
  setMetaTag("twitter:title", post.title);
  setMetaTag("twitter:description", description);
  setMetaTag("twitter:image", image);
  if (postCategory) postCategory.textContent = post.category;
  postTitle.textContent = post.title;
  if (postMeta) postMeta.textContent = `${formatDate(post.publishedAt)} · ${post.readTime || "4 min read"} · ${post.author}`;
  if (postContent) {
    const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
    const serviceLinks = getServiceLinks(post);
    postContent.innerHTML = `
      ${post.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <h3>Related solutions</h3>
      <ul>
        ${serviceLinks.map((link) => `<li><a class="text-link" href="${link.href}">${link.label}</a></li>`).join("")}
      </ul>
      <h3>Continue reading</h3>
      <ul>
        ${relatedPosts
    .map((item) => `<li><a class="text-link" href="blog-post.html?slug=${encodeURIComponent(item.slug)}">${item.title}</a></li>`)
    .join("")}
      </ul>
      <p><a class="btn btn-primary" href="index.html#quote">Request a Quote</a></p>
    `;
    postContent.classList.add("article-prose");
  }
}

renderBlogList();
renderBlogPost();

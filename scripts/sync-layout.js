/**
 * Syncs standard inner-page nav + footer from partials into HTML files.
 * Run: node scripts/sync-layout.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const footer = fs.readFileSync(path.join(root, "partials", "site-footer.html"), "utf8").trim();
const navInner = fs.readFileSync(path.join(root, "partials", "site-nav-inner.html"), "utf8").trim();

const pages = [
  "blog.html",
  "blog-post.html",
  "case-studies.html",
  "claims-support-kenya.html",
  "corporate-insurance-services.html",
  "domestic-package-insurance.html",
  "how-claims-work.html",
  "logistics-insurance-advisory.html",
  "medical-insurance-advisory.html",
  "motor-insurance-mombasa.html",
  "resources.html",
  "sme-insurance-kenya.html"
];

const navPattern = /<nav id="main-nav" class="main-nav">[\s\S]*?<\/nav>/;
const footerPattern = /<footer[\s\S]*?<\/footer>/;

pages.forEach((file) => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, "utf8");
  html = html.replace(navPattern, `<nav id="main-nav" class="main-nav">\n        ${navInner.split("\n").join("\n        ")}\n      </nav>`);
  html = html.replace(footerPattern, footer);
  fs.writeFileSync(filePath, html, "utf8");
  console.log("Synced:", file);
});

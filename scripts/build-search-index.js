/**
 * Builds data/search-index.json from calculator registry + blog markdown.
 * Copies search assets and index into public/ for static export.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const matter = require("gray-matter");

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const DATA_DIR = path.join(ROOT, "data");
const PUBLIC_DATA_DIR = path.join(ROOT, "public/data");
const INDEX_PATH = path.join(DATA_DIR, "search-index.json");
const PUBLIC_INDEX_PATH = path.join(PUBLIC_DATA_DIR, "search-index.json");
const ASSETS_SRC = path.join(ROOT, "assets");
const ASSETS_PUBLIC = path.join(ROOT, "public/assets");

function ensureTrailingSlash(href) {
  if (!href || href.endsWith("/")) return href;
  return `${href}/`;
}

function readBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      const slug = String(data.slug ?? file.replace(/\.md$/, ""));
      const title = String(data.title ?? slug);
      const description = String(data.description ?? "");
      const group = String(data.category ?? "Guides");

      return {
        id: slug,
        type: "blog",
        category: "Blog Articles",
        group,
        title,
        description,
        href: ensureTrailingSlash(`/blog/${slug}`),
        tag: group,
        keywords: [group, "blog", "article"],
      };
    });
}

function readCalculators() {
  const result = spawnSync(
    "npx",
    ["tsx", path.join(__dirname, "search-index-calculators.ts")],
    { cwd: ROOT, encoding: "utf8", shell: true }
  );

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    throw new Error("Failed to extract calculator search entries");
  }

  return JSON.parse(result.stdout.trim());
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

function buildIndex() {
  const { items: calculators, popular } = readCalculators();
  const blogPosts = readBlogPosts();

  const calculatorItems = calculators.map((item) => ({
    ...item,
    href: ensureTrailingSlash(item.href),
  }));

  const blogItems = blogPosts.map((item) => ({
    ...item,
    href: ensureTrailingSlash(item.href),
  }));

  const popularItems = popular.map((item) => ({
    ...item,
    href: ensureTrailingSlash(item.href),
  }));

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    popular: popularItems,
    items: [...calculatorItems, ...blogItems],
  };

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  fs.writeFileSync(PUBLIC_INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  copyDir(ASSETS_SRC, ASSETS_PUBLIC);

  console.log(
    `✅ Search index: ${calculatorItems.length} calculators, ${blogItems.length} blog posts → data/search-index.json`
  );
}

buildIndex();

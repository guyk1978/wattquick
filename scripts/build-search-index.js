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
        href: ensureTrailingSlash(`/articles/${slug}`),
        tag: group,
        keywords: [group, "blog", "article", "articles"],
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

function readSitePages() {
  return [
    {
      id: "calculators",
      type: "page",
      category: "Site",
      group: "Browse",
      title: "All Calculators",
      description: "Browse every battery, solar, EV, and power micro-calculator.",
      href: "/calculators/",
      tag: "Directory",
      keywords: ["all tools", "calculator directory", "browse calculators"],
    },
    {
      id: "dashboard",
      type: "page",
      category: "Site",
      group: "Dashboard",
      title: "Command Center",
      description: "Interactive energy flow dashboard with scenario-based calculators.",
      href: "/dashboard/",
      tag: "Dashboard",
      keywords: ["command center", "energy flow", "dashboard"],
    },
    {
      id: "articles",
      type: "page",
      category: "Site",
      group: "Content",
      title: "Articles",
      description: "Expert guides on batteries, solar, EV charging, and home energy.",
      href: "/articles/",
      tag: "Articles",
      keywords: ["articles", "guides", "blog"],
    },
    {
      id: "favorites",
      type: "page",
      category: "Site",
      group: "Personal",
      title: "Favorite Calculators",
      description: "Your starred tools saved in this browser.",
      href: "/favorites/",
      tag: "Favorites",
      keywords: ["saved tools", "starred calculators", "favorites"],
    },
    {
      id: "projects",
      type: "page",
      category: "Site",
      group: "Personal",
      title: "My Projects",
      description: "Save calculator runs and notes into local project workspaces.",
      href: "/projects/",
      tag: "Projects",
      keywords: ["saved projects", "project workspace"],
    },
    {
      id: "about",
      type: "page",
      category: "Site",
      group: "Company",
      title: "About WattQuick",
      description: "Fast, focused tools for anyone who works with batteries and power.",
      href: "/about/",
      tag: "About",
      keywords: ["about", "company", "wattquick"],
    },
    {
      id: "contact",
      type: "page",
      category: "Site",
      group: "Company",
      title: "Contact",
      description: "Questions, feedback, or calculator suggestions.",
      href: "/contact/",
      tag: "Contact",
      keywords: ["email", "support", "contact"],
    },
    {
      id: "privacy",
      type: "page",
      category: "Site",
      group: "Legal",
      title: "Privacy Policy",
      description: "How WattQuick handles data when you use our calculators.",
      href: "/privacy/",
      tag: "Legal",
      keywords: ["privacy", "cookies", "data"],
    },
    {
      id: "terms",
      type: "page",
      category: "Site",
      group: "Legal",
      title: "Terms of Service",
      description: "Terms of use for WattQuick battery and power micro-calculators.",
      href: "/terms/",
      tag: "Legal",
      keywords: ["terms", "legal", "service"],
    },
  ];
}

function buildIndex() {
  const { items: calculators, popular } = readCalculators();
  const blogPosts = readBlogPosts();
  const sitePages = readSitePages();

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

  const siteItems = sitePages.map((item) => ({
    ...item,
    href: ensureTrailingSlash(item.href),
  }));

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    popular: popularItems,
    items: [...calculatorItems, ...blogItems, ...siteItems],
  };

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  fs.writeFileSync(PUBLIC_INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  copyDir(ASSETS_SRC, ASSETS_PUBLIC);

  console.log(
    `✅ Search index: ${calculatorItems.length} calculators, ${blogItems.length} blog posts, ${siteItems.length} site pages → data/search-index.json`
  );
}

buildIndex();

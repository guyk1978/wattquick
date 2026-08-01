/**
 * Validates sitemap entries for hierarchical tool URLs and category coverage.
 * Run: npm run validate:sitemap
 */
import { CALCULATOR_SLUGS } from "../src/data/calculators";
import {
  buildSitemapEntries,
  canonicalizeSitemapUrl,
  SITEMAP_CATEGORY_COUNT,
  SITEMAP_STATIC_PATHS,
} from "../src/lib/sitemap-entries";
import {
  GUIDE_LANDING_SLUGS,
  getAllGuideLandings,
} from "../src/lib/calculators/calculator-landings-registry";
import { getCalculatorHref } from "../src/lib/calculator-routes";
import { getAllCalculatorMeta } from "../src/lib/calculators/registry";
import { getAllBlogPosts } from "../src/lib/blog/posts";
import { SITE_URL } from "../src/lib/seo";

const ABSOLUTE_TOOL_PATTERN =
  /^https:\/\/wattquick\.com\/tools\/[a-z0-9-]+\/[a-z0-9-]+\/$/;
const ABSOLUTE_GUIDE_PATTERN =
  /^https:\/\/wattquick\.com\/landing\/[a-z0-9-]+\/$/;
const ABSOLUTE_CATEGORY_PATTERN =
  /^https:\/\/wattquick\.com\/tools\/[a-z0-9-]+\/$/;
const ABSOLUTE_ARTICLE_PATTERN =
  /^https:\/\/wattquick\.com\/articles\/[a-z0-9-]+\/$/;
const LEGACY_FLAT_TOOL_PATTERN =
  /^https:\/\/wattquick\.com\/[a-z0-9-]+\/$/;

let errors = 0;

function fail(message: string) {
  console.error(`✗ ${message}`);
  errors += 1;
}

function pass(message: string) {
  console.log(`✓ ${message}`);
}

const entries = buildSitemapEntries();
const urls = entries.map((entry) => entry.url);

// Absolute, clean URLs only
for (const url of urls) {
  if (!url.startsWith("https://wattquick.com/")) {
    fail(`Non-canonical absolute URL: ${url}`);
  }
  if (url.includes("?") || url.includes("#")) {
    fail(`Query or hash in sitemap URL: ${url}`);
  }
  if (url !== canonicalizeSitemapUrl(url)) {
    fail(`URL failed canonicalize round-trip: ${url}`);
  }
  if (url.includes("/tools/tools/")) {
    fail(`Double /tools/ in sitemap: ${url}`);
  }
  if (url.includes("/category/")) {
    fail(`Obsolete /category/ path in sitemap: ${url}`);
  }
  if (url.includes("/blog/")) {
    fail(`Legacy /blog/ path in sitemap (use /articles/): ${url}`);
  }
  if (url.includes("/tools/calculators/")) {
    fail(`Legacy /tools/calculators/ shortcut in sitemap: ${url}`);
  }
  if (!url.endsWith("/")) {
    fail(`Missing trailing slash: ${url}`);
  }
}
pass(`All ${urls.length} sitemap URLs are clean canonical https://wattquick.com/ links`);

// Unique URLs
const unique = new Set(urls);
if (unique.size !== urls.length) {
  fail(`Duplicate sitemap URLs: ${urls.length - unique.size} duplicates`);
} else {
  pass("No duplicate sitemap URLs");
}

// Category pages (exactly /tools/{category}/ — not tool depth)
const categoryUrls = urls.filter((url) => {
  if (!ABSOLUTE_CATEGORY_PATTERN.test(url)) return false;
  // Exclude tool URLs that also match a looser pattern — tool pattern is longer
  return !ABSOLUTE_TOOL_PATTERN.test(url);
});
const guideHrefs = new Set(
  getAllGuideLandings().map((landing) => canonicalizeSitemapUrl(landing.href))
);
const guideUrls = urls.filter((url) => ABSOLUTE_GUIDE_PATTERN.test(url));
const toolUrls = urls.filter((url) => ABSOLUTE_TOOL_PATTERN.test(url));
const articleUrls = urls.filter((url) => ABSOLUTE_ARTICLE_PATTERN.test(url));

if (categoryUrls.length !== SITEMAP_CATEGORY_COUNT) {
  fail(
    `Expected ${SITEMAP_CATEGORY_COUNT} category pages, found ${categoryUrls.length}`
  );
} else {
  pass(`${categoryUrls.length} category pages at /tools/{category-slug}/`);
}

// Tool pages — must match getCalculatorHref canonical form
if (toolUrls.length !== CALCULATOR_SLUGS.length) {
  fail(
    `Expected ${CALCULATOR_SLUGS.length} tool pages, found ${toolUrls.length}`
  );
} else {
  pass(`${toolUrls.length} tool pages at /tools/{category-slug}/{tool-slug}/`);
}

const expectedToolUrls = new Set(
  getAllCalculatorMeta().map((meta) =>
    canonicalizeSitemapUrl(getCalculatorHref(meta.id, meta.category))
  )
);
for (const url of toolUrls) {
  if (!expectedToolUrls.has(url)) {
    fail(`Tool URL in sitemap is not canonical registry href: ${url}`);
  }
}
for (const expected of expectedToolUrls) {
  if (!toolUrls.includes(expected)) {
    fail(`Missing canonical tool URL in sitemap: ${expected}`);
  }
}
pass("Every sitemap tool URL matches /tools/{category}/{slug}/ registry hrefs");

// Guide landing pages
if (guideUrls.length !== GUIDE_LANDING_SLUGS.length) {
  fail(
    `Expected ${GUIDE_LANDING_SLUGS.length} guide landing pages, found ${guideUrls.length}`
  );
} else {
  pass(`${guideUrls.length} guide pages at /landing/{slug}/`);
}

for (const landing of getAllGuideLandings()) {
  const expected = canonicalizeSitemapUrl(landing.href);
  if (!guideUrls.includes(expected)) {
    fail(`Missing guide landing page in sitemap: ${expected}`);
  }
  if (!guideHrefs.has(expected)) {
    fail(`Guide URL not from registry: ${expected}`);
  }
}
pass("Every guide landing href is present in the sitemap");

// Articles (canonical) — no /blog/{slug}
const posts = getAllBlogPosts();
if (articleUrls.length !== posts.length) {
  fail(
    `Expected ${posts.length} article pages, found ${articleUrls.length}`
  );
} else {
  pass(`${articleUrls.length} article pages at /articles/{slug}/`);
}

for (const post of posts) {
  const expected = canonicalizeSitemapUrl(`/articles/${post.slug}`);
  if (!articleUrls.includes(expected)) {
    fail(`Missing article in sitemap: ${expected}`);
  }
}
pass("Every blog post is listed once under /articles/{slug}/");

// No legacy flat tool paths
const staticPaths = new Set(
  SITEMAP_STATIC_PATHS.map((path) => canonicalizeSitemapUrl(path))
);

const legacyFlat = urls.filter(
  (url) => LEGACY_FLAT_TOOL_PATTERN.test(url) && !staticPaths.has(url)
);
for (const url of legacyFlat) {
  const slug = url.replace(`${SITE_URL}/`, "").replace(/\//g, "");
  if (CALCULATOR_SLUGS.includes(slug as (typeof CALCULATOR_SLUGS)[number])) {
    fail(`Obsolete flat tool path in sitemap: ${url}`);
  }
}
pass("No obsolete flat tool paths in sitemap");

// Sample hierarchical path
const sample = urls.find((url) =>
  url.endsWith("/tools/solar-power/solar-inverter-efficiency/")
);
if (!sample) {
  fail("Missing sample hierarchical tool URL for solar-inverter-efficiency");
} else {
  pass(`Sample tool URL present: ${sample}`);
}

// Static hubs present
for (const path of SITEMAP_STATIC_PATHS) {
  const expected = canonicalizeSitemapUrl(path);
  if (!urls.includes(expected)) {
    fail(`Missing static hub in sitemap: ${expected}`);
  }
}
pass("All static hub paths are present");

if (errors > 0) {
  console.error(`\n${errors} sitemap validation error(s)`);
  process.exit(1);
}

console.log(`\nSitemap validation passed (${urls.length} total URLs).`);

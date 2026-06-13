/**
 * Validates sitemap entries for hierarchical tool URLs and category coverage.
 * Run: npm run validate:sitemap
 */
import { CALCULATOR_SLUGS } from "../src/data/calculators";
import {
  buildSitemapEntries,
  SITEMAP_CATEGORY_COUNT,
  SITEMAP_STATIC_PATHS,
} from "../src/lib/sitemap-entries";
import { getAllCalculatorMeta } from "../src/lib/calculators/registry";
import { SITE_URL } from "../src/lib/seo";

const ABSOLUTE_TOOL_PATTERN =
  /^https:\/\/wattquick\.com\/tools\/[a-z0-9-]+\/[a-z0-9-]+\/$/;
const ABSOLUTE_CATEGORY_PATTERN =
  /^https:\/\/wattquick\.com\/tools\/[a-z0-9-]+\/$/;
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

// Absolute URLs only
for (const url of urls) {
  if (!url.startsWith("https://")) {
    fail(`Non-absolute URL: ${url}`);
  }
  if (url.includes("/tools/tools/")) {
    fail(`Double /tools/ in sitemap: ${url}`);
  }
  if (url.includes("/category/")) {
    fail(`Obsolete /category/ path in sitemap: ${url}`);
  }
}
pass(`All ${urls.length} sitemap URLs are absolute https:// links`);

// Unique URLs
const unique = new Set(urls);
if (unique.size !== urls.length) {
  fail(`Duplicate sitemap URLs: ${urls.length - unique.size} duplicates`);
} else {
  pass("No duplicate sitemap URLs");
}

// Category pages
const categoryUrls = urls.filter((url) => ABSOLUTE_CATEGORY_PATTERN.test(url));
const toolUrls = urls.filter((url) => ABSOLUTE_TOOL_PATTERN.test(url));

if (categoryUrls.length !== SITEMAP_CATEGORY_COUNT) {
  fail(
    `Expected ${SITEMAP_CATEGORY_COUNT} category pages, found ${categoryUrls.length}`
  );
} else {
  pass(`${categoryUrls.length} category pages at /tools/{category-slug}/`);
}

// Tool pages
if (toolUrls.length !== CALCULATOR_SLUGS.length) {
  fail(
    `Expected ${CALCULATOR_SLUGS.length} tool pages, found ${toolUrls.length}`
  );
} else {
  pass(`${toolUrls.length} tool pages at /tools/{category-slug}/{tool-slug}/`);
}

// Registry alignment
const metaByHref = new Map(
  getAllCalculatorMeta().map((meta) => [`${SITE_URL}${meta.href}`, meta.id])
);
for (const url of toolUrls) {
  if (!metaByHref.has(url)) {
    fail(`Tool URL in sitemap not in registry: ${url}`);
  }
}
pass("Every sitemap tool URL matches registry href");

// No legacy flat tool paths
const staticPaths = new Set(
  SITEMAP_STATIC_PATHS.map((path) =>
    path === "" ? `${SITE_URL}/` : `${SITE_URL}${path}/`
  )
);
staticPaths.add(`${SITE_URL}/blog/`);

const legacyFlat = urls.filter(
  (url) =>
    LEGACY_FLAT_TOOL_PATTERN.test(url) &&
    !staticPaths.has(url) &&
    !url.endsWith("/blog/")
);
for (const url of legacyFlat) {
  const slug = url.replace(SITE_URL, "").replace(/\//g, "");
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

if (errors > 0) {
  console.error(`\n${errors} sitemap validation error(s)`);
  process.exit(1);
}

console.log(`\nSitemap validation passed (${urls.length} total URLs).`);

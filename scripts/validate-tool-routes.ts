/**
 * Sanity check for hierarchical tool URLs and legacy redirects.
 * Run: npm run validate:routes
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CALCULATOR_SLUGS } from "../src/data/calculators";
import { getCategorySeoSlug } from "../src/lib/category-routes";
import { getCalculatorHref } from "../src/lib/calculator-routes";
import {
  getAllCalculatorMeta,
  getCalculatorMeta,
} from "../src/lib/calculators/registry";

const HREF_PATTERN = /^\/tools\/[a-z0-9-]+\/[a-z0-9-]+\/$/;
const REDIRECTS_PATH = join(process.cwd(), "public/_redirects");

let errors = 0;

function fail(message: string) {
  console.error(`✗ ${message}`);
  errors += 1;
}

function pass(message: string) {
  console.log(`✓ ${message}`);
}

// 1. Registry hrefs
const allMeta = getAllCalculatorMeta();
for (const meta of allMeta) {
  if (meta.href.includes("/tools/tools/")) {
    fail(`Double /tools/ prefix for ${meta.id}: ${meta.href}`);
  }
  if (!HREF_PATTERN.test(meta.href)) {
    fail(`Invalid href for ${meta.id}: ${meta.href}`);
  }
  const expected = getCalculatorHref(meta.id, meta.category);
  if (meta.href !== expected) {
    fail(`Href mismatch for ${meta.id}: got ${meta.href}, expected ${expected}`);
  }
}
pass(`All ${allMeta.length} calculator hrefs use /tools/{category}/{tool}/`);

// 2. Slug coverage
if (allMeta.length !== CALCULATOR_SLUGS.length) {
  fail(`Meta count ${allMeta.length} !== slug count ${CALCULATOR_SLUGS.length}`);
} else {
  pass("Registry covers every calculator slug");
}

// 3. Legacy redirects
const redirects = readFileSync(REDIRECTS_PATH, "utf8");
const redirectLines = redirects
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#") && !line.includes("*"));

const legacyRedirects = new Map<string, string>();
for (const line of redirectLines) {
  const [from, to] = line.split(/\s+/);
  if (!from || !to) continue;
  if (from.startsWith("/category/")) continue;
  if (from.startsWith("/projects/")) continue;
  const fromNorm = from.endsWith("/") ? from : `${from}/`;
  legacyRedirects.set(fromNorm, to);
}

for (const slug of CALCULATOR_SLUGS) {
  const meta = getCalculatorMeta(slug);
  const legacyPath = `/${slug}/`;
  const target = legacyRedirects.get(legacyPath);
  if (!target) {
    fail(`Missing legacy redirect for ${legacyPath}`);
    continue;
  }
  if (target.includes("/tools/tools/")) {
    fail(`Redirect target has double /tools/ for ${legacyPath} → ${target}`);
  }
  if (target !== meta.href) {
    fail(`Redirect target mismatch for ${legacyPath}: ${target} ≠ ${meta.href}`);
  }
}
pass(`Legacy redirects defined for all ${CALCULATOR_SLUGS.length} tools`);

// 4. Category slug alignment sample
const sample = getCalculatorMeta("solar-inverter-efficiency");
if (sample.href !== "/tools/solar-power/solar-inverter-efficiency/") {
  fail(`Sample solar tool href wrong: ${sample.href}`);
} else {
  pass("Sample: /solar-inverter-efficiency/ → /tools/solar-power/solar-inverter-efficiency/");
}

void getCategorySeoSlug;

if (errors > 0) {
  console.error(`\n${errors} validation error(s)`);
  process.exit(1);
}

console.log("\nRoute validation passed.");

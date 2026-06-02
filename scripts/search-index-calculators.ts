/**
 * Emits calculator search entries as JSON on stdout (used by build-search-index.js).
 */
import { calculators } from "../src/data/calculators";
import { CALCULATOR_CATEGORY_LABELS } from "../src/data/calculator-types";
import { POPULAR_CALCULATOR_SLUGS } from "../src/data/popular-calculators";

const POPULAR_SLUGS = POPULAR_CALCULATOR_SLUGS;

const items = calculators.map((calc) => ({
  id: calc.slug,
  type: "calculator" as const,
  category: "Calculators",
  group: CALCULATOR_CATEGORY_LABELS[calc.category],
  title: calc.title,
  description: calc.description,
  href: calc.href,
  tag: calc.tag,
  keywords: calc.keywords ?? [],
}));

const popular = POPULAR_SLUGS.map((slug) => {
  const item = items.find((entry) => entry.id === slug);
  if (!item) {
    throw new Error(`Popular calculator slug not found: ${slug}`);
  }
  return item;
});

process.stdout.write(JSON.stringify({ items, popular }));

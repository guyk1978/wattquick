import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";

/** SEO-friendly URL slug for each calculator category (used under /tools/). */
export const CATEGORY_SEO_SLUGS: Record<CalculatorCategory, string> = {
  convert: "unit-conversion",
  battery: "battery-calculators",
  power: "electrical-power",
  solar: "solar-power",
  ev: "ev-charging",
  appliance: "home-appliances",
  sizing: "battery-sizing",
  cost: "energy-cost",
  backup: "backup-power",
  "commercial-ev": "commercial-ev",
  "rv-marine": "rv-marine-power",
  tou: "time-of-use-rates",
  "green-home": "green-home-efficiency",
  pool: "pool-power",
  ebike: "e-bike",
  escooter: "e-scooter",
};

const SEO_SLUG_TO_CATEGORY = Object.fromEntries(
  (Object.entries(CATEGORY_SEO_SLUGS) as [CalculatorCategory, string][]).map(
    ([category, slug]) => [slug, category]
  )
) as Record<string, CalculatorCategory>;

export const CATEGORY_SEO_SLUG_LIST = Object.values(CATEGORY_SEO_SLUGS);

export function getCategorySeoSlug(category: CalculatorCategory): string {
  return CATEGORY_SEO_SLUGS[category];
}

export function getCategoryPageHref(category: CalculatorCategory): string {
  return `/tools/${getCategorySeoSlug(category)}/`;
}

export function getCategoryFromSeoSlug(
  slug: string
): CalculatorCategory | undefined {
  return SEO_SLUG_TO_CATEGORY[slug];
}

export function isCategorySeoSlug(slug: string): slug is string {
  return slug in SEO_SLUG_TO_CATEGORY;
}

export function getCategoryPageTitle(category: CalculatorCategory): string {
  return `${CALCULATOR_CATEGORY_LABELS[category]} Calculators`;
}

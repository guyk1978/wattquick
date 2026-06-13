import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorMeta } from "@/lib/calculators";
import { absoluteUrl } from "@/lib/seo";

export type CalculatorApplicationCategory = "Finance" | "Utility" | "Engineering";

const APPLICATION_CATEGORY_BY_CALCULATOR: Record<
  CalculatorCategory,
  CalculatorApplicationCategory
> = {
  cost: "Finance",
  tou: "Finance",
  appliance: "Utility",
  "green-home": "Utility",
  pool: "Utility",
  backup: "Utility",
  convert: "Engineering",
  battery: "Engineering",
  power: "Engineering",
  solar: "Engineering",
  ev: "Engineering",
  sizing: "Engineering",
  "commercial-ev": "Engineering",
  "rv-marine": "Engineering",
  ebike: "Engineering",
  escooter: "Engineering",
};

export interface CalculatorSoftwareApplicationJsonLd {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  applicationCategory: CalculatorApplicationCategory;
  operatingSystem: "Web";
  url: string;
  offers: {
    "@type": "Offer";
    price: "0";
    priceCurrency: "USD";
  };
  isAccessibleForFree: true;
}

export function getCalculatorApplicationCategory(
  category: CalculatorCategory
): CalculatorApplicationCategory {
  return APPLICATION_CATEGORY_BY_CALCULATOR[category];
}

export function buildCalculatorSoftwareApplicationJsonLd(
  calculator: CalculatorMeta
): CalculatorSoftwareApplicationJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.title,
    description: calculator.description,
    applicationCategory: getCalculatorApplicationCategory(calculator.category),
    operatingSystem: "Web",
    url: absoluteUrl(calculator.href),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
  };
}

/** Escape `<` in serialized JSON-LD to prevent script-tag breakout (Next.js recommendation). */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

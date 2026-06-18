import type {
  CalculatorSeoContent,
  CalculatorCategory,
} from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators/types";

export interface GuideLandingFaq {
  q: string;
  a: string;
}

/** SEO + editorial blocks stored in each [tool]Landings.ts registry. */
export interface GuideLandingContent {
  metaDescription: string;
  heroSubtitle: string;
  benefits: string[];
  howItWorks: string[];
  faq: GuideLandingFaq[];
  technicalSpecs: string[];
}

export interface GuideLandingDefinition {
  slug: string;
  calculatorId: CalculatorId;
  calculatorCategory: CalculatorCategory;
  /** Dedicated guide URL under /landing/{slug}/. */
  href: string;
  /** Canonical interactive calculator URL under /tools/{category}/{slug}/. */
  toolHref: string;
  /** Label for the sole tool → guide link in the calculator UI. */
  guideLinkLabel: string;
  title: string;
  description: string;
  keywords: string[];
  seo: CalculatorSeoContent;
  content: GuideLandingContent;
}

export interface GuideLandingFooterResource {
  slug: string;
  href: string;
  label: string;
}

export function getGuideLandingHref(slug: string): string {
  return `/landing/${slug}/`;
}

export function getResourceGuideHref(slug: string): string {
  return `/tools/calculators/${slug}/`;
}

/** Dedicated calculator-only shortcut under /tools/calculators/{slug}/ */
export function getCalculatorToolHref(slug: string): string {
  return getResourceGuideHref(slug);
}

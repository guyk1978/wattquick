import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import {
  CALCULATOR_ORDER,
  getCalculatorMeta,
  isCalculatorId,
  type CalculatorId,
} from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

/** Only pre-rendered calculator slugs; unknown slugs return 404 at build time. */
export const dynamicParams = false;

/** Force static HTML generation (Cloudflare Pages / next-on-pages). */
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * All calculator slugs from src/lib/calculators/registry.ts (CALCULATOR_ORDER).
 * Keep in sync with DEFINITIONS — every slug must be listed here for static export.
 */
export function generateStaticParams(): { slug: CalculatorId }[] {
  return CALCULATOR_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isCalculatorId(slug)) {
    return {};
  }

  const meta = getCalculatorMeta(slug);
  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path: meta.href,
  });
}

export default async function CalculatorRoutePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isCalculatorId(slug)) {
    notFound();
  }

  return <CalculatorPage id={slug} />;
}

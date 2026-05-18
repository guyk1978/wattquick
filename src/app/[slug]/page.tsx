import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import {
  getCalculatorMeta,
  isCalculatorId,
  type CalculatorId,
} from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

/** Only pre-rendered calculator slugs; unknown slugs return 404 at build time. */
export const dynamicParams = false;

/** Force static HTML generation (Cloudflare Pages static export). */
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Calculator slugs from data/calculators.ts (single source of truth). */
export function generateStaticParams(): { slug: CalculatorId }[] {
  return CALCULATOR_SLUGS.map((slug) => ({ slug }));
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
    keywords: meta.keywords,
  });
}

export default async function CalculatorRoutePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isCalculatorId(slug)) {
    notFound();
  }

  return <CalculatorPage id={slug} />;
}

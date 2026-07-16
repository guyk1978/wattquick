import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryGridLanding } from "@/components/grid-modal/category-grid-landing";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
} from "@/data/calculator-types";
import { getCategorySeoContent } from "@/data/category-seo-content";
import { getCalculatorsByCategory } from "@/lib/calculators";
import {
  CATEGORY_SEO_SLUG_LIST,
  getCategoryFromSeoSlug,
  getCategoryPageTitle,
  isCategorySeoSlug,
} from "@/lib/category-routes";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORY_SEO_SLUG_LIST.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  if (!isCategorySeoSlug(slug)) return {};

  const category = getCategoryFromSeoSlug(slug)!;
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const description = CALCULATOR_CATEGORY_DESCRIPTIONS[category];
  const intro = getCategorySeoContent(category).paragraphs[0];

  return createPageMetadata({
    title: getCategoryPageTitle(category),
    description: `Free ${label.toLowerCase()} calculators: ${description}. ${intro}`,
    path: `/tools/${slug}`,
    keywords: [
      `${label.toLowerCase()} calculator`,
      `${label.toLowerCase()} tools`,
      "battery calculator",
      "power calculator",
      "WattQuick",
    ],
  });
}

export default async function ToolsCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  if (!isCategorySeoSlug(slug)) notFound();

  const category = getCategoryFromSeoSlug(slug)!;
  const calculators = getCalculatorsByCategory(category);

  return (
    <CategoryGridLanding category={category} calculators={calculators} />
  );
}

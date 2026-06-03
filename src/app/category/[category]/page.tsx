import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CategoryCalculatorGrid } from "@/components/category-calculator-grid";
import { PageHeader, PageShell } from "@/components/page-shell";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  getCalculatorsByCategory,
} from "@/lib/calculators";
import { isCalculatorCategory } from "@/lib/calculators/categories";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = { params: Promise<{ category: string }> };

const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  tariffs: "tou",
};

export function generateStaticParams() {
  const categories = Object.keys(CALCULATOR_CATEGORY_LABELS);
  const legacy = Object.keys(LEGACY_CATEGORY_REDIRECTS);
  return [...categories, ...legacy].map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const resolved = LEGACY_CATEGORY_REDIRECTS[category] ?? category;
  if (!isCalculatorCategory(resolved)) return {};

  const label = CALCULATOR_CATEGORY_LABELS[resolved];
  const description = CALCULATOR_CATEGORY_DESCRIPTIONS[resolved];

  return createPageMetadata({
    title: `${label} Calculators`,
    description: `Free ${label.toLowerCase()} calculators: ${description}. Instant results on WattQuick.`,
    path: `/category/${resolved}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const legacyTarget = LEGACY_CATEGORY_REDIRECTS[category];
  if (legacyTarget) {
    permanentRedirect(`/category/${legacyTarget}/`);
  }
  if (!isCalculatorCategory(category)) notFound();

  const calculators = getCalculatorsByCategory(category);
  const label = CALCULATOR_CATEGORY_LABELS[category];

  return (
    <PageShell className="max-w-5xl">
      <Link
        href="/calculators"
        className="mb-6 inline-block text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← All calculators
      </Link>
      <PageHeader
        title={`${label} calculators`}
        description={CALCULATOR_CATEGORY_DESCRIPTIONS[category]}
      />
      <CategoryCalculatorGrid calculators={calculators} />
    </PageShell>
  );
}

import { permanentRedirect, notFound } from "next/navigation";
import { CALCULATOR_CATEGORY_LABELS } from "@/data/calculator-types";
import { getCategoryPageHref } from "@/lib/category-routes";
import { isCalculatorCategory } from "@/lib/calculators/categories";

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

/** Legacy /category/* URLs redirect to /tools/* SEO landing pages. */
export default async function LegacyCategoryRedirectPage({ params }: PageProps) {
  const { category } = await params;
  const resolved = LEGACY_CATEGORY_REDIRECTS[category] ?? category;

  if (!isCalculatorCategory(resolved)) notFound();

  permanentRedirect(getCategoryPageHref(resolved));
}

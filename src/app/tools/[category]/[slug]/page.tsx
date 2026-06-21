import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { getCalculatorIdFromToolPath } from "@/lib/calculator-routes";
import {
  getCalculatorMeta,
  isCalculatorId,
  type CalculatorId,
} from "@/lib/calculators";
import { getCategorySeoSlug } from "@/lib/category-routes";
import { getCalculatorPageMetadata } from "@/lib/calculator-share";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams(): { category: string; slug: CalculatorId }[] {
  return CALCULATOR_SLUGS.map((slug) => {
    const meta = getCalculatorMeta(slug);
    return {
      category: getCategorySeoSlug(meta.category),
      slug,
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const id = getCalculatorIdFromToolPath(category, slug);
  if (!id) return {};

  const meta = getCalculatorMeta(id);
  return getCalculatorPageMetadata(id, {
    title: meta.title,
    description: meta.description,
    path: meta.href,
    keywords: meta.keywords,
  });
}

export default async function ToolRoutePage({ params }: PageProps) {
  const { category, slug } = await params;
  const id = getCalculatorIdFromToolPath(category, slug);

  if (!id || !isCalculatorId(id)) {
    notFound();
  }

  return <CalculatorPage id={id} />;
}

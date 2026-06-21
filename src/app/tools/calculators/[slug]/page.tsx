import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorToolPage } from "@/components/calculator/calculator-tool-page";
import {
  CALCULATOR_TOOL_SLUGS,
  getCalculatorIdForToolSlug,
  isCalculatorToolSlug,
  type CalculatorToolSlug,
} from "@/lib/calculators/calculator-landings-registry";
import { getCalculatorMeta, isCalculatorId } from "@/lib/calculators";
import { getCalculatorToolHref } from "@/lib/calculators/landing-types";
import { getCalculatorPageMetadata } from "@/lib/calculator-share";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: CalculatorToolSlug }[] {
  return CALCULATOR_TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isCalculatorToolSlug(slug)) return {};

  const calculatorId = getCalculatorIdForToolSlug(slug);
  if (!calculatorId) return {};

  const meta = getCalculatorMeta(calculatorId);

  return getCalculatorPageMetadata(calculatorId, {
    title: meta.title,
    description: meta.description,
    path: getCalculatorToolHref(slug),
    keywords: meta.keywords,
  });
}

export default async function ToolsCalculatorsRoutePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isCalculatorToolSlug(slug)) {
    notFound();
  }

  const calculatorId = getCalculatorIdForToolSlug(slug);
  if (!calculatorId || !isCalculatorId(calculatorId)) {
    notFound();
  }

  return <CalculatorToolPage id={calculatorId} />;
}

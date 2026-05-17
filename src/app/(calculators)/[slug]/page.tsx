import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import {
  CALCULATOR_ORDER,
  getCalculatorMeta,
  isCalculatorId,
} from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CALCULATOR_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCalculatorId(slug)) return {};

  const meta = getCalculatorMeta(slug);
  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path: meta.href,
  });
}

export default async function CalculatorRoutePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isCalculatorId(slug)) notFound();

  return <CalculatorPage id={slug} />;
}

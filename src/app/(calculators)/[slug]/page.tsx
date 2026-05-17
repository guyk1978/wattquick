import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import {
  getAllCalculatorMeta,
  getCalculatorMeta,
  isCalculatorId,
} from "@/lib/calculators";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCalculatorMeta().map((calc) => ({ slug: calc.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCalculatorId(slug)) return {};

  const meta = getCalculatorMeta(slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | WattQuick`,
      description: meta.description,
    },
  };
}

export default async function CalculatorRoutePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isCalculatorId(slug)) notFound();

  return <CalculatorPage id={slug} />;
}

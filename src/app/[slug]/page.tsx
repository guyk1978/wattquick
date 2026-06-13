import { permanentRedirect } from "next/navigation";
import { notFound } from "next/navigation";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import {
  getCalculatorMeta,
  isCalculatorId,
  type CalculatorId,
} from "@/lib/calculators";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: CalculatorId }[] {
  return CALCULATOR_SLUGS.map((slug) => ({ slug }));
}

/** Legacy flat tool URLs redirect to /tools/{category}/{tool}/ */
export default async function LegacyCalculatorRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isCalculatorId(slug)) {
    notFound();
  }

  const meta = getCalculatorMeta(slug);
  permanentRedirect(meta.href);
}

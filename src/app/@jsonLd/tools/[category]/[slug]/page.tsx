import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { getCalculatorIdFromToolPath } from "@/lib/calculator-routes";
import {
  getCalculatorMeta,
  type CalculatorId,
} from "@/lib/calculators";
import { getCategorySeoSlug } from "@/lib/category-routes";
import { buildCalculatorSoftwareApplicationJsonLd } from "@/lib/calculator-json-ld";

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

/** Parallel route slot: injects per-tool JSON-LD into the root document head. */
export default async function CalculatorJsonLdPage({ params }: PageProps) {
  const { category, slug } = await params;
  const id = getCalculatorIdFromToolPath(category, slug);

  if (!id) {
    notFound();
  }

  const meta = getCalculatorMeta(id);
  const jsonLd = buildCalculatorSoftwareApplicationJsonLd(meta);

  return <JsonLdScript data={jsonLd} />;
}

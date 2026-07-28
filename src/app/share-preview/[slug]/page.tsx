import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VizShareFrame } from "@/components/share-preview/viz-share-frame";
import {
  getCalculatorMeta,
  isCalculatorId,
  type CalculatorId,
} from "@/lib/calculators";
import {
  CALCULATOR_VIZ_ID_LIST,
  hasCalculatorViz,
} from "@/lib/calculator-viz-ids";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: CalculatorId }[] {
  return CALCULATOR_VIZ_ID_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCalculatorId(slug) || !hasCalculatorViz(slug)) {
    return createPageMetadata({
      title: "Share preview",
      description: "Internal VIZ share capture surface",
      path: `/share-preview/${slug}`,
      noIndex: true,
    });
  }

  const meta = getCalculatorMeta(slug);
  return createPageMetadata({
    title: `${meta.title} — VIZ share preview`,
    description: meta.description,
    path: `/share-preview/${slug}`,
    noIndex: true,
  });
}

/**
 * Headless capture route for OG/Twitter images.
 * Playwright screenshots `[data-share-capture]` via `npm run generate:share-images`.
 */
export default async function SharePreviewPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isCalculatorId(slug) || !hasCalculatorViz(slug)) {
    notFound();
  }

  return (
    <div className="viz-share-preview-page">
      <VizShareFrame id={slug} />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideLandingPage } from "@/components/landing/guide-landing-page";
import {
  getGuideLanding,
  GUIDE_LANDING_SLUGS,
  isGuideLandingSlug,
  type GuideLandingSlug,
} from "@/lib/calculators/calculator-landings-registry";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: GuideLandingSlug }[] {
  return GUIDE_LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isGuideLandingSlug(slug)) return {};

  const landing = getGuideLanding(slug);

  return createPageMetadata({
    title: landing.title,
    description: landing.content.metaDescription,
    path: landing.href,
    keywords: landing.keywords,
  });
}

export default async function GuideLandingRoutePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isGuideLandingSlug(slug)) {
    notFound();
  }

  return <GuideLandingPage landing={getGuideLanding(slug)} />;
}

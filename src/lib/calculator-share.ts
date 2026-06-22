import type { Metadata } from "next";
import {
  calculatorShareData,
  type CalculatorShareEntry,
} from "@/constants/calculatorShareData";
import type { CalculatorId } from "@/lib/calculators";
import { absoluteAssetUrl, createPageMetadata, SITE_NAME } from "@/lib/seo";

export function getCalculatorShareData(
  id: CalculatorId
): CalculatorShareEntry | null {
  return calculatorShareData[id] ?? null;
}

export function hasCalculatorShareData(id: CalculatorId): boolean {
  return getCalculatorShareData(id) != null;
}

export function resolveCalculatorShareImageUrl(imageUrl: string): string {
  return absoluteAssetUrl(imageUrl);
}

export function getCalculatorShareTitle(
  id: CalculatorId,
  fallbackTitle: string
): string {
  return getCalculatorShareData(id)?.title ?? fallbackTitle;
}

export function getCalculatorShareDescription(
  id: CalculatorId,
  fallback = "Try this free calculator on WattQuick"
): string {
  return getCalculatorShareData(id)?.description ?? fallback;
}

/** Server metadata — merges share config with calculator route fallbacks. */
export function getCalculatorPageMetadata(
  id: CalculatorId,
  fallback: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
  }
): Metadata {
  const share = getCalculatorShareData(id);
  if (!share) {
    return createPageMetadata({
      title: fallback.title,
      description: fallback.description,
      path: fallback.path,
      keywords: fallback.keywords,
    });
  }

  return createPageMetadata({
    title: share.title,
    description: share.description,
    path: fallback.path,
    keywords: fallback.keywords,
    ogImage: share.imageUrl,
    ogTitle: share.title,
  });
}

export function formatCalculatorShareHeadline(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

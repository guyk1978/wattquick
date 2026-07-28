import type { Metadata } from "next";
import {
  getOgImageUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "@/lib/og-image";

const SITE_NAME = "WattQuick";
const SITE_URL = "https://wattquick.com";
/** Set NEXT_PUBLIC_FACEBOOK_APP_ID in env (Facebook App Dashboard → Settings → Basic). */
export const FACEBOOK_APP_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim() || "YOUR_APP_ID_HERE";
/** Default share preview — matches default dark theme and themeInitScript. */
const DEFAULT_OG_IMAGE = getOgImageUrl("dark");

/** Normalize paths for trailingSlash: true static export */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** Strip trailing slashes from static asset paths (images, fonts, etc.). */
export function normalizeAssetPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withoutTrailing = trimmed.replace(/\/+$/, "");
  return withoutTrailing.startsWith("/") ? withoutTrailing : `/${withoutTrailing}`;
}

export function absoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

/** Absolute URL for static files — never appends a trailing slash. */
export function absoluteAssetUrl(path: string): string {
  const trimmed = path.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/+$/, "");
  }
  const assetPath = normalizeAssetPath(trimmed);
  return assetPath === "/" ? SITE_URL : `${SITE_URL}${assetPath}`;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth = OG_IMAGE_WIDTH,
  ogImageHeight = OG_IMAGE_HEIGHT,
  openGraphType = "website",
  articlePublishedTime,
  ogTitle,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  /** Declared OG image width (defaults to site header OG size). */
  ogImageWidth?: number;
  /** Declared OG image height (defaults to site header OG size). */
  ogImageHeight?: number;
  openGraphType?: "website" | "article";
  articlePublishedTime?: string;
  /** Override OG/Twitter headline (defaults to title | site) */
  ogTitle?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const shareTitle = ogTitle
    ? ogTitle.includes(SITE_NAME)
      ? ogTitle
      : `${ogTitle} | ${SITE_NAME}`
    : fullTitle;
  const imageUrl = absoluteAssetUrl(ogImage);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: openGraphType,
      ...(openGraphType === "article" && articlePublishedTime
        ? { publishedTime: articlePublishedTime }
        : {}),
      images: [
        {
          url: imageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };

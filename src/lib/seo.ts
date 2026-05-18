import type { Metadata } from "next";

const SITE_NAME = "WattQuick";
const SITE_URL = "https://wattquick.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

/** Normalize paths for trailingSlash: true static export */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — battery & power calculators`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };

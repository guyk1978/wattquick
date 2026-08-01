import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog/posts";
import { getCalculatorHref } from "@/lib/calculator-routes";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { getAllGuideLandings } from "@/lib/calculators/calculator-landings-registry";
import {
  CATEGORY_SEO_SLUG_LIST,
  getCategoryPageHref,
} from "@/lib/category-routes";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/**
 * Marketing and hub pages included in the sitemap.
 * Legacy `/blog` is omitted — canonical content lives under `/articles`.
 */
export const SITEMAP_STATIC_PATHS = [
  "",
  "/calculators",
  "/dashboard",
  "/favorites",
  "/wizard",
  "/articles",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

const CATEGORY_KEYS = Object.keys(
  CALCULATOR_CATEGORY_LABELS
) as CalculatorCategory[];

/**
 * Normalize a path or absolute URL into a clean sitemap `<loc>`:
 * https only, wattquick.com host, no query/hash, trailing slash, no duplicates.
 */
export function canonicalizeSitemapUrl(pathOrUrl: string): string {
  const raw = pathOrUrl.trim();
  if (!raw) return `${SITE_URL}/`;

  let url: URL;
  try {
    url = raw.startsWith("http://") || raw.startsWith("https://")
      ? new URL(raw)
      : new URL(absoluteUrl(raw));
  } catch {
    return absoluteUrl(raw.split("?")[0]?.split("#")[0] ?? "/");
  }

  url.protocol = "https:";
  url.hostname = "wattquick.com";
  url.port = "";
  url.search = "";
  url.hash = "";

  let pathname = url.pathname.replace(/\/{2,}/g, "/");
  if (!pathname.endsWith("/")) pathname = `${pathname}/`;
  if (pathname === "//") pathname = "/";

  return pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

function toSitemapEntry(
  pathOrUrl: string,
  options: {
    lastModified?: Date | string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  }
): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalizeSitemapUrl(pathOrUrl),
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency ?? "weekly",
    priority: options.priority ?? 0.5,
  };
}

/**
 * Build sitemap entries from live registry data.
 * Category pages: /tools/{category-slug}/
 * Tool pages: /tools/{category-slug}/{tool-slug}/  (canonical only)
 * Guide pages: /landing/{slug}/
 * Articles: /articles/{slug}/  (not legacy /blog/{slug}/)
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const calculators = getAllCalculatorMeta();
  const posts = getAllBlogPosts();

  const staticEntries: MetadataRoute.Sitemap = SITEMAP_STATIC_PATHS.map(
    (path) =>
      toSitemapEntry(path, {
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      })
  );

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_KEYS.map((category) =>
    toSitemapEntry(getCategoryPageHref(category), {
      changeFrequency: "weekly",
      priority: 0.75,
    })
  );

  const toolEntries: MetadataRoute.Sitemap = calculators.map((calc) =>
    toSitemapEntry(getCalculatorHref(calc.id, calc.category), {
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  const guideLandingEntries: MetadataRoute.Sitemap = getAllGuideLandings().map(
    (landing) =>
      toSitemapEntry(landing.href, {
        changeFrequency: "monthly",
        priority: 0.8,
      })
  );

  const articleEntries: MetadataRoute.Sitemap = posts.map((post) =>
    toSitemapEntry(`/articles/${post.slug}`, {
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.65,
    })
  );

  const merged = [
    ...staticEntries,
    ...categoryEntries,
    ...toolEntries,
    ...guideLandingEntries,
    ...articleEntries,
  ];

  // Deduplicate by canonical loc (last write wins — keeps latest lastmod).
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of merged) {
    byUrl.set(entry.url, entry);
  }
  return [...byUrl.values()];
}

/** Expected category SEO slug count (one landing page per calculator category). */
export const SITEMAP_CATEGORY_COUNT = CATEGORY_SEO_SLUG_LIST.length;

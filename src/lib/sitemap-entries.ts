import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog/posts";
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
import { absoluteUrl } from "@/lib/seo";

/** Marketing and hub pages included in the sitemap. */
export const SITEMAP_STATIC_PATHS = [
  "",
  "/calculators",
  "/dashboard",
  "/favorites",
  "/wizard",
  "/blog",
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
 * Build sitemap entries from live registry data.
 * Category pages: /tools/{category-slug}/
 * Tool pages: /tools/{category-slug}/{tool-slug}/
 * Guide pages: /landing/{slug}/
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const calculators = getAllCalculatorMeta();
  const posts = getAllBlogPosts();

  const staticEntries: MetadataRoute.Sitemap = SITEMAP_STATIC_PATHS.map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_KEYS.map(
    (category) => ({
      url: absoluteUrl(getCategoryPageHref(category)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })
  );

  const toolEntries: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: absoluteUrl(calc.href),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const guideLandingEntries: MetadataRoute.Sitemap = getAllGuideLandings().map(
    (landing) => ({
      url: absoluteUrl(landing.href),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const articleEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/articles/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...toolEntries,
    ...guideLandingEntries,
    ...articleEntries,
    ...blogEntries,
  ];
}

/** Expected category SEO slug count (one landing page per calculator category). */
export const SITEMAP_CATEGORY_COUNT = CATEGORY_SEO_SLUG_LIST.length;

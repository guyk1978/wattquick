import type { CalculatorId } from "@/lib/calculators";
import type { BlogCategory } from "@/lib/blog/posts";

/**
 * Blog post frontmatter schema (Markdown + gray-matter).
 *
 * @example
 * ```yaml
 * ---
 * title: "How to Estimate EV Home Charging Cost"
 * description: "Calculate what it costs to charge your EV at home."
 * slug: "ev-home-charging-cost"
 * category: "EV Charging"
 * date: "2026-02-05"
 * relatedToolId: "ev-charging-cost"
 * ---
 * ```
 */
export interface BlogPostFrontmatter {
  /** Article H1 / metadata title */
  title: string;
  /** Meta description & OG fallback */
  description: string;
  /** URL slug under /blog/[slug]/ */
  slug: string;
  category: BlogCategory;
  /** ISO date — `date` or `publishedAt` in file */
  date?: string;
  publishedAt?: string;
  /**
   * Required — primary WattQuick calculator ID for this article.
   * Powers ToolPreview, Quick Launch, OG, and bidirectional calculator links.
   */
  relatedToolId: CalculatorId | string;
  /** @deprecated Use relatedToolId — alias for migration */
  relatedTool?: CalculatorId | string;
  /** Optional custom OG image (absolute or site-relative) */
  ogImage?: string;
}

/** Required frontmatter keys when authoring new posts */
export const BLOG_POST_REQUIRED_FIELDS = [
  "title",
  "description",
  "slug",
  "category",
  "date",
  "relatedToolId",
] as const satisfies readonly (keyof BlogPostFrontmatter)[];

export const BLOG_POST_OPTIONAL_FIELDS = [
  "relatedTool",
  "ogImage",
  "publishedAt",
] as const satisfies readonly (keyof BlogPostFrontmatter)[];

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CalculatorId } from "@/lib/calculators";
import {
  estimateReadMinutes,
  extractCalculatorSlugs,
} from "@/lib/blog/parse-content";
import { resolveRelatedToolId } from "@/lib/blog/resolve-related-tool";

export type BlogCategory =
  | "EV Charging"
  | "Solar"
  | "Battery"
  | "Appliances"
  | "Guides"
  | "Tips"
  | "Commercial EV"
  | "RV & Marine"
  | "Utility Tariffs"
  | "Green Home"
  | "E-Bike"
  | "E-Scooter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  category: BlogCategory;
  content: string;
  /** Calculator tools embedded in the article body */
  calculatorSlugs: string[];
  /** Required linked calculator — frontmatter `relatedToolId` (validated at build) */
  relatedToolId: CalculatorId;
  /** Optional per-post OG image override */
  ogImage?: string;
  /** Hero image shown below the article H1 */
  featuredImage?: string;
  featuredImageAlt?: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function readMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      const slug = String(data.slug ?? file.replace(/\.md$/, ""));
      const title = String(data.title ?? slug);
      const description = String(data.description ?? "");
      const category = String(data.category ?? "Guides") as BlogCategory;
      const publishedAt = String(data.date ?? data.publishedAt ?? "2026-01-01");

      const trimmed = content.trim();

      const relatedToolId = resolveRelatedToolId(
        data as Record<string, unknown>,
        trimmed
      );

      if (!relatedToolId) {
        throw new Error(
          `Blog post "${slug}" is missing required relatedToolId in frontmatter (or a <CalculatorEmbed />).`
        );
      }

      return {
        slug,
        title,
        description,
        category,
        publishedAt,
        content: trimmed,
        readMinutes: estimateReadMinutes(trimmed),
        calculatorSlugs: extractCalculatorSlugs(trimmed),
        relatedToolId,
        ogImage:
          typeof data.ogImage === "string" && data.ogImage.trim()
            ? data.ogImage.trim()
            : undefined,
        featuredImage:
          typeof data.featuredImage === "string" && data.featuredImage.trim()
            ? data.featuredImage.trim()
            : undefined,
        featuredImageAlt:
          typeof data.featuredImageAlt === "string" &&
          data.featuredImageAlt.trim()
            ? data.featuredImageAlt.trim()
            : undefined,
      };
    });
}

let productionPosts: BlogPost[] | null = null;

function getMarkdownPosts(): BlogPost[] {
  if (process.env.NODE_ENV === "development") {
    return readMarkdownPosts();
  }
  if (!productionPosts) {
    productionPosts = readMarkdownPosts();
  }
  return productionPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getMarkdownPosts().find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...getMarkdownPosts()].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.category === category);
}

/** Posts linked to a calculator — for Command Center / tool hub cross-links */
export function getBlogPostsByRelatedTool(
  toolId: CalculatorId
): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.relatedToolId === toolId);
}

export type { BlogPostFrontmatter } from "@/lib/blog/post-schema";
export {
  BLOG_POST_OPTIONAL_FIELDS,
  BLOG_POST_REQUIRED_FIELDS,
} from "@/lib/blog/post-schema";

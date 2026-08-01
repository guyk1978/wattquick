import "server-only";
import { getAllBlogPosts } from "@/lib/blog/posts";

export type Article = {
  /** Blog slug — used as the article id */
  id: string;
  title: string;
  /** Full markdown body (tool embeds stripped for plain reading) */
  content: string;
  /** Short excerpt for lists / cards */
  snippet: string;
  category?: string;
  readMinutes?: number;
};

function stripInlineToolTags(content: string): string {
  return content
    .replace(/<CalculatorEmbed[^/>]*\/>/gi, "")
    .replace(/<ToolPreview[^/>]*\/>/gi, "")
    .trim();
}

/**
 * Central article catalog derived from blog markdown.
 * Prefer full post pages under `/articles/[slug]/` for UI.
 */
export function getArticles(): Article[] {
  return getAllBlogPosts().map((post) => ({
    id: post.slug,
    title: post.title,
    content: stripInlineToolTags(post.content),
    snippet: post.description,
    category: post.category,
    readMinutes: post.readMinutes,
  }));
}

export function getArticleById(id: string): Article | undefined {
  return getArticles().find((article) => article.id === id);
}

/** Lightweight cards for headers / related-reading UI (no full body). */
export function getArticleCards(): Pick<
  Article,
  "id" | "title" | "snippet" | "category" | "readMinutes"
>[] {
  return getArticles().map(({ id, title, snippet, category, readMinutes }) => ({
    id,
    title,
    snippet,
    category,
    readMinutes,
  }));
}

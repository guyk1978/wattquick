import { getRelatedArticleForTool } from "@/data/article-tool-map";
import { getBlogPostsBySlugs, type BlogPost } from "@/lib/blog/posts";
import { getArticleUrl } from "@/lib/content-tool-link";
import {
  getCalculatorDefinition,
  type CalculatorDefinition,
  type CalculatorId,
} from "@/lib/calculators";

/** Lightweight card used by CalculatorModalWrapper + Documentation Further Reading. */
export type RelatedArticleCard = {
  title: string;
  url: string;
  description: string;
};

export type RelatedArticleForModal = Pick<
  BlogPost,
  "slug" | "title" | "description" | "readMinutes" | "category" | "content"
>;

/** Resolve configured + fallback article slugs for a calculator. */
export function getRelatedArticleIds(
  definition: CalculatorDefinition
): string[] {
  if (definition.relatedArticleIds?.length) {
    return [...new Set(definition.relatedArticleIds)];
  }
  if (definition.relatedArticleId) {
    return [definition.relatedArticleId];
  }
  const linked = getRelatedArticleForTool(definition.id);
  return linked ? [linked.articleSlug] : [];
}

/**
 * Related article cards for Documentation / CalculatorModalWrapper.
 * Always returns an array (empty when none are configured or found).
 */
export function getRelatedArticleCardsForCalculator(
  calculatorId: CalculatorId
): RelatedArticleCard[] {
  const definition = getCalculatorDefinition(calculatorId);
  const ids = getRelatedArticleIds(definition);
  if (ids.length === 0) return [];

  return getBlogPostsBySlugs(ids).map((post) => ({
    title: post.title,
    url: getArticleUrl(post.slug),
    description: post.description,
  }));
}

/** Full blog posts for in-app article readers (legacy modal path). */
export function getRelatedArticlesForCalculator(
  calculatorId: CalculatorId
): RelatedArticleForModal[] {
  const definition = getCalculatorDefinition(calculatorId);
  const ids = getRelatedArticleIds(definition);
  if (ids.length === 0) return [];

  return getBlogPostsBySlugs(ids).map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    readMinutes: post.readMinutes,
    category: post.category,
    content: post.content,
  }));
}

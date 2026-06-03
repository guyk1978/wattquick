import { calculators, CALCULATOR_SLUGS } from "@/data/calculators";
import { getRelatedArticleForTool } from "@/data/article-tool-map";
import {
  toMeta,
  type CalculatorCategory,
  type CalculatorDefinition,
  type CalculatorId,
  type CalculatorMeta,
} from "./types";

function toDefinition(
  entry: (typeof calculators)[number]
): CalculatorDefinition {
  const id = entry.slug as CalculatorId;
  const linkedArticle = getRelatedArticleForTool(id);

  return {
    id,
    href: entry.href,
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    icon: entry.icon,
    tag: entry.tag,
    category: entry.category,
    suggestions: entry.suggestions as CalculatorId[],
    relatedArticleId:
      ("relatedArticleId" in entry && entry.relatedArticleId
        ? entry.relatedArticleId
        : undefined) ?? linkedArticle?.articleSlug,
    fields: entry.fields,
    result: entry.result,
    seo: entry.seo,
    compute: entry.compute,
  };
}

const DEFINITIONS = Object.fromEntries(
  calculators.map((entry) => [entry.slug, toDefinition(entry)])
) as Record<CalculatorId, CalculatorDefinition>;

/** Display order for calculators across the site */
export const CALCULATOR_ORDER: CalculatorId[] = [...CALCULATOR_SLUGS];

export function getCalculatorDefinition(id: CalculatorId): CalculatorDefinition {
  return DEFINITIONS[id];
}

export function getCalculatorMeta(id: CalculatorId): CalculatorMeta {
  return toMeta(getCalculatorDefinition(id));
}

export function getAllCalculatorDefinitions(): CalculatorDefinition[] {
  return CALCULATOR_ORDER.map((id) => DEFINITIONS[id]);
}

export function getAllCalculatorMeta(): CalculatorMeta[] {
  return CALCULATOR_ORDER.map((id) => toMeta(DEFINITIONS[id]));
}

export function getCalculatorsByCategory(
  category: CalculatorCategory
): CalculatorMeta[] {
  return getAllCalculatorMeta().filter((c) => c.category === category);
}

export function getSuggestions(ids: CalculatorId[]): CalculatorMeta[] {
  return ids.map((id) => getCalculatorMeta(id));
}

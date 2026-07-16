import type { LucideIcon } from "lucide-react";
import type { CalculatorSlug } from "@/data/calculators";
import type {
  CalculatorCategory,
  CalculatorComputeFn,
  CalculatorContentSection,
  CalculatorFieldDef,
  CalculatorResultConfig,
  CalculatorResultDisplay,
  CalculatorSeoContent,
  CalculatorSeoSection,
} from "@/data/calculator-types";

export type {
  CalculatorCategory,
  CalculatorComputeFn,
  CalculatorContentSection,
  CalculatorFieldDef,
  CalculatorFieldInputType,
  CalculatorFieldOption,
  CalculatorResultConfig,
  CalculatorResultDisplay,
  CalculatorSeoContent,
  CalculatorSeoSection,
} from "@/data/calculator-types";
export {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
} from "@/data/calculator-types";

/** Calculator route slug; derived from data/calculators.ts */
export type CalculatorId = CalculatorSlug;

export interface CalculatorMeta {
  id: CalculatorId;
  href: string;
  title: string;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  tag: string;
  category: CalculatorCategory;
  suggestions: CalculatorId[];
  /** Primary complementary blog article slug */
  relatedArticleId?: string;
  /** Related blog articles shown in the documentation modal */
  relatedArticleIds?: string[];
}

export interface CalculatorDefinition extends CalculatorMeta {
  fields: CalculatorFieldDef[];
  result: CalculatorResultConfig;
  seo: CalculatorSeoContent;
  compute: CalculatorComputeFn;
}

export function toMeta(definition: CalculatorDefinition): CalculatorMeta {
  return {
    id: definition.id,
    href: definition.href,
    title: definition.title,
    description: definition.description,
    keywords: definition.keywords,
    icon: definition.icon,
    tag: definition.tag,
    category: definition.category,
    suggestions: definition.suggestions,
    relatedArticleId: definition.relatedArticleId,
    relatedArticleIds: definition.relatedArticleIds,
  };
}

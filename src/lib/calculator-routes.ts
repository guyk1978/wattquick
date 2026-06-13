import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators";
import { getCategorySeoSlug } from "@/lib/category-routes";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { isCalculatorId } from "@/lib/calculators/utils";

/** Canonical tool URL: /tools/{category-slug}/{tool-slug}/ */
export function getCalculatorHref(
  toolSlug: CalculatorId,
  category: CalculatorCategory
): string {
  return `/tools/${getCategorySeoSlug(category)}/${toolSlug}/`;
}

/** Parse a nested tool path; returns tool id when category and slug match. */
export function getCalculatorIdFromToolPath(
  categorySlug: string,
  toolSlug: string
): CalculatorId | undefined {
  if (!isCalculatorId(toolSlug)) return undefined;

  const meta = getCalculatorDefinition(toolSlug);
  if (getCategorySeoSlug(meta.category) !== categorySlug) return undefined;

  return toolSlug;
}

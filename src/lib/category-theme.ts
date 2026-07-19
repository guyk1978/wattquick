import type { CSSProperties } from "react";
import categoryConfig from "@/data/categoryConfig.json";
import type { CalculatorCategory } from "@/data/calculator-types";

/** Fallback accent when a category has no entry in categoryConfig.json. */
const DEFAULT_CATEGORY_COLOR = "#a3e635";

const CATEGORY_COLORS = categoryConfig as Record<string, string>;

/** Primary theme color for a category, from categoryConfig.json. */
export function getCategoryColor(category: CalculatorCategory): string {
  return CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
}

/**
 * Inline style that scopes `--category-color` to a subtree. Any element
 * inside can then theme itself with `var(--category-color, fallback)`.
 */
export function categoryThemeStyle(
  category: CalculatorCategory
): CSSProperties {
  return { "--category-color": getCategoryColor(category) } as CSSProperties;
}

import type { CalculatorCategory } from "./types";
import { CALCULATOR_CATEGORY_LABELS } from "./types";

const CATEGORIES = Object.keys(
  CALCULATOR_CATEGORY_LABELS
) as CalculatorCategory[];

export function isCalculatorCategory(
  value: string
): value is CalculatorCategory {
  return CATEGORIES.includes(value as CalculatorCategory);
}

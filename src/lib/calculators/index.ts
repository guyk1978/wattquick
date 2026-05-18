export type {
  CalculatorCategory,
  CalculatorComputeFn,
  CalculatorDefinition,
  CalculatorFieldDef,
  CalculatorId,
  CalculatorMeta,
  CalculatorResultConfig,
  CalculatorResultDisplay,
  CalculatorSeoContent,
  CalculatorSeoSection,
} from "./types";
export {
  calculators,
  CALCULATOR_SLUGS,
  type CalculatorSlug,
} from "@/data/calculators";
export {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  toMeta,
} from "./types";
export {
  CALCULATOR_ORDER,
  getAllCalculatorDefinitions,
  getAllCalculatorMeta,
  getCalculatorDefinition,
  getCalculatorMeta,
  getCalculatorsByCategory,
  getSuggestions,
} from "./registry";
export { getRelatedCalculators } from "./related";
export { isCalculatorId } from "./utils";
export { isCalculatorCategory } from "./categories";

import { getAllCalculatorMeta as _getAllCalculatorMeta } from "./registry";

/** @deprecated Use `getAllCalculatorMeta()` */
export const CALCULATOR_LIST = _getAllCalculatorMeta();

/** @deprecated Use `getCalculatorMeta` */
export { getCalculatorMeta as getCalculator } from "./registry";

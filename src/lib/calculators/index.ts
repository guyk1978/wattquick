export type {
  CalculatorCategory,
  CalculatorDefinition,
  CalculatorFieldDef,
  CalculatorId,
  CalculatorMeta,
  CalculatorResultConfig,
  CalculatorResultDisplay,
  CalculatorSeoContent,
  CalculatorSeoSection,
} from "./types";
export { CALCULATOR_CATEGORY_LABELS, toMeta } from "./types";
export {
  getAllCalculatorDefinitions,
  getAllCalculatorMeta,
  getCalculatorDefinition,
  getCalculatorMeta,
  getSuggestions,
} from "./registry";
export { isCalculatorId } from "./utils";

import { getAllCalculatorMeta as _getAllCalculatorMeta } from "./registry";

/** @deprecated Use `getAllCalculatorMeta()` */
export const CALCULATOR_LIST = _getAllCalculatorMeta();

/** @deprecated Use `getCalculatorMeta` */
export { getCalculatorMeta as getCalculator } from "./registry";

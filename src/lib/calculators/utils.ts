import { CALCULATOR_ORDER } from "./registry";
import type { CalculatorId } from "./types";

export function isCalculatorId(value: string): value is CalculatorId {
  return (CALCULATOR_ORDER as readonly string[]).includes(value);
}

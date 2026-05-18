import { CALCULATOR_SLUGS } from "@/data/calculators";
import type { CalculatorId } from "./types";

export function isCalculatorId(value: string): value is CalculatorId {
  return (CALCULATOR_SLUGS as readonly string[]).includes(value);
}

import type { CalculatorId } from "./types";

const CALCULATOR_IDS: CalculatorId[] = [
  "ah-to-wh",
  "wh-to-ah",
  "battery-percentage",
  "battery-charging-time",
  "battery-runtime",
  "watts-to-amps",
  "amps-to-watts",
  "solar-panel-size",
  "battery-cost",
  "ups-runtime",
];

export function isCalculatorId(value: string): value is CalculatorId {
  return CALCULATOR_IDS.includes(value as CalculatorId);
}

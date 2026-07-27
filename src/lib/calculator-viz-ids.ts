import type { CalculatorId } from "@/lib/calculators";

/**
 * Calculators that expose a [VIZ] tab in the tool workspace.
 * Keep this free of React component imports so header tab presence
 * never depends on schematic module evaluation.
 */
const VIZ_CALCULATOR_IDS = [
  "critical-load-analysis",
  "ups-runtime",
  "ebike-range-estimator",
  "ebike-charging-cost",
  "ebike-max-speed",
  "ebike-charge-time",
  "battery-percentage",
  "battery-runtime",
  "battery-charging-time",
  "battery-energy",
  "battery-bank-size",
  "inverter-sizing",
  "dc-cable-size",
  "watts-to-amps",
  "amps-to-watts",
  "residential-voltage-drop",
  "ohms-law",
  "solar-panel-size",
  "solar-battery-bank",
  "solar-charge-controller-size",
  "solar-daily-yield",
] as const satisfies readonly CalculatorId[];

export const CALCULATOR_VIZ_IDS = new Set<string>(VIZ_CALCULATOR_IDS);

export function hasCalculatorViz(id: CalculatorId): boolean {
  return (VIZ_CALCULATOR_IDS as readonly string[]).includes(id);
}

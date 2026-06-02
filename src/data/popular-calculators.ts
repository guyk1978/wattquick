import type { CalculatorSlug } from "@/data/calculators";

/** Most-used calculators surfaced on the home page (8–12). */
export const POPULAR_CALCULATOR_SLUGS = [
  "battery-runtime",
  "ah-to-wh",
  "ev-charging-cost",
  "watts-to-amps",
  "battery-bank-size",
  "battery-charging-time",
  "solar-daily-yield",
  "solar-panel-size",
  "residential-voltage-drop",
  "solar-payback-roi",
] as const satisfies readonly CalculatorSlug[];

export type PopularCalculatorSlug = (typeof POPULAR_CALCULATOR_SLUGS)[number];

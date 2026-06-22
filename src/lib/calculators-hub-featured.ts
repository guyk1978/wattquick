import { POPULAR_CALCULATOR_SLUGS } from "@/data/popular-calculators";
import type { CalculatorId } from "@/lib/calculators";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Rotates through popular tools — one featured calculator per week. */
export function getWeeklyFeaturedCalculatorId(
  now = Date.now()
): CalculatorId {
  const weekIndex = Math.floor(now / WEEK_MS);
  const index = weekIndex % POPULAR_CALCULATOR_SLUGS.length;
  return POPULAR_CALCULATOR_SLUGS[index]!;
}

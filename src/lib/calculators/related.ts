import { getAllCalculatorMeta, getCalculatorMeta } from "./registry";
import type { CalculatorId, CalculatorMeta } from "./types";

const RELATED_LIMIT = 4;

/** Merge explicit suggestions with same-category calculators for internal linking. */
export function getRelatedCalculators(id: CalculatorId): CalculatorMeta[] {
  const current = getCalculatorMeta(id);
  const seen = new Set<CalculatorId>([id]);
  const related: CalculatorMeta[] = [];

  for (const suggestionId of current.suggestions) {
    if (seen.has(suggestionId)) continue;
    seen.add(suggestionId);
    related.push(getCalculatorMeta(suggestionId));
    if (related.length >= RELATED_LIMIT) return related;
  }

  const sameCategory = getAllCalculatorMeta().filter(
    (c) => c.category === current.category && !seen.has(c.id)
  );

  for (const calc of sameCategory) {
    seen.add(calc.id);
    related.push(calc);
    if (related.length >= RELATED_LIMIT) return related;
  }

  for (const calc of getAllCalculatorMeta()) {
    if (seen.has(calc.id)) continue;
    seen.add(calc.id);
    related.push(calc);
    if (related.length >= RELATED_LIMIT) return related;
  }

  return related;
}

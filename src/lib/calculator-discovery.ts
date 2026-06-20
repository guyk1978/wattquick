import {
  getAllCalculatorMeta,
  getCalculatorMeta,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import type { CalculatorId, CalculatorMeta } from "@/lib/calculators";

const DISCOVERY_LIMIT = 12;

/** Dense tool-discovery grid — same category first, then suggestions, then fill. */
export function getDiscoveryCalculators(
  id: CalculatorId,
  limit = DISCOVERY_LIMIT
): CalculatorMeta[] {
  const current = getCalculatorMeta(id);
  const seen = new Set<CalculatorId>([id]);
  const items: CalculatorMeta[] = [];

  const push = (calc: CalculatorMeta) => {
    if (seen.has(calc.id)) return;
    seen.add(calc.id);
    items.push(calc);
  };

  for (const calc of getCalculatorsByCategory(current.category)) {
    push(calc);
    if (items.length >= limit) return items;
  }

  for (const suggestionId of current.suggestions) {
    push(getCalculatorMeta(suggestionId));
    if (items.length >= limit) return items;
  }

  for (const calc of getAllCalculatorMeta()) {
    push(calc);
    if (items.length >= limit) return items;
  }

  return items;
}

export function getCalculatorCategoryCount(): number {
  return new Set(getAllCalculatorMeta().map((c) => c.category)).size;
}

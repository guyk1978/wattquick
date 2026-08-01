import { CALCULATOR_SLUGS } from "@/data/calculators";
import type { CalculatorId } from "@/lib/calculators";

export const PINNED_TOOLS_STORAGE_KEY = "wattquick_pinned_calculators";

const VALID_IDS = new Set<string>(CALCULATOR_SLUGS);

function sanitize(ids: unknown): CalculatorId[] {
  if (!Array.isArray(ids)) return [];
  const seen = new Set<CalculatorId>();
  const result: CalculatorId[] = [];
  for (const id of ids) {
    if (typeof id !== "string" || !VALID_IDS.has(id)) continue;
    const slug = id as CalculatorId;
    if (seen.has(slug)) continue;
    seen.add(slug);
    result.push(slug);
  }
  return result;
}

/** Read pinned calculator ids from localStorage (client-only). */
export function readPinnedCalculatorIds(): CalculatorId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PINNED_TOOLS_STORAGE_KEY);
    if (!raw) return [];
    return sanitize(JSON.parse(raw));
  } catch {
    return [];
  }
}

/** Persist pinned calculator ids (client-only). */
export function writePinnedCalculatorIds(ids: CalculatorId[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PINNED_TOOLS_STORAGE_KEY,
      JSON.stringify(sanitize(ids))
    );
  } catch {
    /* private mode / quota */
  }
}

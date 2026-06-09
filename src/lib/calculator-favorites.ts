import { CALCULATOR_SLUGS } from "@/data/calculators";
import type { CalculatorId } from "@/lib/calculators";

export const FAVORITES_STORAGE_KEY = "wattquick_calculator_favorites";
export const FAVORITES_CHANGED_EVENT = "wattquick:favorites-changed";

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

export function readFavoriteCalculatorIds(): CalculatorId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    return sanitize(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeFavoriteCalculatorIds(ids: CalculatorId[]): void {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

export function isCalculatorFavorite(id: CalculatorId): boolean {
  return readFavoriteCalculatorIds().includes(id);
}

export function addCalculatorFavorite(id: CalculatorId): CalculatorId[] {
  if (!VALID_IDS.has(id)) return readFavoriteCalculatorIds();
  const current = readFavoriteCalculatorIds();
  if (current.includes(id)) return current;
  const next = [...current, id];
  writeFavoriteCalculatorIds(next);
  return next;
}

export function removeCalculatorFavorite(id: CalculatorId): CalculatorId[] {
  const next = readFavoriteCalculatorIds().filter((item) => item !== id);
  writeFavoriteCalculatorIds(next);
  return next;
}

export function toggleCalculatorFavorite(id: CalculatorId): {
  ids: CalculatorId[];
  favorited: boolean;
} {
  if (!VALID_IDS.has(id)) {
    return { ids: readFavoriteCalculatorIds(), favorited: false };
  }
  const current = readFavoriteCalculatorIds();
  if (current.includes(id)) {
    const ids = removeCalculatorFavorite(id);
    return { ids, favorited: false };
  }
  const ids = addCalculatorFavorite(id);
  return { ids, favorited: true };
}

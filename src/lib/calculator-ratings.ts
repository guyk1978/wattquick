import { CALCULATOR_SLUGS } from "@/data/calculators";
import type { CalculatorId } from "@/lib/calculators";

export const RATINGS_STORAGE_KEY = "wattquick_calculator_ratings_user";
export const RATINGS_CHANGED_EVENT = "wattquick:ratings-changed";
export const RATINGS_DATA_PATH = "/data/calculator-ratings.json";

const VALID_IDS = new Set<string>(CALCULATOR_SLUGS);
const MIN_RATING = 1;
const MAX_RATING = 5;

export interface CalculatorRatingAggregate {
  sum: number;
  count: number;
}

export interface CalculatorRatingStats extends CalculatorRatingAggregate {
  average: number | null;
}

export type CalculatorRatingsMap = Record<CalculatorId, CalculatorRatingAggregate>;

export function emptyAggregate(): CalculatorRatingAggregate {
  return { sum: 0, count: 0 };
}

export function computeAverage(
  aggregate: CalculatorRatingAggregate
): number | null {
  if (aggregate.count <= 0) return null;
  return aggregate.sum / aggregate.count;
}

export function toStats(
  aggregate: CalculatorRatingAggregate
): CalculatorRatingStats {
  return { ...aggregate, average: computeAverage(aggregate) };
}

export function mergeUserVoteIntoAggregate(
  remote: CalculatorRatingAggregate,
  userRating: number | null
): CalculatorRatingStats {
  if (userRating === null) {
    return toStats(remote);
  }

  return toStats({
    sum: remote.sum + userRating,
    count: remote.count + 1,
  });
}

export function formatRatingAverage(average: number | null): string {
  if (average === null) return "—";
  return average.toFixed(1);
}

export function formatRatingCount(count: number): string {
  if (count === 0) return "No ratings yet";
  if (count === 1) return "1 rating";
  return `${count} ratings`;
}

function sanitizeUserVotes(raw: unknown): Partial<Record<CalculatorId, number>> {
  if (!raw || typeof raw !== "object") return {};
  const result: Partial<Record<CalculatorId, number>> = {};

  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!VALID_IDS.has(id)) continue;
    if (typeof value !== "number" || !Number.isInteger(value)) continue;
    if (value < MIN_RATING || value > MAX_RATING) continue;
    result[id as CalculatorId] = value;
  }

  return result;
}

export function readUserCalculatorRatings(): Partial<Record<CalculatorId, number>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(RATINGS_STORAGE_KEY);
    if (!raw) return {};
    return sanitizeUserVotes(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function readUserCalculatorRating(
  id: CalculatorId
): number | null {
  return readUserCalculatorRatings()[id] ?? null;
}

function writeUserCalculatorRatings(
  votes: Partial<Record<CalculatorId, number>>
): void {
  window.localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(votes));
  window.dispatchEvent(new Event(RATINGS_CHANGED_EVENT));
}

export function setUserCalculatorRating(
  id: CalculatorId,
  rating: number
): Partial<Record<CalculatorId, number>> {
  if (!VALID_IDS.has(id)) return readUserCalculatorRatings();
  if (!Number.isInteger(rating) || rating < MIN_RATING || rating > MAX_RATING) {
    return readUserCalculatorRatings();
  }

  const next = { ...readUserCalculatorRatings(), [id]: rating };
  writeUserCalculatorRatings(next);
  return next;
}

export function clearUserCalculatorRating(
  id: CalculatorId
): Partial<Record<CalculatorId, number>> {
  const current = readUserCalculatorRatings();
  if (!(id in current)) return current;

  const next = { ...current };
  delete next[id];
  writeUserCalculatorRatings(next);
  return next;
}

export function sanitizeRatingsMap(raw: unknown): CalculatorRatingsMap {
  const result = {} as CalculatorRatingsMap;

  for (const id of CALCULATOR_SLUGS) {
    result[id] = emptyAggregate();
  }

  if (!raw || typeof raw !== "object") return result;

  for (const id of CALCULATOR_SLUGS) {
    const entry = (raw as Record<string, unknown>)[id];
    if (!entry || typeof entry !== "object") continue;

    const sum = Number((entry as CalculatorRatingAggregate).sum);
    const count = Number((entry as CalculatorRatingAggregate).count);

    if (!Number.isFinite(sum) || !Number.isFinite(count) || count < 0 || sum < 0) {
      continue;
    }

    result[id] = { sum, count };
  }

  return result;
}

export function createEmptyRatingsMap(): CalculatorRatingsMap {
  return sanitizeRatingsMap({});
}

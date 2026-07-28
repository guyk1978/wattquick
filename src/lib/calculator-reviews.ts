import { CALCULATOR_SLUGS } from "@/data/calculators";
import type { CalculatorId } from "@/lib/calculators";
import { mergeReviewsWithSeed } from "@/lib/calculator-reviews-seed";

export const REVIEWS_STORAGE_KEY = "wattquick_calculator_reviews";
export const REVIEWS_CHANGED_EVENT = "wattquick:reviews-changed";

const VALID_IDS = new Set<string>(CALCULATOR_SLUGS);
const MIN_RATING = 1;
const MAX_RATING = 5;
const MAX_AUTHOR_LEN = 48;
const MIN_COMMENT_LEN = 8;
const MAX_COMMENT_LEN = 1200;
const MAX_REVIEWS_PER_TOOL = 200;

export interface CalculatorReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  /** Normalized https URL, or null when omitted. */
  websiteUrl: string | null;
  createdAt: string;
}

export type CalculatorReviewsMap = Partial<Record<CalculatorId, CalculatorReview[]>>;

export type ReviewSubmitInput = {
  author: string;
  rating: number;
  comment: string;
  websiteUrl?: string;
};

export type ReviewSubmitResult =
  | { ok: true; review: CalculatorReview }
  | { ok: false; error: string };

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `rev-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Normalize optional website input to an absolute http(s) URL or null. */
export function normalizeWebsiteUrl(raw: string | undefined | null): string | null {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  if (!isValidHttpUrl(withProtocol)) return null;

  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function websiteDisplayHost(websiteUrl: string): string {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./i, "");
  } catch {
    return websiteUrl;
  }
}

function sanitizeReview(raw: unknown): CalculatorReview | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== "string" || !r.id) return null;
  if (typeof r.author !== "string") return null;
  const author = r.author.trim().slice(0, MAX_AUTHOR_LEN);
  if (author.length < 1) return null;
  if (typeof r.rating !== "number" || !Number.isInteger(r.rating)) return null;
  if (r.rating < MIN_RATING || r.rating > MAX_RATING) return null;
  if (typeof r.comment !== "string") return null;
  const comment = r.comment.trim().slice(0, MAX_COMMENT_LEN);
  if (comment.length < 1) return null;
  if (typeof r.createdAt !== "string" || Number.isNaN(Date.parse(r.createdAt))) {
    return null;
  }
  let websiteUrl: string | null = null;
  if (typeof r.websiteUrl === "string" && r.websiteUrl.trim()) {
    websiteUrl = normalizeWebsiteUrl(r.websiteUrl);
  }
  return {
    id: r.id,
    author,
    rating: r.rating,
    comment,
    websiteUrl,
    createdAt: r.createdAt,
  };
}

function sanitizeMap(raw: unknown): CalculatorReviewsMap {
  if (!raw || typeof raw !== "object") return {};
  const result: CalculatorReviewsMap = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!VALID_IDS.has(id)) continue;
    if (!Array.isArray(value)) continue;
    const reviews = value
      .map(sanitizeReview)
      .filter((r): r is CalculatorReview => r != null)
      .sort(
        (a, b) =>
          Date.parse(b.createdAt) - Date.parse(a.createdAt)
      )
      .slice(0, MAX_REVIEWS_PER_TOOL);
    if (reviews.length > 0) {
      result[id as CalculatorId] = reviews;
    }
  }
  return result;
}

function readAllReviews(): CalculatorReviewsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return {};
    return sanitizeMap(JSON.parse(raw) as unknown);
  } catch {
    return {};
  }
}

function writeAllReviews(map: CalculatorReviewsMap): void {
  window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event(REVIEWS_CHANGED_EVENT));
}

export function listCalculatorReviews(id: CalculatorId): CalculatorReview[] {
  const stored = readAllReviews()[id] ?? [];
  return mergeReviewsWithSeed(id, stored);
}

export function submitCalculatorReview(
  id: CalculatorId,
  input: ReviewSubmitInput
): ReviewSubmitResult {
  if (!VALID_IDS.has(id)) {
    return { ok: false, error: "Unknown calculator." };
  }

  const author = input.author.trim().slice(0, MAX_AUTHOR_LEN);
  if (author.length < 2) {
    return { ok: false, error: "Enter a name or handle (at least 2 characters)." };
  }

  if (
    !Number.isInteger(input.rating) ||
    input.rating < MIN_RATING ||
    input.rating > MAX_RATING
  ) {
    return { ok: false, error: "Select a star rating from 1 to 5." };
  }

  const comment = input.comment.trim().slice(0, MAX_COMMENT_LEN);
  if (comment.length < MIN_COMMENT_LEN) {
    return {
      ok: false,
      error: `Comment needs at least ${MIN_COMMENT_LEN} characters.`,
    };
  }

  const websiteRaw = (input.websiteUrl ?? "").trim();
  let websiteUrl: string | null = null;
  if (websiteRaw) {
    websiteUrl = normalizeWebsiteUrl(websiteRaw);
    if (!websiteUrl) {
      return {
        ok: false,
        error: "Website URL must be a valid http(s) address.",
      };
    }
  }

  const review: CalculatorReview = {
    id: newId(),
    author,
    rating: input.rating,
    comment,
    websiteUrl,
    createdAt: new Date().toISOString(),
  };

  const map = readAllReviews();
  const existing = map[id] ?? [];
  map[id] = [review, ...existing].slice(0, MAX_REVIEWS_PER_TOOL);
  writeAllReviews(map);

  return { ok: true, review };
}

export function formatReviewTimestamp(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(ms));
  } catch {
    return new Date(ms).toLocaleString();
  }
}

export function averageReviewRating(reviews: CalculatorReview[]): number | null {
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

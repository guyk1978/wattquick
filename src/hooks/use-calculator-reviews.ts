"use client";

import { useCallback, useEffect, useState } from "react";
import {
  listCalculatorReviews,
  REVIEWS_CHANGED_EVENT,
  REVIEWS_STORAGE_KEY,
  submitCalculatorReview,
  type CalculatorReview,
  type ReviewSubmitInput,
  type ReviewSubmitResult,
} from "@/lib/calculator-reviews";
import { setUserCalculatorRating } from "@/lib/calculator-ratings";
import type { CalculatorId } from "@/lib/calculators";

export function useCalculatorReviews(id: CalculatorId) {
  const [reviews, setReviews] = useState<CalculatorReview[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setReviews(listCalculatorReviews(id));
  }, [id]);

  useEffect(() => {
    refresh();
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === REVIEWS_STORAGE_KEY) refresh();
    };
    const onChanged = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener(REVIEWS_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(REVIEWS_CHANGED_EVENT, onChanged);
    };
  }, [refresh]);

  const submit = useCallback(
    (input: ReviewSubmitInput): ReviewSubmitResult => {
      const result = submitCalculatorReview(id, input);
      if (result.ok) {
        // Keep compact star rating in sync with the review rating.
        setUserCalculatorRating(id, result.review.rating);
        refresh();
      }
      return result;
    },
    [id, refresh]
  );

  return { reviews, hydrated, submit, refresh };
}

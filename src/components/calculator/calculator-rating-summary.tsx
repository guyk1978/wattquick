"use client";

import type { CalculatorId } from "@/lib/calculators";
import {
  formatRatingAverage,
  formatRatingCount,
} from "@/lib/calculator-ratings";
import { useCalculatorRating } from "@/hooks/use-calculator-rating";
import { StarRating } from "@/components/calculator/star-rating";
import { cn } from "@/lib/utils";

interface CalculatorRatingSummaryProps {
  calculatorId: CalculatorId;
  className?: string;
  showCount?: boolean;
}

/** Compact once-per-user rating control for cards and directory lists. */
export function CalculatorRatingSummary({
  calculatorId,
  className,
  showCount = true,
}: CalculatorRatingSummaryProps) {
  const { userRating, stats, hydrated, rate } = useCalculatorRating(calculatorId);

  if (!hydrated) {
    return (
      <span
        className={cn("calculator-rating-summary calculator-rating-summary--loading", className)}
        aria-hidden
      />
    );
  }

  if (stats.count === 0) {
    return (
      <span className={cn("calculator-rating-summary", className)}>
        <StarRating
          value={userRating ?? 0}
          onChange={userRating == null ? rate : undefined}
          readOnly={userRating != null}
          size="sm"
          label={userRating == null ? "Rate this calculator" : `Your rating: ${userRating} out of 5`}
        />
        {!showCount ? (
          <span className="calculator-rating-summary__empty">Rate</span>
        ) : (
          <span className="calculator-rating-summary__count">No ratings yet</span>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn("calculator-rating-summary", className)}
      aria-label={
        stats.average != null
          ? `${formatRatingAverage(stats.average)} out of 5, ${formatRatingCount(stats.count)}`
          : formatRatingCount(stats.count)
      }
    >
      <StarRating
        value={userRating ?? 0}
        onChange={userRating == null ? rate : undefined}
        readOnly={userRating != null}
        size="sm"
        label={userRating == null ? "Rate this calculator" : `Your rating: ${userRating} out of 5`}
      />
      {stats.average != null ? (
        <span className="calculator-rating-summary__average">
          {formatRatingAverage(stats.average)}
        </span>
      ) : null}
      {userRating != null ? (
        <span className="calculator-rating-summary__thanks" aria-live="polite">
          Thanks!
        </span>
      ) : null}
      {showCount ? (
        <span className="calculator-rating-summary__count">
          {formatRatingCount(stats.count)}
        </span>
      ) : null}
    </span>
  );
}

"use client";

import type { CalculatorId } from "@/lib/calculators";
import {
  formatRatingAverage,
  formatRatingCount,
} from "@/lib/calculator-ratings";
import { useCalculatorRatingsCatalog } from "@/hooks/use-calculator-rating";
import { StarRating } from "@/components/calculator/star-rating";
import { cn } from "@/lib/utils";

interface CalculatorRatingSummaryProps {
  calculatorId: CalculatorId;
  className?: string;
  showCount?: boolean;
}

/** Compact read-only stars for cards and directory lists. */
export function CalculatorRatingSummary({
  calculatorId,
  className,
  showCount = true,
}: CalculatorRatingSummaryProps) {
  const { hydrated, getStats } = useCalculatorRatingsCatalog();
  const stats = getStats(calculatorId);

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
        <StarRating value={0} readOnly size="sm" label="No ratings yet" />
        {!showCount ? (
          <span className="calculator-rating-summary__empty">Rate</span>
        ) : (
          <span className="calculator-rating-summary__count">No ratings</span>
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
      <StarRating value={stats.average ?? 0} readOnly size="sm" />
      {stats.average != null ? (
        <span className="calculator-rating-summary__average">
          {formatRatingAverage(stats.average)}
        </span>
      ) : null}
      {showCount ? (
        <span className="calculator-rating-summary__count">
          ({stats.count})
        </span>
      ) : null}
    </span>
  );
}

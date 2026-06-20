"use client";

import type { CalculatorId } from "@/lib/calculators";
import {
  formatRatingAverage,
  formatRatingCount,
} from "@/lib/calculator-ratings";
import { useCalculatorRating } from "@/hooks/use-calculator-rating";
import { StarRating } from "@/components/calculator/star-rating";
import { cn } from "@/lib/utils";

interface CalculatorRatingCompactProps {
  calculatorId: CalculatorId;
  className?: string;
}

/** Compact aggregate + interactive rating for blueprint calculator headers. */
export function CalculatorRatingCompact({
  calculatorId,
  className,
}: CalculatorRatingCompactProps) {
  const { userRating, stats, hydrated, rate } = useCalculatorRating(calculatorId);

  return (
    <div
      className={cn("calculator-rating-compact", className)}
      aria-label="Calculator rating"
    >
      <div className="calculator-rating-compact__aggregate">
        <StarRating
          value={stats.average ?? 0}
          readOnly
          size="sm"
          label={
            stats.average != null
              ? `${formatRatingAverage(stats.average)} out of 5 stars`
              : "No ratings yet"
          }
        />
        {stats.average != null ? (
          <span className="calculator-rating-compact__meta">
            <span className="calculator-rating-compact__average">
              {formatRatingAverage(stats.average)}
            </span>
            <span aria-hidden>·</span>
            <span className="calculator-rating-compact__count">
              {formatRatingCount(stats.count)}
            </span>
          </span>
        ) : (
          <span className="calculator-rating-compact__count">
            {formatRatingCount(stats.count)}
          </span>
        )}
      </div>

      <div className="calculator-rating-compact__vote">
        <span className="calculator-rating-compact__vote-label">
          {userRating != null ? "Your rating" : "Rate"}
        </span>
        <StarRating value={userRating ?? 0} onChange={rate} size="sm" />
        {!hydrated ? <span className="sr-only">Loading saved rating…</span> : null}
      </div>
    </div>
  );
}

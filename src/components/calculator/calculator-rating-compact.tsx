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

/** Ultra-compact rating readout for blueprint header rows. */
export function CalculatorRatingCompact({
  calculatorId,
  className,
}: CalculatorRatingCompactProps) {
  const { stats } = useCalculatorRating(calculatorId);

  return (
    <div
      className={cn("calculator-rating-compact", className)}
      aria-label="Calculator rating"
    >
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
  );
}

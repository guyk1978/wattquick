"use client";

import type { CalculatorId } from "@/lib/calculators";
import {
  formatRatingAverage,
  formatRatingCount,
} from "@/lib/calculator-ratings";
import { useCalculatorRating } from "@/hooks/use-calculator-rating";
import { StarRating } from "@/components/calculator/star-rating";
import { cn } from "@/lib/utils";

interface CalculatorRatingProps {
  calculatorId: CalculatorId;
  className?: string;
}

/** Interactive rating widget for calculator pages. */
export function CalculatorRating({
  calculatorId,
  className,
}: CalculatorRatingProps) {
  const { userRating, stats, hydrated, rate } = useCalculatorRating(calculatorId);

  return (
    <section
      className={cn("calculator-rating", className)}
      aria-label="Calculator rating"
    >
      <div className="calculator-rating__summary">
        <StarRating
          value={stats.average ?? 0}
          readOnly
          size="lg"
          label={
            stats.average != null
              ? `${formatRatingAverage(stats.average)} out of 5 stars`
              : "No ratings yet"
          }
        />
        <p className="calculator-rating__meta">
          {stats.average != null ? (
            <>
              <span className="calculator-rating__average">
                {formatRatingAverage(stats.average)}
              </span>
              <span className="calculator-rating__separator" aria-hidden>
                ·
              </span>
            </>
          ) : null}
          <span className="calculator-rating__count">
            {formatRatingCount(stats.count)}
          </span>
        </p>
      </div>

      <div className="calculator-rating__input">
        <span className="calculator-rating__input-label">
          {userRating != null ? "Your rating" : "Rate this calculator"}
        </span>
        <StarRating
          value={userRating ?? 0}
          onChange={rate}
          size="lg"
        />
        {!hydrated ? (
          <span className="sr-only">Loading saved rating…</span>
        ) : null}
      </div>
    </section>
  );
}

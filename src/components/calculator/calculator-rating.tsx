"use client";

import type { CSSProperties } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import {
  formatRatingAverage,
  formatRatingCount,
} from "@/lib/calculator-ratings";
import { getCategoryColor } from "@/lib/category-theme";
import { useCalculatorRating } from "@/hooks/use-calculator-rating";
import { StarRating } from "@/components/calculator/star-rating";
import { cn } from "@/lib/utils";

interface CalculatorRatingProps {
  calculatorId: CalculatorId;
  className?: string;
  /** Category accent; defaults to the tool's category color. */
  color?: string;
}

/** Interactive rating widget for calculator pages. */
export function CalculatorRating({
  calculatorId,
  className,
  color,
}: CalculatorRatingProps) {
  const { userRating, stats, hydrated, rate } = useCalculatorRating(calculatorId);
  const accent =
    color ?? getCategoryColor(getCalculatorMeta(calculatorId).category);
  const style = { "--star-rating-color": accent } as CSSProperties;

  return (
    <section
      className={cn("calculator-rating", className)}
      style={style}
      aria-label="Calculator rating"
    >
      <div className="calculator-rating__summary">
        <StarRating
          value={stats.average ?? 0}
          readOnly
          size="lg"
          color={accent}
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
          {userRating != null ? "Thanks for rating!" : "Rate this calculator"}
        </span>
        <StarRating
          value={userRating ?? 0}
          onChange={userRating == null ? rate : undefined}
          readOnly={userRating != null}
          size="lg"
          color={accent}
        />
        {!hydrated ? (
          <span className="sr-only">Loading saved rating…</span>
        ) : null}
      </div>
    </section>
  );
}

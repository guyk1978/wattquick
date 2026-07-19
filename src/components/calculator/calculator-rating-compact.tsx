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

interface CalculatorRatingCompactProps {
  calculatorId: CalculatorId;
  className?: string;
  /** Category accent; defaults to the tool's category color. */
  color?: string;
}

/** Compact aggregate + interactive rating for blueprint calculator headers. */
export function CalculatorRatingCompact({
  calculatorId,
  className,
  color,
}: CalculatorRatingCompactProps) {
  const { userRating, stats, hydrated, rate } = useCalculatorRating(calculatorId);
  const accent =
    color ?? getCategoryColor(getCalculatorMeta(calculatorId).category);
  const style = { "--star-rating-color": accent } as CSSProperties;

  return (
    <div
      className={cn("calculator-rating-compact", className)}
      style={style}
      aria-label="Calculator rating"
    >
      <div className="calculator-rating-compact__aggregate">
        <StarRating
          value={stats.average ?? 0}
          readOnly
          size="sm"
          color={accent}
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
          {userRating != null ? "Thanks!" : "Rate"}
        </span>
        <StarRating
          value={userRating ?? 0}
          onChange={userRating == null ? rate : undefined}
          readOnly={userRating != null}
          size="sm"
          color={accent}
        />
        {!hydrated ? <span className="sr-only">Loading saved rating…</span> : null}
      </div>
    </div>
  );
}

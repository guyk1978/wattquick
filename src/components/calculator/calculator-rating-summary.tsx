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

interface CalculatorRatingSummaryProps {
  calculatorId: CalculatorId;
  className?: string;
  showCount?: boolean;
  /** Category accent; defaults to the tool's category color. */
  color?: string;
}

/** Compact once-per-user rating control for cards and directory lists. */
export function CalculatorRatingSummary({
  calculatorId,
  className,
  showCount = true,
  color,
}: CalculatorRatingSummaryProps) {
  const { userRating, stats, hydrated, rate } = useCalculatorRating(calculatorId);
  const accent =
    color ?? getCategoryColor(getCalculatorMeta(calculatorId).category);
  const style = { "--star-rating-color": accent } as CSSProperties;

  if (!hydrated) {
    return (
      <span
        className={cn("calculator-rating-summary calculator-rating-summary--loading", className)}
        style={style}
        aria-hidden
      />
    );
  }

  if (stats.count === 0) {
    return (
      <span className={cn("calculator-rating-summary", className)} style={style}>
        <StarRating
          value={userRating ?? 0}
          onChange={userRating == null ? rate : undefined}
          readOnly={userRating != null}
          size="sm"
          color={accent}
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
      style={style}
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
        color={accent}
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

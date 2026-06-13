"use client";

import { Star } from "lucide-react";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CategoryCalculatorFavoriteButtonProps {
  calculatorId: CalculatorId;
  className?: string;
}

export function CategoryCalculatorFavoriteButton({
  calculatorId,
  className,
}: CategoryCalculatorFavoriteButtonProps) {
  const { hydrated, isFavorite, toggle } = useCalculatorFavorites();
  const favorited = hydrated && isFavorite(calculatorId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(calculatorId);
      }}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "calculator-favorite-btn absolute top-5 right-5 z-10",
        "opacity-0 transition-all duration-200",
        "group-hover/card-wrap:opacity-100",
        "group-hover/card-wrap:text-yellow-500/80",
        favorited && "calculator-favorite-btn--active text-yellow-500 opacity-100",
        className
      )}
    >
      <Star
        className={cn(
          "calculator-favorite-btn__icon",
          favorited && "calculator-favorite-btn__icon--filled"
        )}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}

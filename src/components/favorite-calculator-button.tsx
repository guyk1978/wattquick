"use client";

import { Star } from "lucide-react";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface FavoriteCalculatorButtonProps {
  calculatorId: CalculatorId;
  className?: string;
  /** Compact toolbar chip — pairs with Visual Guide in blueprint header */
  variant?: "icon" | "toolbar";
}

export function FavoriteCalculatorButton({
  calculatorId,
  className,
  variant = "icon",
}: FavoriteCalculatorButtonProps) {
  const { hydrated, isFavorite, toggle } = useCalculatorFavorites();
  const favorited = hydrated && isFavorite(calculatorId);

  return (
    <button
      type="button"
      onClick={() => toggle(calculatorId)}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "calculator-favorite-btn",
        variant === "toolbar" && "calculator-favorite-btn--toolbar",
        favorited && "calculator-favorite-btn--active",
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

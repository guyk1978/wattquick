"use client";

import { Star } from "lucide-react";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface FavoriteCalculatorButtonProps {
  calculatorId: CalculatorId;
  className?: string;
}

export function FavoriteCalculatorButton({
  calculatorId,
  className,
}: FavoriteCalculatorButtonProps) {
  const { hydrated, isFavorite, toggle } = useCalculatorFavorites();
  const favorited = hydrated && isFavorite(calculatorId);

  return (
    <button
      type="button"
      onClick={() => toggle(calculatorId)}
      aria-label={
        favorited ? "Remove from favorites" : "Add to favorites"
      }
      aria-pressed={favorited}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        calculatorCommandShareBtn,
        "inline-flex size-11 shrink-0 items-center justify-center transition-colors",
        favorited
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Star
        className={cn("size-4", favorited && "fill-current")}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}

"use client";

import { Bookmark } from "lucide-react";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import type { CalculatorId } from "@/lib/calculators";

type ToolCardFavoriteBadgeProps = {
  toolId: CalculatorId;
};

/** Client-only favorite indicator for server-rendered tool cards. */
export function ToolCardFavoriteBadge({ toolId }: ToolCardFavoriteBadgeProps) {
  const { hydrated, isFavorite } = useCalculatorFavorites();

  if (!hydrated || !isFavorite(toolId)) return null;

  return (
    <span className="wq-tool-card__bookmark" aria-label="Favorite" title="Favorite">
      <Bookmark className="size-3.5" strokeWidth={2} aria-hidden />
    </span>
  );
}

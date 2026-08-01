"use client";

import { Star, X } from "lucide-react";
import { useToolCardSelection } from "@/components/grid-modal/tool-card-selection-context";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import { cn } from "@/lib/utils";

type ToolCardSelectionBarProps = {
  className?: string;
};

/**
 * Floating batch bar — appears when one or more tool cards are checked,
 * and adds the selection to favorites in one action.
 */
export function ToolCardSelectionBar({ className }: ToolCardSelectionBarProps) {
  const { selectedIds, selectedCount, clear } = useToolCardSelection();
  const { addMany } = useCalculatorFavorites();

  if (selectedCount === 0) return null;

  const onAddFavorites = () => {
    addMany(selectedIds);
    clear();
  };

  return (
    <div
      className={cn("wq-tool-selection-bar", className)}
      role="status"
      aria-live="polite"
    >
      <div className="wq-tool-selection-bar__panel">
        <p className="wq-tool-selection-bar__count">
          <span className="wq-tool-selection-bar__count-num">{selectedCount}</span>
          {selectedCount === 1 ? " tool selected" : " tools selected"}
        </p>
        <div className="wq-tool-selection-bar__actions">
          <button
            type="button"
            className="wq-tool-selection-bar__btn wq-tool-selection-bar__btn--primary"
            onClick={onAddFavorites}
          >
            <Star className="wq-tool-selection-bar__icon" strokeWidth={2} aria-hidden />
            Add to favorites
          </button>
          <button
            type="button"
            className="wq-tool-selection-bar__btn wq-tool-selection-bar__btn--ghost"
            onClick={clear}
            aria-label="Clear selection"
          >
            <X className="wq-tool-selection-bar__icon" strokeWidth={2} aria-hidden />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

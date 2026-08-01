"use client";

import { useToolCardSelectionOptional } from "@/components/grid-modal/tool-card-selection-context";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

type ToolCardSelectProps = {
  calculatorId: CalculatorId;
  className?: string;
};

/**
 * JoinMyPDF-style selection checkbox on the left of a tool card.
 * Marks the card for batch favorites via the floating selection bar.
 */
export function ToolCardSelect({ calculatorId, className }: ToolCardSelectProps) {
  const selection = useToolCardSelectionOptional();
  const selected = selection?.isSelected(calculatorId) ?? false;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      aria-label={selected ? "Deselect tool" : "Select tool"}
      title={selected ? "Deselect" : "Select"}
      disabled={!selection}
      className={cn(
        "wq-tool-card__select",
        selected && "wq-tool-card__select--checked",
        className
      )}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        selection?.toggle(calculatorId);
      }}
    >
      <span className="wq-tool-card__select-box" aria-hidden>
        {selected ? (
          <svg viewBox="0 0 16 16" className="wq-tool-card__select-check">
            <path
              d="M3.5 8.2 6.4 11l6.1-6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        ) : null}
      </span>
    </button>
  );
}

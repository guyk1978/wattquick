"use client";

import type { MouseEvent } from "react";
import { Pin, PinOff } from "lucide-react";
import { ToolCardFocus } from "@/components/calculator/tool-card-focus";
import { useGridPinnedCalculatorOptional } from "@/components/grid-modal/grid-pinned-calculator-context";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

interface ToolCardHeaderActionsProps {
  calculatorId: CalculatorId;
  className?: string;
}

function stopOverlayNavigation(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Side-rail card controls: Expand (focus) + Pin — two square buttons
 * matching the tool card height (JoinMyPDF-style action column).
 */
export function ToolCardHeaderActions({
  calculatorId,
  className,
}: ToolCardHeaderActionsProps) {
  const pinnedCtx = useGridPinnedCalculatorOptional();
  const meta = getCalculatorMeta(calculatorId);
  const pinned = pinnedCtx?.isPinned(calculatorId) ?? false;

  const onPinToggle = (event: MouseEvent) => {
    stopOverlayNavigation(event);
    if (!pinnedCtx) return;
    if (pinned) {
      pinnedCtx.unpin(calculatorId);
    } else {
      pinnedCtx.pin(calculatorId);
    }
  };

  return (
    <div className={cn("wq-tool-card-side", className)} role="group" aria-label="Card actions">
      <ToolCardFocus calculatorId={calculatorId} />
      {pinnedCtx ? (
        <button
          type="button"
          className={cn(
            "tool-card-action-btn tool-card-action-btn--side tool-card-action-btn--pin",
            pinned && "tool-card-action-btn--pin-active"
          )}
          aria-label={
            pinned ? `Unpin ${meta.title}` : `Pin ${meta.title} to top bar`
          }
          aria-pressed={pinned}
          title={pinned ? "Unpin" : "Pin to top bar"}
          onClick={onPinToggle}
        >
          {pinned ? (
            <PinOff className="tool-card-action-btn__icon" strokeWidth={2} aria-hidden />
          ) : (
            <Pin className="tool-card-action-btn__icon" strokeWidth={2} aria-hidden />
          )}
        </button>
      ) : (
        /* Keep a second square so Expand isn't alone when pin context is absent. */
        <span className="tool-card-action-btn tool-card-action-btn--side tool-card-action-btn--ghost" aria-hidden />
      )}
    </div>
  );
}

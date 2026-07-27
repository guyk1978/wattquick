"use client";

import { useRouter } from "next/navigation";
import { Pin, PinOff } from "lucide-react";
import type { MouseEvent } from "react";
import { ToolCardFocus } from "@/components/calculator/tool-card-focus";
import { useGridPinnedCalculatorOptional } from "@/components/grid-modal/grid-pinned-calculator-context";
import type { CalculatorId } from "@/lib/calculators";
import { hasCalculatorViz } from "@/lib/calculator-viz-ids";
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
 * Top-right card controls: pin dock, [VIZ] fullscreen schematic, focus expand.
 */
export function ToolCardHeaderActions({
  calculatorId,
  className,
}: ToolCardHeaderActionsProps) {
  const router = useRouter();
  const pinnedCtx = useGridPinnedCalculatorOptional();
  const meta = getCalculatorMeta(calculatorId);
  const hasViz = hasCalculatorViz(calculatorId);
  const pinned = pinnedCtx?.isPinned(calculatorId) ?? false;

  const onViz = (event: MouseEvent) => {
    stopOverlayNavigation(event);
    router.push(`${meta.href}?view=viz`, { scroll: false });
  };

  const onPinToggle = (event: MouseEvent) => {
    stopOverlayNavigation(event);
    if (!pinnedCtx) return;
    if (pinned) {
      pinnedCtx.unpin();
    } else {
      pinnedCtx.pin(calculatorId);
    }
  };

  return (
    <div className={cn("tool-card-actions", className)}>
      <ToolCardFocus calculatorId={calculatorId} />
      {hasViz ? (
        <button
          type="button"
          className="tool-card-action-btn tool-card-action-btn--viz"
          aria-label={`Open ${meta.title} schematic`}
          title="Full-screen [VIZ]"
          onClick={onViz}
        >
          <span className="tool-card-action-btn__viz-label">[VIZ]</span>
        </button>
      ) : null}
      {pinnedCtx ? (
        <button
          type="button"
          className={cn(
            "tool-card-action-btn tool-card-action-btn--pin",
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
      ) : null}
    </div>
  );
}

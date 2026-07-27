"use client";

import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import { useGridPinnedCalculator } from "@/components/grid-modal/grid-pinned-calculator-context";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { categoryThemeStyle } from "@/lib/category-theme";
import { PinOff, X } from "lucide-react";

/** Transparent sticky calculator dock beneath the fixed grid nav. */
export function GridPinnedCalculatorBar() {
  const { pinnedId, unpin } = useGridPinnedCalculator();
  if (!pinnedId) return null;

  const meta = getCalculatorMeta(pinnedId);
  const Icon = meta.icon;

  return (
    <div
      className="grid-pinned-calc"
      style={categoryThemeStyle(meta.category)}
      data-calculator-id={pinnedId}
    >
      <div className="grid-pinned-calc__rail">
        <div className="grid-pinned-calc__header">
          <span className="grid-pinned-calc__icon" aria-hidden>
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <div className="grid-pinned-calc__titles">
            <p className="grid-pinned-calc__eyebrow">Pinned tool</p>
            <p className="grid-pinned-calc__title">{meta.title}</p>
          </div>
          <button
            type="button"
            className="grid-pinned-calc__unpin"
            onClick={unpin}
            aria-label={`Unpin ${meta.title}`}
            title="Unpin"
          >
            <PinOff className="size-3.5" strokeWidth={2} aria-hidden />
            <span className="grid-pinned-calc__unpin-text">Unpin</span>
          </button>
          <button
            type="button"
            className="grid-pinned-calc__close"
            onClick={unpin}
            aria-label={`Close pinned ${meta.title}`}
            title="Close"
          >
            <X className="size-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="grid-pinned-calc__body">
          <CalculatorPanel
            id={pinnedId}
            variant="modal"
            className="grid-pinned-calc__panel h-full min-h-0 w-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}

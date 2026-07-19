"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import { ToolCardExample } from "@/components/calculator/tool-card-example";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { categoryThemeStyle } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

interface ToolCardFocusProps {
  calculatorId: CalculatorId;
  className?: string;
}

/**
 * Card Focus mode: a Maximize2 button in the tool card's top-right corner
 * (mirroring the calculator header) that zooms a 2x-scaled version of the
 * card into a centered overlay. The scaled copy is re-rendered with doubled
 * rem sizes — not `transform: scale(2)` — so text stays crisp. The Example
 * box opens automatically in focus mode, and the star rating stays live.
 */
export function ToolCardFocus({ calculatorId, className }: ToolCardFocusProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const meta = getCalculatorMeta(calculatorId);
  const Icon = meta.icon;

  return (
    <>
      <button
        type="button"
        className={cn("tool-card-focus__expand", className)}
        aria-label={`Expand ${meta.title}`}
        aria-haspopup="dialog"
        title="Focus mode"
        onClick={(event) => {
          // Cards use an absolute overlay link; never let expand navigate.
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <Maximize2 className="tool-card-focus__expand-icon" strokeWidth={2} aria-hidden />
      </button>

      {open
        ? createPortal(
            <div
              className="tool-card-focus"
              role="dialog"
              aria-modal="true"
              aria-label={`${meta.title} — focus mode`}
              style={categoryThemeStyle(meta.category)}
              onClick={close}
            >
              <div
                className="tool-card-focus__card"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="tool-card-focus__close"
                  aria-label="Close focus mode"
                  onClick={close}
                  autoFocus
                >
                  <X className="size-5" strokeWidth={2} aria-hidden />
                </button>

                <span className="tool-card-focus__icon" aria-hidden>
                  <Icon className="size-9" strokeWidth={1.75} />
                </span>

                <h2 className="tool-card-focus__title">{meta.title}</h2>
                <p className="tool-card-focus__meta">{meta.description}</p>
                <p className="tool-card-focus__benefit">{meta.benefit}</p>

                <ToolCardExample example={meta.example} defaultOpen />

                <div className="tool-card-focus__footer">
                  <CalculatorRatingSummary
                    calculatorId={calculatorId}
                    className="tool-card-focus__rating"
                  />
                  <Link href={meta.href} className="tool-card-focus__open">
                    Open calculator
                    <ArrowUpRight className="size-5" strokeWidth={2.25} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

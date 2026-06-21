"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorFocusOverlayProps {
  open: boolean;
  onClose: () => void;
  inputs: ReactNode;
  results: ReactNode;
}

export function CalculatorFocusOverlay({
  open,
  onClose,
  inputs,
  results,
}: CalculatorFocusOverlayProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  const handleBackdrop = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose]
  );

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Calculator focus view"
      className="calculator-focus-overlay fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
      onClick={handleBackdrop}
    >
      <div
        className="calculator-focus-overlay__backdrop absolute inset-0 bg-background/85 backdrop-blur-md dark:bg-[#0a0a0a]/90"
        aria-hidden
      />

      <div
        className="calculator-focus-overlay__panel relative z-10 flex w-full max-w-6xl flex-col overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={cn(
            calculatorCommandShareBtn,
            "calculator-focus-overlay__close absolute end-3 top-3 z-20 flex size-10 items-center justify-center",
            "border border-border/70 bg-card/90 text-muted-foreground hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          )}
          aria-label="Close focus view"
        >
          <X className="size-5" />
        </button>

        <div className="calculator-focus-overlay__grid min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <section
            className="calculator-focus-overlay__inputs"
            aria-label="Calculator inputs"
          >
            {inputs}
          </section>

          <section
            className="calculator-focus-overlay__results"
            aria-label="Calculator results"
            aria-live="polite"
          >
            {results}
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorVisualGuideModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function CalculatorVisualGuideModal({
  open,
  onClose,
  title,
  children,
}: CalculatorVisualGuideModalProps) {
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
  }, [open, onClose]);

  const handleBackdrop = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calculator-visual-guide-title"
      className="calculator-visual-guide-modal fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdrop}
    >
      <div
        className="absolute inset-0 bg-background/75 backdrop-blur-sm dark:bg-[#121212]/80"
        aria-hidden
      />

      <div
        className={cn(
          "calculator-visual-guide-modal__panel relative z-10 flex w-full max-w-4xl flex-col",
          "max-h-[min(92vh,52rem)] overflow-hidden rounded-none border border-border bg-card",
          "shadow-[0_24px_48px_rgb(15_23_42/0.14)] dark:border-white/10 dark:bg-[var(--matte-section)] dark:shadow-[0_32px_64px_rgb(0_0_0/0.55)]"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
          <div className="min-w-0 pt-0.5">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Visual Guide
            </p>
            <h2
              id="calculator-visual-guide-title"
              className="mt-1 text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              calculatorCommandShareBtn,
              "flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            aria-label="Close visual guide"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="calculator-visual-guide-modal__body min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}

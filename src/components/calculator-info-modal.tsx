"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { FavoriteCalculatorButton } from "@/components/favorite-calculator-button";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorInfoModalProps {
  calculator: CalculatorMeta | null;
  onClose: () => void;
}

export function CalculatorInfoModal({
  calculator,
  onClose,
}: CalculatorInfoModalProps) {
  useEffect(() => {
    if (!calculator) return;
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
  }, [calculator, onClose]);

  const handleBackdrop = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose]
  );

  if (!calculator) return null;

  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calculator-info-modal-title"
      className="calculator-info-modal fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/85"
        aria-hidden
      />

      <div
        style={categoryThemeVars(theme)}
        className={cn(
          "calculator-info-modal__panel relative z-10 w-full max-w-lg",
          "rounded-none border border-border bg-card shadow-[0_24px_48px_rgb(15_23_42/0.12)]",
          "dark:border-white/10 dark:bg-[var(--matte-section)] dark:shadow-[0_32px_64px_rgb(0_0_0/0.55)]"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-none border",
                "border-[color-mix(in_srgb,var(--cat)_30%,transparent)]",
                "bg-[color-mix(in_srgb,var(--cat)_12%,transparent)] text-[var(--cat)]"
              )}
            >
              <Icon className="size-5" strokeWidth={2} aria-hidden />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {CALCULATOR_CATEGORY_LABELS[calculator.category]}
              </p>
              <h2
                id="calculator-info-modal-title"
                className="mt-1 text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl"
              >
                {calculator.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              calculatorCommandShareBtn,
              "flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl sm:leading-relaxed">
            {calculator.description}
          </p>
          {calculator.tag ? (
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {calculator.tag}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 px-5 py-4 sm:px-6">
          <Link
            href={calculator.href}
            onClick={onClose}
            className="flat-inline-action inline-flex h-11 flex-1 items-center justify-center gap-2 px-5 text-sm font-semibold sm:flex-none"
          >
            Open calculator
            <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex h-11 items-center rounded-none border border-border bg-card px-5 text-sm font-semibold text-foreground",
              "transition-colors hover:border-[var(--matte-hover-border)] hover:bg-[var(--matte-btn-hover)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            Close
          </button>

          <FavoriteCalculatorButton calculatorId={calculator.id} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import type { CalculatorMeta } from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CalculatorGridCubeProps {
  calculator: CalculatorMeta;
  onSelect: (calculator: CalculatorMeta) => void;
  className?: string;
}

export function CalculatorGridCube({
  calculator,
  onSelect,
  className,
}: CalculatorGridCubeProps) {
  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);

  return (
    <div
      style={categoryThemeVars(theme)}
      className={cn(
        "calculator-grid-cube group flex w-full flex-col rounded-none border border-slate-200 bg-white",
        "dark:border-white/10 dark:bg-[var(--matte-section)]",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(calculator)}
        className={cn(
        "flex h-11 w-full flex-row items-center gap-2 px-2 py-1.5 text-left sm:h-12 sm:gap-2.5 sm:px-2.5",
        "rounded-none bg-white text-left",
        "transition-colors hover:bg-slate-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:bg-[var(--matte-section)] dark:hover:bg-[var(--matte-hover-strong)]"
        )}
        aria-label={`${calculator.title} — show description`}
      >
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-none sm:size-8",
            "bg-[color-mix(in_srgb,var(--cat)_12%,transparent)] text-[var(--cat)]",
            "transition-transform duration-300 group-hover:scale-105"
          )}
        >
          <Icon className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
        </span>
        <span className="line-clamp-2 min-w-0 flex-1 text-left text-xs font-medium leading-snug text-foreground sm:text-sm">
          {calculator.title}
        </span>
      </button>
      <CalculatorRatingSummary
        calculatorId={calculator.id}
        color={theme.color}
        className="px-2 pb-1.5"
        showCount={false}
      />
    </div>
  );
}

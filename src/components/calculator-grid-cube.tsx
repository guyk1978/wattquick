"use client";

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
    <button
      type="button"
      style={categoryThemeVars(theme)}
      onClick={() => onSelect(calculator)}
      className={cn(
        "calculator-grid-cube group flex h-11 w-full flex-row items-center gap-2 px-2 py-1.5 sm:h-12 sm:gap-2.5 sm:px-2.5",
        "rounded-none border border-border/70 bg-card text-left",
        "transition-colors hover:border-[var(--matte-hover-border)] hover:bg-[var(--matte-btn-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:border-white/10 dark:bg-[var(--matte-section)] dark:hover:bg-[var(--matte-hover-strong)]",
        className
      )}
      aria-label={`${calculator.title} — show description`}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-none sm:size-8",
          "bg-[color-mix(in_srgb,var(--cat)_12%,transparent)] text-[var(--cat)]",
          "transition-transform duration-150 group-hover:scale-105"
        )}
      >
        <Icon className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
      </span>
      <span className="line-clamp-2 min-w-0 flex-1 text-left text-xs font-medium leading-snug text-foreground sm:text-sm">
        {calculator.title}
      </span>
    </button>
  );
}

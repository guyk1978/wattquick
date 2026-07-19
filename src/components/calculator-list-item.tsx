import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CalculatorListItemProps {
  calculator: CalculatorMeta;
  className?: string;
}

/** Compact flat row for the calculators directory */
export function CalculatorListItem({
  calculator,
  className,
}: CalculatorListItemProps) {
  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);

  return (
    <li className={cn("calculator-list-item", className)}>
      <div
        style={categoryThemeVars(theme)}
        className={cn(
          "group relative flex items-center gap-2.5 rounded-none border-l-2 border-l-transparent px-2.5 py-2 sm:gap-3 sm:px-3",
          "transition-colors duration-300 hover:bg-[var(--matte-hover)]",
          "dark:hover:bg-[var(--matte-hover-strong)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Link
          href={calculator.href}
          className="absolute inset-0 z-[1]"
          aria-label={`Open ${calculator.title}`}
        />
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-none sm:size-8",
            "bg-[color-mix(in_srgb,var(--cat)_10%,transparent)] text-[var(--cat)]",
            "dark:bg-[color-mix(in_srgb,var(--cat)_16%,transparent)]"
          )}
        >
          <Icon className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="truncate text-sm font-medium text-foreground">
              {calculator.title}
            </span>
            <span className="shrink-0 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
              {CALCULATOR_CATEGORY_LABELS[calculator.category]}
            </span>
          </span>
          <span className="mt-0.5 block line-clamp-1 text-xs text-muted-foreground">
            {calculator.description}
          </span>
          <CalculatorRatingSummary
            calculatorId={calculator.id}
            className="relative z-10 mt-1"
            showCount={false}
          />
        </span>

        <ArrowUpRight
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          aria-hidden
        />
      </div>
    </li>
  );
}

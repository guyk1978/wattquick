import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CalculatorListItemProps {
  calculator: CalculatorMeta;
  className?: string;
}

/** Compact row for full calculator directory (progressive disclosure). */
export function CalculatorListItem({
  calculator,
  className,
}: CalculatorListItemProps) {
  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);

  return (
    <li className={className}>
      <Link
        href={calculator.href}
        style={categoryThemeVars(theme)}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3",
          "border border-transparent transition-colors duration-150",
          "hover:border-[color-mix(in_srgb,var(--cat)_28%,transparent)]",
          "hover:bg-muted/60 dark:hover:bg-muted/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg border sm:size-10",
            "border-[color-mix(in_srgb,var(--cat)_22%,transparent)]",
            "bg-card text-[var(--cat)]",
            "dark:border-[color-mix(in_srgb,var(--cat)_35%,transparent)]",
            "dark:bg-[color-mix(in_srgb,var(--cat)_12%,var(--card))]"
          )}
        >
          <Icon className="size-4 sm:size-[1.125rem]" strokeWidth={2} aria-hidden />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-foreground sm:text-base">
              {calculator.title}
            </span>
            <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
              {CALCULATOR_CATEGORY_LABELS[calculator.category]}
            </span>
          </span>
          <span className="mt-0.5 block line-clamp-1 text-xs text-muted-foreground sm:text-sm">
            {calculator.description}
          </span>
        </span>

        <ChevronRight
          className="size-4 shrink-0 text-muted-foreground opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </Link>
    </li>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryCalculatorFavoriteButton } from "@/components/category-calculator-favorite-button";
import type { CalculatorMeta } from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CategoryCalculatorCardProps {
  calculator: CalculatorMeta;
  className?: string;
}

/** Industrial Matte card for category landing page tool grids. */
export function CategoryCalculatorCard({
  calculator,
  className,
}: CategoryCalculatorCardProps) {
  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);

  return (
    <li className={cn("min-w-0", className)}>
      <div className="group/card-wrap relative">
        <CategoryCalculatorFavoriteButton calculatorId={calculator.id} />

        <Link
          href={calculator.href}
          style={categoryThemeVars(theme)}
          className={cn(
            "category-calculator-card group/card flex h-full flex-col",
            "rounded-xl border p-5 !bg-white shadow-sm transition-all duration-200",
            "!border-slate-200 !text-slate-900",
            "hover:-translate-y-0.5 hover:!border-slate-300 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            "dark:!border-slate-800 dark:!bg-slate-900 dark:!text-slate-100",
            "dark:hover:!border-slate-600 dark:hover:shadow-[0_8px_24px_rgb(0_0_0/0.35)]",
            "dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          )}
          aria-label={`Open ${calculator.title}`}
        >
          <span
            className={cn(
              "category-calculator-card__icon flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
              "!border-slate-200 !bg-slate-50 !text-slate-700",
              "group-hover/card:!border-slate-300 group-hover/card:!text-slate-900",
              "dark:!border-slate-800 dark:!bg-slate-950 dark:!text-slate-300",
              "dark:group-hover/card:!border-slate-600 dark:group-hover/card:!text-slate-100"
            )}
            aria-hidden
          >
            <Icon className="size-5" strokeWidth={2} />
          </span>

          <h3 className="category-calculator-card__title mt-4 pr-8 text-base font-semibold leading-snug !text-slate-900 dark:!text-slate-100">
            {calculator.title}
          </h3>

          <p className="category-calculator-card__description mt-2 flex-1 text-sm leading-relaxed !text-slate-900 dark:!text-slate-100">
            {calculator.description}
          </p>

          <span
            className={cn(
              "category-calculator-card__action mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              "!border-slate-200 !bg-slate-50 !text-slate-900",
              "group-hover/card:!border-slate-300 group-hover/card:!text-slate-950",
              "dark:!border-slate-700 dark:!bg-slate-950 dark:!text-slate-100",
              "dark:group-hover/card:!border-slate-500 dark:group-hover/card:!text-white"
            )}
          >
            Open
            <ArrowUpRight className="size-3.5" strokeWidth={2.5} aria-hidden />
          </span>
        </Link>
      </div>
    </li>
  );
}

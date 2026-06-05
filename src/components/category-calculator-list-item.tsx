import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CalculatorMeta } from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CategoryCalculatorListItemProps {
  calculator: CalculatorMeta;
  className?: string;
}

/** Compact matte row for category pages — icon, title, one-line blurb, Open */
export function CategoryCalculatorListItem({
  calculator,
  className,
}: CategoryCalculatorListItemProps) {
  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);

  return (
    <li className={cn("category-calculator-row", className)}>
      <Link
        href={calculator.href}
        style={categoryThemeVars(theme)}
        className="category-calculator-row__link group"
        aria-label={`Open ${calculator.title}`}
      >
        <span
          className="category-calculator-row__icon flex size-6 shrink-0 items-center justify-center rounded-none"
          aria-hidden
        >
          <Icon className="size-3.5" strokeWidth={2.25} />
        </span>

        <span className="category-calculator-row__body min-w-0 flex-1">
          <span className="category-calculator-row__title block truncate text-sm font-semibold leading-tight">
            {calculator.title}
          </span>
          <span
            className="category-calculator-row__desc mt-0.5 block truncate text-xs leading-snug text-neutral-400"
            title={calculator.description}
          >
            {calculator.description}
          </span>
        </span>

        <span className="category-calculator-row__open shrink-0">
          Open
          <ArrowUpRight className="size-3" strokeWidth={2.5} aria-hidden />
        </span>
      </Link>
    </li>
  );
}

import Link from "next/link";
import { CalculatorPageBackLink } from "@/components/calculator/calculator-page-back-link";
import { CalculatorRatingCompact } from "@/components/calculator/calculator-rating-compact";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import { getCategoryPageHref } from "@/lib/category-routes";
import { getCategoryColor } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

interface CalculatorPageHeaderProps {
  calculator: CalculatorMeta;
  className?: string;
}

export function CalculatorPageHeader({ calculator, className }: CalculatorPageHeaderProps) {
  const Icon = calculator.icon;
  const categoryLabel = CALCULATOR_CATEGORY_LABELS[calculator.category];
  const categoryHref = getCategoryPageHref(calculator.category);
  const accent = getCategoryColor(calculator.category);

  return (
    <header className={cn("calculator-page-header calculator-page-header--blueprint", className)}>
      <CalculatorPageBackLink
        categoryHref={categoryHref}
        categoryLabel={categoryLabel}
      />

      <div className="calculator-page-header__meta">
        <div className="calculator-page-header__title-row">
          <span className="calculator-page-header__icon" aria-hidden>
            <Icon className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">{calculator.title}</h1>
          <Link
            href={categoryHref}
            className="calculator-page-header__tag"
          >
            {calculator.tag}
          </Link>
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">
            {calculator.description}
          </p>
          <CalculatorRatingCompact
            calculatorId={calculator.id}
            color={accent}
          />
        </div>
      </div>
    </header>
  );
}

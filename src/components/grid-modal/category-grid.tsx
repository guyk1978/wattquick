import Link from "next/link";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import {
  CALCULATOR_CATEGORY_ICONS,
  CATEGORY_DISPLAY_ORDER,
} from "@/lib/calculator-category-icons";
import { getCategoryPageHref } from "@/lib/category-routes";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";
import { categoryThemeStyle } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

type CategoryGridProps = {
  className?: string;
  categories?: CalculatorCategory[];
};

/** Responsive category cards — step 1 of Grid-to-Modal. */
export function CategoryGrid({
  className,
  categories = CATEGORY_DISPLAY_ORDER,
}: CategoryGridProps) {
  return (
    <ul className={cn("wq-category-grid", className)} role="list">
      {categories.map((category) => {
        const Icon = CALCULATOR_CATEGORY_ICONS[category];
        const count = getCalculatorsByCategory(category).length;
        return (
          <li key={category}>
            <div
              className="wq-category-card"
              style={categoryThemeStyle(category)}
            >
              <Link
                href={getCategoryPageHref(category)}
                className="wq-card-overlay-link"
                aria-label={`Open ${CALCULATOR_CATEGORY_LABELS[category]} calculators`}
              />
              <span className="wq-category-card__icon" aria-hidden>
                <Icon strokeWidth={1.75} className="size-6" />
              </span>
              <span className="wq-category-card__title">
                {CALCULATOR_CATEGORY_LABELS[category]}
              </span>
              <span className="wq-category-card__meta">
                {count} tools · {CALCULATOR_CATEGORY_DESCRIPTIONS[category]}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

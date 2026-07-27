import Link from "next/link";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import {
  CALCULATOR_CATEGORY_ICONS,
  CATEGORY_DISPLAY_ORDER,
} from "@/lib/calculator-category-icons";
import { getCategoryPageHref } from "@/lib/category-routes";
import { cn } from "@/lib/utils";

type HubCategoryGridProps = {
  className?: string;
  categories?: CalculatorCategory[];
};

/**
 * Compact 4-column category launcher under the homepage ecosystem diagram.
 * Icon + label use brand neon green (#a3e635 — same as logo "Quick" accent).
 */
export function HubCategoryGrid({
  className,
  categories = CATEGORY_DISPLAY_ORDER,
}: HubCategoryGridProps) {
  return (
    <ul className={cn("wq-hub-cat-grid", className)} role="list">
      {categories.map((category) => {
        const Icon = CALCULATOR_CATEGORY_ICONS[category];
        const label = CALCULATOR_CATEGORY_LABELS[category];
        return (
          <li key={category}>
            <Link
              href={getCategoryPageHref(category)}
              className="wq-hub-cat-card"
              aria-label={`Open ${label} calculators`}
            >
              <span className="wq-hub-cat-card__icon" aria-hidden>
                <Icon strokeWidth={1.75} className="size-5" />
              </span>
              <span className="wq-hub-cat-card__title">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

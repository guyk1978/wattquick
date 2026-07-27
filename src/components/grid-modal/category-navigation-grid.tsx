import type { CSSProperties } from "react";
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
import { categoryThemeStyle } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

type CategoryNavigationGridProps = {
  className?: string;
  categories?: CalculatorCategory[];
  /**
   * Current category page — paints every card icon/label with this
   * category's accent (not each tile's own color).
   */
  activeCategory?: CalculatorCategory;
};

/**
 * Shared neon category launcher — homepage hub + every category landing.
 * On a category page, the whole grid inherits that page's accent color.
 */
export function CategoryNavigationGrid({
  className,
  categories = CATEGORY_DISPLAY_ORDER,
  activeCategory,
}: CategoryNavigationGridProps) {
  const gridTheme: CSSProperties | undefined = activeCategory
    ? categoryThemeStyle(activeCategory)
    : undefined;

  return (
    <nav
      className={cn("wq-cat-nav", className)}
      style={gridTheme}
      aria-label="Calculator categories"
    >
      <ul className="wq-cat-nav__grid" role="list">
        {categories.map((category) => {
          const Icon = CALCULATOR_CATEGORY_ICONS[category];
          const label = CALCULATOR_CATEGORY_LABELS[category];
          const isActive = category === activeCategory;
          return (
            <li key={category}>
              <Link
                href={getCategoryPageHref(category)}
                className={cn(
                  "wq-cat-nav__card",
                  isActive && "wq-cat-nav__card--active"
                )}
                aria-label={`Open ${label} calculators`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="wq-cat-nav__icon" aria-hidden>
                  <Icon strokeWidth={1.75} className="size-5" />
                </span>
                <span className="wq-cat-nav__title">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorId,
} from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import {
  CALCULATOR_CATEGORY_ICONS,
  CATEGORY_DISPLAY_ORDER,
} from "@/lib/calculator-category-icons";
import { getCategoryPageHref } from "@/lib/category-routes";
import { BlueprintLeftSidebarToggle } from "@/components/blueprint/blueprint-left-sidebar-toggle";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintCategorySidebarProps {
  className?: string;
  calculatorId?: CalculatorId;
  /** Omit or pass null on hub pages (e.g. favorites) with no active category */
  activeCategory?: CalculatorCategory | null;
}

export function CalculatorBlueprintCategorySidebar({
  className,
  calculatorId,
  activeCategory: activeCategoryProp,
}: CalculatorBlueprintCategorySidebarProps) {
  const activeCategory = calculatorId
    ? getCalculatorMeta(calculatorId).category
    : (activeCategoryProp ?? null);

  return (
    <aside
      id="blueprint-categories-sidebar"
      className={cn("calculator-blueprint-categories", className)}
      aria-label="Categories"
    >
      <div className="calculator-blueprint-categories__header">
        <p className="calculator-blueprint-categories__title">Categories</p>
        <BlueprintLeftSidebarToggle
          className="calculator-blueprint-categories__collapse"
          showLabel={false}
        />
      </div>
      <ul className="calculator-blueprint-categories__list" role="list">
        {CATEGORY_DISPLAY_ORDER.map((category) => {
          const Icon = CALCULATOR_CATEGORY_ICONS[category];
          const active =
            activeCategory != null && category === activeCategory;
          return (
            <li key={category}>
              <Link
                href={getCategoryPageHref(category)}
                className={cn(
                  "calculator-blueprint-categories__item",
                  active && "calculator-blueprint-categories__item--active"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className="calculator-blueprint-categories__icon"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="calculator-blueprint-categories__label">
                  {CALCULATOR_CATEGORY_LABELS[category]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

"use client";

import { CategoryNavigationGrid } from "@/components/grid-modal/category-navigation-grid";
import type { CalculatorCategory } from "@/data/calculator-types";
import { cn } from "@/lib/utils";

type ToolModalCategoriesProps = {
  /** Current tool's category — grid accents inherit this page theme. */
  activeCategory: CalculatorCategory;
  className?: string;
};

/** CATEGORIES tab: full site category launcher, themed to the active tool. */
export function ToolModalCategories({
  activeCategory,
  className,
}: ToolModalCategoriesProps) {
  return (
    <section
      className={cn("tool-modal-categories", className)}
      aria-label="All site categories"
    >
      <h3 className="tool-modal-categories__title">Categories</h3>
      <p className="tool-modal-categories__lead">
        Browse every WattQuick calculator category. Accents match this tool&apos;s
        theme.
      </p>
      <CategoryNavigationGrid
        activeCategory={activeCategory}
        className="tool-modal-categories__grid"
      />
    </section>
  );
}

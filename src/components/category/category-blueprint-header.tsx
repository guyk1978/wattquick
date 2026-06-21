import Link from "next/link";
import { CategoryVisualGuide } from "@/components/category/category-visual-guide";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import {
  CALCULATOR_CATEGORY_ICONS,
} from "@/lib/calculator-category-icons";
import { getCategoryPageTitle } from "@/lib/category-routes";
import { cn } from "@/lib/utils";

interface CategoryBlueprintHeaderProps {
  category: CalculatorCategory;
  toolCount: number;
  className?: string;
}

export function CategoryBlueprintHeader({
  category,
  toolCount,
  className,
}: CategoryBlueprintHeaderProps) {
  const Icon = CALCULATOR_CATEGORY_ICONS[category];
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const summary = CALCULATOR_CATEGORY_DESCRIPTIONS[category];

  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint category-blueprint-header",
        className
      )}
    >
      <Link
        href="/calculators/"
        className="calculator-page-header__back text-muted-foreground hover:text-foreground"
      >
        ← All calculators
      </Link>

      <div className="calculator-page-header__meta">
        <div className="calculator-page-header__title-row">
          <span className="calculator-page-header__icon" aria-hidden>
            <Icon className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">
            {getCategoryPageTitle(category)}
          </h1>
          <CategoryVisualGuide category={category} />
          <span className="calculator-page-header__tag">
            {toolCount} {toolCount === 1 ? "tool" : "tools"}
          </span>
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">{summary}</p>
          <span className="category-blueprint-header__label">{label}</span>
        </div>
      </div>
    </header>
  );
}

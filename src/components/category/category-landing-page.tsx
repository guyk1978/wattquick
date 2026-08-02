import Link from "next/link";
import { CalculatorBlueprintCategoryNav } from "@/components/calculator/calculator-blueprint-category-nav";
import { CalculatorBlueprintCategorySidebar } from "@/components/calculator/calculator-blueprint-category-sidebar";
import { CalculatorBlueprintStatsBar } from "@/components/calculator/calculator-blueprint-stats-bar";
import { CalculatorBlueprintToolGrid } from "@/components/calculator/calculator-blueprint-tool-grid";
import { BlueprintShellFrame } from "@/components/blueprint/blueprint-shell-frame";
import { BlueprintShellWorkspace } from "@/components/blueprint/blueprint-shell-workspace";
import { CategoryBlueprintHeader } from "@/components/category/category-blueprint-header";
import { CategoryEngineeringGuide } from "@/components/category/category-engineering-guide";
import { CategoryToolsFocus } from "@/components/category/category-tools-focus";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import type { CalculatorMeta } from "@/lib/calculators";

interface CategoryLandingPageProps {
  category: CalculatorCategory;
  calculators: CalculatorMeta[];
}

export function CategoryLandingPage({
  category,
  calculators,
}: CategoryLandingPageProps) {
  const label = CALCULATOR_CATEGORY_LABELS[category];

  return (
    <div className="calculator-route calculator-route--blueprint">
      <BlueprintShellFrame>
        <CalculatorBlueprintStatsBar
          trailing={
            <div className="calculator-blueprint-toolbar">
              <CategoryToolsFocus
                calculators={calculators.map(({ id, href, title, description }) => ({
                  id,
                  href,
                  title,
                  description,
                }))}
                categoryLabel={label}
              />
              <Link href="/calculators/" className="calculator-blueprint-stats__link">
                All tools
              </Link>
            </div>
          }
        />

        <BlueprintShellWorkspace>
          <CalculatorBlueprintCategorySidebar activeCategory={category} />

          <div className="calculator-blueprint-shell__center">
            <CategoryBlueprintHeader
              category={category}
              toolCount={calculators.length}
            />

            <CategoryEngineeringGuide category={category} />

            <section aria-labelledby="category-tools-heading">
              <h2 id="category-tools-heading" className="category-blueprint-tools__title">
                {label} calculators
              </h2>
              {calculators.length === 0 ? (
                <p className="category-blueprint-tools__empty">
                  No calculators in this category yet.
                </p>
              ) : (
                <CalculatorBlueprintToolGrid calculators={calculators} />
              )}
            </section>
          </div>

          <CalculatorBlueprintCategoryNav category={category} />
        </BlueprintShellWorkspace>
      </BlueprintShellFrame>
    </div>
  );
}

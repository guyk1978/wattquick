import { CategoryEcosystemHero } from "@/components/home/category-ecosystem-hero";
import { CategoryPromoStrip } from "@/components/home/category-promo-strip";
import { CategoryEngineeringGuide } from "@/components/category/category-engineering-guide";
import { CategoryNavigationGrid } from "@/components/grid-modal/category-navigation-grid";
import { GridShell } from "@/components/grid-modal/grid-shell";
import { ToolGrid } from "@/components/grid-modal/tool-grid";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import type { CalculatorMeta } from "@/lib/calculators";
import { getCategoryColor } from "@/lib/category-theme";

type CategoryGridLandingProps = {
  category: CalculatorCategory;
  calculators: CalculatorMeta[];
};

/**
 * Shared category template:
 * hero → optional promo → engineering guide → tools → category nav.
 */
export function CategoryGridLanding({
  category,
  calculators,
}: CategoryGridLandingProps) {
  const label = CALCULATOR_CATEGORY_LABELS[category];

  return (
    <GridShell
      breadcrumbs={[{ label }]}
      themeColor={getCategoryColor(category)}
    >
      <CategoryEcosystemHero category={category} />
      <CategoryPromoStrip category={category} />
      <CategoryEngineeringGuide category={category} />
      <ToolGrid calculators={calculators} />
      <CategoryNavigationGrid activeCategory={category} />
    </GridShell>
  );
}

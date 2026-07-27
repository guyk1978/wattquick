import { CollapsibleSEOContent } from "@/components/collapsible-seo-content";
import { CategoryEcosystemHero } from "@/components/home/category-ecosystem-hero";
import { GridShell } from "@/components/grid-modal/grid-shell";
import { ToolGrid } from "@/components/grid-modal/tool-grid";
import { getCategorySeoContent } from "@/data/category-seo-content";
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

/** Category route: hero schematic + tool grid inside Grid-to-Modal shell. */
export function CategoryGridLanding({
  category,
  calculators,
}: CategoryGridLandingProps) {
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const seo = getCategorySeoContent(category);

  return (
    <GridShell
      breadcrumbs={[{ label }]}
      themeColor={getCategoryColor(category)}
    >
      <CategoryEcosystemHero category={category} />
      <ToolGrid calculators={calculators} />

      <section className="grid-modal-seo-inline" aria-labelledby="category-seo-heading">
        <h2 id="category-seo-heading" className="sr-only">
          About {label} calculators
        </h2>
        <CollapsibleSEOContent title={seo.eyebrow} content={seo.paragraphs} />
      </section>
    </GridShell>
  );
}

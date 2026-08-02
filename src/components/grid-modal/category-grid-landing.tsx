import { CategoryEcosystemHero } from "@/components/home/category-ecosystem-hero";
import { CategoryPromoStrip } from "@/components/home/category-promo-strip";
import { CategoryNavigationGrid } from "@/components/grid-modal/category-navigation-grid";
import { GridShell } from "@/components/grid-modal/grid-shell";
import { ToolGrid } from "@/components/grid-modal/tool-grid";
import { SEOContentBlock } from "@/components/seo-content-block";
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

/**
 * Shared category template: hero → optional promo → tools → category nav → SEO.
 */
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
      <CategoryPromoStrip category={category} />
      <ToolGrid calculators={calculators} />
      <CategoryNavigationGrid activeCategory={category} />

      <section className="grid-modal-seo-inline" aria-labelledby="category-seo-heading">
        <h2 id="category-seo-heading" className="sr-only">
          About {label} calculators
        </h2>
        <SEOContentBlock title={seo.eyebrow} content={seo.paragraphs} />
      </section>
    </GridShell>
  );
}

import { GridShell } from "@/components/grid-modal/grid-shell";
import { ToolGrid } from "@/components/grid-modal/tool-grid";
import { getCategorySeoContent } from "@/data/category-seo-content";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import type { CalculatorMeta } from "@/lib/calculators";

type CategoryGridLandingProps = {
  category: CalculatorCategory;
  calculators: CalculatorMeta[];
};

/** Category route: tool grid inside Grid-to-Modal shell. */
export function CategoryGridLanding({
  category,
  calculators,
}: CategoryGridLandingProps) {
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const seo = getCategorySeoContent(category);

  return (
    <GridShell
      breadcrumbs={[{ label }]}
      title={label}
      description={CALCULATOR_CATEGORY_DESCRIPTIONS[category]}
    >
      <ToolGrid calculators={calculators} />

      <section className="grid-modal-seo-inline" aria-labelledby="category-seo-heading">
        <h2 id="category-seo-heading" className="sr-only">
          About {label} calculators
        </h2>
        <p className="grid-modal-seo-inline__eyebrow">{seo.eyebrow}</p>
        {seo.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </section>
    </GridShell>
  );
}

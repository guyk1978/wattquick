import { GridShell } from "@/components/grid-modal/grid-shell";
import { ToolModalDocumentation } from "@/components/grid-modal/tool-modal-documentation";
import { ToolModalRelated } from "@/components/grid-modal/tool-modal-related";
import { ToolWorkspacePage } from "@/components/grid-modal/tool-workspace-page";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorId,
} from "@/lib/calculators";
import {
  getRelatedArticleCardsForCalculator,
  getRelatedArticlesForCalculator,
} from "@/lib/calculators/related-articles";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getCategoryColor } from "@/lib/category-theme";
import { getCategoryPageHref } from "@/lib/category-routes";

type CalculatorGridModalPageProps = {
  id: CalculatorId;
};

/**
 * Canonical tool route UI: GridNav/GridFooter chrome (same as hub + category
 * pages) around a standalone workspace with vertical section nav and open SEO docs.
 */
export function CalculatorGridModalPage({ id }: CalculatorGridModalPageProps) {
  const meta = getCalculatorMeta(id);
  const categoryLabel = CALCULATOR_CATEGORY_LABELS[meta.category];
  const categoryHref = getCategoryPageHref(meta.category);
  const relatedArticleCards = getRelatedArticleCardsForCalculator(id);
  const relatedArticles = getRelatedArticlesForCalculator(id);

  return (
    <GridShell
      breadcrumbs={[
        { label: categoryLabel, href: categoryHref },
        { label: meta.title },
      ]}
      themeColor={getCategoryColor(meta.category)}
    >
    <ToolWorkspacePage
      calculatorId={id}
      relatedArticles={relatedArticleCards}
      documentation={
        <ToolModalDocumentation id={id} relatedArticles={relatedArticles} />
      }
      related={<ToolModalRelated id={id} />}
    />
    </GridShell>
  );
}

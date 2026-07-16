import { GridShell } from "@/components/grid-modal/grid-shell";
import { ToolGrid } from "@/components/grid-modal/tool-grid";
import {
  ToolModalDocumentation,
  ToolModalDocumentationCrawl,
} from "@/components/grid-modal/tool-modal-documentation";
import { ToolWorkspaceModal } from "@/components/grid-modal/tool-workspace-modal";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorId,
} from "@/lib/calculators";
import {
  getRelatedArticleCardsForCalculator,
  getRelatedArticlesForCalculator,
} from "@/lib/calculators/related-articles";
import { getCalculatorMeta, getCalculatorsByCategory } from "@/lib/calculators/registry";
import { getCategoryPageHref } from "@/lib/category-routes";

type CalculatorGridModalPageProps = {
  id: CalculatorId;
};

/**
 * Tool route UI: category tool grid behind a glassmorphic calculator modal.
 * Canonical URL remains `/tools/{seo-category}/{slug}/`.
 */
export function CalculatorGridModalPage({ id }: CalculatorGridModalPageProps) {
  const meta = getCalculatorMeta(id);
  const peers = getCalculatorsByCategory(meta.category);
  const categoryLabel = CALCULATOR_CATEGORY_LABELS[meta.category];
  const categoryHref = getCategoryPageHref(meta.category);
  const relatedArticleCards = getRelatedArticleCardsForCalculator(id);
  const relatedArticles = getRelatedArticlesForCalculator(id);

  return (
    <>
      <GridShell
        modalOpen
        breadcrumbs={[
          { label: categoryLabel, href: categoryHref },
          { label: meta.title },
        ]}
        title={categoryLabel}
        description={`Browse ${peers.length} ${categoryLabel.toLowerCase()} tools. Opening ${meta.title}.`}
      >
        <ToolGrid calculators={peers} activeId={id} />
      </GridShell>

      <ToolWorkspaceModal
        calculatorId={id}
        open
        relatedArticles={relatedArticleCards}
        documentation={
          <ToolModalDocumentation id={id} relatedArticles={relatedArticles} />
        }
      />

      {/* Crawl-only copy: always in DOM for indexing, never shown to users */}
      <ToolModalDocumentationCrawl id={id} />
    </>
  );
}

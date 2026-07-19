"use client";

import {
  CALCULATOR_CONTENT_HEADINGS,
  getCalculatorContentSection,
} from "@/data/calculator-content";
import { CollapsibleSection } from "@/components/collapsible-section";
import { RelatedArticles } from "@/components/grid-modal/related-articles";
import { getCalculatorDefinition, type CalculatorId } from "@/lib/calculators";
import type { RelatedArticleForModal } from "@/lib/calculators/related-articles";
import { cn } from "@/lib/utils";

type ToolModalDocumentationProps = {
  id: CalculatorId;
  className?: string;
  /**
   * Related articles for Further Reading (opens Article Portal).
   * Pass `[]` when none are configured.
   */
  relatedArticles?: RelatedArticleForModal[];
};

function CalculatorDocsBody({
  id,
  relatedArticles,
  className,
}: {
  id: CalculatorId;
  relatedArticles: RelatedArticleForModal[];
  className?: string;
}) {
  const guide = getCalculatorContentSection(id);
  const { seo, title } = getCalculatorDefinition(id);

  return (
    <article
      className={cn("tool-modal-docs", className)}
      aria-label={`${title} documentation`}
    >
      <header className="tool-modal-docs__intro">
        <h3 className="tool-modal-docs__title">{guide.title}</h3>
      </header>

      <section className="tool-modal-docs__section">
        <h4 className="tool-modal-docs__heading">
          {CALCULATOR_CONTENT_HEADINGS.formula}
        </h4>
        <p className="tool-modal-docs__paragraph">{guide.formula}</p>
      </section>

      <section className="tool-modal-docs__section">
        <h4 className="tool-modal-docs__heading">
          {CALCULATOR_CONTENT_HEADINGS.example}
        </h4>
        <p className="tool-modal-docs__paragraph">{guide.example}</p>
      </section>

      {seo.sections.length > 0 ? (
        <div className="tool-modal-docs__seo">
          <h4 className="tool-modal-docs__heading tool-modal-docs__heading--eyebrow">
            About {title}
          </h4>
          {seo.sections.map((section) => (
            <CollapsibleSection
              key={section.heading}
              title={section.heading}
              headingLevel="h5"
            >
              <p className="tool-modal-docs__paragraph">{section.body}</p>
            </CollapsibleSection>
          ))}
        </div>
      ) : null}

      <RelatedArticles articles={relatedArticles} />
    </article>
  );
}

/** Documentation pane — Further Reading opens the unified Article Portal. */
export function ToolModalDocumentation({
  id,
  className,
  relatedArticles = [],
}: ToolModalDocumentationProps) {
  return (
    <CalculatorDocsBody
      id={id}
      relatedArticles={relatedArticles}
      className={className}
    />
  );
}

/** Crawl-only SEO block — static calculator docs, no interactive articles. */
export function ToolModalDocumentationCrawl({ id }: { id: CalculatorId }) {
  return (
    <div className="grid-modal-seo--crawl-only" data-seo-content aria-hidden="true">
      <CalculatorDocsBody id={id} relatedArticles={[]} />
    </div>
  );
}

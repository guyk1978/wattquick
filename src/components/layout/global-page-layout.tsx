import type { ReactNode } from "react";
import { GridFooter } from "@/components/grid-modal/grid-footer";
import { GridNav, type GridBreadcrumb } from "@/components/grid-modal/grid-nav";
import { GridPinnedCalculatorBar } from "@/components/grid-modal/grid-pinned-calculator-bar";
import { LegalModalProvider } from "@/components/grid-modal/legal-modal-provider";
import { getAllLegalDocuments } from "@/lib/legal-docs";
import { cn } from "@/lib/utils";

export type GlobalPageLayoutProps = {
  children: ReactNode;
  breadcrumbs?: GridBreadcrumb[];
  /** Optional page title shown above the content column */
  title?: string;
  description?: string;
  className?: string;
  /**
   * `article` — max-width 800px (default, readable prose)
   * `wide` — slightly wider for index lists
   */
  width?: "article" | "wide";
};

/**
 * Industrial Matte shell for legacy article / static pages.
 * Matches calculator-grid chrome (GridNav + GridFooter) and forces dark theme.
 */
export function GlobalPageLayout({
  children,
  breadcrumbs,
  title,
  description,
  className,
  width = "article",
}: GlobalPageLayoutProps) {
  const legalDocuments = getAllLegalDocuments();

  return (
    <LegalModalProvider documents={legalDocuments}>
      <div className={cn("global-page-layout", className)}>
        <GridNav breadcrumbs={breadcrumbs} />
        <GridPinnedCalculatorBar />

        <div className="global-page-layout__shell">
          <div
            className={cn(
              "global-page-layout__container",
              width === "wide" && "global-page-layout__container--wide"
            )}
          >
            {title ? (
              <header className="global-page-layout__intro">
                <h1 className="global-page-layout__title">{title}</h1>
                {description ? (
                  <p className="global-page-layout__description">{description}</p>
                ) : null}
              </header>
            ) : null}

            <div className="global-page-layout__content">{children}</div>
          </div>
        </div>

        <GridFooter />
      </div>
    </LegalModalProvider>
  );
}

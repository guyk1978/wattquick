import type { ReactNode } from "react";
import { GridFooter } from "@/components/grid-modal/grid-footer";
import { GridNav, type GridBreadcrumb } from "@/components/grid-modal/grid-nav";
import { GridPinnedCalculatorBar } from "@/components/grid-modal/grid-pinned-calculator-bar";
import { LegalModalProvider } from "@/components/grid-modal/legal-modal-provider";
import { getAllLegalDocuments, type LegalDocId } from "@/lib/legal-docs";
import { cn } from "@/lib/utils";

type GridShellProps = {
  children: ReactNode;
  breadcrumbs?: GridBreadcrumb[];
  title?: string;
  description?: string;
  className?: string;
  /** When true, content behind a tool modal is visually muted; chrome is hidden. */
  modalOpen?: boolean;
  /** Open LegalModal on mount (e.g. /privacy or /terms deep links). */
  initialLegalDoc?: LegalDocId | null;
  /**
   * Category accent color (from categoryConfig.json) injected as
   * `--category-color` so tool cards inside pick up the theme.
   */
  themeColor?: string;
};

/** Page wrapper for Grid-to-Modal architecture (replaces blueprint sidebars). */
export function GridShell({
  children,
  breadcrumbs,
  title,
  description,
  className,
  modalOpen = false,
  initialLegalDoc = null,
  themeColor,
}: GridShellProps) {
  const legalDocuments = getAllLegalDocuments();

  return (
    <LegalModalProvider
      documents={legalDocuments}
      initialDoc={initialLegalDoc}
    >
      <div
        className={cn(
          "grid-modal-root",
          modalOpen && "grid-modal-root--modal-open",
          className
        )}
        style={
          themeColor
            ? ({ "--category-color": themeColor } as React.CSSProperties)
            : undefined
        }
      >
        <GridNav breadcrumbs={breadcrumbs} />
        <GridPinnedCalculatorBar />
        <div className="grid-modal-shell">
          {title ? (
            <header className="grid-modal-shell__intro">
              <h1 className="grid-modal-shell__title">{title}</h1>
              {description ? (
                <p className="grid-modal-shell__description">{description}</p>
              ) : null}
            </header>
          ) : null}
          <div className="grid-modal-shell__body">{children}</div>
        </div>
        <GridFooter />
      </div>
    </LegalModalProvider>
  );
}

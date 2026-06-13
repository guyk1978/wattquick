"use client";

import type { ReactNode } from "react";
import { FavoriteCalculatorButton } from "@/components/favorite-calculator-button";
import { useCalculatorPageShellSlots } from "@/components/calculator/calculator-page-shell-context";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

const DEFAULT_EMPTY_MESSAGE =
  "Enter details in the sidebar to see results";

interface CalculatorPageShellProps {
  calculatorId: CalculatorId;
  pageHeader: ReactNode;
  contentSection?: ReactNode;
  bottomContent?: ReactNode;
  className?: string;
}

function CalculatorPageShellEmpty() {
  return (
    <div className="calculator-page-shell__empty" role="status">
      <p className="calculator-page-shell__empty-title">Results will appear here</p>
      <p className="calculator-page-shell__empty-text">{DEFAULT_EMPTY_MESSAGE}</p>
    </div>
  );
}

/**
 * Viewport-level calculator layout: sidebar + main in document flow,
 * single page scroll; actions and related content stay in the results column.
 */
export function CalculatorPageShell({
  calculatorId,
  pageHeader,
  contentSection,
  bottomContent,
  className,
}: CalculatorPageShellProps) {
  const slots = useCalculatorPageShellSlots();
  const hasMain = slots.main != null;
  const hasMainFooter = Boolean(slots.footer || contentSection || bottomContent);

  return (
    <div className={cn("calculator-page-shell", className)}>
      <div className="calculator-page-shell__workspace">
        <aside
          aria-label="Calculator inputs"
          className="calculator-page-shell__sidebar"
        >
          <div className="calculator-page-shell__sidebar-header">
            <span className="calculator-page-shell__sidebar-title">Inputs</span>
            <p className="calculator-page-shell__sidebar-subtitle">
              Adjust values — results update live
            </p>
          </div>
          <div className="calculator-page-shell__sidebar-body">
            {slots.sidebar ?? (
              <p className="calculator-page-shell__sidebar-placeholder">
                Loading calculator inputs…
              </p>
            )}
          </div>
        </aside>

        <div className="calculator-page-shell__main">
          <div className="calculator-page-shell__main-header">{pageHeader}</div>

          <div className="calculator-page-shell__results-stage">
            <div className="calculator-page-shell__results-inner">
              <div className="calculator-page-shell__results-favorite">
                <FavoriteCalculatorButton calculatorId={calculatorId} />
              </div>
              {hasMain ? slots.main : <CalculatorPageShellEmpty />}
            </div>
          </div>

          {hasMainFooter ? (
            <footer className="calculator-page-shell__main-footer">
              {slots.footer ? (
                <div className="calculator-page-shell__footer">{slots.footer}</div>
              ) : null}
              {contentSection || bottomContent ? (
                <div className="calculator-page-shell__bottom">
                  {contentSection}
                  {bottomContent}
                </div>
              ) : null}
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
}

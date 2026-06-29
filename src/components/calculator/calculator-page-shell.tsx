"use client";

import type { ReactNode } from "react";
import { useCalculatorFocusMode } from "@/components/calculator/calculator-focus-mode-context";
import { CalculatorFocusOverlay } from "@/components/calculator/calculator-focus-overlay";
import { CalculatorBlueprintToolbar } from "@/components/calculator/calculator-blueprint-toolbar";
import { CalculatorBlueprintCategoryNav } from "@/components/calculator/calculator-blueprint-category-nav";
import { CalculatorBlueprintCategorySidebar } from "@/components/calculator/calculator-blueprint-category-sidebar";
import { CalculatorBlueprintStatsBar } from "@/components/calculator/calculator-blueprint-stats-bar";
import { CalculatorBlueprintToolGrid } from "@/components/calculator/calculator-blueprint-tool-grid";
import { ToolAdSlots } from "@/components/calculator/tool-ad-slots";
import { BlueprintShellFrame } from "@/components/blueprint/blueprint-shell-frame";
import { BlueprintShellWorkspace } from "@/components/blueprint/blueprint-shell-workspace";
import { useCalculatorPageShellSlots } from "@/components/calculator/calculator-page-shell-context";
import { getDiscoveryCalculators } from "@/lib/calculator-discovery";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

const DEFAULT_EMPTY_MESSAGE =
  "Enter parameters to see results";

interface CalculatorPageShellProps {
  calculatorId: CalculatorId;
  pageHeader: ReactNode;
  contentSection?: ReactNode;
  bottomContent?: ReactNode;
  className?: string;
}

function CalculatorBlueprintCallouts() {
  return (
    <svg
      className="calculator-blueprint-workbench__callouts"
      viewBox="0 0 120 200"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 28 H72 M0 68 H76 M0 108 H74 M0 148 H78"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="3 2"
        opacity="0.45"
      />
      <path
        d="M72 28 L108 42 M76 68 L110 78 M74 108 L108 112 M78 148 L110 138"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.55"
      />
      <polygon
        points="108,42 104,40 106,44"
        fill="currentColor"
        opacity="0.55"
      />
      <polygon
        points="110,78 106,76 108,80"
        fill="currentColor"
        opacity="0.55"
      />
      <polygon
        points="108,112 104,110 106,114"
        fill="currentColor"
        opacity="0.55"
      />
      <polygon
        points="110,138 106,136 108,140"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function CalculatorPageShellEmpty() {
  return (
    <div className="calculator-page-shell__empty" role="status">
      <p className="calculator-page-shell__empty-title">Awaiting inputs</p>
      <p className="calculator-page-shell__empty-text">{DEFAULT_EMPTY_MESSAGE}</p>
    </div>
  );
}

/**
 * Three-column Industrial Matte Blueprint layout:
 * categories | calculator workbench + tool grid | calculators nav + stamp.
 */
export function CalculatorPageShell({
  calculatorId,
  pageHeader,
  contentSection,
  bottomContent,
  className,
}: CalculatorPageShellProps) {
  const { isOpen: focusOpen, close: closeFocus } = useCalculatorFocusMode();
  const slots = useCalculatorPageShellSlots();
  const hasMain = slots.main != null;
  const discoveryTools = getDiscoveryCalculators(calculatorId);
  const showPageFooter = !focusOpen;

  const inputSlot =
    slots.sidebar ?? (
      <p className="calculator-page-shell__sidebar-placeholder">
        Loading parameters…
      </p>
    );
  const resultSlot = hasMain ? slots.main : <CalculatorPageShellEmpty />;

  return (
    <BlueprintShellFrame className={className}>
      <CalculatorBlueprintStatsBar
        trailing={<CalculatorBlueprintToolbar calculatorId={calculatorId} />}
      />

      <BlueprintShellWorkspace>
        <CalculatorBlueprintCategorySidebar calculatorId={calculatorId} />

        <div className="calculator-blueprint-shell__center">
          <div className="calculator-blueprint-shell__header">{pageHeader}</div>

          <div
            className={cn(
              "calculator-blueprint-workbench",
              focusOpen && "calculator-blueprint-workbench--focus-active"
            )}
          >
            {!focusOpen ? (
              <>
                <div className="calculator-blueprint-workbench__inputs">
                  {inputSlot}
                </div>

                <CalculatorBlueprintCallouts />

                <div className="calculator-blueprint-workbench__results">
                  {resultSlot}
                </div>
              </>
            ) : (
              <>
                <div
                  className="calculator-blueprint-workbench__inputs calculator-blueprint-workbench__placeholder"
                  aria-hidden
                >
                  <CalculatorPageShellEmpty />
                </div>

                <CalculatorBlueprintCallouts />

                <div
                  className="calculator-blueprint-workbench__results calculator-blueprint-workbench__placeholder"
                  aria-hidden
                >
                  <CalculatorPageShellEmpty />
                </div>
              </>
            )}
          </div>

          {showPageFooter ? (
            <footer className="calculator-blueprint-shell__footer">
              {slots.footer ? (
                <div className="calculator-page-shell__footer">{slots.footer}</div>
              ) : null}
              <ToolAdSlots />
              {contentSection || bottomContent ? (
                <div className="calculator-page-shell__bottom">
                  {contentSection}
                  {bottomContent}
                </div>
              ) : null}
            </footer>
          ) : null}

          <CalculatorBlueprintToolGrid calculators={discoveryTools} />
        </div>

        <CalculatorBlueprintCategoryNav calculatorId={calculatorId} />
      </BlueprintShellWorkspace>

      <CalculatorFocusOverlay
        open={focusOpen}
        onClose={closeFocus}
        inputs={inputSlot}
        results={resultSlot}
      />
    </BlueprintShellFrame>
  );
}

"use client";

import { getCalculatorMeta, type CalculatorId } from "@/lib/calculators";
import { getCalculatorViz } from "@/lib/calculator-viz";
import { categoryThemeStyle } from "@/lib/category-theme";
import { SITE_NAME } from "@/lib/seo";
import { cn } from "@/lib/utils";

type VizShareFrameProps = {
  id: CalculatorId;
  className?: string;
};

/**
 * Fixed 1200×630 capture surface for OG/Twitter share cards.
 * Renders the tool's live [VIZ] Data Flow schematic with light brand chrome.
 */
export function VizShareFrame({ id, className }: VizShareFrameProps) {
  const meta = getCalculatorMeta(id);
  const config = getCalculatorViz(id);

  if (!config) {
    return (
      <div
        className={cn("viz-share-frame viz-share-frame--missing", className)}
        data-share-capture="true"
        data-share-id={id}
      >
        <p className="viz-share-frame__missing">No VIZ for {id}</p>
      </div>
    );
  }

  const { Viz, calculatorTitle } = config;

  return (
    <div
      className={cn("viz-share-frame", className)}
      data-share-capture="true"
      data-share-id={id}
      style={categoryThemeStyle(meta.category)}
    >
      <header className="viz-share-frame__chrome">
        <div className="viz-share-frame__brand">
          <span className="viz-share-frame__mark" aria-hidden>
            W
          </span>
          <span className="viz-share-frame__site">{SITE_NAME}</span>
        </div>
        <p className="viz-share-frame__eyebrow">FIG. VIZ — DATA FLOW</p>
      </header>

      <div className="viz-share-frame__body">
        <h1 className="viz-share-frame__title">{calculatorTitle}</h1>
        <div className="viz-share-frame__stage">
          <Viz className="viz-share-frame__viz" />
        </div>
      </div>
    </div>
  );
}

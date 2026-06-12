"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CalculatorSummaryItem {
  label: string;
  value: string;
  unit?: string;
}

export interface CalculatorResultsDashboardProps {
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  summaryItems?: CalculatorSummaryItem[];
  /** Custom hero (gamified dashboards). Falls back to the standard primary metric card. */
  hero?: ReactNode;
  children?: ReactNode;
  className?: string;
}

function recordToSummaryItems(
  record: Record<string, string>
): CalculatorSummaryItem[] {
  return Object.entries(record).map(([label, value]) => ({ label, value }));
}

function parseDetailToSummary(detail: string | null | undefined): CalculatorSummaryItem[] {
  if (!detail?.trim()) return [];
  return detail
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colon = part.indexOf(":");
      if (colon > 0) {
        return {
          label: part.slice(0, colon).trim(),
          value: part.slice(colon + 1).trim(),
        };
      }
      return { label: part, value: "" };
    })
    .filter((item) => item.label.length > 0);
}

export function CalculatorResultsDashboard({
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter details in the sidebar to see results",
  summaryItems,
  hero,
  children,
  className,
}: CalculatorResultsDashboardProps) {
  const hasResult = value !== null;
  const hasExplicitSummary = summaryItems !== undefined && summaryItems.length > 0;
  const summaries =
    summaryItems ?? (detail && !hero ? parseDetailToSummary(detail) : []);

  const showSummaryGrid = hasResult && summaries.length > 0 && (!hero || hasExplicitSummary);

  return (
    <div className={cn("calculator-results-dashboard", className)}>
      <div className="calculator-dashboard-hero">
        {hero ?? (
          <section
            aria-live="polite"
            aria-atomic="true"
            className="calculator-dashboard-hero__card"
          >
            <p className="calculator-dashboard-hero__label">{label}</p>
            {hasResult ? (
              <>
                <div className="calculator-dashboard-hero__value-row">
                  <span className="calculator-dashboard-hero__value">{value}</span>
                  {unit ? (
                    <span className="calculator-dashboard-hero__unit">{unit}</span>
                  ) : null}
                </div>
                {detail && summaries.length === 0 ? (
                  <p className="calculator-dashboard-hero__detail">{detail}</p>
                ) : null}
              </>
            ) : (
              <p className="calculator-dashboard-hero__empty">{emptyMessage}</p>
            )}
          </section>
        )}
      </div>

      {showSummaryGrid ? (
        <div className="calculator-dashboard-summary-grid" role="list">
          {summaries.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="calculator-dashboard-summary-card"
              role="listitem"
            >
              <p className="calculator-dashboard-summary-card__label">{item.label}</p>
              <p className="calculator-dashboard-summary-card__value">
                {item.value}
                {item.unit ? (
                  <span className="calculator-dashboard-summary-card__unit">
                    {item.unit}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {children}
    </div>
  );
}

export { recordToSummaryItems };

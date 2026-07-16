"use client";

import type { ReactNode } from "react";
import type { CalculatorStatusAlert } from "@/lib/calculator-status";
import { cn } from "@/lib/utils";
import { CalculatorStatusShell } from "./calculator-status-shell";
import { CalculatorResultActions } from "./calculator-result-actions";

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
  statusAlert?: CalculatorStatusAlert | null;
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

function buildStatusMetrics(
  label: string,
  value: string,
  unit: string | undefined,
  summaries: CalculatorSummaryItem[],
  detail: string | null | undefined
): CalculatorSummaryItem[] {
  const metrics: CalculatorSummaryItem[] = [{ label, value, unit }];

  for (const item of summaries) {
    if (metrics.length >= 2) break;
    if (item.label.toLowerCase() === label.toLowerCase()) continue;
    metrics.push(item);
  }

  if (metrics.length < 2 && detail) {
    const panelMatch = detail.match(/(\d[\d,]*)\s*panels?/i);
    if (panelMatch) {
      metrics.push({
        label: "Estimated panel count",
        value: panelMatch[1],
        unit: "Panels",
      });
    }
  }

  return metrics.slice(0, 2);
}

function formatMetricUnit(unit: string | undefined, label: string) {
  if (unit) return unit;
  if (/panel/i.test(label)) return "Panels";
  return undefined;
}

function CalculatorStatusMetrics({
  label,
  value,
  unit,
  summaries,
  detail,
}: {
  label: string;
  value: string;
  unit?: string;
  summaries: CalculatorSummaryItem[];
  detail?: string | null;
}) {
  const metrics = buildStatusMetrics(label, value, unit, summaries, detail);

  return (
    <div className="calculator-status-board__metrics" role="list">
      {metrics.map((metric) => {
        const metricUnit = formatMetricUnit(metric.unit, metric.label);
        return (
          <div
            key={`${metric.label}-${metric.value}`}
            className="calculator-status-board__metric"
            role="listitem"
          >
            <p className="calculator-status-board__metric-value">
              {metric.value}
              {metricUnit ? (
                <span className="calculator-status-board__metric-unit">
                  {" "}
                  {metricUnit}
                </span>
              ) : null}
            </p>
            <p className="calculator-status-board__metric-label">{metric.label}</p>
          </div>
        );
      })}
    </div>
  );
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
  statusAlert,
}: CalculatorResultsDashboardProps) {
  const hasResult = value !== null;
  const hasExplicitSummary = summaryItems !== undefined && summaryItems.length > 0;
  const summaries =
    summaryItems ?? (detail && !hero ? parseDetailToSummary(detail) : []);

  const showExternalSummaryGrid =
    hasResult &&
    summaries.length > 0 &&
    hero != null &&
    hasExplicitSummary;

  return (
    <div className={cn("calculator-results-dashboard", className)}>
      <div className="calculator-dashboard-hero">
        <CalculatorStatusShell
          label={label}
          emptyMessage={emptyMessage}
          hasResult={hasResult}
          statusAlert={statusAlert}
        >
          {hero ? (
            <div className="calculator-status-shell__hero">{hero}</div>
          ) : hasResult && value ? (
            <CalculatorStatusMetrics
              label={label}
              value={value}
              unit={unit}
              summaries={summaries}
              detail={detail}
            />
          ) : null}
        </CalculatorStatusShell>
        {hasResult && value ? (
          <CalculatorResultActions
            label={label}
            value={value}
            unit={unit}
            detail={detail}
            className="calculator-results-dashboard__actions"
          />
        ) : null}
      </div>

      {showExternalSummaryGrid ? (
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

"use client";

import type { CalculatorId } from "@/lib/calculators";
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { VampireLineBreakdown, VampireParsedResult } from "./types";

export interface CalculatorResultsProps {
  calculatorId: CalculatorId;
  resultLabel: string;
  emptyMessage?: string;
  annualValue: string | null;
  annualDetail: string | null;
  parsed: VampireParsedResult | null;
  lineBreakdown: readonly VampireLineBreakdown[];
  className?: string;
}

export function CalculatorResults({
  calculatorId,
  resultLabel,
  emptyMessage,
  annualValue,
  annualDetail,
  parsed,
  lineBreakdown,
  className,
}: CalculatorResultsProps) {
  return (
    <div className={cn("calculator-results-dashboard", className)}>
      <div className="calculator-dashboard-hero">
        <CostGamifiedResult
          calculatorId={calculatorId}
          label={resultLabel}
          value={annualValue}
          unit="/yr"
          detail={parsed ? null : annualDetail}
          emptyMessage={emptyMessage}
          className="calculator-dashboard-hero__card calculator-dashboard-hero__card--gamified"
        />
      </div>

      {parsed ? (
        <div className="calculator-dashboard-summary-grid" role="list">
          <div className="calculator-dashboard-summary-card" role="listitem">
            <p className="calculator-dashboard-summary-card__label">Annual energy</p>
            <p className="calculator-dashboard-summary-card__value">
              {formatNumber(parsed.annualKwh, { maxDecimals: 0 })}
              <span className="calculator-dashboard-summary-card__unit">kWh/yr</span>
            </p>
          </div>
          <div className="calculator-dashboard-summary-card" role="listitem">
            <p className="calculator-dashboard-summary-card__label">Monthly cost</p>
            <p className="calculator-dashboard-summary-card__value">
              {formatCurrency(parsed.monthlyCost)}
              <span className="calculator-dashboard-summary-card__unit">/mo</span>
            </p>
          </div>
          <div className="calculator-dashboard-summary-card" role="listitem">
            <p className="calculator-dashboard-summary-card__label">Total standby draw</p>
            <p className="calculator-dashboard-summary-card__value">
              {parsed.totalStandbyWatts}
              <span className="calculator-dashboard-summary-card__unit">W</span>
            </p>
          </div>
          <div className="calculator-dashboard-summary-card" role="listitem">
            <p className="calculator-dashboard-summary-card__label">Device rows</p>
            <p className="calculator-dashboard-summary-card__value">{parsed.lineCount}</p>
          </div>
        </div>
      ) : null}

      {parsed && lineBreakdown.length > 0 ? (
        <div className="calculator-dashboard-table">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Cost breakdown by device row</caption>
            <thead>
              <tr>
                <th>Device</th>
                <th className="hidden sm:table-cell">Load</th>
                <th className="text-right">$/yr</th>
              </tr>
            </thead>
            <tbody>
              {lineBreakdown.map((row, rowIndex) => (
                <tr key={`${rowIndex}-${row.label}-${row.subtotalWatts}`}>
                  <td>
                    {row.label}
                    <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">
                      {row.watts} W × {row.count}
                    </span>
                  </td>
                  <td className="hidden tabular-nums text-muted-foreground sm:table-cell">
                    {row.watts} W × {row.count} ({row.subtotalWatts} W)
                  </td>
                  <td className="text-right font-mono font-medium tabular-nums">
                    {formatCurrency(row.annualCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

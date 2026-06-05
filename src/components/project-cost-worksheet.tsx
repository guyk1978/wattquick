"use client";

import { Input } from "@/components/ui/input";
import {
  buildBomCostLines,
  computeBomTotal,
  formatCurrency,
  parseUnitPrice,
  type BomCostLine,
  type EngineeringRollup,
} from "@/lib/project-rollup";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectCostWorksheetProps {
  rollup: EngineeringRollup;
  costPrices: Record<string, string>;
  onUnitPriceChange: (lineId: string, value: string) => void;
  className?: string;
}

function lineTotal(line: BomCostLine, unitPrices: Record<string, string>): number {
  return line.quantity * parseUnitPrice(unitPrices[line.id] ?? "");
}

export function ProjectCostWorksheet({
  rollup,
  costPrices,
  onUnitPriceChange,
  className,
}: ProjectCostWorksheetProps) {
  const lines = buildBomCostLines(rollup);
  const grandTotal = computeBomTotal(lines, costPrices);

  return (
    <section className={cn("space-y-3", className)}>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Materials &amp; cost estimate
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter unit prices from your supplier. Totals update live.
        </p>
      </div>

      <div className="calculator-results-table overflow-x-auto">
        <table className="calculator-results-table__grid w-full min-w-[32rem] border-collapse text-sm">
          <thead>
            <tr className="calculator-results-table__row border-b border-border/40 bg-muted/20">
              <th
                scope="col"
                className="calculator-results-table__label px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Component
              </th>
              <th
                scope="col"
                className="calculator-results-table__value px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Qty
              </th>
              <th
                scope="col"
                className="calculator-results-table__value px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Unit price
              </th>
              <th
                scope="col"
                className="calculator-results-table__value px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Line total
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => {
              const total = lineTotal(line, costPrices);
              return (
                <tr key={line.id} className="calculator-results-table__row">
                  <td className="calculator-results-table__label px-3 py-2.5">
                    <p className="font-medium text-foreground">{line.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {line.description}
                    </p>
                  </td>
                  <td className="calculator-results-table__value px-3 py-2.5 tabular-nums">
                    {line.quantity} {line.unit}
                  </td>
                  <td className="calculator-results-table__value px-3 py-2.5">
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0"
                      value={costPrices[line.id] ?? ""}
                      onChange={(event) =>
                        onUnitPriceChange(line.id, event.target.value)
                      }
                      aria-label={`Unit price for ${line.label}`}
                      className={cn(
                        calculatorCommandInput,
                        "ml-auto h-9 w-28 rounded-none border-0 px-2 text-right text-sm shadow-none focus-visible:ring-0"
                      )}
                    />
                  </td>
                  <td className="calculator-results-table__value px-3 py-2.5 font-semibold tabular-nums text-foreground">
                    {formatCurrency(total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="calculator-results-table__row border-t border-border/50 bg-muted/10">
              <th
                scope="row"
                colSpan={3}
                className="calculator-results-table__label px-3 py-3 text-right font-semibold text-foreground"
              >
                Project estimate
              </th>
              <td className="calculator-results-table__value px-3 py-3 text-right text-base font-bold tabular-nums text-primary">
                {formatCurrency(grandTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

"use client";

import type { CalculatorId } from "@/lib/calculators";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorResultValue, calculatorResultValueRow } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export interface EvGamifiedResultProps {
  calculatorId: CalculatorId;
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function EvGamifiedResult({
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  className,
}: EvGamifiedResultProps) {
  const hasResult = value !== null;
  const displayValue = value ?? "";

  return (
    <GamifiedDashboardFrame accent="ev" label={label} className={className}>
      <div className={cn("mt-5", !hasResult && "opacity-70")}>
        {!hasResult ? (
          <p className="text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
            {emptyMessage}
          </p>
        ) : (
          <>
            <div className={calculatorResultValueRow}>
              <span className={calculatorResultValue}>{displayValue}</span>
              {unit ? (
                <span className="calculator-result-unit pb-1 font-medium text-muted-foreground">
                  {unit}
                </span>
              ) : null}
            </div>
            {detail ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {detail}
              </p>
            ) : null}
          </>
        )}
      </div>
    </GamifiedDashboardFrame>
  );
}

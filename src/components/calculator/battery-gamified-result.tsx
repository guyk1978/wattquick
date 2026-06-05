"use client";

import type { CalculatorId } from "@/lib/calculators";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorResultValue, calculatorResultValueRow } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export interface BatteryGamifiedResultProps {
  calculatorId: CalculatorId;
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function BatteryGamifiedResult({
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  className,
}: BatteryGamifiedResultProps) {
  const hasResult = value !== null;
  const displayValue = value ?? "";

  return (
    <GamifiedDashboardFrame accent="battery" label={label} className={className}>
      <div className={cn("mt-3", !hasResult && "opacity-70")}>
        {!hasResult ? (
          <p className="text-lg font-medium leading-snug text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          <>
            <div className={calculatorResultValueRow}>
              <span className={calculatorResultValue}>{displayValue}</span>
              {unit ? (
                <span className="calculator-result-unit font-medium text-muted-foreground">
                  {unit}
                </span>
              ) : null}
            </div>
            {detail ? (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {detail}
              </p>
            ) : null}
          </>
        )}
      </div>
    </GamifiedDashboardFrame>
  );
}

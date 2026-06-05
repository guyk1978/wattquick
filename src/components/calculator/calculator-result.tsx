"use client";

import {
  calculatorCommandResult,
  calculatorResultValue,
  calculatorResultValueRow,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export interface CalculatorResultProps {
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function CalculatorResult({
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  className,
}: CalculatorResultProps) {
  const hasResult = value !== null;
  const resultKey = hasResult ? `${value}-${unit ?? ""}-${detail ?? ""}` : "empty";

  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={cn(calculatorCommandResult(), className)}
    >
      <div className="relative min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>

        <div
          key={resultKey}
          className={cn("mt-3 min-h-[3.5rem] min-w-0", !hasResult && "opacity-70")}
        >
          {hasResult ? (
            <>
              <div className={calculatorResultValueRow}>
                <span className={calculatorResultValue}>{value}</span>
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
          ) : (
            <p className="text-lg font-medium leading-snug text-muted-foreground">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

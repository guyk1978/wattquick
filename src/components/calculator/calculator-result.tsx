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
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
          {label}
        </p>

        <div
          key={resultKey}
          className={cn("mt-4 min-h-[4.5rem] min-w-0", !hasResult && "opacity-70")}
        >
          {hasResult ? (
            <>
              <div className={calculatorResultValueRow}>
                <span className={calculatorResultValue}>{value}</span>
                {unit ? (
                  <span className="calculator-result-unit pb-1 font-medium text-muted-foreground">
                    {unit}
                  </span>
                ) : null}
              </div>
              {detail ? (
                <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              ) : null}
            </>
          ) : (
            <p className="text-center text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

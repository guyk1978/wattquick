"use client";

import {
  calculatorCommandResult,
  calculatorResultSuccessValue,
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
      className={cn(
        calculatorCommandResult(),
        "calculator-status-board__metric calculator-status-metric-card transition-colors duration-200",
        hasResult && "calculator-command-result--success",
        className
      )}
    >
      <div className="relative min-w-0 text-center">
        <p className="calculator-status-board__metric-label m-0 text-[0.8125rem] font-medium text-muted-foreground">
          {label}
        </p>

        <div
          key={resultKey}
          className={cn("mt-2 min-h-[2.5rem] min-w-0", !hasResult && "opacity-70")}
        >
          {hasResult ? (
            <>
              <div className={cn(calculatorResultValueRow, "justify-center")}>
                <span
                  className={cn(
                    calculatorResultValue,
                    calculatorResultSuccessValue,
                    "calculator-status-board__metric-value text-[clamp(1.5rem,4vw,2rem)]"
                  )}
                >
                  {value}
                </span>
                {unit ? (
                  <span className="calculator-status-board__metric-unit text-lg font-semibold text-status-success">
                    {unit}
                  </span>
                ) : null}
              </div>
              {detail ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
              ) : null}
            </>
          ) : (
            <p className="text-base font-medium leading-snug text-muted-foreground">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

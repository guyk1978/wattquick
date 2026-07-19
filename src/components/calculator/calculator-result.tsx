"use client";

import {
  calculatorCommandResult,
  calculatorResultSuccessValue,
  calculatorResultValue,
  calculatorResultValueRow,
} from "@/lib/glass-ui";
import { ResultInterpreter } from "@/components/calculator/result-interpreter";
import { useCalculatorId } from "@/components/calculator/calculator-id-context";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

export interface CalculatorResultProps {
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  /** Override registry-label detection for custom primary result labels. */
  interpret?: boolean;
  className?: string;
}

export function CalculatorResult({
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  interpret,
  className,
}: CalculatorResultProps) {
  const hasResult = value !== null;
  const calculatorId = useCalculatorId();
  const primaryLabel = calculatorId
    ? getCalculatorDefinition(calculatorId).result.label
    : null;
  const isPrimaryResult =
    interpret ??
    (primaryLabel?.trim().toLowerCase() === label.trim().toLowerCase());
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
            <div className="calculator-result-primary">
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
              {isPrimaryResult ? (
                <ResultInterpreter
                  value={value}
                  unit={unit}
                  detail={detail}
                />
              ) : null}
              {detail ? (
                <p className="calculator-result-primary__detail">{detail}</p>
              ) : null}
            </div>
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

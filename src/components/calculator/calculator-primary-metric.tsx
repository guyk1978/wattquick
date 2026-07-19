"use client";

import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { ResultInterpreter } from "@/components/calculator/result-interpreter";
import type { CalculatorId } from "@/lib/calculators";
import {
  calculatorResultValue,
  calculatorResultValueRow,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorPrimaryMetricProps {
  value: string | number | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  /** When value is numeric, animate count-up (static display in AnimatedCounter) */
  animateNumeric?: boolean;
  decimals?: number;
  className?: string;
  /** Raw inputs for the plain-English ResultInterpreter. */
  values?: Record<string, string>;
  /** Explicit calculator id; falls back to panel context. */
  calculatorId?: CalculatorId;
}

/** Large value + unit row for primary results, with a plain-English summary underneath. */
export function CalculatorPrimaryMetric({
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  animateNumeric = false,
  decimals = 1,
  className,
  values,
  calculatorId,
}: CalculatorPrimaryMetricProps) {
  const hasResult = value !== null && value !== "";
  const displayValue =
    typeof value === "number" ? String(value) : (value as string | null);

  return (
    <div className={cn("calculator-primary-metric", !hasResult && "opacity-70", className)}>
      {!hasResult ? (
        <p className="text-lg font-medium leading-snug text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <>
          <div className={calculatorResultValueRow}>
            <span className={cn(calculatorResultValue, "text-status-success")}>
              {animateNumeric && typeof value === "number" ? (
                <AnimatedCounter target={value} decimals={decimals} />
              ) : (
                value
              )}
            </span>
            {unit ? (
              <span className="calculator-result-unit font-medium text-muted-foreground">
                {unit}
              </span>
            ) : null}
          </div>
          {detail ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
          ) : null}
          <ResultInterpreter
            calculatorId={calculatorId}
            value={displayValue}
            unit={unit}
            detail={detail}
            values={values}
          />
        </>
      )}
    </div>
  );
}

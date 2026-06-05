import { AnimatedCounter } from "@/components/calculator/animated-counter";
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
}

/** Large value + unit row for primary results (no side visuals) */
export function CalculatorPrimaryMetric({
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  animateNumeric = false,
  decimals = 1,
  className,
}: CalculatorPrimaryMetricProps) {
  const hasResult = value !== null && value !== "";

  return (
    <div className={cn("calculator-primary-metric", !hasResult && "opacity-70", className)}>
      {!hasResult ? (
        <p className="text-lg font-medium leading-snug text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <>
          <div className={calculatorResultValueRow}>
            <span className={calculatorResultValue}>
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
        </>
      )}
    </div>
  );
}

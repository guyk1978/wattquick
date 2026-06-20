import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalculatorSecondaryResultsProps {
  children: ReactNode;
  className?: string;
}

/** Stacked secondary result cards inside the global green status shell. */
export function CalculatorSecondaryResults({
  children,
  className,
}: CalculatorSecondaryResultsProps) {
  return (
    <div className={cn("calculator-secondary-results calculator-status-metrics-grid", className)}>
      {children}
    </div>
  );
}

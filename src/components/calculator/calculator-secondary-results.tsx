import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalculatorSecondaryResultsProps {
  children: ReactNode;
  className?: string;
}

/** Stacked secondary result cards — single column, no horizontal scroll */
export function CalculatorSecondaryResults({
  children,
  className,
}: CalculatorSecondaryResultsProps) {
  return (
    <div className={cn("calculator-secondary-results", className)}>
      {children}
    </div>
  );
}

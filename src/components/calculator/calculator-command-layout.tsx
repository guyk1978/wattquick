import type { ReactNode } from "react";
import { CalculatorPanelBrand } from "@/components/calculator/calculator-panel-brand";
import { calculatorCommandPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorCommandShellProps {
  className?: string;
  children: ReactNode;
}

/** Outer calculator panel with brand header */
export function CalculatorCommandShell({
  className,
  children,
}: CalculatorCommandShellProps) {
  return (
    <div className={cn(calculatorCommandPanel(), className)}>
      <div className="calculator-command__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorPanelBrand />
        {children}
      </div>
    </div>
  );
}

interface CalculatorCommandSplitProps {
  inputs: ReactNode;
  results: ReactNode;
  className?: string;
}

/** Inputs stacked left, primary results right */
export function CalculatorCommandSplit({
  inputs,
  results,
  className,
}: CalculatorCommandSplitProps) {
  return (
    <div className={cn("calculator-command__split", className)}>
      <div className="calculator-command__split-inputs">{inputs}</div>
      <div className="calculator-command__split-results">{results}</div>
    </div>
  );
}

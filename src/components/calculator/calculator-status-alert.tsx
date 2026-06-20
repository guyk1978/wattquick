"use client";

import { AlertTriangle } from "lucide-react";
import type { CalculatorStatusAlert } from "@/lib/calculator-status";
import { calculatorStatusWarningAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorStatusAlertBarProps {
  alert: CalculatorStatusAlert;
  className?: string;
}

export function CalculatorStatusAlertBar({
  alert,
  className,
}: CalculatorStatusAlertBarProps) {
  return (
    <div
      role="status"
      className={cn(
        "calculator-status-alert flex items-start gap-2.5 transition-colors duration-200",
        alert.variant === "warning" && [
          "calculator-status-alert--warning",
          calculatorStatusWarningAlert,
        ],
        className
      )}
    >
      <AlertTriangle className="calculator-status-alert__icon size-4 shrink-0" aria-hidden />
      <p className="calculator-status-alert__text m-0 text-[0.6875rem] font-medium leading-tight">
        {alert.message}
      </p>
    </div>
  );
}

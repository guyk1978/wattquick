"use client";

import type { ReactNode } from "react";
import type { CalculatorStatusAlert } from "@/lib/calculator-status";
import { cn } from "@/lib/utils";
import { CalculatorStatusAlertBar } from "./calculator-status-alert";

export interface CalculatorStatusShellProps {
  label: string;
  emptyMessage?: string;
  hasResult: boolean;
  statusAlert?: CalculatorStatusAlert | null;
  className?: string;
  children: ReactNode;
}

/** Global green results container — used by all calculator output layouts. */
export function CalculatorStatusShell({
  label,
  emptyMessage = "Enter values to see results",
  hasResult,
  statusAlert,
  className,
  children,
}: CalculatorStatusShellProps) {
  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "calculator-status-board calculator-status-shell calculator-status-shell--blueprint transition-colors duration-200",
        "overflow-hidden rounded-md border border-status-success bg-status-success-surface/80",
        "px-3 pt-2.5 pb-0 text-center",
        className
      )}
    >
      <p className="calculator-status-board__eyebrow m-0 text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-status-success">
        {label}
      </p>

      {hasResult ? (
        <div className="calculator-status-shell__body mt-2 pb-2">{children}</div>
      ) : (
        <p className="calculator-status-board__empty m-4 text-lg font-semibold text-status-success">
          {emptyMessage}
        </p>
      )}

      {statusAlert && hasResult ? (
        <CalculatorStatusAlertBar alert={statusAlert} />
      ) : null}
    </section>
  );
}

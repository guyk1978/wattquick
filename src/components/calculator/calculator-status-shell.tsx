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

/** Global results container — Dark Industrial Matte energy accent. */
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
        "overflow-hidden rounded-none border border-[color:var(--matte-border)] bg-[color:var(--matte-card)]",
        "shadow-[var(--matte-card-shadow,none)]",
        "px-3 pt-2.5 pb-0 text-center",
        className
      )}
    >
      <p className="calculator-status-board__eyebrow m-0 text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-[color:var(--energy-accent,var(--brand-green))]">
        {label}
      </p>

      {hasResult ? (
        <div className="calculator-status-shell__body mt-2 pb-2">{children}</div>
      ) : (
        <p className="calculator-status-board__empty m-4 text-lg font-semibold text-muted-foreground">
          {emptyMessage}
        </p>
      )}

      {statusAlert && hasResult ? (
        <CalculatorStatusAlertBar alert={statusAlert} />
      ) : null}
    </section>
  );
}

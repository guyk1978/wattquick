import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CalculatorSidebarDashboardProps {
  inputs: ReactNode;
  results: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Native scroll containers for modal columns (Inputs + Results). */
  scrollable?: boolean;
}

/**
 * Global calculator layout: input panel (left / top) + results dashboard (main).
 * Desktop: rigid 2-column grid. Mobile: stacked with inputs on top.
 */
export function CalculatorSidebarDashboard({
  inputs,
  results,
  footer,
  className,
  scrollable = false,
}: CalculatorSidebarDashboardProps) {
  return (
    <div className={cn("calculator-sidebar-dashboard", className)}>
      <aside aria-label="Calculator inputs" className="calculator-sidebar-dashboard__sidebar">
        <div className="calculator-sidebar-dashboard__sidebar-header">
          <span className="calculator-sidebar-dashboard__sidebar-title">Inputs</span>
          <p className="calculator-sidebar-dashboard__sidebar-subtitle">
            Adjust values to update results live
          </p>
        </div>
        <div
          className={cn(
            "calculator-sidebar-dashboard__sidebar-scroll",
            scrollable && "scroll-container"
          )}
        >
          {inputs}
        </div>
      </aside>

      <div className="calculator-sidebar-dashboard__main">
        <div className="calculator-sidebar-dashboard__results">
          <div
            className={cn(
              "calculator-sidebar-dashboard__results-body",
              scrollable && "scroll-container"
            )}
          >
            {results}
          </div>
        </div>
        {footer ? (
          <div className="calculator-sidebar-dashboard__footer">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

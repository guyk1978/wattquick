"use client";

import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getDefaultResultSnapshot } from "@/lib/dashboard-snapshot";
import type { RecentCalculatorEntry } from "@/lib/dashboard-storage";
import { cn } from "@/lib/utils";

interface DashboardWidgetsProps {
  recent: RecentCalculatorEntry[];
  onOpenCalculator: (id: CalculatorId) => void;
  className?: string;
}

export function DashboardWidgets({
  recent,
  onOpenCalculator,
  className,
}: DashboardWidgetsProps) {
  const slots = [0, 1, 2] as const;

  return (
    <aside
      className={cn("space-y-2", className)}
      aria-labelledby="dashboard-recent-heading"
    >
      <div className="flex items-center gap-2">
        <h2
          id="dashboard-recent-heading"
          className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Recent runs
        </h2>
      </div>

      <ul className="grid list-none gap-1.5 p-0 sm:grid-cols-3 lg:grid-cols-1">
        {slots.map((i) => {
          const entry = recent[i];
          if (!entry) {
            return (
              <li key={`empty-${i}`}>
                <div className="flat-subpanel border-dashed px-2 py-1.5">
                  <p className="text-[10px] leading-snug text-muted-foreground">
                    Tap a flow node to log a run here.
                  </p>
                </div>
              </li>
            );
          }

          const meta = getCalculatorMeta(entry.id);
          const Icon = meta.icon;
          const snapshot =
            entry.resultSnapshot ?? getDefaultResultSnapshot(entry.id);

          return (
            <li key={`${entry.id}-${entry.usedAt}`}>
              <button
                type="button"
                onClick={() => onOpenCalculator(entry.id)}
                className={cn(
                  "flat-panel flex w-full items-center gap-2 px-2 py-1.5 text-left",
                  "transition-colors hover:bg-muted/30",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-none border border-border/50 bg-muted/30 text-primary">
                  <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-foreground">
                    {meta.title}
                  </span>
                  {snapshot ? (
                    <span className="dashboard-widget-stat mt-0.5 block text-xs font-semibold text-foreground">
                      {snapshot}
                    </span>
                  ) : (
                    <span className="mt-0.5 block text-[10px] text-muted-foreground">
                      Open to calculate
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

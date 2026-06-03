"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getDefaultResultSnapshot } from "@/lib/dashboard-snapshot";
import type { RecentCalculatorEntry } from "@/lib/dashboard-storage";
import { neonHeroNumber } from "@/lib/glass-ui";
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
      className={cn("space-y-3", className)}
      aria-labelledby="dashboard-recent-heading"
    >
      <div className="flex items-center gap-2">
        <History className="size-3.5 text-cyan-400" aria-hidden />
        <h2
          id="dashboard-recent-heading"
          className="text-[11px] font-semibold uppercase tracking-widest text-slate-400"
        >
          Recent runs
        </h2>
      </div>

      <ul className="grid list-none gap-2 p-0 sm:grid-cols-3 lg:grid-cols-1">
        {slots.map((i) => {
          const entry = recent[i];
          if (!entry) {
            return (
              <li key={`empty-${i}`}>
                <div className="command-center-widget--empty rounded-lg border border-dashed border-white/10 px-2.5 py-2">
                  <p className="text-[10px] leading-snug text-slate-500">
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
              <motion.button
                type="button"
                layout
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onOpenCalculator(entry.id)}
                className={cn(
                  "command-center-widget-compact flex w-full items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-2 py-1.5 text-left backdrop-blur-sm",
                  "transition-[border-color,box-shadow] hover:border-cyan-500/30 hover:shadow-[0_0_16px_rgba(34,211,238,0.1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-400">
                  <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-slate-200">
                    {meta.title}
                  </span>
                  {snapshot ? (
                    <span
                      className={cn(
                        neonHeroNumber,
                        "dashboard-widget-stat mt-0.5 block text-cyan-300/95"
                      )}
                    >
                      {snapshot}
                    </span>
                  ) : (
                    <span className="mt-0.5 block text-[10px] text-slate-500">
                      Open to calculate
                    </span>
                  )}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

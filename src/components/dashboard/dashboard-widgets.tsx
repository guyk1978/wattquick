"use client";

import { motion } from "framer-motion";
import { Clock, History } from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import type { RecentCalculatorEntry } from "@/lib/dashboard-storage";
import { glassDashboard } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface DashboardWidgetsProps {
  recent: RecentCalculatorEntry[];
  onOpenCalculator: (id: CalculatorId) => void;
  className?: string;
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function DashboardWidgets({
  recent,
  onOpenCalculator,
  className,
}: DashboardWidgetsProps) {
  const slots = [0, 1, 2] as const;

  return (
    <aside
      className={cn("space-y-4", className)}
      aria-labelledby="dashboard-recent-heading"
    >
      <div className="flex items-center gap-2">
        <History className="size-4 text-cyan-400" aria-hidden />
        <h2
          id="dashboard-recent-heading"
          className="text-sm font-semibold uppercase tracking-widest text-slate-300"
        >
          Recent runs
        </h2>
      </div>

      <ul className="grid list-none gap-3 p-0 sm:grid-cols-3 lg:grid-cols-1">
        {slots.map((i) => {
          const entry = recent[i];
          if (!entry) {
            return (
              <li key={`empty-${i}`}>
                <div
                  className={cn(
                    glassDashboard("primary"),
                    "command-center-widget command-center-widget--empty rounded-2xl border border-dashed border-white/10 p-4"
                  )}
                >
                  <p className="text-xs text-slate-500">
                    Open a node on the flow map to pin a calculator here.
                  </p>
                </div>
              </li>
            );
          }

          const meta = getCalculatorMeta(entry.id);
          return (
            <li key={entry.id}>
              <motion.button
                type="button"
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenCalculator(entry.id)}
                className={cn(
                  glassDashboard("primary"),
                  "command-center-widget w-full rounded-2xl p-4 text-left",
                  "border border-white/10 transition-[border-color,box-shadow]",
                  "hover:border-cyan-500/35 hover:shadow-[0_0_24px_rgba(34,211,238,0.15)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                )}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90">
                  {meta.tag}
                </span>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {meta.title}
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="size-3 shrink-0" aria-hidden />
                  {formatRelativeTime(entry.usedAt)}
                </p>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

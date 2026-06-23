"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getDefaultResultSnapshot } from "@/lib/dashboard-snapshot";
import {
  loadRecentCalculators,
  type RecentCalculatorEntry,
} from "@/lib/dashboard-storage";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { RECENT_CALCULATORS_CHANGED_EVENT } from "@/lib/recent-calculators-events";
import { cn } from "@/lib/utils";

const DISPLAY_SLOTS = 4;

const ROW_STYLES =
  "border-black/10 bg-transparent hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.04]";

interface CalculatorsRecentHistoryProps {
  className?: string;
}

export function CalculatorsRecentHistory({ className }: CalculatorsRecentHistoryProps) {
  const [recent, setRecent] = useState<RecentCalculatorEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const refresh = () => setRecent(loadRecentCalculators());

    refresh();
    setHydrated(true);

    window.addEventListener(RECENT_CALCULATORS_CHANGED_EVENT, refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.removeEventListener(RECENT_CALCULATORS_CHANGED_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return (
    <aside
      className={cn(
        "calculators-tech-history flex min-h-full flex-col rounded-2xl border border-black/10 bg-transparent p-4",
        "dark:border-white/10",
        className
      )}
      aria-labelledby="calculators-recent-history-heading"
    >
      <h2
        id="calculators-recent-history-heading"
        className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black dark:text-white"
      >
        Recent history
      </h2>

      <ul className="mt-3 flex flex-1 list-none flex-col gap-1.5 p-0">
        {Array.from({ length: DISPLAY_SLOTS }, (_, index) => {
          const entry = hydrated ? recent[index] : undefined;

          if (!entry) {
            return (
              <li key={`empty-${index}`}>
                <div className="rounded-xl border border-dashed border-black/15 px-3 py-3 dark:border-white/15">
                  <p className="text-sm text-black dark:text-white">
                    {hydrated
                      ? "Open a calculator to log activity here."
                      : "Loading history…"}
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
              <Link
                href={meta.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border px-2.5 py-2 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25",
                  ROW_STYLES
                )}
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-transparent text-black dark:border-white/15 dark:text-white"
                  aria-hidden
                >
                  <Icon className="size-4" strokeWidth={2} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-black dark:text-white">
                    {meta.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-black dark:text-white">
                    {formatRelativeTime(entry.usedAt)}
                  </span>
                </span>

                {snapshot ? (
                  <span className="shrink-0 rounded-full border border-black/10 px-2.5 py-1 text-[0.65rem] font-semibold tabular-nums text-black dark:border-white/15 dark:text-white">
                    {snapshot}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        "flex h-full flex-col rounded-xl border border-border bg-card/80 p-4",
        "dark:border-white/10 dark:bg-zinc-950/60",
        className
      )}
      aria-labelledby="calculators-recent-history-heading"
    >
      <h3
        id="calculators-recent-history-heading"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
      >
        Your recent history
      </h3>

      <ul className="mt-3 flex flex-1 list-none flex-col gap-1 p-0">
        {Array.from({ length: DISPLAY_SLOTS }, (_, index) => {
          const entry = hydrated ? recent[index] : undefined;

          if (!entry) {
            return (
              <li key={`empty-${index}`}>
                <div
                  className={cn(
                    "rounded-lg border border-dashed border-border px-3 py-2.5",
                    "dark:border-white/10"
                  )}
                >
                  <p className="text-sm text-muted-foreground">
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
                  "group flex items-center gap-3 rounded-lg border border-transparent px-2 py-2",
                  "transition-colors hover:border-border hover:bg-muted/50",
                  "dark:hover:border-white/10 dark:hover:bg-white/[0.04]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-md",
                    "border border-border bg-muted/50 text-emerald-600",
                    "dark:border-white/10 dark:bg-black/40 dark:text-emerald-400"
                  )}
                  aria-hidden
                >
                  <Icon className="size-4" strokeWidth={2} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {meta.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {formatRelativeTime(entry.usedAt)}
                    {snapshot ? (
                      <span className="text-muted-foreground/80">
                        {" "}
                        · {snapshot}
                      </span>
                    ) : null}
                  </span>
                </span>

                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

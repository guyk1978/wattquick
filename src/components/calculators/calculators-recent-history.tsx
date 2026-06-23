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
      className={cn("calculators-recent-history", className)}
      aria-labelledby="calculators-recent-history-heading"
    >
      <h2
        id="calculators-recent-history-heading"
        className="calculators-recent-history__heading"
      >
        Recent history
      </h2>

      <ul className="calculators-recent-history__list">
        {Array.from({ length: DISPLAY_SLOTS }, (_, index) => {
          const entry = hydrated ? recent[index] : undefined;

          if (!entry) {
            return (
              <li key={`empty-${index}`}>
                <div className="calculators-recent-history__empty-slot">
                  <p className="calculators-recent-history__empty-text">
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
              <Link href={meta.href} className="calculators-recent-history__item">
                <span className="calculators-recent-history__item-icon" aria-hidden>
                  <Icon className="size-4" strokeWidth={2} />
                </span>

                <span className="calculators-recent-history__item-copy">
                  <span className="calculators-recent-history__item-title">
                    {meta.title}
                  </span>
                  <span className="calculators-recent-history__item-meta">
                    {formatRelativeTime(entry.usedAt)}
                    {snapshot ? (
                      <span className="calculators-recent-history__item-snapshot">
                        {" "}
                        · {snapshot}
                      </span>
                    ) : null}
                  </span>
                </span>

                <ArrowUpRight
                  className="calculators-recent-history__item-arrow"
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

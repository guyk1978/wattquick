"use client";

import { formatCurrency } from "@/lib/format";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface PeakShavingCostVisualProps {
  beforeCost: number;
  afterCost: number;
  beforeBarPercent: number;
  afterBarPercent: number;
  monthlySavings: number;
  className?: string;
}

/** Side-by-side monthly bill bars — before vs. after load shifting */
export function PeakShavingCostVisual({
  beforeCost,
  afterCost,
  beforeBarPercent,
  afterBarPercent,
  monthlySavings,
  className,
}: PeakShavingCostVisualProps) {
  return (
    <div
      className={cn("peak-shaving-cost-visual w-full", className)}
      role="img"
      aria-label={`Monthly bill before ${formatCurrency(beforeCost)}, after ${formatCurrency(afterCost)}, saving ${formatCurrency(monthlySavings)}`}
    >
      <div className={cn(flatVisualPanel, "rounded-none p-4 sm:p-5")}>
        <div className="mb-4 flex items-end justify-center gap-6 sm:gap-10">
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-36 w-14 items-end justify-center sm:h-40 sm:w-16">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-red-600/90 via-amber-500/85 to-amber-400/70 shadow-[0_-6px_20px_rgba(245,158,11,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
                style={{ height: `${beforeBarPercent}%` }}
              />
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-amber-700/90 dark:text-amber-400/90">
              Before
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(beforeCost)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-36 w-14 items-end justify-center sm:h-40 sm:w-16">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700/90 via-emerald-500/85 to-emerald-400/70 shadow-[0_-6px_20px_rgba(34,197,94,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:delay-150"
                style={{ height: `${afterBarPercent}%` }}
              />
              {monthlySavings > 0 ? (
                <div
                  className="pointer-events-none absolute -right-1 top-1/4 flex h-[calc(100%-25%)] w-1.5 items-center justify-center rounded-none bg-emerald-400/40 motion-safe:animate-pulse"
                  aria-hidden
                />
              ) : null}
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-emerald-700/90 dark:text-emerald-400/90">
              After
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(afterCost)}
            </span>
          </div>
        </div>

        {monthlySavings > 0 ? (
          <div className="relative overflow-hidden rounded-none border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-center">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-emerald-400/25 to-transparent motion-safe:animate-pulse"
              aria-hidden
            />
            <p className="text-xs font-medium text-muted-foreground">Cost offset</p>
            <p className="text-base font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
              −{formatCurrency(monthlySavings)}
              <span className="text-xs font-semibold text-muted-foreground"> /mo</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

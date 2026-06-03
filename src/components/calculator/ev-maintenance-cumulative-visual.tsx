"use client";

import { formatCurrency } from "@/lib/format";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface EvMaintenanceCumulativeVisualProps {
  iceCumulativeByYear: number[];
  evCumulativeByYear: number[];
  years: number;
  totalSavings: number;
  className?: string;
}

/** Cumulative maintenance spend — ICE vs. EV by year */
export function EvMaintenanceCumulativeVisual({
  iceCumulativeByYear,
  evCumulativeByYear,
  years,
  totalSavings,
  className,
}: EvMaintenanceCumulativeVisualProps) {
  const maxCumulative = Math.max(
    iceCumulativeByYear[years - 1] ?? 0,
    evCumulativeByYear[years - 1] ?? 0,
    1
  );

  return (
    <div
      className={cn("ev-maintenance-cumulative-visual w-full", className)}
      role="img"
      aria-label={`Cumulative maintenance over ${years} years: ICE ${formatCurrency(iceCumulativeByYear[years - 1] ?? 0)}, EV ${formatCurrency(evCumulativeByYear[years - 1] ?? 0)}, saving ${formatCurrency(totalSavings)}`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4 sm:p-5")}>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Cumulative maintenance cost
        </p>

        <div className="flex items-end justify-center gap-2 sm:gap-3">
          {Array.from({ length: years }, (_, index) => {
            const year = index + 1;
            const ice = iceCumulativeByYear[index] ?? 0;
            const ev = evCumulativeByYear[index] ?? 0;
            const icePct = Math.min(100, Math.max(6, (ice / maxCumulative) * 100));
            const evPct = Math.min(100, Math.max(6, (ev / maxCumulative) * 100));

            return (
              <div
                key={year}
                className="flex flex-1 flex-col items-center gap-1.5 max-w-[4.5rem]"
              >
                <div className="flex h-36 w-full items-end justify-center gap-0.5 sm:h-40">
                  <div
                    className="w-[42%] rounded-t-md bg-gradient-to-t from-red-700/90 via-red-500/80 to-red-400/70 transition-[height] duration-700 ease-out"
                    style={{ height: `${icePct}%` }}
                    title={`ICE year ${year}: ${formatCurrency(ice)}`}
                  />
                  <div
                    className="w-[42%] rounded-t-md bg-gradient-to-t from-emerald-700/90 via-emerald-500/85 to-emerald-400/75 transition-[height] duration-700 ease-out motion-safe:delay-75"
                    style={{ height: `${evPct}%` }}
                    title={`EV year ${year}: ${formatCurrency(ev)}`}
                  />
                </div>
                <span className="text-[0.625rem] font-semibold tabular-nums text-muted-foreground">
                  Yr {year}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[0.625rem] font-semibold uppercase tracking-widest">
          <span className="inline-flex items-center gap-1.5 text-red-700/90 dark:text-red-400/90">
            <span className="size-2.5 rounded-sm bg-red-500" aria-hidden />
            ICE (gas)
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700/90 dark:text-emerald-400/90">
            <span className="size-2.5 rounded-sm bg-emerald-500" aria-hidden />
            EV
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
          <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-2 py-2">
            <p className="text-xs text-muted-foreground">ICE @ {years} yr</p>
            <p className="font-semibold tabular-nums text-foreground">
              {formatCurrency(iceCumulativeByYear[years - 1] ?? 0)}
            </p>
          </div>
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2 py-2">
            <p className="text-xs text-muted-foreground">EV @ {years} yr</p>
            <p className="font-semibold tabular-nums text-foreground">
              {formatCurrency(evCumulativeByYear[years - 1] ?? 0)}
            </p>
          </div>
        </div>

        {totalSavings > 0 ? (
          <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center">
            <p className="text-xs font-medium text-muted-foreground">Gap at year {years}</p>
            <p className="text-sm font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
              {formatCurrency(totalSavings)} less on EV
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

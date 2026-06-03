"use client";

import { formatCurrency } from "@/lib/format";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface LedSavingsBarVisualProps {
  legacyAnnualCost: number;
  ledAnnualCost: number;
  legacyBarPercent: number;
  ledBarPercent: number;
  annualSavings: number;
  className?: string;
}

/** Annual operating cost — legacy bulb vs. LED replacement */
export function LedSavingsBarVisual({
  legacyAnnualCost,
  ledAnnualCost,
  legacyBarPercent,
  ledBarPercent,
  annualSavings,
  className,
}: LedSavingsBarVisualProps) {
  return (
    <div
      className={cn("led-savings-bar-visual w-full", className)}
      role="img"
      aria-label={`Annual operating cost: legacy ${formatCurrency(legacyAnnualCost)}, LED ${formatCurrency(ledAnnualCost)}, saving ${formatCurrency(annualSavings)} per year`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4 sm:p-5")}>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Annual operating cost
        </p>
        <div className="flex items-end justify-center gap-6 sm:gap-12">
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-amber-700/90 via-amber-500/85 to-amber-300/75 shadow-[0_-6px_20px_rgba(245,158,11,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
                style={{ height: `${legacyBarPercent}%` }}
              />
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-amber-700/90 dark:text-amber-400/90">
              Legacy bulb
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(legacyAnnualCost)}
              <span className="text-xs font-medium text-muted-foreground">/yr</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700/90 via-emerald-500/85 to-emerald-300/75 shadow-[0_-6px_20px_rgba(34,197,94,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:delay-150"
                style={{ height: `${ledBarPercent}%` }}
              />
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-emerald-700/90 dark:text-emerald-400/90">
              LED
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(ledAnnualCost)}
              <span className="text-xs font-medium text-muted-foreground">/yr</span>
            </span>
          </div>
        </div>

        {annualSavings > 0 ? (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-center">
            <p className="text-xs font-medium text-muted-foreground">Annual energy savings</p>
            <p className="text-base font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
              {formatCurrency(annualSavings)}
              <span className="text-xs font-semibold text-muted-foreground"> /yr</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

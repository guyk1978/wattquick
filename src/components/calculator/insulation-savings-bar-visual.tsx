"use client";

import { formatCurrency, formatNumber } from "@/lib/format";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface InsulationSavingsBarVisualProps {
  annualKwhBefore: number;
  annualKwhAfter: number;
  annualCostBefore: number;
  annualCostAfter: number;
  beforeBarPercent: number;
  afterBarPercent: number;
  annualSavings: number;
  savingsPercent: number;
  className?: string;
}

/** Annual HVAC energy — before vs. after envelope upgrade */
export function InsulationSavingsBarVisual({
  annualKwhBefore,
  annualKwhAfter,
  annualCostBefore,
  annualCostAfter,
  beforeBarPercent,
  afterBarPercent,
  annualSavings,
  savingsPercent,
  className,
}: InsulationSavingsBarVisualProps) {
  return (
    <div
      className={cn("insulation-savings-bar-visual w-full", className)}
      role="img"
      aria-label={`Annual HVAC energy before upgrade ${formatNumber(annualKwhBefore, { maxDecimals: 0 })} kWh (${formatCurrency(annualCostBefore)}), after ${formatNumber(annualKwhAfter, { maxDecimals: 0 })} kWh (${formatCurrency(annualCostAfter)}), saving ${formatCurrency(annualSavings)} per year`}
    >
      <div className={cn(flatVisualPanel, "rounded-none p-4 sm:p-5")}>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Annual heating &amp; cooling energy
        </p>

        <div className="flex items-end justify-center gap-6 sm:gap-12">
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-orange-700/90 via-orange-500/85 to-orange-300/75 shadow-[0_-6px_20px_rgba(249,115,22,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4"
                style={{ height: `${beforeBarPercent}%` }}
              />
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-orange-700/90 dark:text-orange-400/90">
              Before upgrade
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatNumber(annualKwhBefore, { maxDecimals: 0 })}
              <span className="text-xs font-medium text-muted-foreground"> kWh/yr</span>
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatCurrency(annualCostBefore)}/yr
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700/90 via-emerald-500/85 to-emerald-300/75 shadow-[0_-6px_20px_rgba(34,197,94,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:delay-150"
                style={{ height: `${afterBarPercent}%` }}
              />
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-emerald-700/90 dark:text-emerald-400/90">
              After upgrade
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatNumber(annualKwhAfter, { maxDecimals: 0 })}
              <span className="text-xs font-medium text-muted-foreground"> kWh/yr</span>
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatCurrency(annualCostAfter)}/yr
            </span>
          </div>
        </div>

        {annualSavings > 0 ? (
          <div className="mt-4 rounded-none border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-center">
            <p className="text-xs font-medium text-muted-foreground">Estimated annual savings</p>
            <p className="text-base font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
              {formatCurrency(annualSavings)}
              <span className="text-xs font-semibold text-muted-foreground"> /yr</span>
              <span className="ml-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                (−{formatNumber(savingsPercent, { maxDecimals: 1 })}%)
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

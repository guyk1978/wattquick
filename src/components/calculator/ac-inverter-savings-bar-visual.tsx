"use client";

import { formatCurrency, formatNumber } from "@/lib/format";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Activity, RotateCw } from "lucide-react";

interface AcInverterSavingsBarVisualProps {
  monthlyCostRegular: number;
  monthlyCostInverter: number;
  monthlyKwhRegular: number;
  monthlyKwhInverter: number;
  regularBarPercent: number;
  inverterBarPercent: number;
  monthlySavings: number;
  savingsPercentApplied: number;
  className?: string;
}

/** Monthly cooling electricity — on/off vs. inverter AC */
export function AcInverterSavingsBarVisual({
  monthlyCostRegular,
  monthlyCostInverter,
  monthlyKwhRegular,
  monthlyKwhInverter,
  regularBarPercent,
  inverterBarPercent,
  monthlySavings,
  savingsPercentApplied,
  className,
}: AcInverterSavingsBarVisualProps) {
  return (
    <div
      className={cn("ac-inverter-savings-bar-visual w-full", className)}
      role="img"
      aria-label={`Monthly electricity cost: on/off ${formatCurrency(monthlyCostRegular)}, inverter ${formatCurrency(monthlyCostInverter)}, saving ${formatCurrency(monthlySavings)}`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4 sm:p-5")}>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Monthly electricity cost
        </p>

        <div className="flex items-end justify-center gap-6 sm:gap-12">
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-sky-700/90 via-sky-500/85 to-sky-300/75 shadow-[0_-6px_20px_rgba(14,165,233,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4"
                style={{ height: `${regularBarPercent}%` }}
              />
            </div>
            <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold uppercase tracking-widest text-sky-700/90 dark:text-sky-400/90">
              <RotateCw className="size-3 shrink-0" aria-hidden />
              On/Off
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(monthlyCostRegular)}
              <span className="text-xs font-medium text-muted-foreground">/mo</span>
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatNumber(monthlyKwhRegular, { maxDecimals: 1 })} kWh
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700/90 via-emerald-500/85 to-emerald-300/75 shadow-[0_-6px_20px_rgba(34,197,94,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:delay-150"
                style={{ height: `${inverterBarPercent}%` }}
              />
            </div>
            <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold uppercase tracking-widest text-emerald-700/90 dark:text-emerald-400/90">
              <Activity className="size-3 shrink-0" aria-hidden />
              Inverter
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(monthlyCostInverter)}
              <span className="text-xs font-medium text-muted-foreground">/mo</span>
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatNumber(monthlyKwhInverter, { maxDecimals: 1 })} kWh
            </span>
          </div>
        </div>

        {monthlySavings > 0 ? (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-center">
            <p className="text-xs font-medium text-muted-foreground">Monthly savings (inverter)</p>
            <p className="text-base font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
              {formatCurrency(monthlySavings)}
              <span className="text-xs font-semibold text-muted-foreground"> /mo</span>
              <span className="ml-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                (~{formatNumber(savingsPercentApplied, { maxDecimals: 0 })}% less energy)
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

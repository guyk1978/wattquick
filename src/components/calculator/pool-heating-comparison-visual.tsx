"use client";

import { formatCurrency, formatNumber } from "@/lib/format";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Flame, Snowflake } from "lucide-react";

interface PoolHeatingComparisonVisualProps {
  monthlyHeatingCostElectric: number;
  monthlyHeatingCostHeatPump: number;
  monthlyHeatingSavingsHpVsElectric: number;
  heatPumpCop: number;
  electricBarPercent: number;
  heatPumpBarPercent: number;
  className?: string;
}

/** Monthly pool heating cost — resistance vs. heat pump (same thermal load) */
export function PoolHeatingComparisonVisual({
  monthlyHeatingCostElectric,
  monthlyHeatingCostHeatPump,
  monthlyHeatingSavingsHpVsElectric,
  heatPumpCop,
  electricBarPercent,
  heatPumpBarPercent,
  className,
}: PoolHeatingComparisonVisualProps) {
  return (
    <div
      className={cn("pool-heating-comparison-visual w-full", className)}
      role="img"
      aria-label={`Monthly pool heating: electric ${formatCurrency(monthlyHeatingCostElectric)}, heat pump COP ${heatPumpCop} ${formatCurrency(monthlyHeatingCostHeatPump)}, saving ${formatCurrency(monthlyHeatingSavingsHpVsElectric)}`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4 sm:p-5")}>
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Heating technology comparison
        </p>
        <p className="mb-4 text-center text-[0.625rem] text-muted-foreground">
          Same heat load · heating portion only (pump excluded)
        </p>

        <div className="flex items-end justify-center gap-6 sm:gap-12">
          <div className="flex min-w-0 flex-1 max-w-[5.5rem] flex-col items-center gap-2">
            <div className="relative flex h-36 w-full max-w-[4.5rem] items-end justify-center sm:h-40">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-orange-700/90 via-orange-500/85 to-orange-300/75 shadow-[0_-6px_20px_rgba(249,115,22,0.35)] transition-[height] duration-700 ease-out"
                style={{ height: `${electricBarPercent}%` }}
              />
            </div>
            <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold uppercase tracking-widest text-orange-700/90 dark:text-orange-400/90">
              <Flame className="size-3 shrink-0" aria-hidden />
              Electric
            </span>
            <span className="neon-hero-number w-full text-center text-foreground">
              {formatCurrency(monthlyHeatingCostElectric)}
            </span>
            <span className="text-[0.625rem] text-muted-foreground">/mo · COP 1</span>
          </div>

          <div className="flex min-w-0 flex-1 max-w-[5.5rem] flex-col items-center gap-2">
            <div className="relative flex h-36 w-full max-w-[4.5rem] items-end justify-center sm:h-40">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-cyan-700/90 via-cyan-500/85 to-cyan-300/75 shadow-[0_-6px_20px_rgba(6,182,212,0.35)] transition-[height] duration-700 ease-out motion-safe:delay-150"
                style={{ height: `${heatPumpBarPercent}%` }}
              />
            </div>
            <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold uppercase tracking-widest text-cyan-700/90 dark:text-cyan-400/90">
              <Snowflake className="size-3 shrink-0" aria-hidden />
              Heat pump
            </span>
            <span className="neon-hero-number w-full text-center text-foreground">
              {formatCurrency(monthlyHeatingCostHeatPump)}
            </span>
            <span className="text-[0.625rem] text-muted-foreground">
              /mo · COP {formatNumber(heatPumpCop, { maxDecimals: 0 })}
            </span>
          </div>
        </div>

        {monthlyHeatingSavingsHpVsElectric > 0 ? (
          <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2.5 text-center">
            <p className="text-xs font-medium text-muted-foreground">
              Savings vs. resistance heater
            </p>
            <p className="neon-hero-number text-cyan-900 dark:text-cyan-100">
              {formatCurrency(monthlyHeatingSavingsHpVsElectric)}
              <span className="text-xs font-semibold text-muted-foreground"> /mo</span>
            </p>
          </div>
        ) : null}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[16rem] text-center text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="py-2 font-semibold">Method</th>
                <th className="py-2 font-semibold">COP</th>
                <th className="py-2 font-semibold">Monthly</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              <tr className="border-b border-border/30">
                <td className="py-2 text-foreground">Electric resistance</td>
                <td className="py-2">1</td>
                <td className="py-2 font-semibold">{formatCurrency(monthlyHeatingCostElectric)}</td>
              </tr>
              <tr>
                <td className="py-2 text-foreground">Heat pump</td>
                <td className="py-2">{formatNumber(heatPumpCop, { maxDecimals: 0 })}</td>
                <td className="py-2 font-semibold text-cyan-800 dark:text-cyan-200">
                  {formatCurrency(monthlyHeatingCostHeatPump)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

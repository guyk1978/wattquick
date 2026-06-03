"use client";

import { formatCurrency, formatNumber } from "@/lib/format";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export type LedSavingsChartView = "financial" | "carbon";

interface LedSavingsBarVisualProps {
  view: LedSavingsChartView;
  legacyValue: number;
  ledValue: number;
  legacyBarPercent: number;
  ledBarPercent: number;
  annualSavings: number;
  className?: string;
}

function formatChartValue(view: LedSavingsChartView, value: number): string {
  if (view === "financial") return formatCurrency(value);
  return `${formatNumber(value, { maxDecimals: 1 })} kg`;
}

/** Annual comparison — operating cost or CO₂ footprint (legacy vs. LED) */
export function LedSavingsBarVisual({
  view,
  legacyValue,
  ledValue,
  legacyBarPercent,
  ledBarPercent,
  annualSavings,
  className,
}: LedSavingsBarVisualProps) {
  const isCarbon = view === "carbon";
  const chartTitle = isCarbon ? "Annual CO₂ footprint" : "Annual operating cost";
  const savingsLabel = isCarbon ? "Annual CO₂ avoided" : "Annual energy savings";
  const unitSuffix = isCarbon ? "/yr" : "/yr";

  const ariaLabel = isCarbon
    ? `Annual CO₂: legacy ${formatNumber(legacyValue, { maxDecimals: 1 })} kg, LED ${formatNumber(ledValue, { maxDecimals: 1 })} kg, avoiding ${formatNumber(annualSavings, { maxDecimals: 1 })} kg per year`
    : `Annual operating cost: legacy ${formatCurrency(legacyValue)}, LED ${formatCurrency(ledValue)}, saving ${formatCurrency(annualSavings)} per year`;

  return (
    <div
      className={cn("led-savings-bar-visual w-full", className)}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4 sm:p-5")}>
        <p className="mb-4 flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {isCarbon ? (
            <Leaf
              className="size-3.5 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
          ) : null}
          {chartTitle}
        </p>
        <div className="flex items-end justify-center gap-6 sm:gap-12">
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-16 items-end justify-center sm:h-44 sm:w-[4.5rem]">
              <div
                className={cn(
                  "w-full rounded-t-lg shadow-[0_-6px_20px_rgba(245,158,11,0.35)] transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500",
                  isCarbon
                    ? "bg-gradient-to-t from-zinc-600/90 via-zinc-500/85 to-zinc-400/75 dark:from-zinc-500/90 dark:via-zinc-400/85"
                    : "bg-gradient-to-t from-amber-700/90 via-amber-500/85 to-amber-300/75"
                )}
                style={{ height: `${legacyBarPercent}%` }}
              />
            </div>
            <span
              className={cn(
                "text-[0.625rem] font-semibold uppercase tracking-widest",
                isCarbon
                  ? "text-zinc-600/90 dark:text-zinc-400/90"
                  : "text-amber-700/90 dark:text-amber-400/90"
              )}
            >
              Legacy bulb
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatChartValue(view, legacyValue)}
              <span className="text-xs font-medium text-muted-foreground">
                {unitSuffix}
              </span>
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
              {formatChartValue(view, ledValue)}
              <span className="text-xs font-medium text-muted-foreground">
                {unitSuffix}
              </span>
            </span>
          </div>
        </div>

        {annualSavings > 0 ? (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-center">
            <p className="text-xs font-medium text-muted-foreground">{savingsLabel}</p>
            <p className="text-base font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
              {isCarbon ? "−" : ""}
              {formatChartValue(view, annualSavings)}
              <span className="text-xs font-semibold text-muted-foreground">
                {" "}
                {unitSuffix}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { formatNumber } from "@/lib/format";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface InrushSpikeVisualProps {
  nominalAmps: number;
  peakInrushAmps: number;
  nominalBarPercent: number;
  className?: string;
}

/** Nominal run current vs. inrush peak — spike bar visualization */
export function InrushSpikeVisual({
  nominalAmps,
  peakInrushAmps,
  nominalBarPercent,
  className,
}: InrushSpikeVisualProps) {
  const runPct = Math.min(95, Math.max(8, nominalBarPercent));
  const spikeHeadroom = 100 - runPct;

  return (
    <div
      className={cn("inrush-spike-visual w-full max-w-[240px]", className)}
      role="img"
      aria-label={`Running ${nominalAmps.toFixed(1)} amps, peak inrush ${peakInrushAmps.toFixed(1)} amps`}
    >
      <div className={cn(flatVisualPanel, "space-y-4 rounded-none p-4")}>
        <div className="flex items-end justify-center gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative flex h-32 w-12 items-end justify-center rounded-none bg-muted/50">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-sky-600 to-sky-400 transition-[height] duration-700 ease-out"
                style={{ height: `${runPct}%` }}
              />
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
              Run
            </span>
            <span className="text-xs font-semibold tabular-nums">
              {formatNumber(nominalAmps, { maxDecimals: 1 })} A
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="relative flex h-32 w-14 items-end justify-center rounded-none bg-muted/50">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-sky-500 to-sky-400 transition-[height] duration-500 ease-out"
                style={{ height: `${runPct}%` }}
              />
              <div
                className="absolute inset-x-0 top-0 flex justify-center motion-safe:animate-pulse"
                style={{ height: `${spikeHeadroom}%` }}
              >
                <div className="mt-0.5 h-full w-full rounded-t-md border-2 border-dashed border-amber-400/80 bg-gradient-to-b from-amber-500/70 to-orange-500/50 shadow-[0_0_16px_rgba(245,158,11,0.45)]" />
              </div>
            </div>
            <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Peak
            </span>
            <span className="text-xs font-semibold tabular-nums text-amber-700 dark:text-amber-300">
              {formatNumber(peakInrushAmps, { maxDecimals: 1 })} A
            </span>
          </div>
        </div>

        <p className="text-center text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
          Inrush spike
        </p>
      </div>
    </div>
  );
}

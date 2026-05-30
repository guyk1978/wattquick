"use client";

import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Flame, Zap } from "lucide-react";

interface EvCableLossVisualProps {
  powerLossW: number;
  energyLossKwh: number;
  fillPercent: number;
  className?: string;
}

/** Cable heat-loss indicator — thermal fill + wasted kWh badge */
export function EvCableLossVisual({
  powerLossW,
  energyLossKwh,
  fillPercent,
  className,
}: EvCableLossVisualProps) {
  const fill = Math.min(100, Math.max(6, fillPercent));

  return (
    <div
      className={cn("ev-cable-loss-visual w-full max-w-[200px]", className)}
      role="img"
      aria-label={`Cable dissipates ${powerLossW.toFixed(1)} watts, ${energyLossKwh.toFixed(2)} kilowatt-hours wasted`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4")}>
        <div className="relative mx-auto h-28 w-full max-w-[120px] overflow-hidden rounded-xl bg-orange-950/25 dark:bg-orange-950/60">
          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red-600/90 via-orange-500/85 to-amber-400/75 transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:fade-in"
            style={{ height: `${fill}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Flame
              className="size-10 text-orange-200/90 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] motion-safe:animate-pulse"
              aria-hidden
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 rounded-xl border border-orange-400/30"
            aria-hidden
          />
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2">
          <Zap
            className="size-4 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <p className="text-center text-xs font-semibold tabular-nums text-foreground">
            {energyLossKwh.toFixed(2)} kWh heat
          </p>
        </div>

        <p className="mt-2 text-center text-[0.625rem] font-semibold uppercase tracking-widest text-orange-600/85 dark:text-orange-400/85">
          I²R loss
        </p>
      </div>
    </div>
  );
}

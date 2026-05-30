"use client";

import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface CarbonSavingsVisualProps {
  gridCarbonKg: number;
  savedKg: number;
  savingsPercent: number;
  className?: string;
}

/** Green vs. grid carbon bars for BESS renewable charging comparison */
export function CarbonSavingsVisual({
  gridCarbonKg,
  savedKg,
  savingsPercent,
  className,
}: CarbonSavingsVisualProps) {
  const maxKg = Math.max(gridCarbonKg, 1);
  const gridPct = 100;
  const savedPct = Math.min(100, (savedKg / maxKg) * 100);
  const remainingPct = Math.max(0, gridPct - savedPct);

  return (
    <div
      className={cn("carbon-savings-visual w-full max-w-[240px]", className)}
      role="img"
      aria-label={`${savingsPercent.toFixed(0)} percent carbon savings with renewable charging`}
    >
      <div className={cn(glassSurface, "space-y-4 rounded-2xl p-4")}>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Grid-charged losses</span>
            <span className="tabular-nums">{gridCarbonKg.toFixed(1)} kg/yr</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-muted/80">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-zinc-500/70 dark:bg-zinc-400/50"
              style={{ width: `${remainingPct}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-emerald-500 to-green-400 transition-[width] duration-700 ease-out"
              style={{ width: `${savedPct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2">
          <Leaf
            className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            aria-hidden
          />
          <div className="min-w-0 text-xs leading-snug">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">
              {savedKg.toFixed(1)} kg CO₂/yr avoided
            </p>
            <p className="text-muted-foreground">with renewable charging</p>
          </div>
        </div>

        <p className="text-center text-[0.625rem] font-semibold uppercase tracking-widest text-emerald-600/90 dark:text-emerald-400/90">
          {savingsPercent.toFixed(0)}% cleaner losses
        </p>
      </div>
    </div>
  );
}

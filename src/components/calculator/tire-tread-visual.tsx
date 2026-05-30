"use client";

import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface TireTreadVisualProps {
  iceRemainingPercent: number;
  evRemainingPercent: number;
  className?: string;
}

function TreadBar({
  label,
  remainingPercent,
  accentClass,
}: {
  label: string;
  remainingPercent: number;
  accentClass: string;
}) {
  const worn = 100 - Math.min(100, Math.max(0, remainingPercent));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">{Math.round(remainingPercent)}% tread left</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-muted/80">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out",
            accentClass
          )}
          style={{ width: `${remainingPercent}%` }}
        />
        <div
          className="absolute inset-y-0 right-0 bg-zinc-400/40 dark:bg-zinc-600/50 transition-[width] duration-700 ease-out"
          style={{ width: `${worn}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Side-by-side tread bars comparing ICE vs EV wear at year-end cycle position */
export function TireTreadVisual({
  iceRemainingPercent,
  evRemainingPercent,
  className,
}: TireTreadVisualProps) {
  return (
    <div
      className={cn("tire-tread-visual w-full max-w-[220px]", className)}
      role="img"
      aria-label="Tread depth comparison ICE versus EV"
    >
      <div className={cn(glassSurface, "space-y-4 rounded-2xl p-4")}>
        <TreadBar
          label="ICE (reference)"
          remainingPercent={iceRemainingPercent}
          accentClass="bg-emerald-500/90"
        />
        <TreadBar
          label="EV (faster wear)"
          remainingPercent={evRemainingPercent}
          accentClass="bg-amber-500/90 motion-safe:animate-pulse"
        />
      </div>
    </div>
  );
}

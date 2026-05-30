"use client";

import { LIGHTING_CONTINUOUS_LOAD_FACTOR } from "@/lib/calculators/appliances";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CircuitLoadGaugeProps {
  utilizationPercent: number;
  status: "ok" | "near-limit" | "over-80" | "overloaded";
  className?: string;
}

const FILL_CLASS: Record<CircuitLoadGaugeProps["status"], string> = {
  ok: "bg-emerald-500/90",
  "near-limit": "bg-amber-500/90",
  "over-80": "bg-orange-500/90 motion-safe:animate-pulse",
  overloaded: "bg-red-500/90 motion-safe:animate-pulse",
};

/** Breaker utilization bar with 80% continuous-load marker */
export function CircuitLoadGauge({
  utilizationPercent,
  status,
  className,
}: CircuitLoadGaugeProps) {
  const fill = Math.min(100, Math.max(4, utilizationPercent));
  const markerPct = LIGHTING_CONTINUOUS_LOAD_FACTOR * 100;

  return (
    <div
      className={cn("circuit-load-gauge w-full max-w-[240px]", className)}
      role="img"
      aria-label={`Breaker utilization ${utilizationPercent.toFixed(1)} percent`}
    >
      <div className={cn(glassSurface, "space-y-3 rounded-2xl p-4")}>
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>Breaker use</span>
          <span className="tabular-nums text-foreground">
            {utilizationPercent.toFixed(1)}%
          </span>
        </div>

        <div className="relative h-4 overflow-hidden rounded-full bg-muted/80">
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out",
              FILL_CLASS[status]
            )}
            style={{ width: `${fill}%` }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-foreground/70"
            style={{ left: `${markerPct}%` }}
            aria-hidden
          />
        </div>

        <div className="flex justify-between text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground">
          <span>0%</span>
          <span className="text-amber-600 dark:text-amber-400">
            80% max continuous
          </span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

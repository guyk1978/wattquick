"use client";

import type { BatteryGlow } from "@/lib/battery-dashboard";
import { BatteryVisual } from "@/components/calculator/battery-visual";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { HeartPulse } from "lucide-react";

interface SohGaugeVisualProps {
  sohPercent: number;
  glow: BatteryGlow;
  className?: string;
}

/** State-of-health battery gauge for calendar-aging results */
export function SohGaugeVisual({
  sohPercent,
  glow,
  className,
}: SohGaugeVisualProps) {
  return (
    <div
      className={cn("soh-gauge w-full max-w-[180px]", className)}
      role="img"
      aria-label={`State of health ${Math.round(sohPercent)} percent`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-3")}>
        <BatteryVisual fillPercent={sohPercent} glow={glow} />
        <div className="mt-3 flex items-center justify-center gap-2">
          <HeartPulse
            className={cn(
              "size-4 shrink-0",
              glow === "healthy" && "text-emerald-600 dark:text-emerald-400",
              glow === "caution" && "text-amber-600 dark:text-amber-400",
              glow === "critical" && "text-red-600 dark:text-red-400"
            )}
            aria-hidden
          />
          <p className="text-center text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
            SoH gauge
          </p>
        </div>
      </div>
    </div>
  );
}

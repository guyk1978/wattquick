"use client";

import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface VoltageDropVisualProps {
  supplyVoltage: number;
  voltageAtLoad: number;
  dropPercent: number;
  className?: string;
}

/** Bar graphic showing nominal supply vs. voltage delivered at the load */
export function VoltageDropVisual({
  supplyVoltage,
  voltageAtLoad,
  dropPercent,
  className,
}: VoltageDropVisualProps) {
  const deliveredPct = Math.min(
    100,
    Math.max(0, (voltageAtLoad / supplyVoltage) * 100)
  );
  const lossPct = 100 - deliveredPct;

  return (
    <div
      className={cn("voltage-drop-visual w-full max-w-[240px]", className)}
      role="img"
      aria-label={`Voltage drop ${dropPercent.toFixed(1)} percent, ${voltageAtLoad} volts at load`}
    >
      <div className={cn(flatVisualPanel, "space-y-4 rounded-none p-4")}>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>At load</span>
            <span className="tabular-nums text-foreground">
              {voltageAtLoad.toFixed(1)} V
            </span>
          </div>
          <div className="relative h-4 overflow-hidden rounded-none bg-muted/80">
            <div
              className="absolute inset-y-0 left-0 rounded-none bg-emerald-500/90 transition-[width] duration-700 ease-out"
              style={{ width: `${deliveredPct}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-amber-500/90 to-red-500/80 transition-[width] duration-700 ease-out motion-safe:animate-pulse"
              style={{ width: `${lossPct}%` }}
              aria-hidden
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs">
          <span className="text-muted-foreground">Supply</span>
          <span className="font-mono font-semibold tabular-nums text-foreground">
            {supplyVoltage.toFixed(0)} V
          </span>
        </div>

        <p className="text-center text-[0.625rem] font-semibold uppercase tracking-widest text-amber-600/90 dark:text-amber-400/90">
          −{dropPercent.toFixed(1)}% lost in cable
        </p>
      </div>
    </div>
  );
}

"use client";

import type { CSSProperties } from "react";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface HeatGaugeVisualProps {
  fillPercent: number;
  className?: string;
}

const HEAT_CORE = "#f97316";
const HEAT_EDGE = "#ea580c";
const HEAT_GLOW = "rgba(249, 115, 22, 0.5)";

/** Vertical thermal gauge for solar water-heater efficiency results */
export function HeatGaugeVisual({ fillPercent, className }: HeatGaugeVisualProps) {
  const fill = Math.min(100, Math.max(6, fillPercent));

  return (
    <div
      className={cn("heat-gauge relative mx-auto w-full max-w-[140px]", className)}
      role="img"
      aria-label={`Thermal efficiency gauge ${Math.round(fill)} percent`}
    >
      <div
        className={cn(
          flatVisualPanel,
          "relative rounded-none p-2 transition-[box-shadow] duration-500"
        )}
        style={
          {
            "--heat-glow": HEAT_GLOW,
            boxShadow: `0 0 28px -6px ${HEAT_GLOW}`,
          } as CSSProperties
        }
      >
        <div className="relative h-36 overflow-hidden rounded-none bg-orange-950/25 dark:bg-orange-950/70 sm:h-40">
          <div
            className="absolute inset-x-0 bottom-0 transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:fade-in"
            style={{
              height: `${fill}%`,
              background: `linear-gradient(180deg, #fbbf24aa 0%, ${HEAT_CORE} 45%, ${HEAT_EDGE} 100%)`,
              boxShadow: `0 -10px 28px ${HEAT_GLOW}`,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-4 -translate-y-1/2 opacity-80 motion-safe:animate-pulse"
              style={{
                background:
                  "radial-gradient(ellipse 85% 100% at 50% 0%, #fef3c7 0%, transparent 72%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-3 top-2 h-2 rounded-none bg-white/35 motion-safe:animate-pulse"
              aria-hidden
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 rounded-none border border-orange-400/30"
            aria-hidden
          />

          {[25, 50, 75].map((tick) => (
            <div
              key={tick}
              className="pointer-events-none absolute right-2 w-3 border-t border-orange-200/35 dark:border-orange-400/25"
              style={{ bottom: `${tick}%` }}
              aria-hidden
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[0.625rem] font-semibold uppercase tracking-widest text-orange-600/85 dark:text-orange-400/85">
        Thermal fill
      </p>
    </div>
  );
}

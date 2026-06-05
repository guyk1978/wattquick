"use client";

import type { CSSProperties } from "react";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface WaterGaugeVisualProps {
  fillPercent: number;
  className?: string;
}

const WATER_FILL = "#0ea5e9";
const WATER_GLOW = "rgba(14, 165, 233, 0.45)";

/** Animated tank gauge for solar water-pump sizing results */
export function WaterGaugeVisual({ fillPercent, className }: WaterGaugeVisualProps) {
  const fill = Math.min(100, Math.max(6, fillPercent));

  return (
    <div
      className={cn("water-gauge relative mx-auto w-full max-w-[140px]", className)}
      role="img"
      aria-label={`Solar sizing level ${Math.round(fill)} percent`}
    >
      <div
        className={cn(flatVisualPanel, "relative rounded-none p-2 transition-[box-shadow] duration-500")}
        style={
          {
            "--water-glow": WATER_GLOW,
            boxShadow: `0 0 28px -6px ${WATER_GLOW}`,
          } as CSSProperties
        }
      >
        <div className="relative h-36 overflow-hidden rounded-none bg-sky-950/20 dark:bg-sky-950/70 sm:h-40">
          <div
            className="absolute inset-x-0 bottom-0 transition-[height] duration-700 ease-out motion-safe:animate-in motion-safe:fade-in"
            style={{
              height: `${fill}%`,
              background: `linear-gradient(180deg, ${WATER_FILL}99 0%, ${WATER_FILL} 55%, #0284c7 100%)`,
              boxShadow: `0 -8px 24px ${WATER_GLOW}`,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-3 -translate-y-1/2 opacity-70 motion-safe:animate-pulse"
              style={{
                background: `radial-gradient(ellipse 80% 100% at 50% 0%, white 0%, transparent 70%)`,
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-2 top-1 h-1.5 rounded-none bg-white/40 motion-safe:animate-pulse"
              aria-hidden
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 rounded-none border border-sky-400/25"
            aria-hidden
          />
          {[25, 50, 75].map((tick) => (
            <div
              key={tick}
              className="pointer-events-none absolute right-2 w-3 border-t border-sky-200/30 dark:border-sky-400/20"
              style={{ bottom: `${tick}%` }}
              aria-hidden
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[0.625rem] font-semibold uppercase tracking-widest text-sky-600/80 dark:text-sky-400/80">
        Array fill
      </p>
    </div>
  );
}

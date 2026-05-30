"use client";

import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface WindTurbineVisualProps {
  windSpeedMs: number;
  windGaugeFillPercent: number;
  rotationDurationSec: number;
  className?: string;
}

/** Wind-speed gauge + gently spinning turbine icon */
export function WindTurbineVisual({
  windSpeedMs,
  windGaugeFillPercent,
  rotationDurationSec,
  className,
}: WindTurbineVisualProps) {
  const fill = Math.min(100, Math.max(4, windGaugeFillPercent));

  return (
    <div
      className={cn("wind-turbine-visual w-full max-w-[200px]", className)}
      role="img"
      aria-label={`Wind speed ${windSpeedMs.toFixed(1)} meters per second`}
    >
      <div className={cn(glassSurface, "rounded-2xl p-4")}>
        <div className="relative mx-auto flex size-24 items-center justify-center">
          <div
            className="motion-safe:animate-spin motion-reduce:animate-none"
            style={{ animationDuration: `${rotationDurationSec}s` }}
          >
            <svg viewBox="0 0 80 80" className="size-20" aria-hidden>
              <circle cx="40" cy="40" r="4" fill="currentColor" className="text-sky-600 dark:text-sky-400" />
              {[0, 120, 240].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 40 40)`}>
                  <ellipse
                    cx="40"
                    cy="18"
                    rx="6"
                    ry="20"
                    fill="currentColor"
                    className="text-sky-500/80 dark:text-sky-300/80"
                  />
                </g>
              ))}
              <rect x="38" y="40" width="4" height="22" rx="1" className="fill-zinc-500 dark:fill-zinc-400" />
            </svg>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Wind</span>
            <span className="tabular-nums">{windSpeedMs.toFixed(1)} m/s</span>
          </div>
          <div className="relative h-2.5 overflow-hidden rounded-full bg-sky-950/20 dark:bg-sky-950/60">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 transition-[width] duration-700 ease-out"
              style={{ width: `${fill}%` }}
            />
          </div>
          <div className="flex justify-between text-[0.625rem] text-muted-foreground/80">
            <span>0</span>
            <span>12 m/s</span>
          </div>
        </div>

        <p className="mt-3 text-center text-[0.625rem] font-semibold uppercase tracking-widest text-sky-600/85 dark:text-sky-400/85">
          Breeze meter
        </p>
      </div>
    </div>
  );
}

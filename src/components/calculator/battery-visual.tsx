"use client";

import type { CSSProperties } from "react";
import { BATTERY_GLOW_COLORS, type BatteryGlow } from "@/lib/battery-dashboard";
import { glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface BatteryVisualProps {
  fillPercent: number;
  glow: BatteryGlow;
  className?: string;
}

/** Large animated battery graphic with dynamic fill and theme-aware glow */
export function BatteryVisual({
  fillPercent,
  glow,
  className,
}: BatteryVisualProps) {
  const colors = BATTERY_GLOW_COLORS[glow];
  const fill = Math.min(100, Math.max(4, fillPercent));

  return (
    <div
      className={cn("battery-visual relative mx-auto w-full max-w-[168px]", className)}
      role="img"
      aria-label={`Battery level ${Math.round(fill)} percent`}
    >
      <div
        className={cn(
          glassSurface,
          "relative rounded-[20px] p-2 transition-[box-shadow] duration-500"
        )}
        style={
          {
            "--battery-glow": colors.glowDark,
            boxShadow: `0 0 32px -8px ${colors.glow}`,
          } as CSSProperties
        }
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 dark:opacity-100"
          style={{
            boxShadow: `0 0 48px 4px ${colors.glowDark}, inset 0 0 24px -8px ${colors.glowDark}`,
          }}
        />

        <div className="relative h-36 overflow-hidden rounded-xl bg-zinc-200/60 dark:bg-zinc-950/90 sm:h-40">
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 120 160"
            aria-hidden
          >
            <defs>
              <linearGradient id="battery-specular" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.45" />
                <stop offset="45%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <rect
              x="8"
              y="12"
              width="104"
              height="136"
              rx="12"
              fill="none"
              stroke={colors.fill}
              strokeWidth="3"
              opacity="0.25"
            />
            <rect
              x="8"
              y="12"
              width="104"
              height="136"
              rx="12"
              fill="none"
              stroke={colors.fill}
              strokeWidth="1.5"
              opacity="0.85"
              style={{ filter: `drop-shadow(0 0 6px ${colors.glow})` }}
            />
            <rect x="8" y="12" width="104" height="136" rx="12" fill="url(#battery-specular)" />
          </svg>

          <div
            className="battery-visual__fill absolute bottom-2 left-2 right-2 transition-[height] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              height: `calc(${fill}% - 8px)`,
              maxHeight: "calc(100% - 16px)",
              background: `linear-gradient(180deg, color-mix(in srgb, ${colors.fill} 75%, white) 0%, ${colors.fill} 50%, color-mix(in srgb, ${colors.fill} 90%, black) 100%)`,
              boxShadow: `0 -4px 24px ${colors.glow}, inset 0 2px 8px rgb(255 255 255 / 0.25)`,
              borderRadius: "10px",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/40 to-transparent"
            />
            <div
              aria-hidden
              className="battery-visual__pulse absolute inset-0 opacity-50"
              style={{
                background: `linear-gradient(105deg, transparent 30%, ${colors.fill}55 50%, transparent 70%)`,
              }}
            />
          </div>

          <div
            aria-hidden
            className="absolute inset-0 flex flex-col justify-between py-4 opacity-25"
          >
            {[20, 40, 60, 80].map((tick) => (
              <div
                key={tick}
                className="mx-3 border-t border-zinc-900/40 dark:border-white/25"
              />
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -right-1 top-1/2 h-8 w-2 -translate-y-1/2 rounded-r-md border-2 border-l-0 border-zinc-300/60 bg-zinc-200/50 dark:border-zinc-600/70 dark:bg-zinc-800/70"
        style={{ boxShadow: `2px 0 12px -4px ${colors.glow}` }}
      />
    </div>
  );
}

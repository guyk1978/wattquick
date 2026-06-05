"use client";

import type { CSSProperties } from "react";
import { COST_TIER_COLORS, type CostTier } from "@/lib/cost-dashboard";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CostVisualProps {
  needlePercent: number;
  tier: CostTier;
  className?: string;
}

/** Smart-meter style gauge — needle sweeps green → amber → red */
export function CostVisual({ needlePercent, tier, className }: CostVisualProps) {
  const colors = COST_TIER_COLORS[tier];
  const pct = Math.min(100, Math.max(0, needlePercent));
  const angle = -135 + (pct / 100) * 90;

  return (
    <div
      className={cn("cost-visual relative mx-auto w-full max-w-[200px]", className)}
      role="img"
      aria-label={`Energy cost meter at ${Math.round(pct)} percent intensity`}
    >
      <div
        className={cn(flatVisualPanel, "relative rounded-none p-4")}
        style={
          {
            "--cost-glow": colors.glowDark,
            boxShadow: `0 0 36px -10px ${colors.glow}`,
          } as CSSProperties
        }
      >
        <svg viewBox="0 0 200 120" className="w-full" aria-hidden>
          <defs>
            <linearGradient id="cost-arc-mesh" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="cost-arc-specular" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#cost-arc-mesh)"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.35"
            style={{ filter: `blur(4px) drop-shadow(0 0 8px ${colors.glow})` }}
          />
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="18"
            strokeLinecap="round"
            className="text-zinc-200/40 dark:text-zinc-800/90"
          />
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#cost-arc-mesh)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#cost-arc-specular)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.6"
          />

          {[0, 25, 50, 75, 100].map((tick) => {
            const tickAngle = (-135 + (tick / 100) * 90) * (Math.PI / 180);
            const x1 = 100 + 58 * Math.cos(tickAngle);
            const y1 = 100 + 58 * Math.sin(tickAngle);
            const x2 = 100 + 48 * Math.cos(tickAngle);
            const y2 = 100 + 48 * Math.sin(tickAngle);
            return (
              <line
                key={tick}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-zinc-400/50 dark:text-zinc-500/70"
              />
            );
          })}

          <circle
            cx="100"
            cy="100"
            r="10"
            fill="currentColor"
            className="text-zinc-500 dark:text-zinc-400"
            style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}
          />
          <g
            className="cost-visual__needle"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "100px 100px",
            }}
          >
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="36"
              stroke={colors.needle}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.35"
              style={{ filter: "blur(2px)" }}
            />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="38"
              stroke={colors.needle}
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${colors.glow})` }}
            />
          </g>

          <text
            x="24"
            y="108"
            className="fill-emerald-600 text-[9px] font-bold dark:fill-emerald-400"
          >
            ECO
          </text>
          <text
            x="158"
            y="108"
            className="fill-red-600 text-[9px] font-bold dark:fill-red-400"
          >
            HOG
          </text>
        </svg>

        <div
          aria-hidden
          className="mx-auto mt-1 flex h-1.5 w-3/4 overflow-hidden rounded-none bg-zinc-200/70 dark:bg-zinc-800/80"
        >
          <div className="h-full w-1/3 bg-emerald-500/90 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <div className="h-full w-1/3 bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          <div className="h-full w-1/3 bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.45)]" />
        </div>
      </div>
    </div>
  );
}

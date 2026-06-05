"use client";

import type { CSSProperties } from "react";
import { EV_GLOW_COLORS, type EvGlow } from "@/lib/ev-dashboard";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface EvVisualProps {
  fillPercent: number;
  glow: EvGlow;
  className?: string;
}

/** EV charging gauge — arc fill + car battery silhouette */
export function EvVisual({ fillPercent, glow, className }: EvVisualProps) {
  const colors = EV_GLOW_COLORS[glow];
  const fill = Math.min(100, Math.max(6, fillPercent));
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const arcOffset = circumference * (1 - (fill / 100) * 0.75);

  return (
    <div
      className={cn("ev-visual relative mx-auto w-full max-w-[180px]", className)}
      role="img"
      aria-label={`EV charge gauge ${Math.round(fill)} percent`}
    >
      <div
        className={cn(flatVisualPanel, "relative rounded-none p-3")}
        style={
          {
            "--ev-glow": colors.glowDark,
            boxShadow: `0 0 40px -8px ${colors.glow}`,
          } as CSSProperties
        }
      >
        <svg viewBox="0 0 160 160" className="size-full" aria-hidden>
          <defs>
            <linearGradient id="ev-arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} />
              <stop offset="50%" stopColor={colors.fill} />
              <stop offset="100%" stopColor={colors.accent} />
            </linearGradient>
            <linearGradient id="ev-arc-specular" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.55" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <circle
            cx="80"
            cy="80"
            r="62"
            fill="none"
            stroke={colors.fill}
            strokeWidth="12"
            opacity="0.2"
            style={{ filter: `blur(3px)` }}
          />
          <circle
            cx="80"
            cy="80"
            r="62"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-zinc-200/80 dark:text-zinc-800/90"
          />
          <circle
            cx="80"
            cy="80"
            r="62"
            fill="none"
            stroke="url(#ev-arc-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={arcOffset}
            className="ev-visual__arc transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: "rotate(135deg)",
              transformOrigin: "80px 80px",
              filter: `drop-shadow(0 0 8px ${colors.glow})`,
            }}
          />
          <circle
            cx="80"
            cy="80"
            r="62"
            fill="none"
            stroke="url(#ev-arc-specular)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={arcOffset}
            opacity="0.5"
            style={{
              transform: "rotate(135deg)",
              transformOrigin: "80px 80px",
            }}
          />

          <g transform="translate(48, 52)">
            <rect
              x="4"
              y="8"
              width="56"
              height="72"
              rx="8"
              fill="none"
              stroke={colors.fill}
              strokeWidth="2"
              opacity="0.3"
            />
            <rect
              x="4"
              y="8"
              width="56"
              height="72"
              rx="8"
              fill="currentColor"
              fillOpacity="0.08"
              stroke={colors.fill}
              strokeWidth="1.5"
              className="text-zinc-400"
              style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}
            />
            <rect x="22" y="2" width="20" height="8" rx="2" fill={colors.fill} fillOpacity="0.5" />
            <rect
              x="10"
              y={80 - (64 * fill) / 100}
              width="44"
              height={(64 * fill) / 100}
              rx="4"
              fill={colors.fill}
              style={{
                filter: `drop-shadow(0 0 10px ${colors.glow})`,
              }}
            />
          </g>

          <path
            d="M88 118 L80 108 L72 118 L76 118 L76 128 L84 128 L84 118 Z"
            fill={colors.accent}
            opacity="0.95"
            style={{ filter: `drop-shadow(0 0 6px ${colors.glow})` }}
          />
        </svg>
      </div>
    </div>
  );
}

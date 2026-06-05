"use client";

import type { InverterLoadingCurvePoint } from "@/lib/calculators/electrical";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface InverterLoadingCurveChartProps {
  curvePoints: InverterLoadingCurvePoint[];
  currentLoadPercent: number;
  shutdownMinutes: number;
  className?: string;
}

const WIDTH = 420;
const HEIGHT = 220;
const PAD = { top: 18, right: 16, bottom: 32, left: 48 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const CONTINUOUS_CAP_MIN = 120;

function minutesForPlot(minutes: number): number {
  return Math.min(minutes, CONTINUOUS_CAP_MIN);
}

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

export function InverterLoadingCurveChart({
  curvePoints,
  currentLoadPercent,
  shutdownMinutes,
  className,
}: InverterLoadingCurveChartProps) {
  if (curvePoints.length === 0) return null;

  const minX = Math.min(...curvePoints.map((p) => p.loadPercent), currentLoadPercent) - 5;
  const maxX = Math.max(...curvePoints.map((p) => p.loadPercent), currentLoadPercent) + 5;
  const plotMinutes = curvePoints.map((p) => minutesForPlot(p.allowedMinutes));
  const maxY = Math.max(...plotMinutes, minutesForPlot(shutdownMinutes), 1);

  const xForPercent = (pct: number) =>
    PAD.left + ((pct - minX) / (maxX - minX)) * PLOT_W;

  const yForMinutes = (minutes: number) => {
    const capped = minutesForPlot(minutes);
    const logMax = Math.log10(maxY + 1);
    const logVal = Math.log10(capped + 1);
    return PAD.top + PLOT_H - (logVal / logMax) * PLOT_H;
  };

  const linePoints = curvePoints.map((row) => ({
    x: xForPercent(row.loadPercent),
    y: yForMinutes(row.allowedMinutes),
  }));

  const markerX = xForPercent(currentLoadPercent);
  const markerY = yForMinutes(shutdownMinutes);
  const hundredX = xForPercent(100);

  return (
    <figure
      className={cn(
        "rounded-none border border-border/50 bg-muted/15 p-4 sm:p-5",
        className
      )}
      aria-labelledby="inverter-loading-chart-title"
    >
      <figcaption
        id="inverter-loading-chart-title"
        className="mb-3 text-center text-sm font-semibold text-foreground"
      >
        Manufacturer overload curve (allowed run time vs. load %)
      </figcaption>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mx-auto h-auto w-full max-w-xl"
        role="img"
        aria-label={`Overload curve with operating point at ${formatNumber(currentLoadPercent, { maxDecimals: 1 })} percent load`}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD.top + PLOT_H * (1 - t);
          return (
            <line
              key={t}
              x1={PAD.left}
              y1={y}
              x2={PAD.left + PLOT_W}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
          );
        })}

        <line
          x1={hundredX}
          y1={PAD.top}
          x2={hundredX}
          y2={PAD.top + PLOT_H}
          stroke="rgb(148 163 184)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text
          x={hundredX}
          y={PAD.top - 4}
          textAnchor="middle"
          className="fill-muted-foreground text-[8px]"
        >
          100%
        </text>

        <path
          d={buildPath(linePoints)}
          fill="none"
          stroke="rgb(59 130 246)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx={markerX}
          cy={markerY}
          r={5}
          fill="rgb(245 158 11)"
          stroke="rgb(255 255 255)"
          strokeWidth={1.5}
        />
        <text
          x={Math.min(markerX + 8, PAD.left + PLOT_W - 4)}
          y={Math.max(markerY - 8, PAD.top + 10)}
          className="fill-amber-600 text-[9px] font-semibold dark:fill-amber-400"
        >
          You
        </text>

        {[95, 100, 110, 120, 130].map((pct) => {
          if (pct < minX || pct > maxX) return null;
          const x = xForPercent(pct);
          return (
            <text
              key={pct}
              x={x}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {pct}%
            </text>
          );
        })}
        <text
          x={WIDTH / 2}
          y={HEIGHT - 2}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px] font-medium"
        >
          Load (% of derated nominal)
        </text>
      </svg>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Y-axis: allowed run time (log scale, capped at 120 min for display). Amber
        dot = your current operating point.
      </p>
    </figure>
  );
}

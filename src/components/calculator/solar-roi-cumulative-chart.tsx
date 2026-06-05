"use client";

import type { SolarRoiYearPoint } from "@/lib/calculators/solar";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SolarRoiCumulativeChartProps {
  yearly: SolarRoiYearPoint[];
  netInstallCost: number;
  breakEvenYears: number | null;
  className?: string;
}

const WIDTH = 420;
const HEIGHT = 220;
const PAD = { top: 18, right: 14, bottom: 32, left: 52 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

/** Net savings position vs. install cost — crosses zero at break-even. */
export function SolarRoiCumulativeChart({
  yearly,
  netInstallCost,
  breakEvenYears,
  className,
}: SolarRoiCumulativeChartProps) {
  if (yearly.length === 0) return null;

  const netValues = yearly.map((row) => row.netPosition);
  const statusQuoValues = yearly.map((row) => -row.cumulativeStatusQuo);
  const minY = Math.min(...netValues, ...statusQuoValues, 0);
  const maxY = Math.max(...netValues, 0, netInstallCost * 0.05);
  const range = Math.max(maxY - minY, 1);

  const yForValue = (value: number) =>
    PAD.top + PLOT_H - ((value - minY) / range) * PLOT_H;

  const netPoints = yearly.map((row, i) => ({
    x: PAD.left + (i / (yearly.length - 1)) * PLOT_W,
    y: yForValue(row.netPosition),
  }));

  const statusQuoPoints = yearly.map((row, i) => ({
    x: PAD.left + (i / (yearly.length - 1)) * PLOT_W,
    y: yForValue(-row.cumulativeStatusQuo),
  }));

  const zeroY = yForValue(0);
  const breakEvenPoint =
    breakEvenYears !== null
      ? netPoints[Math.min(Math.floor(breakEvenYears) - 1, netPoints.length - 1)]
      : null;

  const year20 = yearly[yearly.length - 1];

  return (
    <figure
      className={cn(
        "rounded-none border border-border/50 bg-muted/15 p-4 sm:p-5",
        className
      )}
      aria-labelledby="solar-roi-chart-title"
    >
      <figcaption
        id="solar-roi-chart-title"
        className="mb-3 text-center text-sm font-semibold text-foreground"
      >
        20-year cumulative savings vs. do nothing
      </figcaption>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mx-auto h-auto w-full max-w-xl"
        role="img"
        aria-label="Line chart: net solar savings crossing zero at payback, compared with cumulative grid cost without solar"
      >
        <defs>
          <linearGradient id="solarRoiNetFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(34 197 94 / 0.3)" />
            <stop offset="100%" stopColor="rgb(34 197 94 / 0.02)" />
          </linearGradient>
        </defs>

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
          x1={PAD.left}
          y1={zeroY}
          x2={PAD.left + PLOT_W}
          y2={zeroY}
          stroke="rgb(148 163 184)"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <text
          x={PAD.left - 4}
          y={zeroY + 3}
          textAnchor="end"
          className="fill-muted-foreground text-[8px]"
        >
          $0
        </text>

        <path
          d={`${buildPath(netPoints)} L ${netPoints[netPoints.length - 1]?.x ?? 0} ${zeroY} L ${netPoints[0]?.x ?? 0} ${zeroY} Z`}
          fill="url(#solarRoiNetFill)"
        />
        <path
          d={buildPath(netPoints)}
          fill="none"
          stroke="rgb(34 197 94)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d={buildPath(statusQuoPoints)}
          fill="none"
          stroke="rgb(100 116 139)"
          strokeWidth={2}
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {breakEvenPoint ? (
          <circle
            cx={breakEvenPoint.x}
            cy={breakEvenPoint.y}
            r={4}
            fill="rgb(34 197 94)"
            stroke="rgb(255 255 255)"
            strokeWidth={1.5}
          />
        ) : null}

        {[1, 5, 10, 15, 20].map((yr) => {
          const i = yr - 1;
          const x = PAD.left + (i / (yearly.length - 1)) * PLOT_W;
          return (
            <text
              key={yr}
              x={x}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {yr}
            </text>
          );
        })}
        <text
          x={WIDTH / 2}
          y={HEIGHT - 2}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px] font-medium"
        >
          Year
        </text>
      </svg>

      <ul className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <span
            className="inline-block h-0.5 w-6 rounded-none bg-emerald-500"
            aria-hidden
          />
          Net savings (after {formatCurrency(netInstallCost)})
        </li>
        <li className="flex items-center gap-2">
          <span
            className="inline-block h-0.5 w-6 rounded-none border-b border-dashed border-slate-400"
            aria-hidden
          />
          Grid cost without solar
        </li>
      </ul>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {breakEvenYears !== null ? (
          <>
            Break-even at{" "}
            <span className="font-medium text-foreground">
              Year {formatNumber(breakEvenYears, { maxDecimals: 1 })}
            </span>
            {" · "}
          </>
        ) : null}
        Year 20 net: {formatCurrency(year20?.netPosition ?? 0)} · Status quo
        cost: {formatCurrency(year20?.cumulativeStatusQuo ?? 0)}
      </p>
    </figure>
  );
}

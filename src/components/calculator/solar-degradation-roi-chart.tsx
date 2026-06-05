"use client";

import type { SolarDegradationYearPoint } from "@/lib/calculators/solar";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SolarDegradationRoiChartProps {
  yearly: SolarDegradationYearPoint[];
  className?: string;
}

const WIDTH = 400;
const HEIGHT = 200;
const PAD = { top: 16, right: 12, bottom: 28, left: 44 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

function buildPath(
  points: { x: number; y: number }[]
): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

export function SolarDegradationRoiChart({
  yearly,
  className,
}: SolarDegradationRoiChartProps) {
  if (yearly.length === 0) return null;

  const maxKwh = Math.max(...yearly.map((y) => y.annualKwh), 1);
  const maxSavings = Math.max(
    ...yearly.map((y) => y.cumulativeSavings),
    1
  );

  const productionPoints = yearly.map((row, i) => {
    const x = PAD.left + (i / (yearly.length - 1)) * PLOT_W;
    const y = PAD.top + PLOT_H - (row.annualKwh / maxKwh) * PLOT_H;
    return { x, y };
  });

  const savingsPoints = yearly.map((row, i) => {
    const x = PAD.left + (i / (yearly.length - 1)) * PLOT_W;
    const y = PAD.top + PLOT_H - (row.cumulativeSavings / maxSavings) * PLOT_H;
    return { x, y };
  });

  const year20 = yearly[yearly.length - 1];

  return (
    <figure
      className={cn(
        "rounded-none border border-border/50 bg-muted/15 p-4 sm:p-5",
        className
      )}
      aria-labelledby="solar-deg-chart-title"
    >
      <figcaption
        id="solar-deg-chart-title"
        className="mb-3 text-center text-sm font-semibold text-foreground"
      >
        20-year production vs. cumulative savings
      </figcaption>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mx-auto h-auto w-full max-w-lg"
        role="img"
        aria-label="Line chart: declining annual energy production and rising cumulative electricity savings over 20 years"
      >
        <defs>
          <linearGradient id="prodFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(245 158 11 / 0.35)" />
            <stop offset="100%" stopColor="rgb(245 158 11 / 0.02)" />
          </linearGradient>
          <linearGradient id="saveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(34 197 94 / 0.25)" />
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

        <text
          x={PAD.left - 6}
          y={PAD.top + 8}
          textAnchor="end"
          className="fill-muted-foreground text-[9px]"
        >
          {formatNumber(maxKwh / 1000, { maxDecimals: 1 })}k
        </text>
        <text
          x={PAD.left + PLOT_W + 6}
          y={PAD.top + 8}
          textAnchor="start"
          className="fill-muted-foreground text-[9px]"
        >
          ${formatNumber(maxSavings / 1000, { maxDecimals: 0 })}k
        </text>

        <path
          d={`${buildPath(productionPoints)} L ${productionPoints[productionPoints.length - 1]?.x ?? 0} ${PAD.top + PLOT_H} L ${productionPoints[0]?.x ?? 0} ${PAD.top + PLOT_H} Z`}
          fill="url(#prodFill)"
        />
        <path
          d={buildPath(productionPoints)}
          fill="none"
          stroke="rgb(245 158 11)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d={buildPath(savingsPoints)}
          fill="none"
          stroke="rgb(34 197 94)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {[1, 5, 10, 15, 20].map((yr) => {
          const i = yr - 1;
          const x = PAD.left + (i / (yearly.length - 1)) * PLOT_W;
          return (
            <text
              key={yr}
              x={x}
              y={HEIGHT - 6}
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
            className="inline-block h-0.5 w-6 rounded-none bg-amber-500"
            aria-hidden
          />
          Energy production (annual kWh)
        </li>
        <li className="flex items-center gap-2">
          <span
            className="inline-block h-0.5 w-6 rounded-none bg-emerald-500"
            aria-hidden
          />
          Total savings (cumulative)
        </li>
      </ul>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Year 20: {formatNumber(year20?.annualKwh ?? 0, { maxDecimals: 0 })} kWh ·{" "}
        {formatNumber(year20?.cumulativeSavings ?? 0, { maxDecimals: 0 })} saved
        cumulatively
      </p>
    </figure>
  );
}

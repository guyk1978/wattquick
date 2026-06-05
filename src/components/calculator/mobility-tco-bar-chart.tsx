"use client";

import { formatCurrency } from "@/lib/format";
import { flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface MobilityTcoBarChartProps {
  carTotal: number;
  ebikeTotal: number;
  escooterTotal: number;
  className?: string;
}

const BAR_COLORS = {
  car: "bg-gradient-to-t from-zinc-700/90 via-zinc-500/85 to-zinc-400/70",
  ebike: "bg-gradient-to-t from-emerald-800/90 via-emerald-600/85 to-emerald-400/75",
  escooter: "bg-gradient-to-t from-cyan-800/90 via-cyan-600/85 to-cyan-400/75",
} as const;

/** 3-year TCO comparison — car vs e-bike vs e-scooter */
export function MobilityTcoBarChart({
  carTotal,
  ebikeTotal,
  escooterTotal,
  className,
}: MobilityTcoBarChartProps) {
  const max = Math.max(carTotal, ebikeTotal, escooterTotal, 1);

  const bars = [
    { key: "car" as const, label: "Car", total: carTotal },
    { key: "ebike" as const, label: "E-bike", total: ebikeTotal },
    { key: "escooter" as const, label: "E-scooter", total: escooterTotal },
  ];

  const ariaLabel = `3-year ownership cost: car ${formatCurrency(carTotal)}, e-bike ${formatCurrency(ebikeTotal)}, e-scooter ${formatCurrency(escooterTotal)}`;

  return (
    <div
      className={cn("mobility-tco-bar-chart w-full", className)}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={cn(flatVisualPanel, "rounded-none border border-border p-3 sm:p-4")}>
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          3-year total cost
        </p>
        <div className="flex items-end justify-center gap-4 sm:gap-8">
          {bars.map((bar) => {
            const heightPercent = Math.max(8, (bar.total / max) * 100);
            return (
              <div key={bar.key} className="flex flex-col items-center gap-1.5">
                <span className="text-[0.625rem] font-semibold tabular-nums text-foreground sm:text-xs">
                  {formatCurrency(bar.total)}
                </span>
                <div className="relative flex h-32 w-12 items-end justify-center sm:h-36 sm:w-14">
                  <div
                    className={cn(
                      "w-full rounded-none transition-[height] duration-700 ease-out",
                      BAR_COLORS[bar.key]
                    )}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

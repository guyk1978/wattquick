"use client";

import type { CalculatorId } from "@/lib/calculators";
import { deriveEvDashboardMetrics } from "@/lib/ev-dashboard";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { EvVisual } from "@/components/calculator/ev-visual";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorResultValue, calculatorResultValueRow } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export interface EvGamifiedResultProps {
  calculatorId: CalculatorId;
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function EvGamifiedResult({
  calculatorId,
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  className,
}: EvGamifiedResultProps) {
  const hasResult = value !== null;
  const metrics = hasResult
    ? deriveEvDashboardMetrics(calculatorId, label, value, unit, detail)
    : null;

  const resultKey = hasResult ? `${value}-${unit ?? ""}-${detail ?? ""}` : "empty";
  const showDashboard = hasResult && metrics !== null;
  const displayValue = value ?? "";

  return (
    <GamifiedDashboardFrame
      accent="ev"
      label={label}
      ambientClassName="bg-[#3B82F6]/[0.1] dark:bg-[#3B82F6]/[0.22]"
      className={className}
    >
      <div
        key={resultKey}
        className={cn(
          "mt-5 transition-opacity duration-200",
          "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:fill-mode-both",
          !hasResult && "opacity-70"
        )}
      >
        {!hasResult ? (
          <p className="text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
            {emptyMessage}
          </p>
        ) : showDashboard ? (
          <div className="grid gap-8 sm:grid-cols-[minmax(150px,190px)_1fr] sm:items-center sm:gap-6">
            <EvVisual
              fillPercent={metrics.fillPercent}
              glow={metrics.glow}
              className="sm:justify-self-center"
            />

            <div className="flex min-w-0 flex-col gap-4">
              <div
                className={cn(
                  "neon-badge inline-flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-1.5",
                  "text-xs font-semibold leading-snug sm:text-sm",
                  metrics.glow === "slow" &&
                    "[--neon-from:#6366f1] [--neon-to:#818cf8] [--neon-glow:rgba(99,102,241,0.5)]"
                )}
              >
                <span aria-hidden className="text-base">
                  {metrics.emoji}
                </span>
                <span>{metrics.microcopy}</span>
              </div>

              <div className={calculatorResultValueRow}>
                {metrics.useRawValue ? (
                  <span className={calculatorResultValue}>{displayValue}</span>
                ) : metrics.countTarget !== null ? (
                  <span className={calculatorResultValue}>
                    <AnimatedCounter
                      target={metrics.countTarget}
                      decimals={metrics.countDecimals}
                    />
                  </span>
                ) : (
                  <span className={calculatorResultValue}>{displayValue}</span>
                )}
                {unit ? (
                  <span className="calculator-result-unit pb-1 font-medium text-muted-foreground">
                    {unit}
                  </span>
                ) : null}
              </div>

              {detail ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <FallbackResult value={displayValue} unit={unit} detail={detail} />
        )}
      </div>
    </GamifiedDashboardFrame>
  );
}

function FallbackResult({
  value,
  unit,
  detail,
}: {
  value: string;
  unit?: string;
  detail?: string | null;
}) {
  return (
    <>
      <div className={calculatorResultValueRow}>
        <span className={calculatorResultValue}>{value}</span>
        {unit ? (
          <span className="calculator-result-unit pb-1 font-medium text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>
      {detail ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {detail}
        </p>
      ) : null}
    </>
  );
}

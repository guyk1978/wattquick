"use client";

import { glassDashboard, neonHeroNumber } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export interface CalculatorResultProps {
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function CalculatorResult({
  label,
  value,
  unit,
  detail,
  emptyMessage = "Enter values to calculate",
  className,
}: CalculatorResultProps) {
  const hasResult = value !== null;
  const resultKey = hasResult ? `${value}-${unit ?? ""}-${detail ?? ""}` : "empty";

  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={cn(glassDashboard("primary"), "p-6 sm:p-8", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/[0.08] blur-3xl dark:bg-primary/[0.15]"
      />
      <div className="glass-neon__inner relative">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
          {label}
        </p>

        <div
          key={resultKey}
          className={cn(
            "mt-4 min-h-[4.5rem] transition-opacity duration-200",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:fill-mode-both",
            !hasResult && "opacity-70"
          )}
        >
          {hasResult ? (
            <>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className={neonHeroNumber}>{value}</span>
                {unit ? (
                  <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
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
          ) : (
            <p className="text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

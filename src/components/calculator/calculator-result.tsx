"use client";

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
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60",
        "bg-gradient-to-br from-primary/[0.04] via-card to-card",
        "p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(0,0,0,0.06)]",
        "sm:rounded-3xl sm:p-8",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/[0.07] blur-3xl transition-opacity duration-500"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-primary/[0.04] blur-2xl"
      />

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
              <span className="font-mono text-[2.75rem] font-semibold leading-none tracking-tight text-foreground sm:text-6xl">
                {value}
              </span>
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
    </section>
  );
}

import Link from "next/link";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorsSpotlightProps {
  calculatorId: CalculatorId;
  className?: string;
}

export function CalculatorsSpotlight({
  calculatorId,
  className,
}: CalculatorsSpotlightProps) {
  const calculator = getCalculatorMeta(calculatorId);
  const Icon = calculator.icon;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border border-emerald-500/25",
        "bg-gradient-to-br from-card via-muted/40 to-emerald-500/5",
        "p-5 shadow-[0_0_32px_-14px_rgba(16,185,129,0.35)]",
        "dark:border-emerald-500/40 dark:from-black dark:via-zinc-950 dark:to-emerald-950/30",
        "dark:shadow-[0_0_40px_-12px_rgba(16,185,129,0.45)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-emerald-500/10 blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-lg",
            "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
            "dark:border-emerald-500/40 dark:text-emerald-400",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          )}
          aria-hidden
        >
          <Icon className="size-7" strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
            Spotlight · Calculator of the week
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-foreground sm:text-xl">
            {calculator.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>
        </div>
      </div>

      <Link
        href={calculator.href}
        className={cn(
          "relative mt-5 inline-flex w-full items-center justify-center rounded-lg",
          "bg-emerald-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wide",
          "text-zinc-950 transition-colors hover:bg-emerald-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "sm:w-auto"
        )}
      >
        Start calculation
      </Link>
    </article>
  );
}

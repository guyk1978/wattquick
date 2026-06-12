import { Suspense } from "react";
import type { CalculatorMeta } from "@/lib/calculators";
import { CalculatorPageBackLink } from "@/components/calculator/calculator-page-back-link";
import { cn } from "@/lib/utils";

interface CalculatorPageHeaderProps {
  calculator: CalculatorMeta;
  className?: string;
}

export function CalculatorPageHeader({ calculator, className }: CalculatorPageHeaderProps) {
  const Icon = calculator.icon;

  return (
    <header className={cn("calculator-page-header", className)}>
      <Suspense
        fallback={
          <span className="calculator-page-header__back inline-flex h-5 w-32 animate-pulse rounded-none bg-muted/40" />
        }
      >
        <CalculatorPageBackLink />
      </Suspense>

      <div className="calculator-page-header__meta">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-none border border-border/60 bg-primary/10 text-primary">
            <Icon className="size-5" strokeWidth={2} aria-hidden />
          </span>
          <span className="rounded-none border border-border/60 bg-muted/30 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {calculator.tag}
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl sm:leading-tight">
            {calculator.title}
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>
        </div>
      </div>
    </header>
  );
}

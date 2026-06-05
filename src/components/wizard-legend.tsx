"use client";

import { BookOpen, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardLegendProps {
  className?: string;
}

/** Explains Tool vs Guide badges used across all wizard paths. */
export function WizardLegend({ className }: WizardLegendProps) {
  return (
    <div
      className={cn(
        "energy-wizard__legend flex flex-wrap items-center gap-3 rounded-none border border-border/60 bg-muted/10 px-3 py-2.5 text-xs sm:gap-4",
        className
      )}
      aria-label="Path step types"
    >
      <span className="font-semibold uppercase tracking-wider text-muted-foreground">
        Legend
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5 font-semibold uppercase tracking-wider",
          "energy-wizard__badge--tool border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100"
        )}
      >
        <Calculator className="size-3.5" aria-hidden />
        Tools — calculators
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5 font-semibold uppercase tracking-wider",
          "energy-wizard__badge--guide border-violet-500/30 bg-violet-500/10 text-violet-950 dark:text-violet-100"
        )}
      >
        <BookOpen className="size-3.5" aria-hidden />
        Guides — articles
      </span>
    </div>
  );
}

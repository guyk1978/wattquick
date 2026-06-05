import Link from "next/link";
import { ArrowUpRight, Lightbulb, Zap } from "lucide-react";
import { calculators } from "@/data/calculators";
import { cn } from "@/lib/utils";

interface CalculatorSpotlightProps {
  slug: string;
  className?: string;
  compact?: boolean;
}

export function CalculatorSpotlight({
  slug,
  className,
  compact = false,
}: CalculatorSpotlightProps) {
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return null;

  const href = calc.href.endsWith("/") ? calc.href : `${calc.href}/`;

  return (
    <aside
      className={cn(
        "not-prose blog-widget-panel overflow-hidden",
        compact ? "p-4" : "p-5 sm:p-6",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-none border border-border/60 bg-muted/40 text-primary">
          <Lightbulb className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Interactive tool spotlight
          </p>
          <p
            className={cn(
              "mt-1.5 leading-relaxed text-muted-foreground",
              compact ? "text-sm" : "text-base"
            )}
          >
            Put this guide into practice: use our{" "}
            <span className="font-semibold text-foreground">{calc.title}</span>{" "}
            to run your own numbers in milliseconds.
          </p>
        </div>
      </div>

      <div className="flat-subpanel mt-4 flex items-center gap-3 p-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-none border border-border/60 bg-primary/10 text-primary">
          <Zap className="size-4" strokeWidth={2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1 text-sm text-muted-foreground">
          Live inputs, instant results — no sign-up required.
        </span>
      </div>

      <Link
        href={href}
        className={cn(
          "flat-inline-action mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        Open Calculator
        <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
      </Link>
    </aside>
  );
}

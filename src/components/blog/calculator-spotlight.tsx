import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Lightbulb, Zap } from "lucide-react";
import { calculators } from "@/data/calculators";
import { glassNeon, glassNeonAccent, glassSurface } from "@/lib/glass-ui";
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
        "not-prose",
        glassSurface,
        glassNeon,
        glassNeonAccent("primary"),
        "overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md",
        "dark:border-slate-700/60 dark:bg-slate-900/80",
        compact ? "p-5" : "p-6 sm:p-8",
        className
      )}
      style={
        {
          "--neon-from": "#3b82f6",
          "--neon-to": "#22c55e",
          "--neon-glow": "rgba(59, 130, 246, 0.4)",
        } as CSSProperties
      }
    >
      <div className="glass-neon__inner relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl dark:bg-primary/20"
        />

        <div className="relative flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300">
            <Lightbulb className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Interactive tool spotlight
            </p>
            <p
              className={cn(
                "mt-2 leading-relaxed text-slate-700 dark:text-slate-300",
                compact ? "text-sm" : "text-base sm:text-lg"
              )}
            >
              Put this guide into practice: use our interactive{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {calc.title}
              </span>{" "}
              to run your own numbers in milliseconds.
            </p>
          </div>
        </div>

        <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-slate-700/60 dark:bg-slate-950/50">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-md">
            <Zap className="size-5" strokeWidth={2.25} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            Live inputs, instant results — no sign-up required.
          </span>
        </div>

        <Link
          href={href}
          className={cn(
            "relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3",
            "text-sm font-bold text-white shadow-lg",
            "bg-gradient-to-r from-primary via-blue-600 to-blue-700",
            "transition-[transform,box-shadow,filter] duration-300",
            "hover:scale-[1.02] hover:shadow-xl hover:brightness-110",
            "active:scale-[0.99]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          Open Calculator
          <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
        </Link>
      </div>
    </aside>
  );
}

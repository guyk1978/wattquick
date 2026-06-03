"use client";

import { useState } from "react";
import { Play, Zap } from "lucide-react";
import { BlogCalculatorLaunchModal } from "@/components/blog/blog-calculator-launch-modal";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { glassNeon, glassNeonAccent, glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export type QuickLaunchPlacement = "sidebar" | "footer";

interface BlogQuickLaunchWidgetProps {
  calculatorId: CalculatorId;
  placement?: QuickLaunchPlacement;
  className?: string;
}

/**
 * Quick Launch Widget — run the article's linked calculator in a modal
 * without leaving the blog post.
 */
export function BlogQuickLaunchWidget({
  calculatorId,
  placement = "sidebar",
  className,
}: BlogQuickLaunchWidgetProps) {
  const [open, setOpen] = useState(false);
  const meta = getCalculatorMeta(calculatorId);
  const Icon = meta.icon;

  return (
    <>
      <aside
        className={cn(
          "not-prose",
          glassSurface,
          glassNeon,
          glassNeonAccent("primary"),
          "overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md",
          "dark:border-slate-700/60 dark:bg-slate-900/85",
          placement === "sidebar" ? "p-4" : "p-4 sm:p-5",
          className
        )}
        aria-labelledby={`quick-launch-${calculatorId}-${placement}`}
      >
        <div className="glass-neon__inner relative space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Zap className="size-4" strokeWidth={2.25} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p
                id={`quick-launch-${calculatorId}-${placement}`}
                className="text-[10px] font-bold uppercase tracking-widest text-primary"
              >
                Quick launch
              </p>
              <p className="mt-1 truncate text-sm font-semibold leading-snug text-foreground">
                {meta.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {meta.tag} · instant results
              </p>
            </div>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
              <Icon className="size-4" aria-hidden />
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5",
              "text-sm font-bold text-primary-foreground",
              "bg-gradient-to-r from-primary via-blue-600 to-blue-700",
              "shadow-md transition-[transform,filter] duration-200",
              "hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            )}
          >
            <Play className="size-4 fill-current" aria-hidden />
            Run calculator here
          </button>
        </div>
      </aside>

      <BlogCalculatorLaunchModal
        calculatorId={open ? calculatorId : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

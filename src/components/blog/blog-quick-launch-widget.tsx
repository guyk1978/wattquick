"use client";

import { Play, Zap } from "lucide-react";
import { useToolLaunch } from "@/components/content/tool-launch-context";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

export type QuickLaunchPlacement = "sidebar" | "footer";

interface BlogQuickLaunchWidgetProps {
  calculatorId: CalculatorId;
  placement?: QuickLaunchPlacement;
  className?: string;
}

export function BlogQuickLaunchWidget({
  calculatorId,
  placement = "sidebar",
  className,
}: BlogQuickLaunchWidgetProps) {
  const { openTool } = useToolLaunch();
  const meta = getCalculatorMeta(calculatorId);
  const Icon = meta.icon;

  return (
    <aside
      className={cn(
        "not-prose blog-widget-panel",
        placement === "sidebar" ? "p-3" : "p-3 sm:p-4",
        className
      )}
      aria-labelledby={`quick-launch-${calculatorId}-${placement}`}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-none border border-border/60 bg-primary/10 text-primary">
            <Zap className="size-4" strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p
              id={`quick-launch-${calculatorId}-${placement}`}
              className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Quick launch
            </p>
            <p className="tool-preview-nowrap mt-0.5 truncate text-sm font-semibold leading-snug text-foreground">
              {meta.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {meta.tag} · instant results
            </p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-none border border-border/50 bg-muted/30 text-muted-foreground">
            <Icon className="size-4" aria-hidden />
          </span>
        </div>

        <button
          type="button"
          onClick={() => openTool(calculatorId)}
          className={cn(
            "flat-inline-action inline-flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-semibold",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          )}
        >
          <Play className="size-4 fill-current" aria-hidden />
          Run calculator here
        </button>
      </div>
    </aside>
  );
}

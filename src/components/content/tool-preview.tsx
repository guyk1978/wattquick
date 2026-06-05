"use client";

import { ArrowUpRight } from "lucide-react";
import { useToolLaunchOptional } from "@/components/content/tool-launch-context";
import type { CalculatorId } from "@/lib/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

interface ToolPreviewProps {
  toolId: string;
  className?: string;
}

/**
 * Embeddable mini-card for blog markdown: `<ToolPreview toolId="ev-charging-cost" />`
 * Opens the linked calculator in a modal without leaving the article.
 */
export function ToolPreview({ toolId, className }: ToolPreviewProps) {
  const launch = useToolLaunchOptional();

  if (!isCalculatorId(toolId)) {
    return null;
  }

  const meta = getCalculatorMeta(toolId);
  const Icon = meta.icon;

  const handleOpen = () => {
    if (launch) {
      launch.openTool(toolId);
      return;
    }
    window.location.href = meta.href.endsWith("/") ? meta.href : `${meta.href}/`;
  };

  return (
    <aside
      className={cn(
        "not-prose tool-preview-card blog-widget-panel my-6",
        className
      )}
      aria-label={`Preview: ${meta.title}`}
    >
      <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-none border border-border/60 bg-primary/10 text-primary">
          <Icon className="size-4" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
            {meta.tag}
          </p>
          <p className="tool-preview-nowrap mt-0.5 truncate text-sm font-semibold text-foreground sm:text-base">
            {meta.title}
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            "flat-inline-action inline-flex shrink-0 items-center gap-1.5 px-3 py-2 text-xs font-semibold sm:text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          )}
        >
          Open calculator
          <ArrowUpRight className="size-3.5" aria-hidden />
        </button>
      </div>
    </aside>
  );
}

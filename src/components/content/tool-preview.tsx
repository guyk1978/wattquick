"use client";

import { ArrowUpRight } from "lucide-react";
import { useToolLaunchOptional } from "@/components/content/tool-launch-context";
import type { CalculatorId } from "@/lib/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { glassNeon, glassNeonAccent, glassSurface } from "@/lib/glass-ui";
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
        "not-prose tool-preview-card my-8",
        glassSurface,
        glassNeon,
        glassNeonAccent("primary"),
        "overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-lg backdrop-blur-md",
        "dark:border-cyan-500/15",
        className
      )}
      aria-label={`Preview: ${meta.title}`}
    >
      <div className="glass-neon__inner flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
          <Icon className="size-5" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/90">
            {meta.tag}
          </p>
          <p className="tool-preview-nowrap mt-0.5 truncate text-sm font-semibold text-white sm:text-base">
            {meta.title}
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white sm:text-sm",
            "bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700",
            "shadow-md transition-[transform,filter] hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
          )}
        >
          Open calculator
          <ArrowUpRight className="size-3.5" aria-hidden />
        </button>
      </div>
    </aside>
  );
}

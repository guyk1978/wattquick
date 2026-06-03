"use client";

import { Play, Zap } from "lucide-react";
import { useToolLaunch } from "@/components/content/tool-launch-context";
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
        "not-prose",
        glassSurface,
        glassNeon,
        glassNeonAccent("primary"),
        "overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-lg backdrop-blur-md",
        placement === "sidebar" ? "p-4" : "p-4 sm:p-5",
        className
      )}
      aria-labelledby={`quick-launch-${calculatorId}-${placement}`}
    >
      <div className="glass-neon__inner relative space-y-3">
        <div className="flex items-start gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
            <Zap className="size-4" strokeWidth={2.25} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p
              id={`quick-launch-${calculatorId}-${placement}`}
              className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/90"
            >
              Quick launch
            </p>
            <p className="tool-preview-nowrap mt-1 truncate text-sm font-semibold leading-snug text-white">
              {meta.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {meta.tag} · instant results
            </p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-300">
            <Icon className="size-4" aria-hidden />
          </span>
        </div>

        <button
          type="button"
          onClick={() => openTool(calculatorId)}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5",
            "text-sm font-bold text-white",
            "bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700",
            "shadow-md transition-[transform,filter] duration-200",
            "hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
          )}
        >
          <Play className="size-4 fill-current" aria-hidden />
          Run calculator here
        </button>
      </div>
    </aside>
  );
}

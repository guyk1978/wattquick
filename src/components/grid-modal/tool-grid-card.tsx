"use client";

import Link from "next/link";
import { ToolCardFavoriteBadge } from "@/components/grid-modal/tool-card-favorite-badge";
import { useGridPinnedCalculatorOptional } from "@/components/grid-modal/grid-pinned-calculator-context";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import { ToolCardExample } from "@/components/calculator/tool-card-example";
import { ToolCardHeaderActions } from "@/components/calculator/tool-card-header-actions";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

type ToolGridCardProps = {
  toolId: CalculatorId;
  active?: boolean;
  accent: string;
};

/** Client card shell — pin state + header actions without serializing icon components. */
export function ToolGridCard({ toolId, active = false, accent }: ToolGridCardProps) {
  const pinnedCtx = useGridPinnedCalculatorOptional();
  const pinned = pinnedCtx?.isPinned(toolId) ?? false;
  const tool = getCalculatorMeta(toolId);
  const Icon = tool.icon;

  return (
    <div
      className={cn(
        "wq-tool-card",
        active && "wq-tool-card--active",
        pinned && "wq-tool-card--pinned"
      )}
    >
      <Link
        href={tool.href}
        className="wq-card-overlay-link"
        aria-label={`Open ${tool.title}`}
        aria-current={active ? "page" : undefined}
      />
      <ToolCardFavoriteBadge toolId={toolId} />
      <ToolCardHeaderActions calculatorId={toolId} />
      <span className="wq-tool-card__icon" aria-hidden>
        <Icon strokeWidth={1.75} className="size-5" />
      </span>
      <span className="wq-tool-card__title">{tool.title}</span>
      <span className="wq-tool-card__meta">{tool.description}</span>
      <span className="wq-tool-card__benefit">{tool.benefit}</span>
      <ToolCardExample example={tool.example} />
      <CalculatorRatingSummary
        calculatorId={toolId}
        color={accent}
        className="wq-card-rating"
      />
    </div>
  );
}

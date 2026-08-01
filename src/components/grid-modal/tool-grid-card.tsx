"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ToolCardHeaderActions } from "@/components/calculator/tool-card-header-actions";
import { ToolCardSelect } from "@/components/grid-modal/tool-card-select";
import { useToolCardSelectionOptional } from "@/components/grid-modal/tool-card-selection-context";
import { useGridPinnedCalculatorOptional } from "@/components/grid-modal/grid-pinned-calculator-context";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

type ToolGridCardProps = {
  toolId: CalculatorId;
  active?: boolean;
  /** Kept for callers; accent comes from page theme scope. */
  accent?: string;
};

const TITLE_MAX_PX = 15;
const TITLE_MIN_PX = 10.5;

function ToolCardTitle({ title }: { title: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fit = () => {
      text.style.fontSize = `${TITLE_MAX_PX}px`;
      let size = TITLE_MAX_PX;
      // Shrink until the full title fits on one line.
      while (text.scrollWidth > wrap.clientWidth && size > TITLE_MIN_PX) {
        size -= 0.5;
        text.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [title]);

  return (
    <span ref={wrapRef} className="wq-tool-card__title">
      <span ref={textRef} className="wq-tool-card__title-text">
        {title}
      </span>
    </span>
  );
}

/**
 * Minimal JoinMyPDF-style tool card: checkbox + icon + title.
 * Expand/Pin sit as matching-height squares beside the card.
 */
export function ToolGridCard({ toolId, active = false }: ToolGridCardProps) {
  const pinnedCtx = useGridPinnedCalculatorOptional();
  const selection = useToolCardSelectionOptional();
  const pinned = pinnedCtx?.isPinned(toolId) ?? false;
  const selected = selection?.isSelected(toolId) ?? false;
  const tool = getCalculatorMeta(toolId);
  const Icon = tool.icon;

  return (
    <div className="wq-tool-card-row">
      <div
        className={cn(
          "wq-tool-card",
          active && "wq-tool-card--active",
          pinned && "wq-tool-card--pinned",
          selected && "wq-tool-card--selected"
        )}
      >
        <Link
          href={tool.href}
          target="_blank"
          rel="noopener noreferrer"
          className="wq-card-overlay-link"
          aria-label={`Open ${tool.title}`}
          aria-current={active ? "page" : undefined}
        />
        <ToolCardSelect calculatorId={toolId} />
        <div className="wq-tool-card__content">
          <div className="wq-tool-card__heading">
            <span className="wq-tool-card__icon" aria-hidden>
              <Icon strokeWidth={1.75} className="size-5" />
            </span>
            <ToolCardTitle title={tool.title} />
          </div>
        </div>
      </div>
      <ToolCardHeaderActions calculatorId={toolId} />
    </div>
  );
}

import Link from "next/link";
import { ToolCardFavoriteBadge } from "@/components/grid-modal/tool-card-favorite-badge";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import type { CalculatorMeta } from "@/lib/calculators";
import { cn } from "@/lib/utils";

type ToolGridProps = {
  calculators: CalculatorMeta[];
  activeId?: string;
  className?: string;
};

/** Responsive tool cards within a category — step 2 of Grid-to-Modal. */
export function ToolGrid({ calculators, activeId, className }: ToolGridProps) {
  return (
    <ul className={cn("wq-tool-grid", className)} role="list">
      {calculators.map((tool) => {
        const Icon = tool.icon;
        const active = activeId != null && tool.id === activeId;
        return (
          <li key={tool.id}>
            <div
              className={cn("wq-tool-card", active && "wq-tool-card--active")}
            >
              <Link
                href={tool.href}
                className="wq-card-overlay-link"
                aria-label={`Open ${tool.title}`}
                aria-current={active ? "page" : undefined}
              />
              <ToolCardFavoriteBadge toolId={tool.id} />
              <span className="wq-tool-card__icon" aria-hidden>
                <Icon strokeWidth={1.75} className="size-5" />
              </span>
              <span className="wq-tool-card__title">{tool.title}</span>
              <span className="wq-tool-card__meta">{tool.description}</span>
              <CalculatorRatingSummary
                calculatorId={tool.id}
                className="wq-card-rating"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

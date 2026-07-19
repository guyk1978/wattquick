import Link from "next/link";
import { ToolCardFavoriteBadge } from "@/components/grid-modal/tool-card-favorite-badge";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import { ToolCardExample } from "@/components/calculator/tool-card-example";
import { ToolCardFocus } from "@/components/calculator/tool-card-focus";
import type { CalculatorMeta } from "@/lib/calculators";
import { getCategoryColor } from "@/lib/category-theme";
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
        const accent = getCategoryColor(tool.category);
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
              <ToolCardFocus calculatorId={tool.id} />
              <span className="wq-tool-card__icon" aria-hidden>
                <Icon strokeWidth={1.75} className="size-5" />
              </span>
              <span className="wq-tool-card__title">{tool.title}</span>
              <span className="wq-tool-card__meta">{tool.description}</span>
              <span className="wq-tool-card__benefit">{tool.benefit}</span>
              <ToolCardExample example={tool.example} />
              <CalculatorRatingSummary
                calculatorId={tool.id}
                color={accent}
                className="wq-card-rating"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

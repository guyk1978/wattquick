import { ToolGridCard } from "@/components/grid-modal/tool-grid-card";
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
        const active = activeId != null && tool.id === activeId;
        const accent = getCategoryColor(tool.category);
        return (
          <li key={tool.id}>
            <ToolGridCard toolId={tool.id} active={active} accent={accent} />
          </li>
        );
      })}
    </ul>
  );
}

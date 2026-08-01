"use client";

import { ToolGridCard } from "@/components/grid-modal/tool-grid-card";
import { ToolCardSelectionBar } from "@/components/grid-modal/tool-card-selection-bar";
import { ToolCardSelectionProvider } from "@/components/grid-modal/tool-card-selection-context";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getCategoryColor } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

type ToolGridClientProps = {
  toolIds: CalculatorId[];
  activeId?: string;
  className?: string;
};

/** Client tool grid with multi-select + batch favorites bar. */
export function ToolGridClient({
  toolIds,
  activeId,
  className,
}: ToolGridClientProps) {
  return (
    <ToolCardSelectionProvider>
      <ul className={cn("wq-tool-grid", className)} role="list">
        {toolIds.map((id) => {
          const active = activeId != null && id === activeId;
          const accent = getCategoryColor(getCalculatorMeta(id).category);
          return (
            <li key={id}>
              <ToolGridCard toolId={id} active={active} accent={accent} />
            </li>
          );
        })}
      </ul>
      <ToolCardSelectionBar />
    </ToolCardSelectionProvider>
  );
}

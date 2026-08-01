"use client";

import { ToolGridClient } from "@/components/grid-modal/tool-grid-client";
import type { CalculatorId } from "@/lib/calculators";
import { getRelatedCalculators } from "@/lib/calculators/related";
import { cn } from "@/lib/utils";

type ToolModalRelatedProps = {
  id: CalculatorId;
  className?: string;
};

/** RELATED tab: sibling calculators resolved from suggestions + category. */
export function ToolModalRelated({ id, className }: ToolModalRelatedProps) {
  const related = getRelatedCalculators(id);

  if (related.length === 0) return null;

  return (
    <section
      className={cn("tool-modal-related", className)}
      aria-label="Related tools"
    >
      <h3 className="tool-modal-related__title">Related tools</h3>
      <ToolGridClient
        toolIds={related.map((tool) => tool.id)}
        className="tool-modal-related__grid"
      />
    </section>
  );
}

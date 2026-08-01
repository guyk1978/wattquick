import { ToolGridClient } from "@/components/grid-modal/tool-grid-client";
import type { CalculatorMeta } from "@/lib/calculators";
import { cn } from "@/lib/utils";

type ToolGridProps = {
  calculators: CalculatorMeta[];
  activeId?: string;
  className?: string;
};

/**
 * Server-safe tool grid — passes only serializable ids into the client
 * selection/favorites shell (icons stay looked up on the client).
 */
export function ToolGrid({ calculators, activeId, className }: ToolGridProps) {
  return (
    <ToolGridClient
      toolIds={calculators.map((tool) => tool.id)}
      activeId={activeId}
      className={cn(className)}
    />
  );
}

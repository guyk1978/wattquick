import { ToolGridClient } from "@/components/grid-modal/tool-grid-client";
import type { CalculatorMeta } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintToolGridProps {
  calculators: CalculatorMeta[];
  className?: string;
  /** Kept for callers; both variants now share the JoinMyPDF-style tool cards. */
  variant?: "default" | "tech-hub";
}

export function CalculatorBlueprintToolGrid({
  calculators,
  className,
}: CalculatorBlueprintToolGridProps) {
  if (calculators.length === 0) return null;

  return (
    <section className={cn("calculator-blueprint-tool-grid", className)} aria-label="Tools">
      <ToolGridClient toolIds={calculators.map((calc) => calc.id)} />
    </section>
  );
}

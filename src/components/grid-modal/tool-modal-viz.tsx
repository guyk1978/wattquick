"use client";

import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorViz } from "@/lib/calculator-viz";
import { cn } from "@/lib/utils";

type ToolModalVizProps = {
  id: CalculatorId;
  className?: string;
};

/** [VIZ] tab body: animated Industrial Matte schematic for the active tool. */
export function ToolModalViz({ id, className }: ToolModalVizProps) {
  const config = getCalculatorViz(id);
  if (!config) return null;

  const { Viz } = config;
  return (
    <div className={cn("tool-modal-viz", className)}>
      <Viz />
    </div>
  );
}

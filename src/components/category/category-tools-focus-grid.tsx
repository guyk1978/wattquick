"use client";

import { ToolGridClient } from "@/components/grid-modal/tool-grid-client";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

export interface CategoryToolsFocusItem {
  id: CalculatorId;
  href: string;
  title: string;
  description: string;
}

interface CategoryToolsFocusGridProps {
  calculators: CategoryToolsFocusItem[];
  className?: string;
  /** @deprecated Cards open in a new tab; kept for caller compatibility. */
  onNavigate?: () => void;
}

export function CategoryToolsFocusGrid({
  calculators,
  className,
}: CategoryToolsFocusGridProps) {
  if (calculators.length === 0) return null;

  return (
    <ToolGridClient
      toolIds={calculators.map((calc) => calc.id)}
      className={cn(className)}
    />
  );
}

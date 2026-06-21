"use client";

import { FavoriteCalculatorButton } from "@/components/favorite-calculator-button";
import { CalculatorFocusModeButton } from "@/components/calculator/calculator-focus-mode-button";
import { CalculatorVisualGuide } from "@/components/calculator/calculator-visual-guide";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintToolbarProps {
  calculatorId: CalculatorId;
  className?: string;
}

/** Visual Guide + favorites — paired actions in blueprint stats bar. */
export function CalculatorBlueprintToolbar({
  calculatorId,
  className,
}: CalculatorBlueprintToolbarProps) {
  return (
    <div className={cn("calculator-blueprint-toolbar", className)}>
      <CalculatorVisualGuide
        calculatorId={calculatorId}
        className="calculator-blueprint-toolbar__guide"
      />
      <CalculatorFocusModeButton className="calculator-blueprint-toolbar__focus" />
      <FavoriteCalculatorButton calculatorId={calculatorId} variant="toolbar" />
    </div>
  );
}

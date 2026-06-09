"use client";

import { FavoriteCalculatorButton } from "@/components/favorite-calculator-button";
import { useCalculatorId } from "@/components/calculator/calculator-id-context";

/** Centered WattQuick mark for calculator command panels */
export function CalculatorPanelBrand() {
  const calculatorId = useCalculatorId();

  return (
    <div className="calculator-command__brand relative flex items-center justify-center gap-2.5 pb-1">
      {calculatorId ? (
        <div className="absolute right-0 top-0">
          <FavoriteCalculatorButton
            calculatorId={calculatorId}
            className="size-9"
          />
        </div>
      ) : null}
      <span className="flex items-center gap-1" aria-hidden>
        <span className="size-1.5 rounded-none bg-blue-400" />
        <span className="size-1.5 rounded-none bg-blue-500" />
        <span className="size-1.5 rounded-none bg-violet-500" />
      </span>
      <span className="text-lg leading-none tracking-tight sm:text-xl">
        <span className="font-bold text-primary">Watt</span>
        <span className="font-light text-foreground">Quick</span>
      </span>
    </div>
  );
}

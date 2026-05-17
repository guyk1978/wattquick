"use client";

import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { useMemo } from "react";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResult } from "./calculator-result";
import { cn } from "@/lib/utils";

interface CalculatorPanelProps {
  id: CalculatorId;
  className?: string;
}

/** Interactive calculator body: inputs + live result. */
export function CalculatorPanel({ id, className }: CalculatorPanelProps) {
  const definition = getCalculatorDefinition(id);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const result = useMemo(
    () => definition.compute(values),
    [definition, values]
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]",
        "sm:gap-8 sm:rounded-3xl sm:p-6",
        className
      )}
    >
      <CalculatorInputs
        fields={definition.fields}
        values={values}
        onChange={setValue}
      />

      <div className="h-px bg-border/60" aria-hidden />

      <CalculatorResult
        label={definition.result.label}
        value={result.value}
        unit={result.unit}
        detail={result.detail}
        emptyMessage={definition.result.emptyMessage}
      />
    </div>
  );
}

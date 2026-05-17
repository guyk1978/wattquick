"use client";

import type { CalculatorFieldDef } from "@/lib/calculators";
import { cn } from "@/lib/utils";
import { CalculatorField } from "./calculator-field";

interface CalculatorInputsProps {
  fields: CalculatorFieldDef[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  className?: string;
}

export function CalculatorInputs({
  fields,
  values,
  onChange,
  className,
}: CalculatorInputsProps) {
  return (
    <div
      role="group"
      aria-label="Calculator inputs"
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-5",
        className
      )}
    >
      {fields.map((field, index) => (
        <CalculatorField
          key={field.id}
          field={field}
          value={values[field.id] ?? ""}
          onChange={(v) => onChange(field.id, v)}
          index={index}
          className={field.colSpan === 2 ? "sm:col-span-2" : undefined}
        />
      ))}
    </div>
  );
}

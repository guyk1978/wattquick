"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { CalculatorFieldDef } from "@/lib/calculators";
import { cn } from "@/lib/utils";
import { CalculatorField } from "./calculator-field";

const DEFAULT_ESSENTIAL_COUNT = 2;

interface CalculatorInputsProps {
  fields: CalculatorFieldDef[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  className?: string;
}

function splitFields(fields: CalculatorFieldDef[]): {
  essential: CalculatorFieldDef[];
  advanced: CalculatorFieldDef[];
} {
  const hasExplicit = fields.some((field) => field.advanced === true);
  if (hasExplicit) {
    return {
      essential: fields.filter((field) => !field.advanced),
      advanced: fields.filter((field) => field.advanced),
    };
  }

  if (fields.length <= DEFAULT_ESSENTIAL_COUNT) {
    return { essential: fields, advanced: [] };
  }

  return {
    essential: fields.slice(0, DEFAULT_ESSENTIAL_COUNT),
    advanced: fields.slice(DEFAULT_ESSENTIAL_COUNT),
  };
}

export function CalculatorInputs({
  fields,
  values,
  onChange,
  className,
}: CalculatorInputsProps) {
  const { essential, advanced } = useMemo(() => splitFields(fields), [fields]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div
      role="group"
      aria-label="Calculator inputs"
      className={cn(
        "calculator-sidebar-inputs calculator-command__inputs-stack",
        className
      )}
    >
      {essential.map((field, index) => (
        <CalculatorField
          key={field.id}
          field={field}
          value={values[field.id] ?? ""}
          onChange={(v) => onChange(field.id, v)}
          index={index}
        />
      ))}

      {advanced.length > 0 ? (
        <div className="calculator-inputs-advanced">
          <button
            type="button"
            className="calculator-inputs-advanced__toggle"
            aria-expanded={advancedOpen}
            onClick={() => setAdvancedOpen((open) => !open)}
          >
            <SlidersHorizontal
              className="calculator-inputs-advanced__icon"
              aria-hidden
            />
            <span>Advanced</span>
            <span className="calculator-inputs-advanced__count">
              {advanced.length}
            </span>
            <ChevronDown
              className={cn(
                "calculator-inputs-advanced__chevron",
                advancedOpen && "calculator-inputs-advanced__chevron--open"
              )}
              aria-hidden
            />
          </button>

          {advancedOpen ? (
            <div className="calculator-inputs-advanced__panel">
              {advanced.map((field, index) => (
                <CalculatorField
                  key={field.id}
                  field={field}
                  value={values[field.id] ?? ""}
                  onChange={(v) => onChange(field.id, v)}
                  index={essential.length + index}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

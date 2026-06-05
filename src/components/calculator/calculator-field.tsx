"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorFieldDef } from "@/lib/calculators";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorFieldProps {
  field: CalculatorFieldDef;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  index?: number;
}

const controlClassName = cn(
  calculatorCommandInput,
  "h-12 w-full rounded-none border-0 px-3.5 text-base text-foreground shadow-none",
  "focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0"
);

const rangeClassName = cn(
  "h-2 w-full cursor-pointer appearance-none bg-muted/80",
  "accent-primary",
  "[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary/30 [&::-webkit-slider-thumb]:bg-primary",
  "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:border-2",
  "[&::-moz-range-thumb]:border-primary/30 [&::-moz-range-thumb]:bg-primary"
);

function formatUnit(unit: string) {
  return unit.toUpperCase();
}

export function CalculatorField({
  field,
  value,
  onChange,
  className,
}: CalculatorFieldProps) {
  const inputType = field.inputType ?? "text";

  return (
    <div className={cn("calculator-command__field group/field flex flex-col gap-2", className)}>
      <Label
        htmlFor={field.id}
        className="block w-full text-[0.8125rem] font-medium leading-snug tracking-tight text-foreground/90"
      >
        {field.label}
        {inputType === "range" && field.unit ? (
          <span className="font-normal text-muted-foreground">
            {" "}
            ({formatUnit(field.unit)})
          </span>
        ) : field.unit ? (
          <span className="font-normal text-muted-foreground">
            {" "}
            ({formatUnit(field.unit)})
          </span>
        ) : null}
      </Label>

      {inputType === "range" ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.8125rem] font-semibold tabular-nums text-primary">
            {value}
            {field.unit ? ` ${field.unit}` : ""}
          </span>
          <input
            id={field.id}
            type="range"
            min={field.min ?? 0}
            max={field.max ?? 100}
            step={field.step ?? 1}
            value={value || field.defaultValue || String(field.min ?? 0)}
            onChange={(e) => onChange(e.target.value)}
            className={rangeClassName}
            aria-valuemin={field.min}
            aria-valuemax={field.max}
            aria-valuenow={Number(value)}
          />
        </div>
      ) : inputType === "select" && field.options ? (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(controlClassName, "cursor-pointer")}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={field.id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(controlClassName, "placeholder:text-muted-foreground/50")}
          autoComplete="off"
          enterKeyHint="done"
        />
      )}

      {field.hint ? (
        <p className="text-xs leading-relaxed text-muted-foreground/90">{field.hint}</p>
      ) : null}
    </div>
  );
}

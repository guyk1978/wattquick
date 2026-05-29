"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorFieldDef } from "@/lib/calculators";
import { glassInsetInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorFieldProps {
  field: CalculatorFieldDef;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  index?: number;
}

const controlClassName = cn(
  glassInsetInput,
  "h-12 w-full rounded-xl px-3.5 text-base",
  "focus-visible:outline-none"
);

const rangeClassName = cn(
  "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted/80",
  "accent-primary",
  "[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary/30 [&::-webkit-slider-thumb]:bg-primary",
  "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform",
  "[&::-webkit-slider-thumb]:hover:scale-110",
  "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2",
  "[&::-moz-range-thumb]:border-primary/30 [&::-moz-range-thumb]:bg-primary"
);

export function CalculatorField({
  field,
  value,
  onChange,
  className,
  index = 0,
}: CalculatorFieldProps) {
  const inputType = field.inputType ?? "text";

  return (
    <div
      className={cn(
        "group/field space-y-2",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-both motion-safe:duration-300",
        className
      )}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <Label
          htmlFor={field.id}
          className="text-[0.8125rem] font-medium tracking-tight text-foreground/90"
        >
          {field.label}
        </Label>
        {inputType === "range" ? (
          <span className="shrink-0 rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[0.8125rem] font-semibold tabular-nums text-primary">
            {value}
            {field.unit ? ` ${field.unit}` : ""}
          </span>
        ) : field.unit ? (
          <span className="shrink-0 rounded-md bg-muted/80 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
            {field.unit}
          </span>
        ) : null}
      </div>

      {inputType === "select" && field.options ? (
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
      ) : inputType === "range" ? (
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
      ) : (
        <Input
          id={field.id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(
            controlClassName,
            "placeholder:text-muted-foreground/50"
          )}
          autoComplete="off"
          enterKeyHint="done"
        />
      )}

      {field.hint && (
        <p className="text-xs leading-relaxed text-muted-foreground/90">
          {field.hint}
        </p>
      )}
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorFieldDef } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorFieldProps {
  field: CalculatorFieldDef;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  index?: number;
}

export function CalculatorField({
  field,
  value,
  onChange,
  className,
  index = 0,
}: CalculatorFieldProps) {
  return (
    <div
      className={cn(
        "group/field space-y-2",
        "animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-300",
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
        {field.unit && (
          <span className="shrink-0 rounded-md bg-muted/80 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
            {field.unit}
          </span>
        )}
      </div>
      <Input
        id={field.id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={cn(
          "h-12 rounded-xl border-border/70 bg-background/80 px-3.5 text-base shadow-sm",
          "transition-[border-color,box-shadow,background-color] duration-200",
          "placeholder:text-muted-foreground/50",
          "focus-visible:border-primary/40 focus-visible:bg-background focus-visible:ring-4 focus-visible:ring-primary/10"
        )}
        autoComplete="off"
        enterKeyHint="done"
      />
      {field.hint && (
        <p className="text-xs leading-relaxed text-muted-foreground/90">
          {field.hint}
        </p>
      )}
    </div>
  );
}

"use client";

import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorPageShellContext } from "@/components/calculator/calculator-page-shell-context";
import type { CalculatorFieldDef } from "@/lib/calculators";
import { getCalculatorFieldIcon } from "@/lib/calculator-field-icons";
import { isCalculatorFieldValid } from "@/lib/calculator-status";
import {
  calculatorCommandInput,
  calculatorFieldValidInput,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorFieldProps {
  field: CalculatorFieldDef;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  index?: number;
}

function getControlClassName(isValid: boolean) {
  return cn(
    calculatorCommandInput,
    "input-dark h-12 w-full px-3.5 text-base text-foreground shadow-none transition-colors duration-200",
    "focus-visible:outline-none",
    isValid
      ? calculatorFieldValidInput
      : "rounded-none border-0 focus-visible:border-0 focus-visible:ring-0"
  );
}

const rangeClassName = cn(
  "h-2 w-full cursor-pointer appearance-none bg-muted/80 transition-colors duration-200",
  "accent-background",
  "[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:bg-background",
  "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-2",
  "[&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:bg-background"
);

const rangeValidClassName = cn(
  "accent-status-success",
  "[&::-webkit-slider-thumb]:border-status-success-border",
  "[&::-moz-range-thumb]:border-status-success-border"
);

function formatUnit(unit: string) {
  return unit.toUpperCase();
}

function formatDisplayValue(value: string, field: CalculatorFieldDef) {
  const raw = value || field.defaultValue || String(field.min ?? 0);
  if (field.inputType === "range" && field.unit) {
    return `${raw}${field.unit.startsWith("%") ? "" : " "}${field.unit}`;
  }
  return raw;
}

function CalculatorFieldBlueprint({
  field,
  value,
  onChange,
  className,
}: CalculatorFieldProps) {
  const inputType = field.inputType ?? "text";
  const fieldValue = value || field.defaultValue || "";
  const isValid = isCalculatorFieldValid(field, fieldValue);
  const FieldIcon = getCalculatorFieldIcon(field);
  const displayValue = formatDisplayValue(value, field);

  return (
    <div
      className={cn(
        "calculator-param-block calculator-sidebar-field calculator-command__field",
        isValid && "calculator-param-block--valid calculator-field--valid",
        className
      )}
      data-field-valid={isValid ? "true" : "false"}
    >
      <Label htmlFor={field.id} className="calculator-param-block__label">
        <span className="calculator-param-block__icon" aria-hidden>
          <FieldIcon className="size-3" strokeWidth={2.25} />
        </span>
        <span className="calculator-param-block__label-text">
          {field.label}
          {field.unit ? (
            <span className="calculator-param-block__unit">
              {" "}
              ({formatUnit(field.unit)})
            </span>
          ) : null}
        </span>
      </Label>

      {inputType === "range" ? (
        <div className="calculator-param-block__range">
          <span className="calculator-param-block__value">{displayValue}</span>
          <div className="calculator-param-block__track">
            <div
              className="calculator-param-block__fill"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    0,
                    ((Number(fieldValue || field.defaultValue || (field.min ?? 0)) -
                      (field.min ?? 0)) /
                      ((field.max ?? 100) - (field.min ?? 0))) *
                      100
                  )
                )}%`,
              }}
            />
            <input
              id={field.id}
              type="range"
              min={field.min ?? 0}
              max={field.max ?? 100}
              step={field.step ?? 1}
              value={value || field.defaultValue || String(field.min ?? 0)}
              onChange={(e) => onChange(e.target.value)}
              className="calculator-param-block__slider"
              aria-valuemin={field.min}
              aria-valuemax={field.max}
              aria-valuenow={Number(value || field.defaultValue || String(field.min ?? 0))}
            />
          </div>
        </div>
      ) : inputType === "select" && field.options ? (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            calculatorCommandInput,
            "input-dark calculator-param-block__control calculator-param-block__select",
            isValid && calculatorFieldValidInput
          )}
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
          className={cn(
            calculatorCommandInput,
            "input-dark calculator-param-block__control calculator-param-block__input",
            isValid && calculatorFieldValidInput,
            "placeholder:text-muted-foreground/50"
          )}
          autoComplete="off"
          enterKeyHint="done"
        />
      )}

      {field.hint ? (
        <p className="calculator-param-block__hint">{field.hint}</p>
      ) : null}
    </div>
  );
}

function CalculatorFieldClassic({
  field,
  value,
  onChange,
  className,
}: CalculatorFieldProps) {
  const inputType = field.inputType ?? "text";
  const fieldValue = value || field.defaultValue || "";
  const isValid = isCalculatorFieldValid(field, fieldValue);
  const controlClassName = getControlClassName(isValid);
  const FieldIcon = getCalculatorFieldIcon(field);

  return (
    <div
      className={cn(
        "calculator-sidebar-field calculator-command__field group/field transition-colors duration-200",
        isValid && "calculator-field--valid",
        className
      )}
      data-field-valid={isValid ? "true" : "false"}
    >
      <Label
        htmlFor={field.id}
        className="calculator-field__label flex items-center gap-2 text-sm font-medium leading-snug text-foreground"
      >
        <span className="calculator-field__icon" aria-hidden>
          <FieldIcon className="size-3.5" strokeWidth={2.25} />
        </span>
        <span className="min-w-0 flex-1">
          {field.label}
          {field.unit ? (
            <span className="font-normal text-muted-foreground">
              {" "}
              ({formatUnit(field.unit)})
            </span>
          ) : null}
        </span>
      </Label>

      {inputType === "range" ? (
        <div
          className={cn(
            "flex flex-col gap-2 transition-colors duration-200",
            isValid
              ? "rounded-md border-2 border-status-success bg-status-success-input p-3"
              : "rounded-none"
          )}
        >
          <span
            className={cn(
              "font-mono text-[0.8125rem] font-semibold tabular-nums",
              isValid ? "text-status-success" : "text-primary"
            )}
          >
            {value || field.defaultValue || String(field.min ?? 0)}
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
            className={cn(rangeClassName, isValid && rangeValidClassName)}
            aria-valuemin={field.min}
            aria-valuemax={field.max}
            aria-valuenow={Number(value || field.defaultValue || String(field.min ?? 0))}
          />
        </div>
      ) : inputType === "select" && field.options ? (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(controlClassName, "input-dark cursor-pointer")}
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

export function CalculatorField(props: CalculatorFieldProps) {
  const inBlueprintShell = useContext(CalculatorPageShellContext) !== null;
  return inBlueprintShell ? (
    <CalculatorFieldBlueprint {...props} />
  ) : (
    <CalculatorFieldClassic {...props} />
  );
}

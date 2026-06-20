import type { CalculatorFieldDef, CalculatorId } from "@/lib/calculators";
import { parseLatitude, parseNonNegative, parsePositive } from "@/lib/format";

export type CalculatorStatusAlertVariant = "warning";

export interface CalculatorStatusAlert {
  variant: CalculatorStatusAlertVariant;
  message: string;
}

/** Whether a field has a usable value for status-success highlighting. */
export function isCalculatorFieldValid(
  field: CalculatorFieldDef,
  value: string
): boolean {
  const trimmed = value.trim();
  const inputType = field.inputType ?? "text";

  if (inputType === "range" || inputType === "select") {
    return trimmed.length > 0 || Boolean(field.defaultValue);
  }

  if (!trimmed) return false;

  if (field.id === "latitude" || field.unit === "°") {
    return parseLatitude(trimmed) !== null;
  }

  if (field.unit === "%") {
    const n = Number(trimmed);
    return Number.isFinite(n) && n >= 0 && n <= 100;
  }

  if (
    field.unit &&
    ["W", "kW", "V", "A", "Ah", "kWh", "sq ft", "m", "ft", "hrs", "days", "mi", "km"].some(
      (u) => field.unit?.toLowerCase().includes(u.toLowerCase())
    )
  ) {
    return parsePositive(trimmed) !== null || parseNonNegative(trimmed) !== null;
  }

  return trimmed.length > 0;
}

const SHADING_HINT =
  /shading|setback|vent|obstruction|usable for pv/i;

function fieldSuggestsShadingRisk(field: CalculatorFieldDef): boolean {
  const haystack = `${field.id} ${field.label} ${field.hint ?? ""}`.toLowerCase();
  return SHADING_HINT.test(haystack);
}

/** Contextual warning alerts — generic rules for all calculators. */
export function getCalculatorStatusAlert(
  _calculatorId: CalculatorId,
  values: Record<string, string>,
  fields: CalculatorFieldDef[],
  hasResult: boolean
): CalculatorStatusAlert | null {
  if (!hasResult) return null;

  for (const field of fields) {
    if (field.inputType !== "range" || field.unit !== "%") continue;
    if (!fieldSuggestsShadingRisk(field)) continue;

    const raw = values[field.id]?.trim() || field.defaultValue || "";
    const pct = Number(raw);
    if (Number.isFinite(pct) && pct < 80) {
      return {
        variant: "warning",
        message:
          "Potential shading issues detected. Optimization advised.",
      };
    }
  }

  for (const field of fields) {
    const haystack = `${field.id} ${field.label} ${field.hint ?? ""}`.toLowerCase();
    if (!haystack.includes("efficiency") && !haystack.includes("degradation")) {
      continue;
    }

    const raw = values[field.id]?.trim() || field.defaultValue || "";
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0 && n < 70) {
      return {
        variant: "warning",
        message:
          "Efficiency is below typical operating range. Review inputs and assumptions.",
      };
    }
  }

  return null;
}

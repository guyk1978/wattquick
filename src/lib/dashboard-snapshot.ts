import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";

export function formatResultSnapshot(
  value: string | null,
  unit?: string
): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return unit ? `${trimmed} ${unit}`.trim() : trimmed;
}

/** Preview result using field placeholders / defaults (for recent widgets before live input) */
export function getDefaultResultSnapshot(id: CalculatorId): string | null {
  const def = getCalculatorDefinition(id);
  const values: Record<string, string> = {};
  for (const field of def.fields) {
    values[field.id] =
      field.defaultValue ?? field.placeholder ?? "";
  }
  const result = def.compute(values);
  return formatResultSnapshot(result.value, result.unit);
}

"use client";

import { useCalculatorId } from "@/components/calculator/calculator-id-context";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { interpretResult } from "@/lib/calculators/result-interpreter";
import { cn } from "@/lib/utils";

interface ResultInterpreterProps {
  /** Formatted primary result value; null/empty renders nothing. */
  value: string | null;
  unit?: string;
  detail?: string | null;
  /** Raw calculator inputs, when available, for richer phrasing. */
  values?: Record<string, string>;
  className?: string;
}

/**
 * Plain-English explanation shown directly under the main result value.
 * Reads the active calculator from context and delegates the wording to the
 * category/per-calculator interpreters in `lib/calculators/result-interpreter`.
 */
export function ResultInterpreter({
  value,
  unit,
  detail,
  values,
  className,
}: ResultInterpreterProps) {
  const id = useCalculatorId();

  if (!id || value == null || !value.trim()) return null;

  const definition = getCalculatorDefinition(id);
  if (!definition) return null;

  const sentence = interpretResult({
    id,
    category: definition.category,
    title: definition.title,
    resultLabel: definition.result.label,
    value,
    unit,
    detail,
    values: values ?? {},
  });

  if (!sentence) return null;

  return (
    <p className={cn("calculator-result-interpreter", className)}>{sentence}</p>
  );
}

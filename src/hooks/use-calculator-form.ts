"use client";

import { useCallback, useMemo, useState } from "react";
import type { CalculatorFieldDef } from "@/lib/calculators";

function buildInitialValues(fields: CalculatorFieldDef[]): Record<string, string> {
  return Object.fromEntries(
    fields.map((field) => [field.id, field.defaultValue ?? ""])
  );
}

export function useCalculatorForm(fields: CalculatorFieldDef[]) {
  const initial = useMemo(() => buildInitialValues(fields), [fields]);

  const [values, setValues] = useState<Record<string, string>>(initial);

  const setValue = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  return { values, setValue };
}

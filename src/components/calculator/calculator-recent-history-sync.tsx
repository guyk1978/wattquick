"use client";

import { useEffect, useRef } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getDefaultResultSnapshot } from "@/lib/dashboard-snapshot";
import { recordCalculatorUse } from "@/lib/dashboard-storage";

interface CalculatorRecentHistorySyncProps {
  calculatorId: CalculatorId;
}

/** Logs calculator opens to local recent history (shared with /calculators hero). */
export function CalculatorRecentHistorySync({
  calculatorId,
}: CalculatorRecentHistorySyncProps) {
  const snapshotRef = useRef<string | null>(null);

  useEffect(() => {
    const fallback = getDefaultResultSnapshot(calculatorId);
    snapshotRef.current = fallback;
    recordCalculatorUse(calculatorId, fallback);

    return () => {
      recordCalculatorUse(calculatorId, snapshotRef.current);
    };
  }, [calculatorId]);

  return null;
}

export function formatCalculatorResultSnapshot(
  value: string | null | undefined,
  unit?: string
): string | null {
  if (!value?.trim()) return null;
  return unit ? `${value.trim()} ${unit}`.trim() : value.trim();
}

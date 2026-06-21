"use client";

import { createContext, useContext } from "react";
import { CalculatorShareMetaSync } from "@/components/calculator/calculator-share-meta-sync";
import type { CalculatorId } from "@/lib/calculators";

const CalculatorIdContext = createContext<CalculatorId | null>(null);

export function CalculatorIdProvider({
  id,
  children,
}: {
  id: CalculatorId;
  children: React.ReactNode;
}) {
  return (
    <CalculatorIdContext.Provider value={id}>
      <CalculatorShareMetaSync />
      {children}
    </CalculatorIdContext.Provider>
  );
}

export function useCalculatorId(): CalculatorId | null {
  return useContext(CalculatorIdContext);
}

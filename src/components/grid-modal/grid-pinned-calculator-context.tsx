"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CalculatorId } from "@/lib/calculators";

type GridPinnedCalculatorContextValue = {
  pinnedId: CalculatorId | null;
  pin: (id: CalculatorId) => void;
  unpin: () => void;
  isPinned: (id: CalculatorId) => boolean;
};

const GridPinnedCalculatorContext = createContext<
  GridPinnedCalculatorContextValue | null
>(null);

export function GridPinnedCalculatorProvider({ children }: { children: ReactNode }) {
  const [pinnedId, setPinnedId] = useState<CalculatorId | null>(null);

  const pin = useCallback((id: CalculatorId) => {
    setPinnedId(id);
  }, []);

  const unpin = useCallback(() => {
    setPinnedId(null);
  }, []);

  const isPinned = useCallback(
    (id: CalculatorId) => pinnedId === id,
    [pinnedId]
  );

  const value = useMemo(
    () => ({ pinnedId, pin, unpin, isPinned }),
    [pinnedId, pin, unpin, isPinned]
  );

  return (
    <GridPinnedCalculatorContext.Provider value={value}>
      {children}
    </GridPinnedCalculatorContext.Provider>
  );
}

export function useGridPinnedCalculator(): GridPinnedCalculatorContextValue {
  const ctx = useContext(GridPinnedCalculatorContext);
  if (!ctx) {
    throw new Error(
      "useGridPinnedCalculator must be used within GridPinnedCalculatorProvider"
    );
  }
  return ctx;
}

export function useGridPinnedCalculatorOptional():
  GridPinnedCalculatorContextValue | null {
  return useContext(GridPinnedCalculatorContext);
}

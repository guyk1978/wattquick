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

type ToolCardSelectionContextValue = {
  selectedIds: CalculatorId[];
  selectedCount: number;
  isSelected: (id: CalculatorId) => boolean;
  toggle: (id: CalculatorId) => void;
  clear: () => void;
};

const ToolCardSelectionContext =
  createContext<ToolCardSelectionContextValue | null>(null);

export function ToolCardSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<CalculatorId>>(() => new Set());

  const toggle = useCallback((id: CalculatorId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelected(new Set());
  }, []);

  const isSelected = useCallback(
    (id: CalculatorId) => selected.has(id),
    [selected]
  );

  const value = useMemo<ToolCardSelectionContextValue>(
    () => ({
      selectedIds: Array.from(selected),
      selectedCount: selected.size,
      isSelected,
      toggle,
      clear,
    }),
    [selected, isSelected, toggle, clear]
  );

  return (
    <ToolCardSelectionContext.Provider value={value}>
      {children}
    </ToolCardSelectionContext.Provider>
  );
}

export function useToolCardSelection(): ToolCardSelectionContextValue {
  const ctx = useContext(ToolCardSelectionContext);
  if (!ctx) {
    throw new Error(
      "useToolCardSelection must be used within ToolCardSelectionProvider"
    );
  }
  return ctx;
}

export function useToolCardSelectionOptional(): ToolCardSelectionContextValue | null {
  return useContext(ToolCardSelectionContext);
}

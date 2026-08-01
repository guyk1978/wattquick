"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CalculatorId } from "@/lib/calculators";
import {
  readPinnedCalculatorIds,
  writePinnedCalculatorIds,
} from "@/lib/calculator-pinned";

type GridPinnedCalculatorContextValue = {
  /** Pinned tools in pin order (newest last). */
  pinnedIds: CalculatorId[];
  /** True after localStorage has been read on the client. */
  hydrated: boolean;
  /** Add a tool to the pinned stack (no-op if already pinned). */
  pin: (id: CalculatorId) => void;
  /** Remove one pinned tool. */
  unpin: (id: CalculatorId) => void;
  /** Clear the entire pinned stack. */
  unpinAll: () => void;
  isPinned: (id: CalculatorId) => boolean;
};

const GridPinnedCalculatorContext = createContext<
  GridPinnedCalculatorContextValue | null
>(null);

export function GridPinnedCalculatorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pinnedIds, setPinnedIds] = useState<CalculatorId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restore pins once on mount — do not write until after this completes.
  useEffect(() => {
    setPinnedIds(readPinnedCalculatorIds());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writePinnedCalculatorIds(pinnedIds);
  }, [pinnedIds, hydrated]);

  const pin = useCallback((id: CalculatorId) => {
    setPinnedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unpin = useCallback((id: CalculatorId) => {
    setPinnedIds((prev) => prev.filter((pinnedId) => pinnedId !== id));
  }, []);

  const unpinAll = useCallback(() => {
    setPinnedIds([]);
  }, []);

  const isPinned = useCallback(
    (id: CalculatorId) => pinnedIds.includes(id),
    [pinnedIds]
  );

  const value = useMemo(
    () => ({ pinnedIds, hydrated, pin, unpin, unpinAll, isPinned }),
    [pinnedIds, hydrated, pin, unpin, unpinAll, isPinned]
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

export function useGridPinnedCalculatorOptional(): GridPinnedCalculatorContextValue | null {
  return useContext(GridPinnedCalculatorContext);
}

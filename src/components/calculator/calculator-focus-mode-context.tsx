"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface CalculatorFocusModeContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CalculatorFocusModeContext =
  createContext<CalculatorFocusModeContextValue | null>(null);

export function CalculatorFocusModeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [close, isOpen, open, toggle]
  );

  return (
    <CalculatorFocusModeContext.Provider value={value}>
      {children}
    </CalculatorFocusModeContext.Provider>
  );
}

export function useCalculatorFocusMode() {
  const ctx = useContext(CalculatorFocusModeContext);
  if (!ctx) {
    throw new Error(
      "useCalculatorFocusMode must be used within CalculatorFocusModeProvider"
    );
  }
  return ctx;
}

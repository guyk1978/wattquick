"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";

export interface CalculatorPageSlots {
  sidebar: ReactNode | null;
  main: ReactNode | null;
  footer: ReactNode | null;
}

const EMPTY_SLOTS: CalculatorPageSlots = {
  sidebar: null,
  main: null,
  footer: null,
};

interface CalculatorPageShellContextValue {
  slotsRef: MutableRefObject<CalculatorPageSlots>;
  activeOwnerRef: MutableRefObject<symbol | null>;
  registerSlots: (owner: symbol, slots: CalculatorPageSlots) => void;
  registerShellRerender: (fn: () => void) => void;
  releaseSlots: (owner: symbol) => void;
}

export const CalculatorPageShellContext =
  createContext<CalculatorPageShellContextValue | null>(null);

export function CalculatorPageShellProvider({ children }: { children: ReactNode }) {
  const slotsRef = useRef<CalculatorPageSlots>(EMPTY_SLOTS);
  const activeOwnerRef = useRef<symbol | null>(null);
  const shellRerenderRef = useRef<(() => void) | null>(null);

  const registerShellRerender = useCallback((fn: () => void) => {
    shellRerenderRef.current = fn;
    fn();
  }, []);

  const registerSlots = useCallback((owner: symbol, slots: CalculatorPageSlots) => {
    activeOwnerRef.current = owner;
    slotsRef.current = slots;
    shellRerenderRef.current?.();
  }, []);

  const releaseSlots = useCallback((owner: symbol) => {
    if (activeOwnerRef.current !== owner) return;
    activeOwnerRef.current = null;
    slotsRef.current = EMPTY_SLOTS;
    shellRerenderRef.current?.();
  }, []);

  const value = useRef<CalculatorPageShellContextValue>({
    slotsRef,
    activeOwnerRef,
    registerSlots,
    registerShellRerender,
    releaseSlots,
  });

  value.current.slotsRef = slotsRef;
  value.current.activeOwnerRef = activeOwnerRef;
  value.current.registerSlots = registerSlots;
  value.current.registerShellRerender = registerShellRerender;
  value.current.releaseSlots = releaseSlots;

  return (
    <CalculatorPageShellContext.Provider value={value.current}>
      {children}
    </CalculatorPageShellContext.Provider>
  );
}

export function useCalculatorPageShell() {
  const ctx = useContext(CalculatorPageShellContext);
  if (!ctx) {
    throw new Error("useCalculatorPageShell must be used within CalculatorPageShellProvider");
  }
  return ctx;
}

/**
 * Push sidebar / main / footer into the page shell.
 * Updates a ref and re-renders only the shell (not the provider), avoiding infinite loops.
 */
export function useCalculatorPageSlots(slots: CalculatorPageSlots) {
  const { registerSlots, releaseSlots } = useCalculatorPageShell();
  const { sidebar, main, footer } = slots;
  const ownerRef = useRef<symbol | null>(null);
  if (ownerRef.current === null) {
    ownerRef.current = Symbol("calculator-page-slots");
  }

  useLayoutEffect(() => {
    const owner = ownerRef.current!;
    registerSlots(owner, { sidebar, main, footer });
    return () => releaseSlots(owner);
  });
}

/** Subscribe the page shell to slot updates (reads from slotsRef). */
export function useCalculatorPageShellSlots(): CalculatorPageSlots {
  const { slotsRef, registerShellRerender } = useCalculatorPageShell();
  const [, setVersion] = useState(0);

  useLayoutEffect(() => {
    registerShellRerender(() => setVersion((v) => v + 1));
  }, [registerShellRerender]);

  return slotsRef.current;
}

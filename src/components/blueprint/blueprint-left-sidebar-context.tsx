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

const STORAGE_KEY = "wattquick-blueprint-left-sidebar-collapsed";

interface BlueprintLeftSidebarContextValue {
  collapsed: boolean;
  hydrated: boolean;
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
}

const BlueprintLeftSidebarContext =
  createContext<BlueprintLeftSidebarContextValue | null>(null);

function readStoredCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeStoredCollapsed(collapsed: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  } catch {
    /* ignore quota / private mode */
  }
}

export function BlueprintLeftSidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCollapsed(readStoredCollapsed());
    setHydrated(true);
  }, []);

  const setAndPersist = useCallback((next: boolean) => {
    setCollapsed(next);
    writeStoredCollapsed(next);
  }, []);

  const collapse = useCallback(() => setAndPersist(true), [setAndPersist]);
  const expand = useCallback(() => setAndPersist(false), [setAndPersist]);
  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      writeStoredCollapsed(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      collapsed: hydrated ? collapsed : false,
      hydrated,
      collapse,
      expand,
      toggle,
    }),
    [collapse, collapsed, expand, hydrated, toggle]
  );

  return (
    <BlueprintLeftSidebarContext.Provider value={value}>
      {children}
    </BlueprintLeftSidebarContext.Provider>
  );
}

export function useBlueprintLeftSidebar() {
  const ctx = useContext(BlueprintLeftSidebarContext);
  if (!ctx) {
    throw new Error(
      "useBlueprintLeftSidebar must be used within BlueprintLeftSidebarProvider"
    );
  }
  return ctx;
}

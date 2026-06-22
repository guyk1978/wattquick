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

const COLLAPSED_KEY = "wattquick-blueprint-right-sidebar-collapsed";
const WIDE_KEY = "wattquick-blueprint-right-sidebar-wide";

interface BlueprintRightSidebarContextValue {
  collapsed: boolean;
  wide: boolean;
  hydrated: boolean;
  collapse: () => void;
  expand: () => void;
  toggleCollapsed: () => void;
  toggleWide: () => void;
  setWide: (wide: boolean) => void;
}

const BlueprintRightSidebarContext =
  createContext<BlueprintRightSidebarContextValue | null>(null);

function readStoredBoolean(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeStoredBoolean(key: string, value: boolean) {
  try {
    window.localStorage.setItem(key, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function BlueprintRightSidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [wide, setWideState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCollapsed(readStoredBoolean(COLLAPSED_KEY));
    setWideState(readStoredBoolean(WIDE_KEY));
    setHydrated(true);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      writeStoredBoolean(COLLAPSED_KEY, next);
      return next;
    });
  }, []);

  const setWide = useCallback((next: boolean) => {
    setWideState(next);
    writeStoredBoolean(WIDE_KEY, next);
  }, []);

  const toggleWide = useCallback(() => {
    setWideState((prev) => {
      const next = !prev;
      writeStoredBoolean(WIDE_KEY, next);
      return next;
    });
  }, []);

  const collapse = useCallback(() => {
    setCollapsed(true);
    writeStoredBoolean(COLLAPSED_KEY, true);
  }, []);

  const expand = useCallback(() => {
    setCollapsed(false);
    writeStoredBoolean(COLLAPSED_KEY, false);
  }, []);

  const value = useMemo(
    () => ({
      collapsed: hydrated ? collapsed : false,
      wide: hydrated ? wide && !collapsed : false,
      hydrated,
      collapse,
      expand,
      toggleCollapsed,
      toggleWide,
      setWide,
    }),
    [collapse, collapsed, expand, hydrated, setWide, toggleCollapsed, toggleWide, wide]
  );

  return (
    <BlueprintRightSidebarContext.Provider value={value}>
      {children}
    </BlueprintRightSidebarContext.Provider>
  );
}

export function useBlueprintRightSidebar() {
  const ctx = useContext(BlueprintRightSidebarContext);
  if (!ctx) {
    throw new Error(
      "useBlueprintRightSidebar must be used within BlueprintRightSidebarProvider"
    );
  }
  return ctx;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CalculatorLaunchModal } from "@/components/calculator/calculator-launch-modal";
import type { CalculatorId } from "@/lib/calculators";
import {
  clearToolLaunchContext,
  setToolLaunchContext,
  type ToolLaunchContext,
} from "@/lib/content-tool-link";

interface ToolLaunchContextValue {
  articleSlug: string;
  articleTitle: string;
  openTool: (toolId: CalculatorId) => void;
}

const ToolLaunchCtx = createContext<ToolLaunchContextValue | null>(null);

interface ToolLaunchProviderProps {
  articleSlug: string;
  articleTitle: string;
  children: ReactNode;
}

export function ToolLaunchProvider({
  articleSlug,
  articleTitle,
  children,
}: ToolLaunchProviderProps) {
  const [activeToolId, setActiveToolId] = useState<CalculatorId | null>(null);
  const [launchCtx, setLaunchCtx] = useState<ToolLaunchContext | null>(null);

  const openTool = useCallback(
    (toolId: CalculatorId) => {
      const ctx: ToolLaunchContext = { articleSlug, articleTitle, toolId };
      setToolLaunchContext(ctx);
      setLaunchCtx(ctx);
      setActiveToolId(toolId);
    },
    [articleSlug, articleTitle]
  );

  const closeModal = useCallback(() => {
    setActiveToolId(null);
    setLaunchCtx(null);
    clearToolLaunchContext();
  }, []);

  const value = useMemo(
    () => ({ articleSlug, articleTitle, openTool }),
    [articleSlug, articleTitle, openTool]
  );

  return (
    <ToolLaunchCtx.Provider value={value}>
      {children}
      <CalculatorLaunchModal
        calculatorId={activeToolId}
        onClose={closeModal}
        launchContext={launchCtx}
      />
    </ToolLaunchCtx.Provider>
  );
}

export function useToolLaunch(): ToolLaunchContextValue {
  const ctx = useContext(ToolLaunchCtx);
  if (!ctx) {
    throw new Error("useToolLaunch must be used within ToolLaunchProvider");
  }
  return ctx;
}

/** Optional hook for pages without provider (e.g. dashboard) */
export function useToolLaunchOptional(): ToolLaunchContextValue | null {
  return useContext(ToolLaunchCtx);
}

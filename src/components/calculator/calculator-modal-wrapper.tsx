"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { RelatedArticleCard } from "@/lib/calculators/related-articles";
import { cn } from "@/lib/utils";

type CalculatorModalWorkspaceValue = {
  active: boolean;
  relatedArticles: RelatedArticleCard[];
};

const CalculatorModalWorkspaceContext =
  createContext<CalculatorModalWorkspaceValue>({
    active: false,
    relatedArticles: [],
  });

/** Outer provider so Documentation + CalculatorModalWrapper share the same cards. */
const RelatedArticlesWorkspaceContext = createContext<
  RelatedArticleCard[] | null
>(null);

export function RelatedArticlesWorkspaceProvider({
  articles,
  children,
}: {
  articles: RelatedArticleCard[];
  children: ReactNode;
}) {
  return (
    <RelatedArticlesWorkspaceContext.Provider value={articles}>
      {children}
    </RelatedArticlesWorkspaceContext.Provider>
  );
}

export function useCalculatorModalWorkspace(): boolean {
  return useContext(CalculatorModalWorkspaceContext).active;
}

export function useCalculatorModalRelatedArticles(): RelatedArticleCard[] {
  const fromWrapper = useContext(CalculatorModalWorkspaceContext).relatedArticles;
  const fromWorkspace = useContext(RelatedArticlesWorkspaceContext);
  return fromWrapper.length > 0 ? fromWrapper : (fromWorkspace ?? []);
}

type CalculatorModalWrapperProps = {
  children: ReactNode;
  className?: string;
  /**
   * Optional Further Reading cards for Documentation.
   * Pass `[]` when none are configured yet — the docs slot stays ready.
   * When omitted, inherits from `RelatedArticlesWorkspaceProvider`.
   */
  relatedArticles?: RelatedArticleCard[];
};

/**
 * Master container for every calculator opened in the Grid-to-Modal workspace.
 * - Locks height to 100% so columns own overflow (no document scroll leak)
 * - Applies global custom scrollbar styles to internal scroll regions
 * - Enforces Industrial Matte dark inputs (`.input-dark`) via scoped CSS
 * - Carries `relatedArticles` for Documentation → Further Reading
 */
export function CalculatorModalWrapper({
  children,
  className,
  relatedArticles,
}: CalculatorModalWrapperProps) {
  const fromWorkspace = useContext(RelatedArticlesWorkspaceContext);
  const resolvedArticles = relatedArticles ?? fromWorkspace ?? [];

  return (
    <CalculatorModalWorkspaceContext.Provider
      value={{ active: true, relatedArticles: resolvedArticles }}
    >
      <div
        data-calculator-modal-wrapper
        className={cn(
          "calculator-modal-wrapper",
          "calculator-embed-shell",
          "calculator-embed-shell--modal",
          className
        )}
      >
        {children}
      </div>
    </CalculatorModalWorkspaceContext.Provider>
  );
}

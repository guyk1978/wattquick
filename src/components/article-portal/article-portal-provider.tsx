"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Article } from "@/data/articles";
import { ArticlePortal } from "@/components/article-portal/article-portal";

type ArticlePortalContextValue = {
  articles: Article[];
  isOpen: boolean;
  activeArticleId: string | null;
  openArticle: (id?: string) => void;
  closeArticlePortal: () => void;
};

const ArticlePortalContext = createContext<ArticlePortalContextValue | null>(
  null
);

export function ArticlePortalProvider({
  articles,
  children,
}: {
  articles: Article[];
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const openArticle = useCallback(
    (id?: string) => {
      const nextId =
        id && articles.some((article) => article.id === id)
          ? id
          : (articles[0]?.id ?? null);
      setActiveArticleId(nextId);
      setIsOpen(true);
    },
    [articles]
  );

  const closeArticlePortal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      articles,
      isOpen,
      activeArticleId,
      openArticle,
      closeArticlePortal,
    }),
    [articles, isOpen, activeArticleId, openArticle, closeArticlePortal]
  );

  return (
    <ArticlePortalContext.Provider value={value}>
      {children}
      <ArticlePortal />
    </ArticlePortalContext.Provider>
  );
}

export function useArticlePortal(): ArticlePortalContextValue {
  const ctx = useContext(ArticlePortalContext);
  if (!ctx) {
    throw new Error(
      "useArticlePortal must be used within ArticlePortalProvider"
    );
  }
  return ctx;
}

/** Safe hook when portal may be outside provider (e.g. isolated tests). */
export function useArticlePortalOptional(): ArticlePortalContextValue | null {
  return useContext(ArticlePortalContext);
}

"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useArticlePortalOptional } from "@/components/article-portal/article-portal-provider";
import { cn } from "@/lib/utils";

type ArticleLinkProps = {
  articleId: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "onClick" | "type" | "children">;

/**
 * Opens the Article Portal at the given article id (no route navigation).
 * Falls back to a plain button if the portal provider is unavailable.
 */
export function ArticleLink({
  articleId,
  children,
  className,
  ...rest
}: ArticleLinkProps) {
  const portal = useArticlePortalOptional();

  return (
    <button
      type="button"
      className={cn("article-link", className)}
      onClick={() => portal?.openArticle(articleId)}
      {...rest}
    >
      {children}
    </button>
  );
}

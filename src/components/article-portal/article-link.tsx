import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleLinkProps = {
  articleId: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

/** Navigates to the dedicated article page at `/articles/[slug]/`. */
export function ArticleLink({
  articleId,
  children,
  className,
  ...rest
}: ArticleLinkProps) {
  return (
    <Link
      href={`/articles/${articleId}/`}
      className={cn("article-link", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

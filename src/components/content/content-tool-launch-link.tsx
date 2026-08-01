"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { CalculatorId } from "@/lib/calculators";
import {
  buildCalculatorUrl,
  setToolLaunchContext,
} from "@/lib/content-tool-link";
import { cn } from "@/lib/utils";

type ContentToolLaunchLinkProps = {
  calculatorHref: string;
  calculatorId: CalculatorId;
  articleSlug: string;
  articleTitle?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "onClick">;

/**
 * Clean tool link from article content. Stores return context in sessionStorage
 * instead of appending deprecated `?fromArticle=` query params.
 */
export function ContentToolLaunchLink({
  calculatorHref,
  calculatorId,
  articleSlug,
  articleTitle,
  children,
  className,
  ...rest
}: ContentToolLaunchLinkProps) {
  const href = buildCalculatorUrl(calculatorHref);

  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={() => {
        setToolLaunchContext({
          articleSlug,
          articleTitle: articleTitle?.trim() || articleSlug,
          toolId: calculatorId,
        });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

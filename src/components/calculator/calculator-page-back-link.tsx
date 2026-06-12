"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticleUrl, getArticleSlugFromSearchParams } from "@/lib/content-tool-link";
import { cn } from "@/lib/utils";

interface CalculatorPageBackLinkProps {
  className?: string;
}

export function CalculatorPageBackLink({ className }: CalculatorPageBackLinkProps) {
  const searchParams = useSearchParams();
  const articleSlug = getArticleSlugFromSearchParams(searchParams);

  if (articleSlug) {
    return (
      <Link
        href={getArticleUrl(articleSlug)}
        className={cn(
          "calculator-page-header__back",
          "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground",
          "transition-colors duration-200 hover:text-foreground",
          "rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        <ArrowLeft className="size-4 shrink-0" aria-hidden />
        Back to article
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "calculator-page-header__back",
        "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground",
        "transition-colors duration-200 hover:text-foreground",
        "rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <ArrowLeft className="size-4 shrink-0" aria-hidden />
      All calculators
    </Link>
  );
}

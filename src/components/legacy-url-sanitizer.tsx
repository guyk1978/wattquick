"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isCalculatorId } from "@/lib/calculators/utils";
import {
  hasLegacyQueryParams,
  stripLegacyQueryParams,
  TOOL_LAUNCH_CONTEXT_STORAGE_KEY,
} from "@/lib/legacy-query";

/**
 * Infer calculator id from tool routes so a legacy `?fromArticle=` bookmark
 * can still restore “Back to article” via sessionStorage after the param is stripped.
 */
function calculatorIdFromPathname(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "tools") return null;
  // /tools/calculators/{slug}/ or /tools/{category}/{slug}/
  const slug = parts.length >= 3 ? parts[2] : parts[1];
  return slug && isCalculatorId(slug) ? slug : null;
}

function migrateFromArticleParam(url: URL): void {
  const articleSlug = url.searchParams.get("fromArticle")?.trim();
  if (!articleSlug) return;
  const toolId = calculatorIdFromPathname(url.pathname);
  if (!toolId || !isCalculatorId(toolId)) return;
  try {
    sessionStorage.setItem(
      TOOL_LAUNCH_CONTEXT_STORAGE_KEY,
      JSON.stringify({
        articleSlug,
        articleTitle: articleSlug,
        toolId,
      })
    );
  } catch {
    /* private mode */
  }
}

/**
 * Soft-nav fallback: if a legacy query slips through (e.g. old in-app link),
 * force a clean reload so Next does not keep a broken search segment in the
 * router tree. Prefer the head `legacyQueryInitScript` for first paint.
 */
function sanitizeCurrentUrl(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    if (!hasLegacyQueryParams(url.searchParams)) return;
    migrateFromArticleParam(url);
    stripLegacyQueryParams(url);
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next === current) return;
    window.location.replace(next);
  } catch {
    /* ignore malformed URLs */
  }
}

export function LegacyUrlSanitizer() {
  const pathname = usePathname();

  useEffect(() => {
    sanitizeCurrentUrl();
  }, [pathname]);

  useEffect(() => {
    const onPopState = () => {
      void Promise.resolve().then(sanitizeCurrentUrl);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return null;
}

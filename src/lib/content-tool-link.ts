import type { CalculatorId } from "@/lib/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";

/** Session context when a tool is opened from a blog article */
export interface ToolLaunchContext {
  articleSlug: string;
  articleTitle: string;
  toolId: CalculatorId;
}

/** Keep in sync with TOOL_LAUNCH_CONTEXT_STORAGE_KEY in legacy-query.ts */
const CONTEXT_KEY = "wattquick-tool-launch-context";

export function getArticleUrl(slug: string): string {
  return `/articles/${slug}/`;
}

/** Persist launch context (client-only) */
export function setToolLaunchContext(ctx: ToolLaunchContext): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx));
  } catch {
    /* private mode */
  }
}

export function getToolLaunchContext(): ToolLaunchContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CONTEXT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ToolLaunchContext;
    if (
      typeof parsed.articleSlug === "string" &&
      typeof parsed.articleTitle === "string" &&
      typeof parsed.toolId === "string" &&
      isCalculatorId(parsed.toolId)
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearToolLaunchContext(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(CONTEXT_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Canonical calculator URL — always a clean path with no legacy query params
 * such as `?fromArticle=`. Article return context uses sessionStorage instead.
 */
export function buildCalculatorUrl(calculatorHref: string): string {
  return calculatorHref.endsWith("/") ? calculatorHref : `${calculatorHref}/`;
}

/** True when modal should show “Back to article” for this tool */
export function shouldShowBackToArticle(
  toolId: CalculatorId,
  ctx: ToolLaunchContext | null
): ctx is ToolLaunchContext {
  return ctx !== null && ctx.toolId === toolId;
}

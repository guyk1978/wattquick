import type { CalculatorId } from "@/lib/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";

/** Session context when a tool is opened from a blog article */
export interface ToolLaunchContext {
  articleSlug: string;
  articleTitle: string;
  toolId: CalculatorId;
}

const CONTEXT_KEY = "wattquick-tool-launch-context";
const URL_PARAM = "fromArticle";

export function getArticleUrl(slug: string): string {
  return `/blog/${slug}/`;
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

/** Read ?fromArticle=slug from calculator page URL (client) */
export function getArticleSlugFromSearchParams(
  params: URLSearchParams
): string | null {
  const slug = params.get(URL_PARAM)?.trim();
  return slug || null;
}

/** Calculator page URL with optional return-to-article query param */
export function buildCalculatorUrl(
  calculatorHref: string,
  options?: { fromArticle?: string }
): string {
  const base = calculatorHref.endsWith("/") ? calculatorHref : `${calculatorHref}/`;
  const articleSlug = options?.fromArticle?.trim();
  if (!articleSlug) return base;
  return `${base}?${URL_PARAM}=${encodeURIComponent(articleSlug)}`;
}

/** True when modal should show “Back to article” for this tool */
export function shouldShowBackToArticle(
  toolId: CalculatorId,
  ctx: ToolLaunchContext | null
): ctx is ToolLaunchContext {
  return ctx !== null && ctx.toolId === toolId;
}

/**
 * Deprecated URL query keys that must never remain in the address bar.
 * Keep allowlisted params elsewhere (`view`, `q`, `category`, `use-case`, `id`).
 */
export const LEGACY_QUERY_PARAMS = ["fromArticle"] as const;

export type LegacyQueryParam = (typeof LEGACY_QUERY_PARAMS)[number];

const LEGACY_SET = new Set<string>(LEGACY_QUERY_PARAMS);

/** Must match `CONTEXT_KEY` in content-tool-link.ts (inlined for early head script). */
export const TOOL_LAUNCH_CONTEXT_STORAGE_KEY = "wattquick-tool-launch-context";

export function isLegacyQueryParam(key: string): boolean {
  return LEGACY_SET.has(key);
}

/** Returns true if the URLSearchParams contain any deprecated keys. */
export function hasLegacyQueryParams(params: URLSearchParams): boolean {
  for (const key of params.keys()) {
    if (LEGACY_SET.has(key)) return true;
  }
  return false;
}

/**
 * Remove deprecated query keys from a URL. Mutates and returns the same URL.
 * Does not touch allowlisted params such as `view` or directory filters.
 */
export function stripLegacyQueryParams(url: URL): URL {
  for (const key of LEGACY_QUERY_PARAMS) {
    url.searchParams.delete(key);
  }
  return url;
}

/**
 * Inline `<head>` script — runs before React so Next never hydrates a router
 * tree that includes legacy search segments like `?fromArticle=` (those hard
 * loads hit the global error boundary). Uses `location.replace` to reload the
 * clean static page.
 */
export const legacyQueryInitScript = `(function(){try{var KEYS=${JSON.stringify([...LEGACY_QUERY_PARAMS])};var CTX="${TOOL_LAUNCH_CONTEXT_STORAGE_KEY}";var u=new URL(location.href);var article=(u.searchParams.get("fromArticle")||"").trim();var dirty=false;for(var i=0;i<KEYS.length;i++){if(u.searchParams.has(KEYS[i])){dirty=true;u.searchParams.delete(KEYS[i]);}}if(!dirty)return;if(article){try{var parts=u.pathname.split("/").filter(Boolean);var toolId=null;if(parts[0]==="tools"&&parts.length>=3)toolId=parts[2];else if(parts[0]==="tools"&&parts.length>=2)toolId=parts[1];if(toolId){sessionStorage.setItem(CTX,JSON.stringify({articleSlug:article,articleTitle:article,toolId:toolId}));}}catch(e){}}var next=u.pathname+u.search+u.hash;var cur=location.pathname+location.search+location.hash;if(next!==cur)location.replace(next);}catch(e){}})();`;

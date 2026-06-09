import { getOgImageUrl } from "@/lib/og-image";

export const THEME_STORAGE_KEY = "wq-theme";

export type Theme = "light" | "dark";

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

export function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function ogImageUrlForTheme(theme: Theme): string {
  return getOgImageUrl(theme);
}

/** Inline script for layout `<head>` — runs before paint to avoid theme flash. */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(d?"dark":"light");var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;var og=t==="dark"?"${ogImageUrlForTheme("dark")}":"${ogImageUrlForTheme("light")}";function m(a,key,val){var el=document.querySelector("meta["+a+'="'+key+'"]');if(!el){el=document.createElement("meta");el.setAttribute(a,key);document.head.appendChild(el);}el.setAttribute("content",val);}m("property","og:image",og);m("name","twitter:image",og);}catch(e){}})();`;

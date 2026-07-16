import { getOgImageUrl } from "@/lib/og-image";

export const THEME_STORAGE_KEY = "wq-theme";

export type Theme = "light" | "dark";

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  // Dark Industrial Matte is the product default; system preference only tips light when explicit.
  void prefersDark;
  return "dark";
}

export function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;

  const themeColor = theme === "dark" ? "#0a0a0a" : "#ffffff";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor);
}

/** Read the active theme from `<html>` after themeInitScript or user toggle. */
export function readThemeFromDocument(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ogImageUrlForTheme(theme: Theme): string {
  return getOgImageUrl(theme);
}

/** Inline script for layout `<head>` — runs before paint to avoid theme flash. */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:"dark";var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;r.dataset.theme=t;var tc=t==="dark"?"#0a0a0a":"#ffffff";function m(a,key,val){var el=document.querySelector("meta["+a+'="'+key+'"]');if(!el){el=document.createElement("meta");el.setAttribute(a,key);document.head.appendChild(el);}el.setAttribute("content",val);}m("name","theme-color",tc);var og=t==="dark"?"${ogImageUrlForTheme("dark")}":"${ogImageUrlForTheme("light")}";m("property","og:image",og);m("name","twitter:image",og);}catch(e){}})();`;

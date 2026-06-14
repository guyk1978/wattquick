/** Concise English labels for header navigation links */
export const HEADER_NAV_SHORT_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/calculators": "Calculators",
  "/favorites": "Favorites",
  "/projects": "Projects",
  "/blog": "Blog",
  "/about": "About",
  "/contact": "Contact",
};

export function getHeaderNavShortLabel(href: string): string {
  const normalized = href.replace(/\/$/, "") || "/";
  return HEADER_NAV_SHORT_LABELS[normalized] ?? normalized;
}

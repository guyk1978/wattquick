import { CALCULATOR_SLUGS } from "@/data/calculators";

const CALCULATOR_PATHS = new Set(
  CALCULATOR_SLUGS.map((slug) => `/${slug}`)
);

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/** Returns true when a main-nav item should show the active (yellow) state. */
export function isMainNavActive(href: string, pathname: string): boolean {
  const path = normalizePath(pathname);
  const link = normalizePath(href);

  if (link === "/calculators") {
    return (
      path === "/calculators" ||
      path.startsWith("/category/") ||
      CALCULATOR_PATHS.has(path)
    );
  }

  if (link === "/blog") {
    return path === "/blog" || path.startsWith("/blog/");
  }

  if (link === "/dashboard") {
    return path === "/dashboard" || path.startsWith("/dashboard/");
  }

  if (link === "/projects") {
    return path === "/projects" || path.startsWith("/projects/");
  }

  return path === link;
}

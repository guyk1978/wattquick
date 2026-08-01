import { CALCULATOR_SLUGS } from "@/data/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function isNestedCalculatorPath(path: string): boolean {
  const match = path.match(/^\/tools\/[^/]+\/([^/]+)$/);
  if (!match) return false;
  return isCalculatorId(match[1]);
}

const LEGACY_CALCULATOR_PATHS = new Set(
  CALCULATOR_SLUGS.map((slug) => `/${slug}`)
);

/** Returns true when a main-nav item should show the active (yellow) state. */
export function isMainNavActive(href: string, pathname: string): boolean {
  const path = normalizePath(pathname);
  const link = normalizePath(href);

  if (link === "/calculators") {
    return (
      path === "/calculators" ||
      path.startsWith("/category/") ||
      path.startsWith("/tools/") ||
      isNestedCalculatorPath(path) ||
      LEGACY_CALCULATOR_PATHS.has(path)
    );
  }

  if (link === "/blog") {
    return path === "/blog" || path.startsWith("/blog/");
  }

  if (link === "/articles") {
    return path === "/articles" || path.startsWith("/articles/");
  }

  if (link === "/dashboard") {
    return path === "/dashboard" || path.startsWith("/dashboard/");
  }

  if (link === "/projects") {
    return path === "/projects" || path.startsWith("/projects/");
  }

  if (link === "/favorites") {
    return path === "/favorites";
  }

  return path === link;
}

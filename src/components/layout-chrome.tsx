"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const SiteHeader = dynamic(
  () =>
    import("@/components/site-header").then((mod) => ({
      default: mod.SiteHeader,
    })),
  { ssr: true }
);

const SiteFooter = dynamic(
  () =>
    import("@/components/site-footer").then((mod) => ({
      default: mod.SiteFooter,
    })),
  { ssr: true }
);

/**
 * Routes that already render GridNav + GridFooter (or GlobalPageLayout).
 * Layout SiteHeader/SiteFooter are CSS-hidden there — skip mounting them so
 * their JS (search/fuse/menus) never loads on the mobile landing path.
 */
function usesOwnChrome(pathname: string | null): boolean {
  if (!pathname) return false;
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (path === "/" || path === "") return true;
  if (path.startsWith("/tools")) return true;
  if (path.startsWith("/calculators")) return true;
  if (path === "/privacy" || path === "/terms") return true;
  if (path.startsWith("/articles") || path.startsWith("/blog")) return true;
  if (path === "/about" || path === "/contact" || path === "/wizard") return true;
  return false;
}

type LayoutChromeProps = {
  children: ReactNode;
};

export function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const skip = usesOwnChrome(pathname);

  return (
    <>
      {skip ? null : <SiteHeader />}
      {children}
      {skip ? null : <SiteFooter />}
    </>
  );
}

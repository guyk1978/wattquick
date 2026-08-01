"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Library } from "lucide-react";
import { LibraryPanel } from "@/components/grid-modal/library-panel";
import { PWAInstaller } from "@/components/pwa-installer";
import { SiteHeaderSearch } from "@/components/site-header-search";
import { cn } from "@/lib/utils";

export type GridBreadcrumb = {
  label: string;
  href?: string;
};

type GridNavProps = {
  breadcrumbs?: GridBreadcrumb[];
  className?: string;
};

/** Fixed logo + breadcrumbs + Ctrl+K search + Articles + Library for Grid-to-Modal pages. */
export function GridNav({ breadcrumbs = [], className }: GridNavProps) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const pathname = usePathname();
  const articlesActive =
    pathname === "/articles" ||
    pathname === "/articles/" ||
    pathname.startsWith("/articles/") ||
    pathname === "/blog" ||
    pathname === "/blog/" ||
    pathname.startsWith("/blog/");

  return (
    <>
      <header className={cn("grid-nav", className)}>
        <div className="grid-nav__bar">
          <div className="grid-nav__leading">
            <Link
              href="/"
              className="grid-nav__logo group"
              aria-label="WattQuick home"
            >
              <span
                className="grid-nav__logo-mark transition-colors duration-300 group-hover:text-[var(--category-color,#a3e635)]"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="grid-nav__logo-icon" fill="none">
                  <path
                    d="M4 14.5 10.5 4l3 7H20L12.5 20l-2.5-6H4Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="grid-nav__logo-text">
                <span className="grid-nav__logo-watt">Watt</span>
                <span className="grid-nav__logo-quick transition-colors duration-300 group-hover:text-[var(--category-color,#a3e635)]">
                  Quick
                </span>
              </span>
            </Link>

            {breadcrumbs.length > 0 ? (
              <nav className="grid-nav__crumbs" aria-label="Breadcrumb">
                <ol className="grid-nav__crumb-list">
                  {breadcrumbs.map((crumb, index) => {
                    const last = index === breadcrumbs.length - 1;
                    return (
                      <li key={`${crumb.label}-${index}`} className="grid-nav__crumb">
                        <span className="grid-nav__sep" aria-hidden>
                          /
                        </span>
                        {crumb.href && !last ? (
                          <Link href={crumb.href} className="grid-nav__crumb-link">
                            {crumb.label}
                          </Link>
                        ) : (
                          <span
                            className="grid-nav__crumb-current"
                            aria-current={last ? "page" : undefined}
                          >
                            {crumb.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : null}
          </div>

          <div className="grid-nav__trailing">
            <div className="grid-nav__search">
              <SiteHeaderSearch />
            </div>
            <Link
              href="/articles/"
              className={cn(
                "grid-nav__library-btn",
                articlesActive && "grid-nav__library-btn--active"
              )}
              aria-current={articlesActive ? "page" : undefined}
              aria-label="Articles"
            >
              <BookOpen className="size-4" aria-hidden />
              <span className="grid-nav__library-label">Articles</span>
            </Link>
            <button
              type="button"
              className="grid-nav__library-btn"
              onClick={() => setLibraryOpen((value) => !value)}
              aria-expanded={libraryOpen}
              aria-controls="library-panel"
              aria-label={libraryOpen ? "Close library" : "Open library"}
            >
              <Library className="size-4" aria-hidden />
              <span className="grid-nav__library-label">Library</span>
            </button>
            <PWAInstaller variant="grid" />
          </div>
        </div>
      </header>

      <LibraryPanel open={libraryOpen} onClose={() => setLibraryOpen(false)} />
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { HeaderInstallAppButton } from "@/components/header-install-app-button";
import { HeaderNav } from "@/components/header-nav";
import { HeaderShareMenu } from "@/components/header-share-menu";
import { MobileMenuSheet } from "@/components/mobile-menu-sheet";
import { SiteHeaderSearch } from "@/components/site-header-search";
import { ThemeToggleWithTooltip } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeaderBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const articlesActive =
    pathname === "/articles" ||
    pathname === "/articles/" ||
    pathname.startsWith("/articles/") ||
    pathname === "/blog" ||
    pathname === "/blog/" ||
    pathname.startsWith("/blog/");

  return (
    <>
      <header
        className={cn(
          "site-header site-header--blueprint site-header--forest glass-header sticky top-0 z-50 w-full overflow-visible"
        )}
      >
        <div className="glass-header__bar">
          <div className="glass-header__leading">
            <Link href="/" className="glass-header__logo">
              <span className="glass-header__logo-watt">Watt</span>
              <span className="glass-header__logo-quick">Quick</span>
            </Link>

            <HeaderNav />
          </div>

          <div className="glass-header__trailing glass-header__desktop-only">
            <div className="glass-header__search-slot">
              <SiteHeaderSearch />
            </div>

            <div className="glass-header__actions">
              <Link
                href="/articles/"
                className={cn(
                  "glass-header__articles-btn",
                  articlesActive && "glass-header__articles-btn--active"
                )}
                aria-current={articlesActive ? "page" : undefined}
                aria-label="Articles"
              >
                <BookOpen className="size-3.5" aria-hidden />
                <span>Articles</span>
              </Link>
              <ThemeToggleWithTooltip />
              <HeaderShareMenu />
              <HeaderInstallAppButton />
            </div>
          </div>

          <button
            type="button"
            className="glass-header__menu-btn"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={2} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>
      </header>

      <MobileMenuSheet
        id="site-mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        footer={
          <div className="mobile-menu-sheet__footer-actions">
            <ThemeToggleWithTooltip />
            <HeaderShareMenu />
            <HeaderInstallAppButton />
          </div>
        }
      />
    </>
  );
}

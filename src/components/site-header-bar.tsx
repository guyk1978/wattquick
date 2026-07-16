"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useArticlePortal } from "@/components/article-portal/article-portal-provider";
import { HeaderInstallAppButton } from "@/components/header-install-app-button";
import { HeaderNav } from "@/components/header-nav";
import { HeaderShareMenu } from "@/components/header-share-menu";
import { MobileNav } from "@/components/mobile-nav";
import { SiteHeaderSearch } from "@/components/site-header-search";
import { ThemeToggleWithTooltip } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeaderBar() {
  const { openArticle, isOpen } = useArticlePortal();

  return (
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

        <div className="glass-header__trailing">
          <div className="glass-header__search-slot">
            <SiteHeaderSearch />
          </div>

          <div className="glass-header__actions">
            <button
              type="button"
              className="glass-header__articles-btn"
              onClick={() => openArticle()}
              aria-pressed={isOpen}
              aria-label="Open articles"
            >
              <BookOpen className="size-3.5" aria-hidden />
              <span>Articles</span>
            </button>
            <ThemeToggleWithTooltip />
            <HeaderShareMenu />
            <HeaderInstallAppButton />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

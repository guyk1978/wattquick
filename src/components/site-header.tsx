import Link from "next/link";
import { HeaderInstallAppButton } from "@/components/header-install-app-button";
import { HeaderNav } from "@/components/header-nav";
import { HeaderShareMenu } from "@/components/header-share-menu";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggleWithTooltip } from "@/components/theme-toggle";
export function SiteHeader() {
  return (
    <header className="glass-header sticky top-0 z-50 w-full overflow-visible">
      <div className="glass-header__bar">
        <div className="glass-header__leading">
          <Link href="/" className="glass-header__logo">
            <span className="glass-header__logo-watt">Watt</span>
            <span className="glass-header__logo-quick">Quick</span>
          </Link>

          <HeaderNav />
        </div>

        <div className="glass-header__trailing">
          <div data-header-search className="glass-header__search-slot" />

          <div className="glass-header__actions">
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

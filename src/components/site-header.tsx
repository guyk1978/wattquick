import Link from "next/link";
import { HeaderNav } from "@/components/header-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggleWithTooltip } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="glass-header sticky top-0 z-50 w-full overflow-visible">
      <div className="glass-header__bar">
        <Link
          href="/"
          className="glass-header__segment glass-header__segment--logo site-header-logo shrink-0 text-lg leading-none tracking-tight sm:text-xl"
        >
          <span className="font-black text-foreground">Watt</span>
          <span className="font-light text-muted-foreground">Quick</span>
        </Link>

        <HeaderNav />

        <div className="glass-header__trailing">
          <ThemeToggleWithTooltip />
          <MobileNav />
          <div data-header-search className="glass-header__search-slot" />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { HeaderNav } from "@/components/header-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggleWithTooltip } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="glass-header sticky top-0 z-50 overflow-visible">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 overflow-visible px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="site-header-logo shrink-0 text-xl leading-none tracking-tight md:text-2xl"
        >
          <span className="font-black text-foreground">Watt</span>
          <span className="font-light text-muted-foreground">Quick</span>
        </Link>

        <HeaderNav />

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <div data-header-actions className="flex items-center gap-1">
            <ThemeToggleWithTooltip />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

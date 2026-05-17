import Link from "next/link";
import { Zap } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-foreground transition-opacity hover:opacity-85"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Zap className="size-4" strokeWidth={2.5} />
          </span>
          <span className="text-base font-semibold tracking-tight">WattQuick</span>
        </Link>

        <nav
          className="hidden items-center gap-1 sm:flex"
          aria-label="Main navigation"
        >
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground",
                "transition-colors hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

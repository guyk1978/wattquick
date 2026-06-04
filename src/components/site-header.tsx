import Link from "next/link";
import { HeaderNav } from "@/components/header-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="glass-header sticky top-0 z-50 overflow-visible">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 overflow-visible px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className={cn(
            "group shrink-0 text-xl leading-none tracking-tight md:text-2xl",
            "transition-colors duration-200"
          )}
        >
          <span className="font-black text-slate-900 transition-colors duration-200 group-hover:text-blue-500 dark:text-white dark:group-hover:text-blue-400">
            Watt
          </span>
          <span className="font-light text-slate-500 transition-colors duration-200 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
            Quick
          </span>
        </Link>

        <HeaderNav />

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <div data-header-actions className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

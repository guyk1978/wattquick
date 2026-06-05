"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalculatorsMegaMenu } from "@/components/calculators-mega-menu";
import { isMainNavActive } from "@/lib/nav-active";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden flex-1 items-center justify-center gap-1 overflow-visible sm:flex"
      aria-label="Main navigation"
    >
      {MAIN_NAV.map((item) =>
        item.label === "Calculators" ? (
          <CalculatorsMegaMenu key={item.href} />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isMainNavActive(item.href, pathname) ? "page" : undefined}
            className={cn(
              "header-nav-link px-3.5 py-2 text-sm font-medium",
              isMainNavActive(item.href, pathname) && "header-nav-link--active"
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

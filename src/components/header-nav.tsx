"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalculatorsMegaMenu } from "@/components/calculators-mega-menu";
import { HeaderNavTooltip } from "@/components/header-nav-tooltip";
import { isMainNavActive } from "@/lib/nav-active";
import { MAIN_NAV_ICON_MAP } from "@/lib/main-nav-icons";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav
      className="glass-header__nav hidden min-w-0 flex-1 items-stretch justify-center overflow-visible md:flex"
      aria-label="Main navigation"
    >
      {MAIN_NAV.map((item) =>
        item.label === "Calculators" ? (
          <CalculatorsMegaMenu key={item.href} />
        ) : (
          <HeaderNavTooltip
            key={item.href}
            label={item.label}
            className="flex h-full items-stretch"
          >
            <Link
              href={item.href}
              aria-label={item.label}
              aria-current={
                isMainNavActive(item.href, pathname) ? "page" : undefined
              }
              className={cn(
                "glass-header__segment header-nav-link",
                isMainNavActive(item.href, pathname) &&
                  "glass-header__segment--active header-nav-link--active"
              )}
            >
              {(() => {
                const Icon = MAIN_NAV_ICON_MAP[item.href];
                return Icon ? (
                  <Icon className="size-[1.125rem]" strokeWidth={2} aria-hidden />
                ) : null;
              })()}
            </Link>
          </HeaderNavTooltip>
        )
      )}
    </nav>
  );
}

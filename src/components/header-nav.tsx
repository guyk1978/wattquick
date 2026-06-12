"use client";

import { usePathname } from "next/navigation";
import { CalculatorsMegaMenu } from "@/components/calculators-mega-menu";
import { HeaderNavItem } from "@/components/header-nav-item";
import { getHeaderNavShortLabel } from "@/lib/header-nav-labels";
import { isMainNavActive } from "@/lib/nav-active";
import { MAIN_NAV_ICON_MAP } from "@/lib/main-nav-icons";
import { MAIN_NAV } from "@/lib/site";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav
      className="glass-header__nav hidden min-w-0 md:flex"
      aria-label="Main navigation"
    >
      {MAIN_NAV.map((item) =>
        item.label === "Calculators" ? (
          <CalculatorsMegaMenu key={item.href} />
        ) : (
          <HeaderNavItem
            key={item.href}
            href={item.href}
            label={getHeaderNavShortLabel(item.href)}
            icon={MAIN_NAV_ICON_MAP[item.href]}
            active={isMainNavActive(item.href, pathname)}
            aria-label={item.label}
          />
        )
      )}
    </nav>
  );
}

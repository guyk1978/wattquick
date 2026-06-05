"use client";

import Link from "next/link";
import { CalculatorsMegaMenu } from "@/components/calculators-mega-menu";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeaderNav() {
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
            className={cn(
              "header-nav-link px-3.5 py-2 text-sm font-medium text-muted-foreground",
              "hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

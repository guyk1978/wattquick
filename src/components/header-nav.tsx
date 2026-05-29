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
              "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground",
              "transition-[color,transform,box-shadow] duration-200",
              "hover:scale-[1.02] hover:bg-white/50 hover:text-foreground",
              "dark:hover:bg-white/5"
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

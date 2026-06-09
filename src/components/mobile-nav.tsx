"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, Star, X } from "lucide-react";
import { useState } from "react";
import { HeaderNavTooltip } from "@/components/header-nav-tooltip";
import { isMainNavActive } from "@/lib/nav-active";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative flex h-full items-stretch sm:hidden">
      <HeaderNavTooltip
        label={open ? "Close menu" : "Menu"}
        className="flex h-full items-stretch"
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="glass-header__segment header-nav-link text-foreground"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </HeaderNavTooltip>
      {open ? (
        <nav
          className="mobile-nav-panel absolute right-0 top-full z-50 mt-1.5 min-w-[200px] p-1.5"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-0.5">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    isMainNavActive(item.href, pathname) ? "page" : undefined
                  }
                  className={cn(
                    "header-nav-link flex items-center gap-1.5 px-3 py-2 text-sm font-medium",
                    isMainNavActive(item.href, pathname) && "header-nav-link--active"
                  )}
                >
                  {item.href === "/projects" ? (
                    <>
                      <Briefcase className="size-3.5 shrink-0 opacity-80" aria-hidden />
                      {item.label}
                    </>
                  ) : item.href === "/favorites" ? (
                    <>
                      <Star className="size-3.5 shrink-0 opacity-80" aria-hidden />
                      {item.label}
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wizard/"
                onClick={() => setOpen(false)}
                aria-current={
                  isMainNavActive("/wizard", pathname) ? "page" : undefined
                }
                className={cn(
                  "header-nav-link block px-3 py-2 text-sm font-medium",
                  isMainNavActive("/wizard", pathname) && "header-nav-link--active"
                )}
              >
                WattQuick Wizard
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { isMainNavActive } from "@/lib/nav-active";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="header-nav-link flex size-9 items-center justify-center text-white"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
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
                    "header-nav-link block px-3 py-2 text-sm font-medium",
                    isMainNavActive(item.href, pathname) && "header-nav-link--active"
                  )}
                >
                  {item.label}
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

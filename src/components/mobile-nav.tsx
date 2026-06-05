"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex size-9 items-center justify-center rounded-none border border-border/60 text-foreground transition-colors hover:bg-muted/50"
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
                  className={cn(
                    "block rounded-none px-3 py-2 text-sm font-medium text-muted-foreground",
                    "transition-colors hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { MEGA_MENU_CATEGORIES, megaMenuIconProps } from "@/lib/mega-menu-categories";
import { cn } from "@/lib/utils";

export function CalculatorsMegaMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allCalculators = useMemo(() => getAllCalculatorMeta(), []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allCalculators
      .filter(
        (calc) =>
          calc.title.toLowerCase().includes(q) ||
          calc.description.toLowerCase().includes(q) ||
          calc.tag.toLowerCase().includes(q) ||
          CALCULATOR_CATEGORY_LABELS[calc.category].toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [allCalculators, query]);

  const showResults = query.trim().length > 0;

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href="/calculators/"
        className={cn(
          "header-nav-link inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium",
          "text-muted-foreground",
          open && "text-foreground"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Calculators
        <ChevronDown
          className={cn(
            "size-3.5 opacity-60 transition-transform duration-150",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-[60] w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 pt-1.5",
          "transition-[opacity,visibility] duration-150",
          open
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <div className="calculators-mega-menu__panel overflow-hidden rounded-none">
          <div className="border-b border-border/40 px-2.5 py-2 sm:px-3">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quick find a calculator…"
                className={cn(
                  calculatorCommandInput,
                  "h-9 rounded-none border-0 pl-8 text-sm shadow-none focus-visible:ring-0"
                )}
                aria-label="Quick find a calculator"
              />
            </div>
          </div>

          <div className="max-h-[min(58vh,380px)] overflow-y-auto px-2.5 py-2 sm:px-3">
            {showResults ? (
              <ul
                className="divide-y divide-border/40"
                role="listbox"
                aria-label="Calculator search results"
              >
                {searchResults.length === 0 ? (
                  <li className="px-1 py-4 text-center text-xs text-muted-foreground">
                    No calculators match &ldquo;{query.trim()}&rdquo;
                  </li>
                ) : (
                  searchResults.map((calc) => (
                    <li key={calc.id}>
                      <Link
                        href={calc.href}
                        className={cn(
                          "group flex items-center justify-between gap-2 rounded-none px-1.5 py-2",
                          "transition-colors hover:bg-muted/40 dark:hover:bg-[rgb(8_14_28/0.55)]"
                        )}
                        onClick={() => setOpen(false)}
                        role="option"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {calc.title}
                          </span>
                          <span className="block truncate text-[0.6875rem] text-muted-foreground">
                            {CALCULATOR_CATEGORY_LABELS[calc.category]} · {calc.tag}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            ) : (
              <div
                className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3"
                role="navigation"
                aria-label="Calculator categories"
              >
                {MEGA_MENU_CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.category}
                      href={item.href}
                      className="calculators-mega-menu__card group/card flex gap-2 rounded-none px-2 py-1.5 transition-colors hover:bg-muted/40 dark:hover:bg-[rgb(8_14_28/0.55)]"
                      style={{ "--mega-cat": item.color } as CSSProperties}
                      onClick={() => setOpen(false)}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-none",
                          "bg-[color-mix(in_srgb,var(--mega-cat)_12%,transparent)]",
                          "dark:bg-[color-mix(in_srgb,var(--mega-cat)_18%,transparent)]"
                        )}
                      >
                        <Icon {...megaMenuIconProps(item.color)} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-[0.6875rem] leading-snug text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-border/40 px-2.5 py-2 sm:px-3">
            <Link
              href="/calculators/"
              className={cn(
                "group inline-flex items-center gap-1 text-xs font-medium text-foreground sm:text-sm",
                "transition-colors hover:text-primary"
              )}
              onClick={() => setOpen(false)}
            >
              View all calculators
              <ArrowUpRight
                className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

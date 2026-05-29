"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
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
          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium",
          "text-muted-foreground transition-[color,transform,box-shadow,background] duration-200",
          "hover:scale-[1.02] hover:bg-white/50 hover:text-foreground",
          "dark:hover:bg-white/5",
          open && "bg-white/60 text-foreground dark:bg-white/10"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Calculators
        <ChevronDown
          className={cn(
            "size-3.5 opacity-60 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-[60] w-[min(800px,calc(100vw-2rem))] -translate-x-1/2 pt-2",
          "transition-[opacity,visibility,transform] duration-200 ease-out",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-slate-200/80",
            "bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl",
            "dark:border-slate-700/60 dark:bg-slate-900/95 dark:shadow-black/40"
          )}
        >
          <div className="border-b border-slate-200/70 p-4 dark:border-slate-700/50">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quick find a calculator…"
                className={cn(
                  "h-10 rounded-xl border-slate-200 bg-slate-100/80 pl-9 text-slate-900",
                  "placeholder:text-slate-500 focus-visible:ring-slate-400/30",
                  "dark:border-slate-600 dark:bg-slate-800/80 dark:text-white dark:placeholder:text-slate-400"
                )}
                aria-label="Quick find a calculator"
              />
            </div>
          </div>

          <div className="max-h-[min(60vh,420px)] overflow-y-auto p-4">
            {showResults ? (
              <ul className="space-y-1" role="listbox" aria-label="Calculator search results">
                {searchResults.length === 0 ? (
                  <li className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No calculators match &ldquo;{query.trim()}&rdquo;
                  </li>
                ) : (
                  searchResults.map((calc) => (
                    <li key={calc.id}>
                      <Link
                        href={calc.href}
                        className={cn(
                          "flex flex-col gap-0.5 rounded-xl px-3 py-2.5",
                          "transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80"
                        )}
                        onClick={() => setOpen(false)}
                        role="option"
                      >
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {calc.title}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {CALCULATOR_CATEGORY_LABELS[calc.category]} · {calc.tag}
                        </span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            ) : (
              <div
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                role="navigation"
                aria-label="Calculator categories"
              >
                {MEGA_MENU_CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.category}
                      href={item.href}
                      className={cn(
                        "group/card flex gap-3 rounded-xl border border-slate-200/80 p-3",
                        "bg-white/60 transition-[transform,box-shadow,border-color] duration-200",
                        "hover:-translate-y-0.5 hover:border-slate-300",
                        "dark:border-slate-700/60 dark:bg-slate-800/40 dark:hover:border-slate-600"
                      )}
                      style={
                        {
                          "--mega-cat": item.color,
                        } as React.CSSProperties
                      }
                      onClick={() => setOpen(false)}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-lg",
                          "bg-[color-mix(in_srgb,var(--mega-cat)_18%,transparent)]",
                          "transition-shadow duration-200",
                          "group-hover/card:shadow-[0_0_20px_-4px_var(--mega-cat)]"
                        )}
                      >
                        <Icon {...megaMenuIconProps(item.color)} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-900 transition-colors group-hover/card:text-[var(--mega-cat)] dark:text-white">
                          {item.label}
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-500 dark:text-slate-400">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200/70 px-4 py-3 dark:border-slate-700/50">
            <Link
              href="/calculators/"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
                "transition-colors hover:text-primary/80"
              )}
              onClick={() => setOpen(false)}
            >
              View all calculators
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

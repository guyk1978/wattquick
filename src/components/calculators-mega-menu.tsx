"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Compass, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
  getCalculatorMeta,
} from "@/lib/calculators";
import {
  CALCULATOR_USE_CASES,
  getSortedUseCaseCalculatorIds,
  type CalculatorUseCaseId,
  useCaseIconProps,
} from "@/lib/calculator-use-cases";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { isMainNavActive } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

export function CalculatorsMegaMenu() {
  const pathname = usePathname();
  const isActive = isMainNavActive("/calculators", pathname);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CalculatorUseCaseId>("homeowners");
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

  const activeUseCase = useMemo(
    () => CALCULATOR_USE_CASES.find((item) => item.id === activeTab)!,
    [activeTab]
  );

  const tabCalculators = useMemo(
    () =>
      getSortedUseCaseCalculatorIds(activeTab).map((id) =>
        getCalculatorMeta(id)
      ),
    [activeTab]
  );

  const featuredSet = useMemo(
    () => new Set(activeUseCase.featuredIds),
    [activeUseCase]
  );

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
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "header-nav-link inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium",
          isActive && "header-nav-link--active"
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

          {!showResults ? (
            <div
              className="calculators-mega-menu__tabs border-b border-border/40 px-2.5 py-1.5 sm:px-3"
              role="tablist"
              aria-label="Calculator use cases"
            >
              {CALCULATOR_USE_CASES.map((useCase) => {
                const Icon = useCase.icon;
                const selected = activeTab === useCase.id;
                return (
                  <button
                    key={useCase.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`mega-menu-panel-${useCase.id}`}
                    id={`mega-menu-tab-${useCase.id}`}
                    className={cn(
                      "calculators-mega-menu__tab inline-flex items-center gap-1.5 rounded-none px-2 py-1.5 text-[0.6875rem] font-semibold sm:text-xs",
                      selected && "calculators-mega-menu__tab--active"
                    )}
                    style={
                      {
                        "--mega-use-case": useCase.color,
                      } as CSSProperties
                    }
                    onClick={() => setActiveTab(useCase.id)}
                  >
                    <Icon {...useCaseIconProps(useCase.color)} aria-hidden />
                    <span className="hidden sm:inline">{useCase.label}</span>
                    <span className="sm:hidden">{useCase.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          ) : null}

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
                id={`mega-menu-panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`mega-menu-tab-${activeTab}`}
              >
                <p className="mb-2 px-0.5 text-[0.6875rem] leading-snug text-muted-foreground sm:text-xs">
                  {activeUseCase.description}
                </p>
                <ul
                  className="divide-y divide-border/40"
                  role="list"
                  aria-label={`${activeUseCase.label} calculators`}
                >
                  {tabCalculators.map((calc) => {
                    const isFeatured = featuredSet.has(calc.id);
                    return (
                      <li key={calc.id}>
                        <Link
                          href={calc.href}
                          className={cn(
                            "group flex items-center justify-between gap-2 rounded-none px-1.5 py-2 transition-colors",
                            "hover:bg-muted/40 dark:hover:bg-[rgb(8_14_28/0.55)]",
                            isFeatured && "calculators-mega-menu__featured"
                          )}
                          style={
                            isFeatured
                              ? ({
                                  "--mega-use-case": activeUseCase.color,
                                } as CSSProperties)
                              : undefined
                          }
                          onClick={() => setOpen(false)}
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-foreground">
                              {calc.title}
                            </span>
                            <span className="block truncate text-[0.6875rem] text-muted-foreground">
                              {CALCULATOR_CATEGORY_LABELS[calc.category]} ·{" "}
                              {calc.tag}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t border-border/40 px-2.5 py-2 sm:px-3">
            <Link
              href="/wizard/"
              className={cn(
                "group mb-2 flex items-center gap-2 rounded-none border border-primary/25 bg-primary/5 px-2.5 py-2 text-xs font-semibold text-foreground sm:text-sm",
                "transition-colors hover:border-primary/40 hover:bg-primary/10"
              )}
              onClick={() => setOpen(false)}
            >
              <Compass
                className="size-3.5 shrink-0 text-primary"
                aria-hidden
              />
              Start Planning: WattQuick Wizard
              <ArrowUpRight
                className="ml-auto size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 px-2.5 py-2 sm:px-3">
            {!showResults ? (
              <Link
                href={activeUseCase.browseHref}
                className={cn(
                  "group inline-flex items-center gap-1 text-xs font-medium text-foreground",
                  "transition-colors hover:text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                Browse all {activeUseCase.label.toLowerCase()} tools
                <ArrowUpRight
                  className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            ) : (
              <span />
            )}
            <Link
              href="/calculators/"
              className={cn(
                "group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground",
                "transition-colors hover:text-foreground"
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

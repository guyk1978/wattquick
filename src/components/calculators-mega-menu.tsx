"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Calculator, Compass, Search } from "lucide-react";
import { CalculatorCategoryCubeGrid } from "@/components/calculator-category-cube-grid";
import { CalculatorInfoModal } from "@/components/calculator-info-modal";
import { HeaderNavTooltip } from "@/components/header-nav-tooltip";
import { Input } from "@/components/ui/input";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
  type CalculatorMeta,
} from "@/lib/calculators";
import {
  CALCULATOR_USE_CASES,
  getSortedUseCaseCalculatorIds,
  type CalculatorUseCaseId,
  useCaseIconProps,
} from "@/lib/calculator-use-cases";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { isMainNavActive } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

export function CalculatorsMegaMenu() {
  const pathname = usePathname();
  const isActive = isMainNavActive("/calculators", pathname);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CalculatorUseCaseId>("homeowners");
  const [selectedCalculator, setSelectedCalculator] =
    useState<CalculatorMeta | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allCalculators = useMemo(() => getAllCalculatorMeta(), []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allCalculators.filter(
      (calc) =>
        calc.title.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.tag.toLowerCase().includes(q) ||
        CALCULATOR_CATEGORY_LABELS[calc.category].toLowerCase().includes(q)
    );
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

  const showResults = query.trim().length > 0;

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const handleSelectCalculator = (calculator: CalculatorMeta) => {
    setSelectedCalculator(calculator);
    setOpen(false);
  };

  return (
    <>
      <div
        className={cn("relative", open && "calculators-mega-menu--open")}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        onFocus={openMenu}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setOpen(false);
          }
        }}
      >
        <HeaderNavTooltip label="Calculators">
          <Link
            href="/calculators/"
            aria-label="Calculators"
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "header-nav-link header-nav-link--icon inline-flex size-9 items-center justify-center",
              isActive && "header-nav-link--active"
            )}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <Calculator className="size-[1.125rem]" strokeWidth={2} aria-hidden />
          </Link>
        </HeaderNavTooltip>

        <div
          className={cn(
            "absolute left-1/2 top-full z-[60] w-[min(880px,calc(100vw-2rem))] -translate-x-1/2 pt-1.5",
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

            <div className="max-h-[min(62vh,420px)] overflow-y-auto px-2.5 py-2 sm:px-3">
              {showResults ? (
                searchResults.length === 0 ? (
                  <p className="px-1 py-4 text-center text-xs text-muted-foreground">
                    No calculators match &ldquo;{query.trim()}&rdquo;
                  </p>
                ) : (
                  <CalculatorCategoryCubeGrid
                    calculators={searchResults}
                    onSelect={handleSelectCalculator}
                    groupByCategory
                  />
                )
              ) : (
                <div
                  id={`mega-menu-panel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`mega-menu-tab-${activeTab}`}
                >
                  <p className="mb-2.5 px-0.5 text-[0.6875rem] leading-snug text-muted-foreground sm:text-xs">
                    {activeUseCase.description}
                  </p>
                  <CalculatorCategoryCubeGrid
                    calculators={tabCalculators}
                    onSelect={handleSelectCalculator}
                    groupByCategory
                  />
                </div>
              )}
            </div>

            <div className="border-t border-border/40 px-2.5 py-2 sm:px-3">
              <Link
                href="/wizard/"
                className="calculators-mega-menu__featured group mb-2 flex items-center gap-2 rounded-none border border-border/60 bg-[var(--matte-hover)] px-2.5 py-2 text-xs font-semibold text-foreground transition-colors sm:text-sm"
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

      <CalculatorInfoModal
        calculator={selectedCalculator}
        onClose={() => setSelectedCalculator(null)}
      />
    </>
  );
}

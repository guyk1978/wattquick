"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";
import { POPULAR_CALCULATOR_SLUGS } from "@/data/popular-calculators";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorId,
} from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "all" as const;
type FilterCategory = CalculatorCategory | typeof ALL_CATEGORY;

const HOME_RESULT_LIMIT = 12;

interface HomeCalculatorSectionProps {
  allIds: CalculatorId[];
  totalCount: number;
}

export function HomeCalculatorSection({
  allIds,
  totalCount,
}: HomeCalculatorSectionProps) {
  const calculators = useMemo(
    () => allIds.map((id) => getCalculatorMeta(id)),
    [allIds]
  );

  const popular = useMemo(
    () => POPULAR_CALCULATOR_SLUGS.map((id) => getCalculatorMeta(id)),
    []
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>(ALL_CATEGORY);

  const categories = useMemo(() => {
    const set = new Set(calculators.map((c) => c.category));
    return Array.from(set) as CalculatorCategory[];
  }, [calculators]);

  const isBrowsing = query.trim().length > 0 || category !== ALL_CATEGORY;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return calculators.filter((calc) => {
      const matchesCategory =
        category === ALL_CATEGORY || calc.category === category;
      const matchesQuery =
        !q ||
        calc.title.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.tag.toLowerCase().includes(q) ||
        CALCULATOR_CATEGORY_LABELS[calc.category].toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [calculators, query, category]);

  const displayItems = isBrowsing
    ? filtered.slice(0, HOME_RESULT_LIMIT)
    : popular;
  const hasMoreResults = isBrowsing && filtered.length > HOME_RESULT_LIMIT;

  const viewAllHref = useMemo(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== ALL_CATEGORY) params.set("category", category);
    const qs = params.toString();
    return qs ? `/calculators/?${qs}` : "/calculators/";
  }, [query, category]);

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <label htmlFor="home-calculator-search" className="sr-only">
          Search calculators
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            id="home-calculator-search"
            type="search"
            placeholder="Search 94 calculators — e.g. battery runtime, solar yield, EV cost…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "h-14 w-full rounded-2xl border-2 border-border/80 bg-card pl-14 pr-5 text-base text-foreground shadow-sm",
              "placeholder:text-muted-foreground/80",
              "transition-[border-color,box-shadow] duration-200",
              "hover:border-primary/25",
              "focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/15",
              "dark:border-border dark:bg-card/90 dark:shadow-none dark:focus:ring-primary/20"
            )}
          />
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="tablist"
          aria-label="Filter by category"
        >
          <FilterPill
            active={category === ALL_CATEGORY}
            onClick={() => setCategory(ALL_CATEGORY)}
          >
            All
          </FilterPill>
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            >
              {CALCULATOR_CATEGORY_LABELS[cat]}
            </FilterPill>
          ))}
        </div>

        {isBrowsing && (
          <p className="text-center text-sm text-muted-foreground">
            {filtered.length === 0
              ? "No matches"
              : `${filtered.length} match${filtered.length === 1 ? "" : "es"}`}
            {filtered.length > 0 && (
              <>
                {" "}
                · showing {Math.min(filtered.length, HOME_RESULT_LIMIT)}
              </>
            )}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4 border-b border-border/60 pb-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {isBrowsing ? "Results" : "Most used"}
          </h3>
          {!isBrowsing && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Popular
            </span>
          )}
        </div>

        {displayItems.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No calculators match your search. Try another keyword or category.
          </p>
        ) : (
          <ul className="grid list-none gap-2 p-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {displayItems.map((calc) => (
              <li key={calc.id}>
                <CalculatorCard calculator={calc} variant="minimal" />
              </li>
            ))}
          </ul>
        )}

        {hasMoreResults && (
          <p className="text-center text-sm text-muted-foreground">
            <Link
              href={viewAllHref}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              View all {filtered.length} matches
            </Link>
          </p>
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Link
          href={viewAllHref}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm",
            "transition-[border-color,background-color,transform] duration-200",
            "hover:border-primary/30 hover:bg-muted/50",
            "dark:hover:bg-muted/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "active:scale-[0.99]"
          )}
        >
          View all {totalCount} calculators
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 sm:text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        active
          ? "border border-primary/35 bg-primary/10 text-primary dark:bg-primary/15"
          : "border border-transparent bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground dark:bg-muted/50"
      )}
    >
      {children}
    </button>
  );
}

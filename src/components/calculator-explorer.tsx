"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CalculatorAppCard } from "@/components/calculator-app-card";
import { CalculatorListItem } from "@/components/calculator-list-item";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { calculatorCommandInput } from "@/lib/glass-ui";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorId,
} from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "all" as const;
type FilterCategory = CalculatorCategory | typeof ALL_CATEGORY;

interface CalculatorExplorerProps {
  ids: CalculatorId[];
  /** Initial search from URL (e.g. linked from home). */
  initialQuery?: string;
  /** Initial category filter from URL. */
  initialCategory?: CalculatorCategory;
  /** When set, the list is pre-filtered to a use-case group from the mega menu. */
  useCaseLabel?: string;
  /** App-launcher hub (all-calculators page) or compact list */
  layout?: "list" | "grid";
}

export function CalculatorExplorer({
  ids,
  initialQuery = "",
  initialCategory,
  useCaseLabel,
  layout = "list",
}: CalculatorExplorerProps) {
  const calculators = useMemo(
    () => ids.map((id) => getCalculatorMeta(id)),
    [ids]
  );

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<FilterCategory>(
    initialCategory ?? ALL_CATEGORY
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCategory(initialCategory ?? ALL_CATEGORY);
  }, [initialCategory]);

  const categories = useMemo(() => {
    const present = new Set(calculators.map((c) => c.category));
    return CATEGORY_DISPLAY_ORDER.filter((cat) => present.has(cat));
  }, [calculators]);

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

  if (layout === "grid") {
    return (
      <div className="calculators-hub">
        {useCaseLabel ? (
          <p className="calculators-hub__use-case">
            Showing{" "}
            <span className="font-medium text-foreground">{useCaseLabel}</span>{" "}
            calculators.{" "}
            <a href="/calculators/" className="calculators-hub__use-case-link">
              View all
            </a>
          </p>
        ) : null}

        <div className="calculators-hub__controls">
          <label htmlFor="calculators-hub-search" className="sr-only">
            Search calculators
          </label>
          <div className="calculators-hub__search-wrap">
            <Search className="calculators-hub__search-icon" aria-hidden />
            <input
              id="calculators-hub-search"
              type="search"
              placeholder="Search tools…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={cn(calculatorCommandInput, "calculators-hub__search")}
              autoComplete="off"
              aria-label="Search calculators"
            />
          </div>

          <p className="calculators-hub__count">
            {filtered.length} of {calculators.length} tools
          </p>

          <div
            className="calculators-hub__filters"
            role="tablist"
            aria-label="Filter by category"
          >
            <HubFilterPill
              active={category === ALL_CATEGORY}
              onClick={() => setCategory(ALL_CATEGORY)}
            >
              All
            </HubFilterPill>
            {categories.map((cat) => (
              <HubFilterPill
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                {CALCULATOR_CATEGORY_LABELS[cat]}
              </HubFilterPill>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="calculators-hub__empty" role="status">
            <p className="calculators-hub__empty-title">No matches</p>
            <p className="calculators-hub__empty-text">
              Try another keyword or select a different category.
            </p>
          </div>
        ) : (
          <div
            className="calculators-hub__grid"
            role="list"
            aria-label="Calculator apps"
          >
            {filtered.map((calc) => (
              <div key={calc.id} role="listitem" className="calculators-hub__grid-cell">
                <CalculatorAppCard calculator={calc} variant="hub" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="calculators-directory space-y-4">
      {useCaseLabel ? (
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{useCaseLabel}</span>{" "}
          calculators.{" "}
          <a
            href="/calculators/"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            View all
          </a>
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search calculators…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              calculatorCommandInput,
              "h-10 w-full rounded-none border pl-9 shadow-none focus-visible:ring-0"
            )}
            aria-label="Search calculators"
          />
        </div>
        <p className="shrink-0 text-xs text-muted-foreground sm:text-right sm:text-sm">
          {filtered.length} of {calculators.length}
        </p>
      </div>

      <div
        className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
        role="tablist"
        aria-label="Filter by category"
      >
        <CategoryChip
          active={category === ALL_CATEGORY}
          onClick={() => setCategory(ALL_CATEGORY)}
        >
          All
        </CategoryChip>
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
          >
            {CALCULATOR_CATEGORY_LABELS[cat]}
          </CategoryChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-none border border-dashed border-border/60 py-10 text-center text-sm text-muted-foreground">
          No calculators match your search.
        </p>
      ) : (
        <ul
          className="calculators-directory__list list-none divide-y divide-border/40 rounded-none"
          role="list"
        >
          {filtered.map((calc) => (
            <CalculatorListItem key={calc.id} calculator={calc} />
          ))}
        </ul>
      )}
    </div>
  );
}

function HubFilterPill({
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
        "calculators-hub__filter",
        active && "calculators-hub__filter--active"
      )}
    >
      {children}
    </button>
  );
}

function CategoryChip({
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
        "calculators-directory__chip filter-chip shrink-0 px-2.5 py-1 text-xs font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        !active && "border-transparent bg-transparent"
      )}
    >
      {children}
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CalnexAppCallout } from "@/components/CalnexAppCallout";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { CalculatorBlueprintCategoryNav } from "@/components/calculator/calculator-blueprint-category-nav";
import { CalculatorBlueprintToolGrid } from "@/components/calculator/calculator-blueprint-tool-grid";
import { CalculatorsBlueprintHeader } from "@/components/calculators/calculators-blueprint-header";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorId,
} from "@/lib/calculators";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "all" as const;
type FilterCategory = CalculatorCategory | typeof ALL_CATEGORY;

interface CalculatorsBlueprintPageProps {
  allIds: CalculatorId[];
  calculatorCount: number;
  categoryCount: number;
}

export function CalculatorsBlueprintPage({
  allIds,
  calculatorCount,
  categoryCount,
}: CalculatorsBlueprintPageProps) {
  const calculators = useMemo(
    () => allIds.map((id) => getCalculatorMeta(id)),
    [allIds]
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>(ALL_CATEGORY);

  const categories = useMemo(() => {
    const present = new Set(calculators.map((calc) => calc.category));
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

  const isFiltered = query.trim().length > 0 || category !== ALL_CATEGORY;
  const activeCategory = category === ALL_CATEGORY ? null : category;

  return (
    <BlueprintHubShell
      activeCategory={activeCategory}
      statsTrailing={
        <Link href="/dashboard/" className="calculator-blueprint-stats__link">
          Command center
        </Link>
      }
      rightNav={
        <CalculatorBlueprintCategoryNav
          title="Calculators"
          calculators={filtered}
        />
      }
    >
      <CalculatorsBlueprintHeader
        calculatorCount={calculatorCount}
        categoryCount={categoryCount}
      />

      <div className="calculators-hub calculators-hub--blueprint">
        <div className="calculators-hub__search-block">
          <label htmlFor="calculators-hub-search" className="sr-only">
            Search calculators
          </label>
          <div className="calculators-hub__search-wrap">
            <Search className="calculators-hub__search-icon" aria-hidden />
            <input
              id="calculators-hub-search"
              type="search"
              placeholder={`Search ${calculatorCount} tools…`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="calculators-hub__search"
              autoComplete="off"
            />
          </div>

          <div
            className="calculators-hub__filters"
            role="tablist"
            aria-label="Filter by category"
          >
            <FilterChip
              active={category === ALL_CATEGORY}
              onClick={() => setCategory(ALL_CATEGORY)}
            >
              All tools
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                {CALCULATOR_CATEGORY_LABELS[cat]}
              </FilterChip>
            ))}
          </div>

          {isFiltered ? (
            <p className="calculators-hub__meta">
              {filtered.length === 0
                ? "No tools match your search"
                : `${filtered.length} tool${filtered.length === 1 ? "" : "s"} found`}
            </p>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="calculators-hub__empty" role="status">
            <p className="calculators-hub__empty-title">No matches</p>
            <p className="calculators-hub__empty-text">
              Try a different keyword or clear the category filter.
            </p>
          </div>
        ) : (
          <CalculatorBlueprintToolGrid calculators={filtered} />
        )}
      </div>

      <CalnexAppCallout className="calculators-hub__partner" />
    </BlueprintHubShell>
  );
}

function FilterChip({
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

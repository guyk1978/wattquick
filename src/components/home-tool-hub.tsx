"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { HomeToolCard } from "@/components/home-tool-card";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorId,
} from "@/lib/calculators";
import {
  CALCULATOR_CATEGORY_ICONS,
  CATEGORY_DISPLAY_ORDER,
} from "@/lib/calculator-category-icons";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "all" as const;
type FilterCategory = CalculatorCategory | typeof ALL_CATEGORY;

interface HomeToolHubProps {
  allIds: CalculatorId[];
  totalCount: number;
}

export function HomeToolHub({ allIds, totalCount }: HomeToolHubProps) {
  const calculators = useMemo(
    () => allIds.map((id) => getCalculatorMeta(id)),
    [allIds]
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>(ALL_CATEGORY);

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

  const grouped = useMemo(() => {
    if (query.trim() || category !== ALL_CATEGORY) return null;

    return categories
      .map((cat) => ({
        category: cat,
        items: calculators.filter((c) => c.category === cat),
      }))
      .filter((group) => group.items.length > 0);
  }, [calculators, categories, category, query]);

  const isFiltered = query.trim().length > 0 || category !== ALL_CATEGORY;

  return (
    <section id="calculators" className="home-tool-hub scroll-mt-20" aria-label="Tool directory">
      <div className="home-tool-hub__search-block">
        <label htmlFor="home-tool-search" className="sr-only">
          Search calculators
        </label>
        <div className="home-tool-hub__search-wrap">
          <Search
            className="home-tool-hub__search-icon"
            aria-hidden
          />
          <input
            id="home-tool-search"
            type="search"
            placeholder={`Search ${totalCount} tools — battery runtime, solar yield, EV cost…`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={cn(
              calculatorCommandInput,
              "home-tool-hub__search"
            )}
            autoComplete="off"
          />
        </div>

        <div
          className="home-tool-hub__filters"
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
          <p className="home-tool-hub__meta">
            {filtered.length === 0
              ? "No tools match your search"
              : `${filtered.length} tool${filtered.length === 1 ? "" : "s"} found`}
          </p>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="home-tool-hub__empty" role="status">
          <p className="home-tool-hub__empty-title">No matches</p>
          <p className="home-tool-hub__empty-text">
            Try a different keyword or clear the category filter.
          </p>
        </div>
      ) : grouped ? (
        <div className="home-tool-hub__groups">
          {grouped.map(({ category: cat, items }) => (
            <CategorySection key={cat} category={cat} items={items} />
          ))}
        </div>
      ) : (
        <div className="home-tool-hub__grid" role="list">
          {filtered.map((calc) => (
            <div key={calc.id} role="listitem">
              <HomeToolCard calculator={calc} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CategorySection({
  category,
  items,
}: {
  category: CalculatorCategory;
  items: ReturnType<typeof getCalculatorMeta>[];
}) {
  const CategoryIcon = CALCULATOR_CATEGORY_ICONS[category];
  const theme = getCategoryTheme(category);

  return (
    <section
      className="home-tool-hub__category"
      aria-labelledby={`hub-category-${category}`}
    >
      <header
        className="home-tool-hub__category-header"
        style={categoryThemeVars(theme)}
      >
        <span className="home-tool-hub__category-icon" aria-hidden>
          <CategoryIcon className="size-5" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h2
            id={`hub-category-${category}`}
            className="home-tool-hub__category-title"
          >
            {CALCULATOR_CATEGORY_LABELS[category]}
          </h2>
          <p className="home-tool-hub__category-desc">
            {CALCULATOR_CATEGORY_DESCRIPTIONS[category]}
          </p>
        </div>
        <span className="home-tool-hub__category-count">
          {items.length} tool{items.length === 1 ? "" : "s"}
        </span>
      </header>

      <div className="home-tool-hub__grid" role="list">
        {items.map((calc) => (
          <div key={calc.id} role="listitem">
            <HomeToolCard calculator={calc} />
          </div>
        ))}
      </div>
    </section>
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
      className={cn("home-tool-hub__filter", active && "home-tool-hub__filter--active")}
    >
      {children}
    </button>
  );
}

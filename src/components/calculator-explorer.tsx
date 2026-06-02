"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CalculatorListItem } from "@/components/calculator-list-item";
import { Input } from "@/components/ui/input";
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
}

export function CalculatorExplorer({
  ids,
  initialQuery = "",
  initialCategory,
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
    const set = new Set(calculators.map((c) => c.category));
    return Array.from(set) as CalculatorCategory[];
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Search calculators…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 rounded-xl border-border bg-card pl-10 shadow-sm dark:bg-card/90"
            aria-label="Search calculators"
          />
        </div>
        <p className="shrink-0 text-sm text-muted-foreground sm:text-right">
          {filtered.length} of {calculators.length}
        </p>
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
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
        <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No calculators match your search.
        </p>
      ) : (
        <ul
          className="divide-y divide-border/70 rounded-xl border border-border/80 bg-card/50 p-1 dark:bg-card/30"
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

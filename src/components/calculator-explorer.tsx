"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CalculatorListItem } from "@/components/calculator-list-item";
import { Input } from "@/components/ui/input";
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
    <div className="calculators-directory space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Search calculators…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              calculatorCommandInput,
              "h-10 rounded-none border-0 pl-9 shadow-none focus-visible:ring-0"
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
          className="calculators-directory__list list-none divide-y divide-border/40 rounded-none bg-card dark:bg-[rgb(6_10_22/0.72)]"
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
        "calculators-directory__chip shrink-0 rounded-none px-2.5 py-1 text-xs font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border border-foreground/20 bg-muted/60 text-foreground dark:bg-[rgb(8_14_28/0.85)]"
          : "border border-border/50 bg-transparent text-muted-foreground hover:border-border hover:bg-muted/30 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

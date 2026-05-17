"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";
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
}

export function CalculatorExplorer({ ids }: CalculatorExplorerProps) {
  const calculators = useMemo(
    () => ids.map((id) => getCalculatorMeta(id)),
    [ids]
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>(ALL_CATEGORY);

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
            className="h-11 rounded-xl border-border/60 bg-card/80 pl-10 shadow-sm"
            aria-label="Search calculators"
          />
        </div>
        <p className="shrink-0 text-sm text-muted-foreground sm:text-right">
          {filtered.length} of {calculators.length}
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2"
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
        <p className="rounded-2xl border border-dashed border-border/60 py-12 text-center text-sm text-muted-foreground">
          No calculators match your search.
        </p>
      ) : (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((calc, i) => (
            <li
              key={calc.id}
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-300"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <CalculatorCard calculator={calc} />
            </li>
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
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
        active
          ? "border-primary/40 bg-primary/15 text-foreground"
          : "border-border/60 bg-card/50 text-muted-foreground hover:border-border hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

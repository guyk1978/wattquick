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
import { glassInsetInput, glassNeon, glassNeonAccent, glassSurface } from "@/lib/glass-ui";
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
            className={cn(glassInsetInput, "h-11 rounded-xl pl-10")}
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
        <p className={cn(glassSurface, "rounded-2xl border border-dashed border-border/40 py-12 text-center text-sm text-muted-foreground")}>
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
        "shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 sm:text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        active
          ? cn(
              glassSurface,
              glassNeon,
              glassNeonAccent("primary"),
              "scale-[1.02] text-foreground shadow-md"
            )
          : cn(
              glassInsetInput,
              "text-slate-600 hover:scale-[1.04] hover:bg-white/80 hover:text-slate-900",
              "dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100",
              "active:scale-[0.98]"
            )
      )}
    >
      {children}
    </button>
  );
}

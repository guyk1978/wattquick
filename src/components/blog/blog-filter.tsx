"use client";

import type { BlogCategory } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

export type BlogFilterValue = "All" | BlogCategory;

interface BlogFilterProps {
  categories: readonly BlogCategory[];
  selected: BlogFilterValue;
  onSelect: (value: BlogFilterValue) => void;
  className?: string;
}

/** Matte filter bar — yellow active, red hover (matches site header). */
export function BlogFilter({
  categories,
  selected,
  onSelect,
  className,
}: BlogFilterProps) {
  const options: BlogFilterValue[] = ["All", ...categories];

  return (
    <nav
      className={cn("blog-filter", className)}
      aria-label="Filter blog posts by category"
    >
      <ul className="blog-filter__list m-0 flex list-none flex-wrap gap-1.5 p-0">
        {options.map((value) => {
          const isActive = selected === value;
          return (
            <li key={value}>
              <button
                type="button"
                onClick={() => onSelect(value)}
                aria-pressed={isActive}
                className={cn(
                  "blog-filter-btn px-3.5 py-2 text-sm font-medium",
                  isActive && "blog-filter-btn--active"
                )}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

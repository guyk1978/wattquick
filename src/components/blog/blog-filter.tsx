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

export function BlogFilter({
  categories,
  selected,
  onSelect,
  className,
}: BlogFilterProps) {
  const options: BlogFilterValue[] = ["All", ...categories];

  return (
    <nav
      className={cn("blog-hub__filters", className)}
      aria-label="Filter blog posts by category"
    >
      {options.map((value) => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(value)}
            className={cn(
              "blog-hub__filter",
              isActive && "blog-hub__filter--active"
            )}
          >
            {value}
          </button>
        );
      })}
    </nav>
  );
}

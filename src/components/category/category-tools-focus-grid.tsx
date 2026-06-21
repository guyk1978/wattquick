"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

export interface CategoryToolsFocusItem {
  id: CalculatorId;
  href: string;
  title: string;
  description: string;
}

interface CategoryToolsFocusGridProps {
  calculators: CategoryToolsFocusItem[];
  className?: string;
  onNavigate?: () => void;
}

export function CategoryToolsFocusGrid({
  calculators,
  className,
  onNavigate,
}: CategoryToolsFocusGridProps) {
  if (calculators.length === 0) return null;

  return (
    <ul
      className={cn("category-tools-focus-grid", className)}
      role="list"
    >
      {calculators.map((calc) => {
        const Icon = getCalculatorMeta(calc.id).icon;
        return (
          <li key={calc.id} className="category-tools-focus-grid__cell">
            <Link
              href={calc.href}
              className="category-tools-focus-grid__card"
              onClick={onNavigate}
            >
              <span className="category-tools-focus-grid__icon" aria-hidden>
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <span className="category-tools-focus-grid__body">
                <span className="category-tools-focus-grid__title">
                  {calc.title}
                </span>
                <span className="category-tools-focus-grid__desc">
                  {calc.description}
                </span>
              </span>
              <ArrowUpRight
                className="category-tools-focus-grid__arrow size-5 shrink-0"
                strokeWidth={2.25}
                aria-hidden
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

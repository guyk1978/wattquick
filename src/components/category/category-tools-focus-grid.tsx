"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import { ToolCardExample } from "@/components/calculator/tool-card-example";
import { ToolCardHeaderActions } from "@/components/calculator/tool-card-header-actions";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import type { CalculatorId } from "@/lib/calculators";
import { getCategoryColor } from "@/lib/category-theme";
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
        const meta = getCalculatorMeta(calc.id);
        const Icon = meta.icon;
        const accent = getCategoryColor(meta.category);
        return (
          <li key={calc.id} className="category-tools-focus-grid__cell">
            <div className="category-tools-focus-grid__card relative">
              <Link
                href={calc.href}
                className="absolute inset-0 z-[1]"
                aria-label={`Open ${calc.title}`}
                onClick={onNavigate}
              />
              <ToolCardHeaderActions calculatorId={calc.id} />
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
                <span className="category-tools-focus-grid__benefit">
                  {meta.benefit}
                </span>
                <ToolCardExample example={meta.example} className="mt-1" />
                <CalculatorRatingSummary
                  calculatorId={calc.id}
                  color={accent}
                  className="relative z-10 mt-1"
                  showCount={false}
                />
              </span>
              <ArrowUpRight
                className="category-tools-focus-grid__arrow size-5 shrink-0"
                strokeWidth={2.25}
                aria-hidden
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

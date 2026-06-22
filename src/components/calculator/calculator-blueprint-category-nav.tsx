"use client";

import Link from "next/link";
import {
  getCalculatorMeta,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import type { CalculatorCategory, CalculatorId, CalculatorMeta } from "@/lib/calculators";
import { CalculatorEngineeringStamp } from "@/components/calculator/calculator-engineering-stamp";
import { BlueprintRightNavHeader } from "@/components/blueprint/blueprint-right-nav-header";
import { useBlueprintRightSidebar } from "@/components/blueprint/blueprint-right-sidebar-context";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintCategoryNavProps {
  className?: string;
  title?: string;
  calculators?: CalculatorMeta[];
  calculatorId?: CalculatorId;
  category?: CalculatorCategory;
  activeCalculatorId?: CalculatorId;
}

function formatNavTitle(title: string, wide: boolean): string {
  if (wide) return title;
  return title
    .replace(/\s*calculator\s*/gi, "")
    .replace(/\s*calculator$/i, "")
    .trim();
}

export function CalculatorBlueprintCategoryNav({
  className,
  title = "Calculators",
  calculators,
  calculatorId,
  category,
  activeCalculatorId,
}: CalculatorBlueprintCategoryNavProps) {
  const { wide } = useBlueprintRightSidebar();
  const resolvedCategory =
    category ?? (calculatorId ? getCalculatorMeta(calculatorId).category : undefined);
  const peers =
    calculators ??
    (resolvedCategory ? getCalculatorsByCategory(resolvedCategory) : []);
  const activeId =
    activeCalculatorId ?? (calculatorId ? calculatorId : undefined);

  return (
    <aside
      id="blueprint-tools-sidebar"
      className={cn("calculator-blueprint-nav", className)}
      aria-label={title}
    >
      <BlueprintRightNavHeader title={title} />
      {peers.length === 0 ? (
        <p className="calculator-blueprint-nav__empty">No tools to list yet.</p>
      ) : (
        <ul className="calculator-blueprint-nav__list" role="list">
          {peers.map((calc) => {
            const Icon = calc.icon;
            const active = activeId != null && calc.id === activeId;
            return (
              <li key={calc.id}>
                <Link
                  href={calc.href}
                  className={cn(
                    "calculator-blueprint-nav__item",
                    active && "calculator-blueprint-nav__item--active"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="calculator-blueprint-nav__icon" strokeWidth={2} aria-hidden />
                  <span className="calculator-blueprint-nav__label">
                    {formatNavTitle(calc.title, wide)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <CalculatorEngineeringStamp className="calculator-blueprint-nav__stamp" />
    </aside>
  );
}

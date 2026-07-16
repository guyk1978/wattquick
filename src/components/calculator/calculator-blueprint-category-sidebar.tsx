"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorId,
  type CalculatorMeta,
} from "@/lib/calculators";
import {
  getCalculatorMeta,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import { getCategoryPageHref } from "@/lib/category-routes";
import { BlueprintLeftSidebarToggle } from "@/components/blueprint/blueprint-left-sidebar-toggle";
import { useBlueprintLeftSidebarOptional } from "@/components/blueprint/blueprint-left-sidebar-context";
import {
  getCategoryIcon,
  getSidebarGroupForCategory,
  SIDEBAR_NAV_GROUPS,
  type SidebarNavGroupId,
} from "@/lib/sidebar-nav-groups";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintCategorySidebarProps {
  className?: string;
  calculatorId?: CalculatorId;
  /** Omit or pass null on hub pages (e.g. favorites) with no active category */
  activeCategory?: CalculatorCategory | null;
  /** Mobile drawer mode — always visible when mounted */
  variant?: "desktop" | "drawer";
  onNavigate?: () => void;
}

function toolsForCategories(categories: CalculatorCategory[]): CalculatorMeta[] {
  return categories.flatMap((category) => getCalculatorsByCategory(category));
}

export function CalculatorBlueprintCategorySidebar({
  className,
  calculatorId,
  activeCategory: activeCategoryProp,
  variant = "desktop",
  onNavigate,
}: CalculatorBlueprintCategorySidebarProps) {
  const leftSidebar = useBlueprintLeftSidebarOptional();
  const collapsed = leftSidebar?.collapsed ?? false;
  const activeCategory = calculatorId
    ? getCalculatorMeta(calculatorId).category
    : (activeCategoryProp ?? null);
  const activeGroupId = activeCategory
    ? getSidebarGroupForCategory(activeCategory)?.id
    : undefined;

  const [openGroupId, setOpenGroupId] = useState<SidebarNavGroupId | null>(
    activeGroupId ?? "battery"
  );

  useEffect(() => {
    if (activeGroupId) setOpenGroupId(activeGroupId);
  }, [activeGroupId]);

  const groupToolCounts = useMemo(() => {
    const counts: Partial<Record<SidebarNavGroupId, number>> = {};
    for (const group of SIDEBAR_NAV_GROUPS) {
      counts[group.id] = toolsForCategories(group.categories).length;
    }
    return counts;
  }, []);

  const isDrawer = variant === "drawer";
  const showLabels = isDrawer || !collapsed;

  return (
    <aside
      id={isDrawer ? "blueprint-categories-drawer" : "blueprint-categories-sidebar"}
      className={cn(
        "calculator-blueprint-categories",
        isDrawer && "calculator-blueprint-categories--drawer",
        className
      )}
      aria-label="Tool categories"
    >
      <div className="calculator-blueprint-categories__header">
        <p className="calculator-blueprint-categories__title">
          {showLabels ? "Tools" : "TQ"}
        </p>
        {!isDrawer && leftSidebar ? (
          <BlueprintLeftSidebarToggle
            className="calculator-blueprint-categories__collapse"
            showLabel={false}
          />
        ) : null}
      </div>

      <ul className="calculator-blueprint-categories__list" role="list">
        {SIDEBAR_NAV_GROUPS.map((group) => {
          const GroupIcon = group.icon;
          const open = openGroupId === group.id;
          const groupActive = activeGroupId === group.id;

          return (
            <li key={group.id} className="calculator-blueprint-categories__group">
              <button
                type="button"
                className={cn(
                  "calculator-blueprint-categories__item",
                  "calculator-blueprint-categories__group-toggle",
                  groupActive && "calculator-blueprint-categories__item--active"
                )}
                aria-expanded={open}
                onClick={() =>
                  setOpenGroupId((prev) => (prev === group.id ? null : group.id))
                }
                title={group.label}
              >
                <GroupIcon
                  className="calculator-blueprint-categories__icon"
                  strokeWidth={2}
                  aria-hidden
                />
                {showLabels ? (
                  <>
                    <span className="calculator-blueprint-categories__label">
                      {group.label}
                    </span>
                    <span className="calculator-blueprint-categories__count">
                      {groupToolCounts[group.id] ?? 0}
                    </span>
                    <ChevronDown
                      className={cn(
                        "calculator-blueprint-categories__chevron",
                        open && "calculator-blueprint-categories__chevron--open"
                      )}
                      aria-hidden
                    />
                  </>
                ) : null}
              </button>

              {open && showLabels ? (
                <ul
                  className="calculator-blueprint-categories__tools"
                  role="list"
                >
                  {group.categories.map((category) => {
                    const CategoryIcon = getCategoryIcon(category);
                    const categoryTools = getCalculatorsByCategory(category);
                    const categoryActive = category === activeCategory;

                    return (
                      <li key={category}>
                        <Link
                          href={getCategoryPageHref(category)}
                          className={cn(
                            "calculator-blueprint-categories__category-link",
                            categoryActive &&
                              "calculator-blueprint-categories__category-link--active"
                          )}
                          onClick={onNavigate}
                        >
                          <CategoryIcon
                            className="calculator-blueprint-categories__icon"
                            strokeWidth={2}
                            aria-hidden
                          />
                          <span>{CALCULATOR_CATEGORY_LABELS[category]}</span>
                        </Link>
                        <ul
                          className="calculator-blueprint-categories__tool-list"
                          role="list"
                        >
                          {categoryTools.map((tool) => {
                            const active =
                              calculatorId != null && tool.id === calculatorId;
                            return (
                              <li key={tool.id}>
                                <Link
                                  href={tool.href}
                                  className={cn(
                                    "calculator-blueprint-categories__tool",
                                    active &&
                                      "calculator-blueprint-categories__tool--active"
                                  )}
                                  aria-current={active ? "page" : undefined}
                                  onClick={onNavigate}
                                >
                                  {tool.title
                                    .replace(/\s*calculator\s*/gi, " ")
                                    .trim()}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

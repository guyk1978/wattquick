"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CalculatorEngineeringStamp } from "@/components/calculator/calculator-engineering-stamp";
import { BlueprintRightNavHeader } from "@/components/blueprint/blueprint-right-nav-header";
import { useBlueprintRightSidebar } from "@/components/blueprint/blueprint-right-sidebar-context";
import { cn } from "@/lib/utils";

export interface BlueprintListNavItem {
  href: string;
  label: string;
  id?: string;
  icon?: LucideIcon;
}

interface BlueprintListNavProps {
  title: string;
  items: BlueprintListNavItem[];
  activeId?: string | null;
  emptyMessage?: string;
  className?: string;
}

function formatListLabel(label: string, wide: boolean, max = 32): string {
  const trimmed = label.trim();
  if (wide) return trimmed;
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

export function BlueprintListNav({
  title,
  items,
  activeId,
  emptyMessage = "No items yet.",
  className,
}: BlueprintListNavProps) {
  const { wide } = useBlueprintRightSidebar();

  return (
    <aside
      id="blueprint-tools-sidebar"
      className={cn("calculator-blueprint-nav", className)}
      aria-label={title}
    >
      <BlueprintRightNavHeader title={title} />
      {items.length === 0 ? (
        <p className="calculator-blueprint-nav__empty">{emptyMessage}</p>
      ) : (
        <ul className="calculator-blueprint-nav__list" role="list">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeId != null && item.id === activeId;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "calculator-blueprint-nav__item",
                    active && "calculator-blueprint-nav__item--active"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {Icon ? (
                    <Icon className="calculator-blueprint-nav__icon" strokeWidth={2} aria-hidden />
                  ) : null}
                  <span className="calculator-blueprint-nav__label">
                    {formatListLabel(item.label, wide)}
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

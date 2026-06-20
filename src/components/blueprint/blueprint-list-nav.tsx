import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CalculatorEngineeringStamp } from "@/components/calculator/calculator-engineering-stamp";
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

function shortenLabel(label: string, max = 32): string {
  const trimmed = label.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

export function BlueprintListNav({
  title,
  items,
  activeId,
  emptyMessage = "No items yet.",
  className,
}: BlueprintListNavProps) {
  return (
    <aside className={cn("calculator-blueprint-nav", className)} aria-label={title}>
      <p className="calculator-blueprint-nav__title">{title}</p>
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
                    {shortenLabel(item.label)}
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

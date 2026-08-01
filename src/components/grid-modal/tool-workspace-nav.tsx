"use client";

import type { ToolHeaderTab } from "@/components/tool-header";
import { cn } from "@/lib/utils";

const NAV_LABELS: Record<Exclude<ToolHeaderTab, "doc">, string> = {
  calc: "Calculator",
  viz: "Visualization",
  related: "Related tools",
  reviews: "Reviews",
};

const NAV_HINTS: Record<Exclude<ToolHeaderTab, "doc">, string> = {
  calc: "Inputs & results",
  viz: "Animated schematic",
  related: "Similar calculators",
  reviews: "Ratings & feedback",
};

type ToolWorkspaceNavProps = {
  activeTab: ToolHeaderTab;
  onTabChange: (tab: ToolHeaderTab) => void;
  hasVizTab?: boolean;
  hasRelatedTab?: boolean;
  hasReviewsTab?: boolean;
  className?: string;
};

/**
 * Vertical mode switcher for standalone tool pages (replaces horizontal [CALC]/[VIZ] tabs).
 * Documentation lives as permanent SEO sections below the workspace — not a nav item.
 */
export function ToolWorkspaceNav({
  activeTab,
  onTabChange,
  hasVizTab = false,
  hasRelatedTab = false,
  hasReviewsTab = false,
  className,
}: ToolWorkspaceNavProps) {
  const items: Exclude<ToolHeaderTab, "doc">[] = [
    "calc",
    ...(hasVizTab ? (["viz"] as const) : []),
    ...(hasRelatedTab ? (["related"] as const) : []),
    ...(hasReviewsTab ? (["reviews"] as const) : []),
  ];

  return (
    <nav
      className={cn("tool-workspace-nav", className)}
      aria-label="Tool sections"
    >
      <p className="tool-workspace-nav__eyebrow">Sections</p>
      <ul className="tool-workspace-nav__list" role="tablist" aria-orientation="vertical">
        {items.map((tab) => {
          const active = activeTab === tab;
          return (
            <li key={tab} role="presentation">
              <button
                type="button"
                role="tab"
                id={`tool-section-tab-${tab}`}
                aria-selected={active ? "true" : "false"}
                aria-current={active ? "page" : undefined}
                aria-controls={`tool-section-panel-${tab}`}
                tabIndex={active ? 0 : -1}
                className={cn(
                  "tool-workspace-nav__item",
                  active && "tool-workspace-nav__item--active"
                )}
                onClick={(event) => {
                  event.preventDefault();
                  onTabChange(tab);
                }}
              >
                <span className="tool-workspace-nav__label">{NAV_LABELS[tab]}</span>
                <span className="tool-workspace-nav__hint">{NAV_HINTS[tab]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

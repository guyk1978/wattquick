import Link from "next/link";
import type { ReactNode } from "react";
import { CalculatorBlueprintCategorySidebar } from "@/components/calculator/calculator-blueprint-category-sidebar";
import { CalculatorBlueprintStatsBar } from "@/components/calculator/calculator-blueprint-stats-bar";
import type { CalculatorCategory } from "@/lib/calculators";

interface BlueprintHubShellProps {
  children: ReactNode;
  rightNav: ReactNode;
  statsTrailing?: ReactNode;
  activeCategory?: CalculatorCategory | null;
}

const defaultStatsTrailing = (
  <Link href="/calculators/" className="calculator-blueprint-stats__link">
    All tools
  </Link>
);

export function BlueprintHubShell({
  children,
  rightNav,
  statsTrailing = defaultStatsTrailing,
  activeCategory = null,
}: BlueprintHubShellProps) {
  return (
    <div className="calculator-route calculator-route--blueprint">
      <div className="calculator-page-shell calculator-blueprint-shell">
        <CalculatorBlueprintStatsBar trailing={statsTrailing} />

        <div className="calculator-blueprint-shell__workspace">
          <CalculatorBlueprintCategorySidebar activeCategory={activeCategory} />

          <div className="calculator-blueprint-shell__center">{children}</div>

          {rightNav}
        </div>
      </div>
    </div>
  );
}

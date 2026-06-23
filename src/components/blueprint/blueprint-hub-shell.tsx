import Link from "next/link";
import type { ReactNode } from "react";
import { CalculatorBlueprintCategorySidebar } from "@/components/calculator/calculator-blueprint-category-sidebar";
import { CalculatorBlueprintStatsBar } from "@/components/calculator/calculator-blueprint-stats-bar";
import { BlueprintShellFrame } from "@/components/blueprint/blueprint-shell-frame";
import { BlueprintShellWorkspace } from "@/components/blueprint/blueprint-shell-workspace";
import type { CalculatorCategory } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface BlueprintHubShellProps {
  children: ReactNode;
  rightNav: ReactNode;
  statsTrailing?: ReactNode;
  activeCategory?: CalculatorCategory | null;
  /** Bold tech-forward calculators hub (light mode). */
  techHub?: boolean;
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
  techHub = false,
}: BlueprintHubShellProps) {
  return (
    <div
      className={cn(
        "calculator-route calculator-route--blueprint",
        techHub && "calculator-route--tech-hub"
      )}
    >
      <BlueprintShellFrame>
        <CalculatorBlueprintStatsBar
          trailing={statsTrailing}
          variant={techHub ? "tech-hub" : "default"}
        />

        <BlueprintShellWorkspace>
          <CalculatorBlueprintCategorySidebar activeCategory={activeCategory} />

          <div className="calculator-blueprint-shell__center">{children}</div>

          {rightNav}
        </BlueprintShellWorkspace>
      </BlueprintShellFrame>
    </div>
  );
}

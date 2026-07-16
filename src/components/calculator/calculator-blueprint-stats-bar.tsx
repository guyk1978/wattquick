import { getAllCalculatorMeta } from "@/lib/calculators/registry";
import { getCalculatorCategoryCount } from "@/lib/calculator-discovery";
import { BlueprintLeftSidebarToggle } from "@/components/blueprint/blueprint-left-sidebar-toggle";
import { BlueprintRightSidebarToggle } from "@/components/blueprint/blueprint-right-sidebar-toggle";
import { CalculatorToolsDrawer } from "@/components/calculator/calculator-tools-drawer";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintStatsBarProps {
  trailing?: React.ReactNode;
  variant?: "default" | "tech-hub";
  calculatorId?: CalculatorId;
}

export function CalculatorBlueprintStatsBar({
  trailing,
  variant = "default",
  calculatorId,
}: CalculatorBlueprintStatsBarProps) {
  const toolCount = getAllCalculatorMeta().length;
  const categoryCount = getCalculatorCategoryCount();
  const isTechHub = variant === "tech-hub";

  return (
    <div
      className={cn(
        "calculator-blueprint-stats",
        isTechHub && "calculator-blueprint-stats--tech-hub",
      )}
    >
      <CalculatorToolsDrawer
        calculatorId={calculatorId}
        className="calculator-blueprint-stats__mobile-tools"
      />
      <BlueprintLeftSidebarToggle className="calculator-blueprint-stats__sidebar-toggle" />
      <div className="calculator-blueprint-stats__points" aria-label="Site statistics">
        <span className="calculator-blueprint-stats__point">
          <strong>{toolCount}</strong> Tools
        </span>
        <span className="calculator-blueprint-stats__divider" aria-hidden />
        <span className="calculator-blueprint-stats__point">
          <strong>{categoryCount}</strong> Categories
        </span>
        <span className="calculator-blueprint-stats__divider" aria-hidden />
        <span className="calculator-blueprint-stats__point">
          <strong>&lt;50ms</strong> Latency
        </span>
      </div>
      {trailing ? (
        <div className="calculator-blueprint-stats__trailing">
          <BlueprintRightSidebarToggle className="calculator-blueprint-stats__right-sidebar-toggle" />
          {trailing}
        </div>
      ) : (
        <BlueprintRightSidebarToggle className="calculator-blueprint-stats__right-sidebar-toggle calculator-blueprint-stats__right-sidebar-toggle--solo" />
      )}
    </div>
  );
}

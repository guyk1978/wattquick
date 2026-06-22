import { getAllCalculatorMeta } from "@/lib/calculators/registry";
import { getCalculatorCategoryCount } from "@/lib/calculator-discovery";
import { BlueprintLeftSidebarToggle } from "@/components/blueprint/blueprint-left-sidebar-toggle";
import { BlueprintRightSidebarToggle } from "@/components/blueprint/blueprint-right-sidebar-toggle";

interface CalculatorBlueprintStatsBarProps {
  trailing?: React.ReactNode;
}

export function CalculatorBlueprintStatsBar({
  trailing,
}: CalculatorBlueprintStatsBarProps) {
  const toolCount = getAllCalculatorMeta().length;
  const categoryCount = getCalculatorCategoryCount();

  return (
    <div className="calculator-blueprint-stats">
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

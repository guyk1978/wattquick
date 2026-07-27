"use client";

import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { BatteryChargingTimeViz } from "@/components/calculator/viz/battery-charging-time-viz";
import { BatteryEnergyViz } from "@/components/calculator/viz/battery-energy-viz";
import { BatteryPercentageViz } from "@/components/calculator/viz/battery-percentage-viz";
import { BatteryRuntimeViz } from "@/components/calculator/viz/battery-runtime-viz";
import { CriticalLoadAnalysisViz } from "@/components/calculator/viz/critical-load-analysis-viz";
import { EbikeChargeTimeViz } from "@/components/calculator/viz/ebike-charge-time-viz";
import { EbikeChargingCostViz } from "@/components/calculator/viz/ebike-charging-cost-viz";
import { EbikeMaxSpeedViz } from "@/components/calculator/viz/ebike-max-speed-viz";
import { EbikeRangeViz } from "@/components/calculator/viz/ebike-range-viz";
import { UpsRuntimeViz } from "@/components/calculator/viz/ups-runtime-viz";
import { hasCalculatorViz } from "@/lib/calculator-viz-ids";

export interface CalculatorVizConfig {
  calculatorTitle: string;
  Viz: ComponentType<{ className?: string }>;
}

/**
 * Calculators that expose a [VIZ] animated schematic tab in the tool workspace.
 * Grow this map as more Industrial Matte viz views ship.
 */
export const CALCULATOR_VIZ: Partial<Record<CalculatorId, CalculatorVizConfig>> =
  {
    "critical-load-analysis": {
      calculatorTitle: "Critical Load Analysis",
      Viz: CriticalLoadAnalysisViz,
    },
    "ups-runtime": {
      calculatorTitle: "UPS Runtime",
      Viz: UpsRuntimeViz,
    },
    "ebike-range-estimator": {
      calculatorTitle: "E-Bike Range Estimator",
      Viz: EbikeRangeViz,
    },
    "ebike-charging-cost": {
      calculatorTitle: "E-Bike Full Charge Cost Calculator",
      Viz: EbikeChargingCostViz,
    },
    "ebike-max-speed": {
      calculatorTitle: "E-Bike Max Speed Calculator",
      Viz: EbikeMaxSpeedViz,
    },
    "ebike-charge-time": {
      calculatorTitle: "E-Bike Charge Time Calculator",
      Viz: EbikeChargeTimeViz,
    },
    "battery-percentage": {
      calculatorTitle: "Battery Percentage",
      Viz: BatteryPercentageViz,
    },
    "battery-runtime": {
      calculatorTitle: "Battery Runtime",
      Viz: BatteryRuntimeViz,
    },
    "battery-charging-time": {
      calculatorTitle: "Battery Charging Time",
      Viz: BatteryChargingTimeViz,
    },
    "battery-energy": {
      calculatorTitle: "Battery Energy Calculator",
      Viz: BatteryEnergyViz,
    },
  };

export { hasCalculatorViz, CALCULATOR_VIZ_IDS } from "@/lib/calculator-viz-ids";

export function getCalculatorViz(
  id: CalculatorId
): CalculatorVizConfig | undefined {
  return CALCULATOR_VIZ[id];
}

"use client";

import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { AmpsToWattsViz } from "@/components/calculator/viz/amps-to-watts-viz";
import { BatteryBankSizeViz } from "@/components/calculator/viz/battery-bank-size-viz";
import { BatteryChargingTimeViz } from "@/components/calculator/viz/battery-charging-time-viz";
import { BatteryEnergyViz } from "@/components/calculator/viz/battery-energy-viz";
import { BatteryPercentageViz } from "@/components/calculator/viz/battery-percentage-viz";
import { BatteryRuntimeViz } from "@/components/calculator/viz/battery-runtime-viz";
import { CriticalLoadAnalysisViz } from "@/components/calculator/viz/critical-load-analysis-viz";
import { DcCableSizeViz } from "@/components/calculator/viz/dc-cable-size-viz";
import { EbikeChargeTimeViz } from "@/components/calculator/viz/ebike-charge-time-viz";
import { EbikeChargingCostViz } from "@/components/calculator/viz/ebike-charging-cost-viz";
import { EbikeMaxSpeedViz } from "@/components/calculator/viz/ebike-max-speed-viz";
import { EbikeRangeViz } from "@/components/calculator/viz/ebike-range-viz";
import { EvBatteryRangeViz } from "@/components/calculator/viz/ev-battery-range-viz";
import { EvChargeTimeViz } from "@/components/calculator/viz/ev-charge-time-viz";
import { EvChargingCostViz } from "@/components/calculator/viz/ev-charging-cost-viz";
import { EvCostPerMileViz } from "@/components/calculator/viz/ev-cost-per-mile-viz";
import { EvChargingTemperatureImpactViz } from "@/components/calculator/viz/ev-charging-temperature-impact-viz";
import { EvFastChargingTimeViz } from "@/components/calculator/viz/ev-fast-charging-time-viz";
import { EvBusBatteryViz } from "@/components/calculator/viz/ev-bus-battery-viz";
import { EvDeliveryVanEfficiencyViz } from "@/components/calculator/viz/ev-delivery-van-efficiency-viz";
import { EvFleetTcoViz } from "@/components/calculator/viz/ev-fleet-tco-viz";
import { EvForkliftRuntimeViz } from "@/components/calculator/viz/ev-forklift-runtime-viz";
import { EvLevel1VsLevel2Viz } from "@/components/calculator/viz/ev-level1-vs-level2-viz";
import { EvTruckRangeViz } from "@/components/calculator/viz/ev-truck-range-viz";
import { EvVsIceMaintenanceViz } from "@/components/calculator/viz/ev-vs-ice-maintenance-viz";
import { InverterSizingViz } from "@/components/calculator/viz/inverter-sizing-viz";
import { OhmsLawViz } from "@/components/calculator/viz/ohms-law-viz";
import { ResidentialVoltageDropViz } from "@/components/calculator/viz/residential-voltage-drop-viz";
import { SolarBatteryBankViz } from "@/components/calculator/viz/solar-battery-bank-viz";
import { SolarChargeControllerSizeViz } from "@/components/calculator/viz/solar-charge-controller-size-viz";
import { SolarDailyYieldViz } from "@/components/calculator/viz/solar-daily-yield-viz";
import { SolarPanelSizeViz } from "@/components/calculator/viz/solar-panel-size-viz";
import { UpsRuntimeViz } from "@/components/calculator/viz/ups-runtime-viz";
import { WattsToAmpsViz } from "@/components/calculator/viz/watts-to-amps-viz";
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
    "battery-bank-size": {
      calculatorTitle: "Battery Bank Size (Ah)",
      Viz: BatteryBankSizeViz,
    },
    "inverter-sizing": {
      calculatorTitle: "Inverter Sizing",
      Viz: InverterSizingViz,
    },
    "dc-cable-size": {
      calculatorTitle: "DC Cable Size Calculator",
      Viz: DcCableSizeViz,
    },
    "watts-to-amps": {
      calculatorTitle: "Watts to Amps",
      Viz: WattsToAmpsViz,
    },
    "amps-to-watts": {
      calculatorTitle: "Amps to Watts",
      Viz: AmpsToWattsViz,
    },
    "residential-voltage-drop": {
      calculatorTitle: "Residential AC Voltage Drop Calculator",
      Viz: ResidentialVoltageDropViz,
    },
    "ohms-law": {
      calculatorTitle: "Ohm's Law Calculator",
      Viz: OhmsLawViz,
    },
    "solar-panel-size": {
      calculatorTitle: "Solar Panel Size",
      Viz: SolarPanelSizeViz,
    },
    "solar-battery-bank": {
      calculatorTitle: "Solar Battery Bank Size",
      Viz: SolarBatteryBankViz,
    },
    "solar-charge-controller-size": {
      calculatorTitle: "Solar Charge Controller Size Calculator",
      Viz: SolarChargeControllerSizeViz,
    },
    "solar-daily-yield": {
      calculatorTitle: "Solar Daily Yield",
      Viz: SolarDailyYieldViz,
    },
    "ev-charging-cost": {
      calculatorTitle: "EV Charging Cost",
      Viz: EvChargingCostViz,
    },
    "ev-charge-time": {
      calculatorTitle: "EV Charge Time",
      Viz: EvChargeTimeViz,
    },
    "ev-cost-per-mile": {
      calculatorTitle: "EV Cost Per Mile Calculator",
      Viz: EvCostPerMileViz,
    },
    "ev-battery-range": {
      calculatorTitle: "EV Battery Range Calculator",
      Viz: EvBatteryRangeViz,
    },
    "ev-level1-vs-level2": {
      calculatorTitle: "Level 1 vs Level 2 EV Charging Time",
      Viz: EvLevel1VsLevel2Viz,
    },
    "ev-vs-ice-maintenance": {
      calculatorTitle: "EV vs ICE Maintenance Cost Calculator",
      Viz: EvVsIceMaintenanceViz,
    },
    "ev-fast-charging-time": {
      calculatorTitle: "EV DC Fast Charging Calculator (10–80%)",
      Viz: EvFastChargingTimeViz,
    },
    "ev-charging-temperature-impact": {
      calculatorTitle: "EV Charging Temperature Impact Calculator",
      Viz: EvChargingTemperatureImpactViz,
    },
    "ev-truck-range": {
      calculatorTitle: "EV Truck Range vs. Payload Calculator",
      Viz: EvTruckRangeViz,
    },
    "ev-fleet-tco": {
      calculatorTitle: "EV Fleet TCO vs. Gas Calculator",
      Viz: EvFleetTcoViz,
    },
    "ev-bus-battery": {
      calculatorTitle: "Transit Bus Battery kWh per Mile",
      Viz: EvBusBatteryViz,
    },
    "ev-forklift-runtime": {
      calculatorTitle: "Electric Forklift Shift Runtime Calculator",
      Viz: EvForkliftRuntimeViz,
    },
    "ev-delivery-van-efficiency": {
      calculatorTitle: "Delivery Van Stop-and-Go Efficiency",
      Viz: EvDeliveryVanEfficiencyViz,
    },
  };

export { hasCalculatorViz, CALCULATOR_VIZ_IDS } from "@/lib/calculator-viz-ids";

export function getCalculatorViz(
  id: CalculatorId
): CalculatorVizConfig | undefined {
  return CALCULATOR_VIZ[id];
}

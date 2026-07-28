"use client";

import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { AcInrushCurrentViz } from "@/components/calculator/viz/ac-inrush-current-viz";
import { AhToWhViz } from "@/components/calculator/viz/ah-to-wh-viz";
import { AmpsToWattsViz } from "@/components/calculator/viz/amps-to-watts-viz";
import { ApplianceDailyCostViz } from "@/components/calculator/viz/appliance-daily-cost-viz";
import { ApplianceMonthlyEnergyViz } from "@/components/calculator/viz/appliance-monthly-energy-viz";
import { TwelveVTo120VInverterViz } from "@/components/calculator/viz/12v-to-120v-inverter-viz";
import { BatteryArbitrageRoiViz } from "@/components/calculator/viz/battery-arbitrage-roi-viz";
import { BatteryBankSizeViz } from "@/components/calculator/viz/battery-bank-size-viz";
import { BatteryChargingTimeViz } from "@/components/calculator/viz/battery-charging-time-viz";
import { BatteryCostViz } from "@/components/calculator/viz/battery-cost-viz";
import { BatteryCRateViz } from "@/components/calculator/viz/battery-c-rate-viz";
import { BatteryDepthOfDischargeViz } from "@/components/calculator/viz/battery-depth-of-discharge-viz";
import { BatteryEfficiencyViz } from "@/components/calculator/viz/battery-efficiency-viz";
import { BatteryEnergyViz } from "@/components/calculator/viz/battery-energy-viz";
import { BatteryPercentageViz } from "@/components/calculator/viz/battery-percentage-viz";
import { BatteryRuntimeViz } from "@/components/calculator/viz/battery-runtime-viz";
import { BatterySeriesParallelViz } from "@/components/calculator/viz/battery-series-parallel-viz";
import { CampingFridgeRuntimeViz } from "@/components/calculator/viz/camping-fridge-runtime-viz";
import { ConductorResistanceTemperatureViz } from "@/components/calculator/viz/conductor-resistance-temperature-viz";
import { CriticalLoadAnalysisViz } from "@/components/calculator/viz/critical-load-analysis-viz";
import { DcCableSizeViz } from "@/components/calculator/viz/dc-cable-size-viz";
import { DemandChargeCalculatorViz } from "@/components/calculator/viz/demand-charge-calculator-viz";
import { EbikeChargeTimeViz } from "@/components/calculator/viz/ebike-charge-time-viz";
import { EbikeChargingCostViz } from "@/components/calculator/viz/ebike-charging-cost-viz";
import { EbikeMaxSpeedViz } from "@/components/calculator/viz/ebike-max-speed-viz";
import { EbikeRangeViz } from "@/components/calculator/viz/ebike-range-viz";
import { ElectricityBillViz } from "@/components/calculator/viz/electricity-bill-viz";
import { EnergyConsumptionViz } from "@/components/calculator/viz/energy-consumption-viz";
import { EscooterHillClimbViz } from "@/components/calculator/viz/escooter-hill-climb-viz";
import { EscooterMaxSpeedViz } from "@/components/calculator/viz/escooter-max-speed-viz";
import { EscooterRangeViz } from "@/components/calculator/viz/escooter-range-viz";
import { EscooterTirePressureViz } from "@/components/calculator/viz/escooter-tire-pressure-viz";
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
import { HeaterCostViz } from "@/components/calculator/viz/heater-cost-viz";
import { HeatLossInsulationViz } from "@/components/calculator/viz/heat-loss-insulation-viz";
import { HomeInsulationSavingsViz } from "@/components/calculator/viz/home-insulation-savings-viz";
import { InverterSizingViz } from "@/components/calculator/viz/inverter-sizing-viz";
import { KvaToKwViz } from "@/components/calculator/viz/kva-to-kw-viz";
import { LedSavingsRoiViz } from "@/components/calculator/viz/led-savings-roi-viz";
import { LedVsIncandescentRoiViz } from "@/components/calculator/viz/led-vs-incandescent-roi-viz";
import { TouShiftingSavingsViz } from "@/components/calculator/viz/tou-shifting-savings-viz";
import { MarineBatteryBankViz } from "@/components/calculator/viz/marine-battery-bank-viz";
import { OhmsLawViz } from "@/components/calculator/viz/ohms-law-viz";
import { PoolEnergyThermalCoverViz } from "@/components/calculator/viz/pool-energy-thermal-cover-viz";
import { PortablePowerStationRechargeViz } from "@/components/calculator/viz/portable-power-station-recharge-viz";
import { ResidentialVoltageDropViz } from "@/components/calculator/viz/residential-voltage-drop-viz";
import { RvSolarCalculatorViz } from "@/components/calculator/viz/rv-solar-calculator-viz";
import { SolarBatteryBankViz } from "@/components/calculator/viz/solar-battery-bank-viz";
import { SolarChargeControllerSizeViz } from "@/components/calculator/viz/solar-charge-controller-size-viz";
import { SolarDailyYieldViz } from "@/components/calculator/viz/solar-daily-yield-viz";
import { SolarPanelSizeViz } from "@/components/calculator/viz/solar-panel-size-viz";
import { UpsRuntimeViz } from "@/components/calculator/viz/ups-runtime-viz";
import { V2gFinancialReturnViz } from "@/components/calculator/viz/v2g-financial-return-viz";
import { VoltsToWattsViz } from "@/components/calculator/viz/volts-to-watts-viz";
import { PowerFactorViz } from "@/components/calculator/viz/power-factor-viz";
import { WattsToAmpsViz } from "@/components/calculator/viz/watts-to-amps-viz";
import { WattsToVoltsViz } from "@/components/calculator/viz/watts-to-volts-viz";
import { WhToAhViz } from "@/components/calculator/viz/wh-to-ah-viz";
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
    "escooter-range": {
      calculatorTitle: "E-Scooter Range Calculator",
      Viz: EscooterRangeViz,
    },
    "escooter-tire-pressure": {
      calculatorTitle: "E-Scooter Tyre Pressure & Rolling Resistance",
      Viz: EscooterTirePressureViz,
    },
    "escooter-max-speed": {
      calculatorTitle: "E-Scooter Max Speed Calculator",
      Viz: EscooterMaxSpeedViz,
    },
    "escooter-hill-climb": {
      calculatorTitle: "E-Scooter Hill Climb Grade Calculator",
      Viz: EscooterHillClimbViz,
    },
    "rv-solar-calculator": {
      calculatorTitle: "RV Solar & House Battery Calculator",
      Viz: RvSolarCalculatorViz,
    },
    "marine-battery-bank": {
      calculatorTitle: "Marine Trolling Motor Runtime Calculator",
      Viz: MarineBatteryBankViz,
    },
    "portable-power-station-recharge": {
      calculatorTitle: "Portable Power Station Recharge Times",
      Viz: PortablePowerStationRechargeViz,
    },
    "12v-to-120v-inverter": {
      calculatorTitle: "12V to 120V Inverter Load Planner",
      Viz: TwelveVTo120VInverterViz,
    },
    "camping-fridge-runtime": {
      calculatorTitle: "12V Camping Fridge Runtime Calculator",
      Viz: CampingFridgeRuntimeViz,
    },
    "appliance-daily-cost": {
      calculatorTitle: "Appliance Daily Cost",
      Viz: ApplianceDailyCostViz,
    },
    "appliance-monthly-energy": {
      calculatorTitle: "Appliance Monthly Energy",
      Viz: ApplianceMonthlyEnergyViz,
    },
    "energy-consumption": {
      calculatorTitle: "Energy Consumption Calculator",
      Viz: EnergyConsumptionViz,
    },
    "heater-cost": {
      calculatorTitle: "Electric Heater Cost Calculator",
      Viz: HeaterCostViz,
    },
    "pool-energy-thermal-cover": {
      calculatorTitle: "Pool Energy Cost & Thermal Cover Savings Calculator",
      Viz: PoolEnergyThermalCoverViz,
    },
    "heat-loss-insulation": {
      calculatorTitle: "Building Heat Loss & Insulation Calculator",
      Viz: HeatLossInsulationViz,
    },
    "home-insulation-savings": {
      calculatorTitle: "Home Insulation Savings Calculator",
      Viz: HomeInsulationSavingsViz,
    },
    "led-savings-roi": {
      calculatorTitle: "LED Savings & ROI Calculator",
      Viz: LedSavingsRoiViz,
    },
    "led-vs-incandescent-roi": {
      calculatorTitle: "LED vs. Incandescent ROI Calculator",
      Viz: LedVsIncandescentRoiViz,
    },
    "tou-shifting-savings": {
      calculatorTitle: "Time-of-Use Load Shifting Savings",
      Viz: TouShiftingSavingsViz,
    },
    "demand-charge-calculator": {
      calculatorTitle: "Commercial Demand Charge Calculator",
      Viz: DemandChargeCalculatorViz,
    },
    "v2g-financial-return": {
      calculatorTitle: "V2G Grid Buyback Revenue Calculator",
      Viz: V2gFinancialReturnViz,
    },
    "battery-arbitrage-roi": {
      calculatorTitle: "Home Battery Arbitrage ROI Calculator",
      Viz: BatteryArbitrageRoiViz,
    },
    "battery-cost": {
      calculatorTitle: "Battery Cost Estimator",
      Viz: BatteryCostViz,
    },
    "electricity-bill": {
      calculatorTitle: "Electricity Bill Estimator",
      Viz: ElectricityBillViz,
    },
    "ah-to-wh": {
      calculatorTitle: "Ah to Wh Converter",
      Viz: AhToWhViz,
    },
    "wh-to-ah": {
      calculatorTitle: "Wh to Ah Converter",
      Viz: WhToAhViz,
    },
    "kva-to-kw": {
      calculatorTitle: "kVA to kW Converter",
      Viz: KvaToKwViz,
    },
    "conductor-resistance-temperature": {
      calculatorTitle: "Conductor Resistance & Temperature Calculator",
      Viz: ConductorResistanceTemperatureViz,
    },
    "battery-depth-of-discharge": {
      calculatorTitle: "Battery Depth of Discharge Calculator",
      Viz: BatteryDepthOfDischargeViz,
    },
    "battery-efficiency": {
      calculatorTitle: "Battery Efficiency Calculator",
      Viz: BatteryEfficiencyViz,
    },
    "battery-series-parallel": {
      calculatorTitle: "Battery Series & Parallel Calculator",
      Viz: BatterySeriesParallelViz,
    },
    "battery-c-rate": {
      calculatorTitle: "Battery C-Rate Calculator",
      Viz: BatteryCRateViz,
    },
    "volts-to-watts": {
      calculatorTitle: "Volts to Watts Calculator",
      Viz: VoltsToWattsViz,
    },
    "watts-to-volts": {
      calculatorTitle: "Watts to Volts Calculator",
      Viz: WattsToVoltsViz,
    },
    "power-factor": {
      calculatorTitle: "Power Factor Calculator",
      Viz: PowerFactorViz,
    },
    "ac-inrush-current": {
      calculatorTitle: "AC Inrush Current Limit Calculator",
      Viz: AcInrushCurrentViz,
    },
  };

export { hasCalculatorViz, CALCULATOR_VIZ_IDS } from "@/lib/calculator-viz-ids";

export function getCalculatorViz(
  id: CalculatorId
): CalculatorVizConfig | undefined {
  return CALCULATOR_VIZ[id];
}

import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators/types";
import {
  BATTERY_PERCENTAGE_FOOTER_RESOURCES,
  BATTERY_PERCENTAGE_LANDING_SLUGS,
  getBatteryPercentageLanding,
  isBatteryPercentageLandingSlug,
} from "@/lib/calculators/batterypercentageLandings";
import {
  EV_SOC_FOOTER_RESOURCES,
  EV_SOC_LANDING_SLUGS,
  getEvSocLanding,
  isEvSocLandingSlug,
} from "@/lib/calculators/evSocLandings";
import {
  REMAINING_BATTERY_CAPACITY_LANDING_SLUGS,
  getRemainingBatteryCapacityLanding,
  isRemainingBatteryCapacityLandingSlug,
} from "@/lib/calculators/remainingBatteryCapacityLandings";
import {
  ESCOOTER_RANGE_FOOTER_RESOURCES,
  ESCOOTER_RANGE_LANDING_SLUGS,
  getEscooterRangeLanding,
  isEscooterRangeLandingSlug,
} from "@/lib/calculators/escooterRangeLandings";
import {
  ESCOOTER_TIRE_PRESSURE_FOOTER_RESOURCES,
  ESCOOTER_TIRE_PRESSURE_LANDING_SLUGS,
  getEscooterTirePressureLanding,
  isEscooterTirePressureLandingSlug,
} from "@/lib/calculators/escooterTirePressureLandings";
import {
  ESCOOTER_MAX_SPEED_FOOTER_RESOURCES,
  ESCOOTER_MAX_SPEED_LANDING_SLUGS,
  getEscooterMaxSpeedLanding,
  isEscooterMaxSpeedLandingSlug,
} from "@/lib/calculators/escooterMaxSpeedLandings";
import {
  ESCOOTER_HILL_CLIMB_FOOTER_RESOURCES,
  ESCOOTER_HILL_CLIMB_LANDING_SLUGS,
  getEscooterHillClimbLanding,
  isEscooterHillClimbLandingSlug,
} from "@/lib/calculators/escooterHillClimbLandings";
import {
  ESCOOTER_TIRE_WEAR_FOOTER_RESOURCES,
  ESCOOTER_TIRE_WEAR_LANDING_SLUGS,
  getEscooterTireWearLanding,
  isEscooterTireWearLandingSlug,
} from "@/lib/calculators/escooterTireWearLandings";
import {
  ESCOOTER_CHARGE_TIME_FOOTER_RESOURCES,
  ESCOOTER_CHARGE_TIME_LANDING_SLUGS,
  getEscooterChargeTimeLanding,
  isEscooterChargeTimeLandingSlug,
} from "@/lib/calculators/escooterChargeTimeLandings";
import {
  ESCOOTER_COST_PER_KM_FOOTER_RESOURCES,
  ESCOOTER_COST_PER_KM_LANDING_SLUGS,
  getEscooterCostPerKmLanding,
  isEscooterCostPerKmLandingSlug,
} from "@/lib/calculators/escooterCostPerKmLandings";
import {
  ESCOOTER_WEIGHT_LIMIT_FOOTER_RESOURCES,
  ESCOOTER_WEIGHT_LIMIT_LANDING_SLUGS,
  getEscooterWeightLimitLanding,
  isEscooterWeightLimitLandingSlug,
} from "@/lib/calculators/escooterWeightLimitLandings";
import {
  ESCOOTER_PEAK_AMPS_FOOTER_RESOURCES,
  ESCOOTER_PEAK_AMPS_LANDING_SLUGS,
  getEscooterPeakAmpsLanding,
  isEscooterPeakAmpsLandingSlug,
} from "@/lib/calculators/escooterPeakAmpsLandings";
import {
  ESCOOTER_BRAKE_PAD_WEAR_FOOTER_RESOURCES,
  ESCOOTER_BRAKE_PAD_WEAR_LANDING_SLUGS,
  getEscooterBrakePadWearLanding,
  isEscooterBrakePadWearLandingSlug,
} from "@/lib/calculators/escooterBrakePadWearLandings";
import {
  ESCOOTER_CONNECTOR_LOSS_FOOTER_RESOURCES,
  ESCOOTER_CONNECTOR_LOSS_LANDING_SLUGS,
  getEscooterConnectorLossLanding,
  isEscooterConnectorLossLandingSlug,
} from "@/lib/calculators/escooterConnectorLossLandings";
import {
  ESCOOTER_MAINTENANCE_SCHEDULE_FOOTER_RESOURCES,
  ESCOOTER_MAINTENANCE_SCHEDULE_LANDING_SLUGS,
  getEscooterMaintenanceScheduleLanding,
  isEscooterMaintenanceScheduleLandingSlug,
} from "@/lib/calculators/escooterMaintenanceScheduleLandings";
import {
  EV_TRUCK_RANGE_FOOTER_RESOURCES,
  EV_TRUCK_RANGE_LANDING_SLUGS,
  getEvTruckRangeLanding,
  isEvTruckRangeLandingSlug,
} from "@/lib/calculators/evTruckRangeLandings";
import {
  UPS_RUNTIME_FOOTER_RESOURCES,
  UPS_RUNTIME_LANDING_SLUGS,
  getUpsRuntimeLanding,
  isUpsRuntimeLandingSlug,
} from "@/lib/calculators/upsRuntimeLandings";
import {
  BATTERY_BANK_SIZE_FOOTER_RESOURCES,
  BATTERY_BANK_SIZE_LANDING_SLUGS,
  getBatteryBankSizeLanding,
  isBatteryBankSizeLandingSlug,
} from "@/lib/calculators/batteryBankSizeLandings";
import {
  WATTS_TO_AMPS_FOOTER_RESOURCES,
  WATTS_TO_AMPS_LANDING_SLUGS,
  getWattsToAmpsLanding,
  isWattsToAmpsLandingSlug,
} from "@/lib/calculators/wattsToAmpsLandings";
import {
  SOLAR_PANEL_SIZE_FOOTER_RESOURCES,
  SOLAR_PANEL_SIZE_LANDING_SLUGS,
  getSolarPanelSizeLanding,
  isSolarPanelSizeLandingSlug,
} from "@/lib/calculators/solarPanelSizeLandings";
import {
  EV_CHARGING_COST_FOOTER_RESOURCES,
  EV_CHARGING_COST_LANDING_SLUGS,
  getEvChargingCostLanding,
  isEvChargingCostLandingSlug,
} from "@/lib/calculators/evChargingCostLandings";
import {
  WHOLE_HOUSE_ENERGY_BUDGET_FOOTER_RESOURCES,
  WHOLE_HOUSE_ENERGY_BUDGET_LANDING_SLUGS,
  getWholeHouseEnergyBudgetLanding,
  isWholeHouseEnergyBudgetLandingSlug,
} from "@/lib/calculators/wholeHouseEnergyBudgetLandings";
import {
  EBIKE_RANGE_ESTIMATOR_FOOTER_RESOURCES,
  EBIKE_RANGE_ESTIMATOR_LANDING_SLUGS,
  getEbikeRangeEstimatorLanding,
  isEbikeRangeEstimatorLandingSlug,
} from "@/lib/calculators/ebikeRangeLandings";
import {
  RV_SOLAR_CALCULATOR_FOOTER_RESOURCES,
  RV_SOLAR_CALCULATOR_LANDING_SLUGS,
  getRvSolarCalculatorLanding,
  isRvSolarCalculatorLandingSlug,
} from "@/lib/calculators/rvSolarCalculatorLandings";
import {
  APPLIANCE_MONTHLY_ENERGY_FOOTER_RESOURCES,
  APPLIANCE_MONTHLY_ENERGY_LANDING_SLUGS,
  getApplianceMonthlyEnergyLanding,
  isApplianceMonthlyEnergyLandingSlug,
} from "@/lib/calculators/applianceMonthlyEnergyLandings";
import {
  HEAT_LOSS_INSULATION_FOOTER_RESOURCES,
  HEAT_LOSS_INSULATION_LANDING_SLUGS,
  getHeatLossInsulationLanding,
  isHeatLossInsulationLandingSlug,
} from "@/lib/calculators/heatLossInsulationLandings";
import {
  HOME_INSULATION_SAVINGS_FOOTER_RESOURCES,
  HOME_INSULATION_SAVINGS_LANDING_SLUGS,
  getHomeInsulationSavingsLanding,
  isHomeInsulationSavingsLandingSlug,
} from "@/lib/calculators/homeInsulationSavingsLandings";
import {
  LED_SAVINGS_ROI_FOOTER_RESOURCES,
  LED_SAVINGS_ROI_LANDING_SLUGS,
  getLedSavingsRoiLanding,
  isLedSavingsRoiLandingSlug,
} from "@/lib/calculators/ledSavingsRoiLandings";
import {
  POOL_ENERGY_THERMAL_COVER_FOOTER_RESOURCES,
  POOL_ENERGY_THERMAL_COVER_LANDING_SLUGS,
  getPoolEnergyThermalCoverLanding,
  isPoolEnergyThermalCoverLandingSlug,
} from "@/lib/calculators/poolEnergyThermalCoverLandings";
import {
  TOU_SHIFTING_SAVINGS_FOOTER_RESOURCES,
  TOU_SHIFTING_SAVINGS_LANDING_SLUGS,
  getTouShiftingSavingsLanding,
  isTouShiftingSavingsLandingSlug,
} from "@/lib/calculators/touShiftingSavingsLandings";
import {
  DEMAND_CHARGE_CALCULATOR_FOOTER_RESOURCES,
  DEMAND_CHARGE_CALCULATOR_LANDING_SLUGS,
  getDemandChargeCalculatorLanding,
  isDemandChargeCalculatorLandingSlug,
} from "@/lib/calculators/demandChargeCalculatorLandings";
import {
  BATTERY_COST_FOOTER_RESOURCES,
  BATTERY_COST_LANDING_SLUGS,
  getBatteryCostLanding,
  isBatteryCostLandingSlug,
} from "@/lib/calculators/batteryCostLandings";
import {
  ELECTRICITY_BILL_FOOTER_RESOURCES,
  ELECTRICITY_BILL_LANDING_SLUGS,
  getElectricityBillLanding,
  isElectricityBillLandingSlug,
} from "@/lib/calculators/electricityBillLandings";
import {
  AH_TO_WH_FOOTER_RESOURCES,
  AH_TO_WH_LANDING_SLUGS,
  getAhToWhLanding,
  isAhToWhLandingSlug,
} from "@/lib/calculators/ahToWhLandings";
import {
  WH_TO_AH_FOOTER_RESOURCES,
  WH_TO_AH_LANDING_SLUGS,
  getWhToAhLanding,
  isWhToAhLandingSlug,
} from "@/lib/calculators/whToAhLandings";
import {
  KVA_TO_KW_FOOTER_RESOURCES,
  KVA_TO_KW_LANDING_SLUGS,
  getKvaToKwLanding,
  isKvaToKwLandingSlug,
} from "@/lib/calculators/kvaToKwLandings";
import {
  KW_TO_HP_FOOTER_RESOURCES,
  KW_TO_HP_LANDING_SLUGS,
  getKwToHpLanding,
  isKwToHpLandingSlug,
} from "@/lib/calculators/kwToHpLandings";
import {
  CONDUCTOR_RESISTANCE_TEMPERATURE_FOOTER_RESOURCES,
  CONDUCTOR_RESISTANCE_TEMPERATURE_LANDING_SLUGS,
  getConductorResistanceTemperatureLanding,
  isConductorResistanceTemperatureLandingSlug,
} from "@/lib/calculators/conductorResistanceTemperatureLandings";
import {
  REACTIVE_POWER_CALCULATOR_FOOTER_RESOURCES,
  REACTIVE_POWER_CALCULATOR_LANDING_SLUGS,
  getReactivePowerCalculatorLanding,
  isReactivePowerCalculatorLandingSlug,
} from "@/lib/calculators/reactivePowerCalculatorLandings";
import {
  BATTERY_DOD_ENERGY_YIELD_FOOTER_RESOURCES,
  BATTERY_DOD_ENERGY_YIELD_LANDING_SLUGS,
  getBatteryDodEnergyYieldLanding,
  isBatteryDodEnergyYieldLandingSlug,
} from "@/lib/calculators/batteryDodEnergyYieldLandings";
import {
  BATTERY_RUNTIME_FOOTER_RESOURCES,
  BATTERY_RUNTIME_LANDING_SLUGS,
  getBatteryRuntimeLanding,
  isBatteryRuntimeLandingSlug,
} from "@/lib/calculators/batteryRuntimeLandings";
import {
  BATTERY_CHARGING_TIME_FOOTER_RESOURCES,
  BATTERY_CHARGING_TIME_LANDING_SLUGS,
  getBatteryChargingTimeLanding,
  isBatteryChargingTimeLandingSlug,
} from "@/lib/calculators/batteryChargingTimeLandings";
import {
  BATTERY_ENERGY_FOOTER_RESOURCES,
  BATTERY_ENERGY_LANDING_SLUGS,
  getBatteryEnergyLanding,
  isBatteryEnergyLandingSlug,
} from "@/lib/calculators/batteryEnergyLandings";
import {
  BATTERY_DEPTH_OF_DISCHARGE_FOOTER_RESOURCES,
  BATTERY_DEPTH_OF_DISCHARGE_LANDING_SLUGS,
  getBatteryDepthOfDischargeLanding,
  isBatteryDepthOfDischargeLandingSlug,
} from "@/lib/calculators/batteryDepthOfDischargeLandings";
import {
  BATTERY_EFFICIENCY_FOOTER_RESOURCES,
  BATTERY_EFFICIENCY_LANDING_SLUGS,
  getBatteryEfficiencyLanding,
  isBatteryEfficiencyLandingSlug,
} from "@/lib/calculators/batteryEfficiencyLandings";
import {
  BATTERY_SERIES_PARALLEL_FOOTER_RESOURCES,
  BATTERY_SERIES_PARALLEL_LANDING_SLUGS,
  getBatterySeriesParallelLanding,
  isBatterySeriesParallelLandingSlug,
} from "@/lib/calculators/batterySeriesParallelLandings";
import {
  INVERTER_SIZING_FOOTER_RESOURCES,
  INVERTER_SIZING_LANDING_SLUGS,
  getInverterSizingLanding,
  isInverterSizingLandingSlug,
} from "@/lib/calculators/inverterSizingLandings";
import {
  DC_CABLE_SIZE_FOOTER_RESOURCES,
  DC_CABLE_SIZE_LANDING_SLUGS,
  getDcCableSizeLanding,
  isDcCableSizeLandingSlug,
} from "@/lib/calculators/dcCableSizeLandings";
import type { GuideLandingDefinition } from "@/lib/calculators/landing-types";

/** Every slug with a guide page (any route prefix). */
export const GUIDE_LANDING_SLUGS = [
  ...BATTERY_PERCENTAGE_LANDING_SLUGS,
  ...EV_SOC_LANDING_SLUGS,
  ...REMAINING_BATTERY_CAPACITY_LANDING_SLUGS,
  ...ESCOOTER_RANGE_LANDING_SLUGS,
  ...ESCOOTER_TIRE_PRESSURE_LANDING_SLUGS,
  ...ESCOOTER_MAX_SPEED_LANDING_SLUGS,
  ...ESCOOTER_HILL_CLIMB_LANDING_SLUGS,
  ...ESCOOTER_TIRE_WEAR_LANDING_SLUGS,
  ...ESCOOTER_CHARGE_TIME_LANDING_SLUGS,
  ...ESCOOTER_COST_PER_KM_LANDING_SLUGS,
  ...ESCOOTER_WEIGHT_LIMIT_LANDING_SLUGS,
  ...ESCOOTER_PEAK_AMPS_LANDING_SLUGS,
  ...ESCOOTER_BRAKE_PAD_WEAR_LANDING_SLUGS,
  ...ESCOOTER_CONNECTOR_LOSS_LANDING_SLUGS,
  ...ESCOOTER_MAINTENANCE_SCHEDULE_LANDING_SLUGS,
  ...EV_TRUCK_RANGE_LANDING_SLUGS,
  ...UPS_RUNTIME_LANDING_SLUGS,
  ...BATTERY_BANK_SIZE_LANDING_SLUGS,
  ...WATTS_TO_AMPS_LANDING_SLUGS,
  ...SOLAR_PANEL_SIZE_LANDING_SLUGS,
  ...EV_CHARGING_COST_LANDING_SLUGS,
  ...WHOLE_HOUSE_ENERGY_BUDGET_LANDING_SLUGS,
  ...EBIKE_RANGE_ESTIMATOR_LANDING_SLUGS,
  ...RV_SOLAR_CALCULATOR_LANDING_SLUGS,
  ...APPLIANCE_MONTHLY_ENERGY_LANDING_SLUGS,
  ...HEAT_LOSS_INSULATION_LANDING_SLUGS,
  ...HOME_INSULATION_SAVINGS_LANDING_SLUGS,
  ...LED_SAVINGS_ROI_LANDING_SLUGS,
  ...POOL_ENERGY_THERMAL_COVER_LANDING_SLUGS,
  ...TOU_SHIFTING_SAVINGS_LANDING_SLUGS,
  ...DEMAND_CHARGE_CALCULATOR_LANDING_SLUGS,
  ...BATTERY_COST_LANDING_SLUGS,
  ...ELECTRICITY_BILL_LANDING_SLUGS,
  ...AH_TO_WH_LANDING_SLUGS,
  ...WH_TO_AH_LANDING_SLUGS,
  ...KVA_TO_KW_LANDING_SLUGS,
  ...KW_TO_HP_LANDING_SLUGS,
  ...CONDUCTOR_RESISTANCE_TEMPERATURE_LANDING_SLUGS,
  ...REACTIVE_POWER_CALCULATOR_LANDING_SLUGS,
  ...BATTERY_DOD_ENERGY_YIELD_LANDING_SLUGS,
  ...BATTERY_RUNTIME_LANDING_SLUGS,
  ...BATTERY_CHARGING_TIME_LANDING_SLUGS,
  ...BATTERY_ENERGY_LANDING_SLUGS,
  ...BATTERY_DEPTH_OF_DISCHARGE_LANDING_SLUGS,
  ...BATTERY_EFFICIENCY_LANDING_SLUGS,
  ...BATTERY_SERIES_PARALLEL_LANDING_SLUGS,
  ...INVERTER_SIZING_LANDING_SLUGS,
  ...DC_CABLE_SIZE_LANDING_SLUGS,
] as const;

export type GuideLandingSlug = (typeof GUIDE_LANDING_SLUGS)[number];

/** Slugs with a dedicated calculator-only route at /tools/calculators/{slug}/ */
export const CALCULATOR_TOOL_SLUGS = [...BATTERY_PERCENTAGE_LANDING_SLUGS] as const;

export type CalculatorToolSlug = (typeof CALCULATOR_TOOL_SLUGS)[number];

export const ALL_GUIDE_LANDING_FOOTER_RESOURCES = [
  ...BATTERY_PERCENTAGE_FOOTER_RESOURCES,
  ...EV_SOC_FOOTER_RESOURCES,
  ...ESCOOTER_RANGE_FOOTER_RESOURCES,
  ...ESCOOTER_TIRE_PRESSURE_FOOTER_RESOURCES,
  ...ESCOOTER_MAX_SPEED_FOOTER_RESOURCES,
  ...ESCOOTER_HILL_CLIMB_FOOTER_RESOURCES,
  ...ESCOOTER_TIRE_WEAR_FOOTER_RESOURCES,
  ...ESCOOTER_CHARGE_TIME_FOOTER_RESOURCES,
  ...ESCOOTER_COST_PER_KM_FOOTER_RESOURCES,
  ...ESCOOTER_WEIGHT_LIMIT_FOOTER_RESOURCES,
  ...ESCOOTER_PEAK_AMPS_FOOTER_RESOURCES,
  ...ESCOOTER_BRAKE_PAD_WEAR_FOOTER_RESOURCES,
  ...ESCOOTER_CONNECTOR_LOSS_FOOTER_RESOURCES,
  ...ESCOOTER_MAINTENANCE_SCHEDULE_FOOTER_RESOURCES,
  ...EV_TRUCK_RANGE_FOOTER_RESOURCES,
  ...UPS_RUNTIME_FOOTER_RESOURCES,
  ...BATTERY_BANK_SIZE_FOOTER_RESOURCES,
  ...WATTS_TO_AMPS_FOOTER_RESOURCES,
  ...SOLAR_PANEL_SIZE_FOOTER_RESOURCES,
  ...EV_CHARGING_COST_FOOTER_RESOURCES,
  ...WHOLE_HOUSE_ENERGY_BUDGET_FOOTER_RESOURCES,
  ...EBIKE_RANGE_ESTIMATOR_FOOTER_RESOURCES,
  ...RV_SOLAR_CALCULATOR_FOOTER_RESOURCES,
  ...APPLIANCE_MONTHLY_ENERGY_FOOTER_RESOURCES,
  ...HEAT_LOSS_INSULATION_FOOTER_RESOURCES,
  ...HOME_INSULATION_SAVINGS_FOOTER_RESOURCES,
  ...LED_SAVINGS_ROI_FOOTER_RESOURCES,
  ...POOL_ENERGY_THERMAL_COVER_FOOTER_RESOURCES,
  ...TOU_SHIFTING_SAVINGS_FOOTER_RESOURCES,
  ...DEMAND_CHARGE_CALCULATOR_FOOTER_RESOURCES,
  ...BATTERY_COST_FOOTER_RESOURCES,
  ...ELECTRICITY_BILL_FOOTER_RESOURCES,
  ...AH_TO_WH_FOOTER_RESOURCES,
  ...WH_TO_AH_FOOTER_RESOURCES,
  ...KVA_TO_KW_FOOTER_RESOURCES,
  ...KW_TO_HP_FOOTER_RESOURCES,
  ...CONDUCTOR_RESISTANCE_TEMPERATURE_FOOTER_RESOURCES,
  ...REACTIVE_POWER_CALCULATOR_FOOTER_RESOURCES,
  ...BATTERY_DOD_ENERGY_YIELD_FOOTER_RESOURCES,
  ...BATTERY_RUNTIME_FOOTER_RESOURCES,
  ...BATTERY_CHARGING_TIME_FOOTER_RESOURCES,
  ...BATTERY_ENERGY_FOOTER_RESOURCES,
  ...BATTERY_DEPTH_OF_DISCHARGE_FOOTER_RESOURCES,
  ...BATTERY_EFFICIENCY_FOOTER_RESOURCES,
  ...BATTERY_SERIES_PARALLEL_FOOTER_RESOURCES,
  ...INVERTER_SIZING_FOOTER_RESOURCES,
  ...DC_CABLE_SIZE_FOOTER_RESOURCES,
] as const;

/** Shortcut slug at /tools/calculators/{slug}/ → calculator id. */
export const CALCULATOR_TOOL_SLUG_TO_ID: Record<
  CalculatorToolSlug,
  CalculatorId
> = {
  "battery-percentage": "battery-percentage",
};

/**
 * In-tool guide link per calculator (may cross-promote a related guide).
 * EV SoC guide is surfaced only from the battery-percentage tool.
 */
export const CALCULATOR_TOOL_GUIDE_SLUG: Partial<
  Record<CalculatorId, GuideLandingSlug>
> = {
  "battery-percentage": "ev-soc-calculator",
};

/** @deprecated Use CALCULATOR_TOOL_GUIDE_SLUG */
export const CALCULATOR_ID_TO_GUIDE_SLUG = CALCULATOR_TOOL_GUIDE_SLUG;

export function isGuideLandingSlug(slug: string): slug is GuideLandingSlug {
  return (GUIDE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function isCalculatorToolSlug(slug: string): slug is CalculatorToolSlug {
  return (CALCULATOR_TOOL_SLUGS as readonly string[]).includes(slug);
}

export function getGuideLanding(slug: GuideLandingSlug): GuideLandingDefinition {
  if (isBatteryPercentageLandingSlug(slug)) {
    return getBatteryPercentageLanding(slug);
  }
  if (isEvSocLandingSlug(slug)) {
    return getEvSocLanding(slug);
  }
  if (isRemainingBatteryCapacityLandingSlug(slug)) {
    return getRemainingBatteryCapacityLanding(slug);
  }
  if (isEscooterRangeLandingSlug(slug)) {
    return getEscooterRangeLanding(slug);
  }
  if (isEscooterTirePressureLandingSlug(slug)) {
    return getEscooterTirePressureLanding(slug);
  }
  if (isEscooterMaxSpeedLandingSlug(slug)) {
    return getEscooterMaxSpeedLanding(slug);
  }
  if (isEscooterHillClimbLandingSlug(slug)) {
    return getEscooterHillClimbLanding(slug);
  }
  if (isEscooterTireWearLandingSlug(slug)) {
    return getEscooterTireWearLanding(slug);
  }
  if (isEscooterChargeTimeLandingSlug(slug)) {
    return getEscooterChargeTimeLanding(slug);
  }
  if (isEscooterCostPerKmLandingSlug(slug)) {
    return getEscooterCostPerKmLanding(slug);
  }
  if (isEscooterWeightLimitLandingSlug(slug)) {
    return getEscooterWeightLimitLanding(slug);
  }
  if (isEscooterPeakAmpsLandingSlug(slug)) {
    return getEscooterPeakAmpsLanding(slug);
  }
  if (isEscooterBrakePadWearLandingSlug(slug)) {
    return getEscooterBrakePadWearLanding(slug);
  }
  if (isEscooterConnectorLossLandingSlug(slug)) {
    return getEscooterConnectorLossLanding(slug);
  }
  if (isEscooterMaintenanceScheduleLandingSlug(slug)) {
    return getEscooterMaintenanceScheduleLanding(slug);
  }
  if (isEvTruckRangeLandingSlug(slug)) {
    return getEvTruckRangeLanding(slug);
  }
  if (isUpsRuntimeLandingSlug(slug)) {
    return getUpsRuntimeLanding(slug);
  }
  if (isBatteryBankSizeLandingSlug(slug)) {
    return getBatteryBankSizeLanding(slug);
  }
  if (isWattsToAmpsLandingSlug(slug)) {
    return getWattsToAmpsLanding(slug);
  }
  if (isSolarPanelSizeLandingSlug(slug)) {
    return getSolarPanelSizeLanding(slug);
  }
  if (isEvChargingCostLandingSlug(slug)) {
    return getEvChargingCostLanding(slug);
  }
  if (isWholeHouseEnergyBudgetLandingSlug(slug)) {
    return getWholeHouseEnergyBudgetLanding(slug);
  }
  if (isEbikeRangeEstimatorLandingSlug(slug)) {
    return getEbikeRangeEstimatorLanding(slug);
  }
  if (isRvSolarCalculatorLandingSlug(slug)) {
    return getRvSolarCalculatorLanding(slug);
  }
  if (isApplianceMonthlyEnergyLandingSlug(slug)) {
    return getApplianceMonthlyEnergyLanding(slug);
  }
  if (isHeatLossInsulationLandingSlug(slug)) {
    return getHeatLossInsulationLanding(slug);
  }
  if (isHomeInsulationSavingsLandingSlug(slug)) {
    return getHomeInsulationSavingsLanding(slug);
  }
  if (isLedSavingsRoiLandingSlug(slug)) {
    return getLedSavingsRoiLanding(slug);
  }
  if (isPoolEnergyThermalCoverLandingSlug(slug)) {
    return getPoolEnergyThermalCoverLanding(slug);
  }
  if (isTouShiftingSavingsLandingSlug(slug)) {
    return getTouShiftingSavingsLanding(slug);
  }
  if (isDemandChargeCalculatorLandingSlug(slug)) {
    return getDemandChargeCalculatorLanding(slug);
  }
  if (isBatteryCostLandingSlug(slug)) {
    return getBatteryCostLanding(slug);
  }
  if (isElectricityBillLandingSlug(slug)) {
    return getElectricityBillLanding(slug);
  }
  if (isAhToWhLandingSlug(slug)) {
    return getAhToWhLanding(slug);
  }
  if (isWhToAhLandingSlug(slug)) {
    return getWhToAhLanding(slug);
  }
  if (isKvaToKwLandingSlug(slug)) {
    return getKvaToKwLanding(slug);
  }
  if (isKwToHpLandingSlug(slug)) {
    return getKwToHpLanding(slug);
  }
  if (isConductorResistanceTemperatureLandingSlug(slug)) {
    return getConductorResistanceTemperatureLanding(slug);
  }
  if (isReactivePowerCalculatorLandingSlug(slug)) {
    return getReactivePowerCalculatorLanding(slug);
  }
  if (isBatteryDodEnergyYieldLandingSlug(slug)) {
    return getBatteryDodEnergyYieldLanding(slug);
  }
  if (isBatteryRuntimeLandingSlug(slug)) {
    return getBatteryRuntimeLanding(slug);
  }
  if (isBatteryChargingTimeLandingSlug(slug)) {
    return getBatteryChargingTimeLanding(slug);
  }
  if (isBatteryEnergyLandingSlug(slug)) {
    return getBatteryEnergyLanding(slug);
  }
  if (isBatteryDepthOfDischargeLandingSlug(slug)) {
    return getBatteryDepthOfDischargeLanding(slug);
  }
  if (isBatteryEfficiencyLandingSlug(slug)) {
    return getBatteryEfficiencyLanding(slug);
  }
  if (isBatterySeriesParallelLandingSlug(slug)) {
    return getBatterySeriesParallelLanding(slug);
  }
  if (isInverterSizingLandingSlug(slug)) {
    return getInverterSizingLanding(slug);
  }
  if (isDcCableSizeLandingSlug(slug)) {
    return getDcCableSizeLanding(slug);
  }
  throw new Error(`Unknown guide landing slug: ${slug}`);
}

export function getAllGuideLandings(): GuideLandingDefinition[] {
  return GUIDE_LANDING_SLUGS.map((slug) => getGuideLanding(slug));
}

export function getGuideLandingsByCategory(
  category: CalculatorCategory
): GuideLandingDefinition[] {
  return getAllGuideLandings().filter(
    (landing) => landing.calculatorCategory === category
  );
}

export function getGuidePathForCalculator(
  calculatorId: CalculatorId
): string | undefined {
  const slug = CALCULATOR_TOOL_GUIDE_SLUG[calculatorId];
  if (!slug) return undefined;
  return getGuideLanding(slug).href;
}

export function getGuideLinkLabelForCalculator(
  calculatorId: CalculatorId
): string | undefined {
  const slug = CALCULATOR_TOOL_GUIDE_SLUG[calculatorId];
  if (!slug) return undefined;
  return getGuideLanding(slug).guideLinkLabel;
}

export function getCalculatorIdForToolSlug(
  slug: CalculatorToolSlug
): CalculatorId | undefined {
  return CALCULATOR_TOOL_SLUG_TO_ID[slug];
}

/** All slugs served under /tools/calculators/{slug}/ (calculator UI shortcuts only). */
export const TOOLS_CALCULATORS_SLUGS = [...CALCULATOR_TOOL_SLUGS] as const;

export type ToolsCalculatorsSlug = (typeof TOOLS_CALCULATORS_SLUGS)[number];

export function isToolsCalculatorsSlug(
  slug: string
): slug is ToolsCalculatorsSlug {
  return (TOOLS_CALCULATORS_SLUGS as readonly string[]).includes(slug);
}

/** @deprecated Use GUIDE_LANDING_SLUGS */
export const CALCULATOR_LANDING_SLUGS = GUIDE_LANDING_SLUGS;

/** @deprecated Use GuideLandingSlug */
export type CalculatorLandingSlug = GuideLandingSlug;

/** @deprecated Use isGuideLandingSlug */
export const isCalculatorLandingSlug = isGuideLandingSlug;

/** @deprecated Use getGuideLanding */
export const getCalculatorLanding = getGuideLanding;

/** @deprecated Use getAllGuideLandings */
export const getAllCalculatorLandings = getAllGuideLandings;

/** @deprecated Use getGuidePathForCalculator */
export const getCalculatorLandingPathForCalculator = getGuidePathForCalculator;

/** @deprecated Use ALL_GUIDE_LANDING_FOOTER_RESOURCES */
export const ALL_CALCULATOR_LANDING_FOOTER_RESOURCES =
  ALL_GUIDE_LANDING_FOOTER_RESOURCES;

/** @deprecated Use CALCULATOR_ID_TO_GUIDE_SLUG */
export const CALCULATOR_ID_TO_LANDING_SLUG = CALCULATOR_ID_TO_GUIDE_SLUG;

/** @deprecated Use getGuidePathForCalculator */
export function getCalculatorLandingPath(slug: GuideLandingSlug): string {
  return getGuideLanding(slug).href;
}

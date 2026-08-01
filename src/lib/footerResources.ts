import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import { getCategoryPageHref } from "@/lib/category-routes";
import {
  ESCOOTER_RANGE_TOOL_PATH,
  getEscooterRangeToolFooterLinks,
} from "@/lib/calculators/escooterRangeLandings";
import {
  ESCOOTER_TIRE_PRESSURE_TOOL_PATH,
  getEscooterTirePressureToolFooterLinks,
} from "@/lib/calculators/escooterTirePressureLandings";
import {
  ESCOOTER_MAX_SPEED_TOOL_PATH,
  getEscooterMaxSpeedToolFooterLinks,
} from "@/lib/calculators/escooterMaxSpeedLandings";
import {
  ESCOOTER_HILL_CLIMB_TOOL_PATH,
  getEscooterHillClimbToolFooterLinks,
} from "@/lib/calculators/escooterHillClimbLandings";
import {
  ESCOOTER_TIRE_WEAR_TOOL_PATH,
  getEscooterTireWearToolFooterLinks,
} from "@/lib/calculators/escooterTireWearLandings";
import {
  ESCOOTER_CHARGE_TIME_TOOL_PATH,
  getEscooterChargeTimeToolFooterLinks,
} from "@/lib/calculators/escooterChargeTimeLandings";
import {
  ESCOOTER_COST_PER_KM_TOOL_PATH,
  getEscooterCostPerKmToolFooterLinks,
} from "@/lib/calculators/escooterCostPerKmLandings";
import {
  ESCOOTER_WEIGHT_LIMIT_TOOL_PATH,
  getEscooterWeightLimitToolFooterLinks,
} from "@/lib/calculators/escooterWeightLimitLandings";
import {
  ESCOOTER_PEAK_AMPS_TOOL_PATH,
  getEscooterPeakAmpsToolFooterLinks,
} from "@/lib/calculators/escooterPeakAmpsLandings";
import {
  ESCOOTER_BRAKE_PAD_WEAR_TOOL_PATH,
  getEscooterBrakePadWearToolFooterLinks,
} from "@/lib/calculators/escooterBrakePadWearLandings";
import {
  ESCOOTER_CONNECTOR_LOSS_TOOL_PATH,
  getEscooterConnectorLossToolFooterLinks,
} from "@/lib/calculators/escooterConnectorLossLandings";
import {
  ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_PATH,
  getEscooterMaintenanceScheduleToolFooterLinks,
} from "@/lib/calculators/escooterMaintenanceScheduleLandings";
import {
  EV_TRUCK_RANGE_TOOL_PATH,
  getEvTruckRangeToolFooterLinks,
} from "@/lib/calculators/evTruckRangeLandings";
import {
  UPS_RUNTIME_TOOL_PATH,
  getUpsRuntimeToolFooterLinks,
} from "@/lib/calculators/upsRuntimeLandings";
import {
  BATTERY_BANK_SIZE_TOOL_PATH,
  getBatteryBankSizeToolFooterLinks,
} from "@/lib/calculators/batteryBankSizeLandings";
import {
  WATTS_TO_AMPS_TOOL_PATH,
  getWattsToAmpsToolFooterLinks,
} from "@/lib/calculators/wattsToAmpsLandings";
import {
  SOLAR_PANEL_SIZE_TOOL_PATH,
  getSolarPanelSizeToolFooterLinks,
} from "@/lib/calculators/solarPanelSizeLandings";
import {
  EV_CHARGING_COST_TOOL_PATH,
  getEvChargingCostToolFooterLinks,
} from "@/lib/calculators/evChargingCostLandings";
import {
  WHOLE_HOUSE_ENERGY_BUDGET_TOOL_PATH,
  getWholeHouseEnergyBudgetToolFooterLinks,
} from "@/lib/calculators/wholeHouseEnergyBudgetLandings";
import {
  EBIKE_RANGE_ESTIMATOR_TOOL_PATH,
  getEbikeRangeEstimatorToolFooterLinks,
} from "@/lib/calculators/ebikeRangeLandings";
import {
  RV_SOLAR_CALCULATOR_TOOL_PATH,
  getRvSolarCalculatorToolFooterLinks,
} from "@/lib/calculators/rvSolarCalculatorLandings";
import {
  APPLIANCE_MONTHLY_ENERGY_TOOL_PATH,
  getApplianceMonthlyEnergyToolFooterLinks,
} from "@/lib/calculators/applianceMonthlyEnergyLandings";
import {
  HEAT_LOSS_INSULATION_TOOL_PATH,
  getHeatLossInsulationToolFooterLinks,
} from "@/lib/calculators/heatLossInsulationLandings";
import {
  HOME_INSULATION_SAVINGS_TOOL_PATH,
  getHomeInsulationSavingsToolFooterLinks,
} from "@/lib/calculators/homeInsulationSavingsLandings";
import {
  LED_SAVINGS_ROI_TOOL_PATH,
  getLedSavingsRoiToolFooterLinks,
} from "@/lib/calculators/ledSavingsRoiLandings";
import {
  POOL_ENERGY_THERMAL_COVER_TOOL_PATH,
  getPoolEnergyThermalCoverToolFooterLinks,
} from "@/lib/calculators/poolEnergyThermalCoverLandings";
import {
  TOU_SHIFTING_SAVINGS_TOOL_PATH,
  getTouShiftingSavingsToolFooterLinks,
} from "@/lib/calculators/touShiftingSavingsLandings";
import {
  DEMAND_CHARGE_CALCULATOR_TOOL_PATH,
  getDemandChargeCalculatorToolFooterLinks,
} from "@/lib/calculators/demandChargeCalculatorLandings";
import {
  BATTERY_COST_TOOL_PATH,
  getBatteryCostToolFooterLinks,
} from "@/lib/calculators/batteryCostLandings";
import {
  ELECTRICITY_BILL_TOOL_PATH,
  getElectricityBillToolFooterLinks,
} from "@/lib/calculators/electricityBillLandings";
import {
  AH_TO_WH_TOOL_PATH,
  getAhToWhToolFooterLinks,
} from "@/lib/calculators/ahToWhLandings";
import {
  WH_TO_AH_TOOL_PATH,
  getWhToAhToolFooterLinks,
} from "@/lib/calculators/whToAhLandings";
import {
  KVA_TO_KW_TOOL_PATH,
  getKvaToKwToolFooterLinks,
} from "@/lib/calculators/kvaToKwLandings";
import {
  KW_TO_HP_TOOL_PATH,
  getKwToHpToolFooterLinks,
} from "@/lib/calculators/kwToHpLandings";
import {
  CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_PATH,
  getConductorResistanceTemperatureToolFooterLinks,
} from "@/lib/calculators/conductorResistanceTemperatureLandings";
import {
  REACTIVE_POWER_CALCULATOR_TOOL_PATH,
  getReactivePowerCalculatorToolFooterLinks,
} from "@/lib/calculators/reactivePowerCalculatorLandings";
import {
  BATTERY_DOD_ENERGY_YIELD_TOOL_PATH,
  getBatteryDodEnergyYieldToolFooterLinks,
} from "@/lib/calculators/batteryDodEnergyYieldLandings";
import {
  BATTERY_RUNTIME_TOOL_PATH,
  getBatteryRuntimeToolFooterLinks,
} from "@/lib/calculators/batteryRuntimeLandings";
import {
  BATTERY_CHARGING_TIME_TOOL_PATH,
  getBatteryChargingTimeToolFooterLinks,
} from "@/lib/calculators/batteryChargingTimeLandings";
import {
  BATTERY_ENERGY_TOOL_PATH,
  getBatteryEnergyToolFooterLinks,
} from "@/lib/calculators/batteryEnergyLandings";
import {
  BATTERY_DEPTH_OF_DISCHARGE_TOOL_PATH,
  getBatteryDepthOfDischargeToolFooterLinks,
} from "@/lib/calculators/batteryDepthOfDischargeLandings";
import {
  BATTERY_EFFICIENCY_TOOL_PATH,
  getBatteryEfficiencyToolFooterLinks,
} from "@/lib/calculators/batteryEfficiencyLandings";
import {
  BATTERY_SERIES_PARALLEL_TOOL_PATH,
  getBatterySeriesParallelToolFooterLinks,
} from "@/lib/calculators/batterySeriesParallelLandings";
import {
  INVERTER_SIZING_TOOL_PATH,
  getInverterSizingToolFooterLinks,
} from "@/lib/calculators/inverterSizingLandings";
import {
  DC_CABLE_SIZE_TOOL_PATH,
  getDcCableSizeToolFooterLinks,
} from "@/lib/calculators/dcCableSizeLandings";
import { FOOTER_FEATURED_CATEGORIES } from "@/lib/site";

export const TOOL_FOOTER_RESOURCE_CATEGORY = {
  product: "product",
  company: "company",
  legal: "legal",
  resources: "resources",
  categories: "categories",
} as const;

export type ToolFooterResourceCategory =
  (typeof TOOL_FOOTER_RESOURCE_CATEGORY)[keyof typeof TOOL_FOOTER_RESOURCE_CATEGORY];

export type FooterResourceFilterCategory =
  | ToolFooterResourceCategory
  | CalculatorCategory
  | "all";

export interface FooterResourceLink {
  href: string;
  label: string;
  category: FooterResourceFilterCategory;
}

export interface ToolFooterLink {
  label: string;
  href: string;
}

/**
 * Static, path-scoped Resources column links. Keys are normalized tool paths
 * (trailing slash). No registry lookups or calculator-id inference.
 */
export const toolFooterLinks: Record<string, readonly ToolFooterLink[]> = {
  "/tools/battery-calculators/battery-percentage/": [
    {
      label: "Battery Percentage Calculator",
      href: "/landing/battery-percentage/",
    },
    {
      label: "EV SoC Guide",
      href: "/landing/ev-soc-calculator/",
    },
    {
      label: "Remaining Battery Capacity Percentage",
      href: "/landing/remaining-battery-capacity-percentage/",
    },
  ],
  [ESCOOTER_RANGE_TOOL_PATH]: getEscooterRangeToolFooterLinks(),
  [ESCOOTER_TIRE_PRESSURE_TOOL_PATH]: getEscooterTirePressureToolFooterLinks(),
  [ESCOOTER_MAX_SPEED_TOOL_PATH]: getEscooterMaxSpeedToolFooterLinks(),
  [ESCOOTER_HILL_CLIMB_TOOL_PATH]: getEscooterHillClimbToolFooterLinks(),
  [ESCOOTER_TIRE_WEAR_TOOL_PATH]: getEscooterTireWearToolFooterLinks(),
  [ESCOOTER_CHARGE_TIME_TOOL_PATH]: getEscooterChargeTimeToolFooterLinks(),
  [ESCOOTER_COST_PER_KM_TOOL_PATH]: getEscooterCostPerKmToolFooterLinks(),
  [ESCOOTER_WEIGHT_LIMIT_TOOL_PATH]: getEscooterWeightLimitToolFooterLinks(),
  [ESCOOTER_PEAK_AMPS_TOOL_PATH]: getEscooterPeakAmpsToolFooterLinks(),
  [ESCOOTER_BRAKE_PAD_WEAR_TOOL_PATH]: getEscooterBrakePadWearToolFooterLinks(),
  [ESCOOTER_CONNECTOR_LOSS_TOOL_PATH]: getEscooterConnectorLossToolFooterLinks(),
  [ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_PATH]:
    getEscooterMaintenanceScheduleToolFooterLinks(),
  [EV_TRUCK_RANGE_TOOL_PATH]: getEvTruckRangeToolFooterLinks(),
  [UPS_RUNTIME_TOOL_PATH]: getUpsRuntimeToolFooterLinks(),
  [BATTERY_BANK_SIZE_TOOL_PATH]: getBatteryBankSizeToolFooterLinks(),
  [WATTS_TO_AMPS_TOOL_PATH]: getWattsToAmpsToolFooterLinks(),
  [SOLAR_PANEL_SIZE_TOOL_PATH]: getSolarPanelSizeToolFooterLinks(),
  [EV_CHARGING_COST_TOOL_PATH]: getEvChargingCostToolFooterLinks(),
  [WHOLE_HOUSE_ENERGY_BUDGET_TOOL_PATH]: getWholeHouseEnergyBudgetToolFooterLinks(),
  [EBIKE_RANGE_ESTIMATOR_TOOL_PATH]: getEbikeRangeEstimatorToolFooterLinks(),
  [RV_SOLAR_CALCULATOR_TOOL_PATH]: getRvSolarCalculatorToolFooterLinks(),
  [APPLIANCE_MONTHLY_ENERGY_TOOL_PATH]: getApplianceMonthlyEnergyToolFooterLinks(),
  [HEAT_LOSS_INSULATION_TOOL_PATH]: getHeatLossInsulationToolFooterLinks(),
  [HOME_INSULATION_SAVINGS_TOOL_PATH]: getHomeInsulationSavingsToolFooterLinks(),
  [LED_SAVINGS_ROI_TOOL_PATH]: getLedSavingsRoiToolFooterLinks(),
  [POOL_ENERGY_THERMAL_COVER_TOOL_PATH]: getPoolEnergyThermalCoverToolFooterLinks(),
  [TOU_SHIFTING_SAVINGS_TOOL_PATH]: getTouShiftingSavingsToolFooterLinks(),
  [DEMAND_CHARGE_CALCULATOR_TOOL_PATH]: getDemandChargeCalculatorToolFooterLinks(),
  [BATTERY_COST_TOOL_PATH]: getBatteryCostToolFooterLinks(),
  [ELECTRICITY_BILL_TOOL_PATH]: getElectricityBillToolFooterLinks(),
  [AH_TO_WH_TOOL_PATH]: getAhToWhToolFooterLinks(),
  [WH_TO_AH_TOOL_PATH]: getWhToAhToolFooterLinks(),
  [KVA_TO_KW_TOOL_PATH]: getKvaToKwToolFooterLinks(),
  [KW_TO_HP_TOOL_PATH]: getKwToHpToolFooterLinks(),
  [CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_PATH]:
    getConductorResistanceTemperatureToolFooterLinks(),
  [REACTIVE_POWER_CALCULATOR_TOOL_PATH]:
    getReactivePowerCalculatorToolFooterLinks(),
  [BATTERY_DOD_ENERGY_YIELD_TOOL_PATH]:
    getBatteryDodEnergyYieldToolFooterLinks(),
  [BATTERY_RUNTIME_TOOL_PATH]: getBatteryRuntimeToolFooterLinks(),
  [BATTERY_CHARGING_TIME_TOOL_PATH]: getBatteryChargingTimeToolFooterLinks(),
  [BATTERY_ENERGY_TOOL_PATH]: getBatteryEnergyToolFooterLinks(),
  [BATTERY_DEPTH_OF_DISCHARGE_TOOL_PATH]:
    getBatteryDepthOfDischargeToolFooterLinks(),
  [BATTERY_EFFICIENCY_TOOL_PATH]: getBatteryEfficiencyToolFooterLinks(),
  [BATTERY_SERIES_PARALLEL_TOOL_PATH]: getBatterySeriesParallelToolFooterLinks(),
  [INVERTER_SIZING_TOOL_PATH]: getInverterSizingToolFooterLinks(),
  [DC_CABLE_SIZE_TOOL_PATH]: getDcCableSizeToolFooterLinks(),
};

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** Resources links for the current route, or an empty list when unmapped. */
export function getToolFooterLinksForPath(path: string): ToolFooterLink[] {
  const normalized = normalizePath(path);
  const links = toolFooterLinks[normalized];
  return links ? [...links] : [];
}

const STATIC_FOOTER_RESOURCES: Record<
  "product" | "company" | "legal",
  FooterResourceLink[]
> = {
  product: [
    { href: "/dashboard/", label: "Command Center", category: "product" },
    { href: "/projects/", label: "My Projects", category: "product" },
    { href: "/wizard/", label: "WattQuick Wizard", category: "product" },
    { href: "/calculators/", label: "All calculators", category: "product" },
    { href: "/favorites/", label: "Favorites", category: "product" },
  ],
  company: [
    { href: "/about/", label: "About", category: "company" },
    { href: "/articles/", label: "Articles", category: "company" },
    { href: "/contact/", label: "Contact", category: "company" },
  ],
  legal: [
    { href: "/privacy/", label: "Privacy Policy", category: "legal" },
    { href: "/terms/", label: "Terms of Service", category: "legal" },
  ],
};

export function getDynamicCalculatorCategoryResources(): FooterResourceLink[] {
  return FOOTER_FEATURED_CATEGORIES.map((category) => ({
    href: getCategoryPageHref(category),
    label: CALCULATOR_CATEGORY_LABELS[category],
    category: TOOL_FOOTER_RESOURCE_CATEGORY.categories,
  }));
}

/**
 * Fetch static footer sections. Tool-specific Resources use `toolFooterLinks`
 * via `getToolFooterLinksForPath(path)` in SiteFooter.
 */
export function getFooterResources(options?: {
  category?: FooterResourceFilterCategory;
}): FooterResourceLink[] {
  const filter = options?.category ?? TOOL_FOOTER_RESOURCE_CATEGORY.resources;

  if (filter === "all") {
    return [
      ...getDynamicCalculatorCategoryResources(),
      ...STATIC_FOOTER_RESOURCES.product,
      ...STATIC_FOOTER_RESOURCES.company,
      ...STATIC_FOOTER_RESOURCES.legal,
    ];
  }

  if (filter === TOOL_FOOTER_RESOURCE_CATEGORY.resources) {
    return [];
  }

  if (filter === TOOL_FOOTER_RESOURCE_CATEGORY.categories) {
    return getDynamicCalculatorCategoryResources();
  }

  if (filter in STATIC_FOOTER_RESOURCES) {
    return STATIC_FOOTER_RESOURCES[
      filter as keyof typeof STATIC_FOOTER_RESOURCES
    ];
  }

  return [];
}

/** @deprecated Use `getFooterResources({ category })` */
export function getFooterResourcesByCategory(
  category: ToolFooterResourceCategory
): FooterResourceLink[] {
  return getFooterResources({ category });
}

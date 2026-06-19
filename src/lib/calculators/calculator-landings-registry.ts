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
import type { GuideLandingDefinition } from "@/lib/calculators/landing-types";

/** Every slug with a guide page (any route prefix). */
export const GUIDE_LANDING_SLUGS = [
  ...BATTERY_PERCENTAGE_LANDING_SLUGS,
  ...EV_SOC_LANDING_SLUGS,
  ...REMAINING_BATTERY_CAPACITY_LANDING_SLUGS,
  ...ESCOOTER_RANGE_LANDING_SLUGS,
  ...EV_TRUCK_RANGE_LANDING_SLUGS,
  ...UPS_RUNTIME_LANDING_SLUGS,
  ...BATTERY_BANK_SIZE_LANDING_SLUGS,
  ...WATTS_TO_AMPS_LANDING_SLUGS,
  ...SOLAR_PANEL_SIZE_LANDING_SLUGS,
  ...EV_CHARGING_COST_LANDING_SLUGS,
  ...WHOLE_HOUSE_ENERGY_BUDGET_LANDING_SLUGS,
  ...EBIKE_RANGE_ESTIMATOR_LANDING_SLUGS,
] as const;

export type GuideLandingSlug = (typeof GUIDE_LANDING_SLUGS)[number];

/** Slugs with a dedicated calculator-only route at /tools/calculators/{slug}/ */
export const CALCULATOR_TOOL_SLUGS = [...BATTERY_PERCENTAGE_LANDING_SLUGS] as const;

export type CalculatorToolSlug = (typeof CALCULATOR_TOOL_SLUGS)[number];

export const ALL_GUIDE_LANDING_FOOTER_RESOURCES = [
  ...BATTERY_PERCENTAGE_FOOTER_RESOURCES,
  ...EV_SOC_FOOTER_RESOURCES,
  ...ESCOOTER_RANGE_FOOTER_RESOURCES,
  ...EV_TRUCK_RANGE_FOOTER_RESOURCES,
  ...UPS_RUNTIME_FOOTER_RESOURCES,
  ...BATTERY_BANK_SIZE_FOOTER_RESOURCES,
  ...WATTS_TO_AMPS_FOOTER_RESOURCES,
  ...SOLAR_PANEL_SIZE_FOOTER_RESOURCES,
  ...EV_CHARGING_COST_FOOTER_RESOURCES,
  ...WHOLE_HOUSE_ENERGY_BUDGET_FOOTER_RESOURCES,
  ...EBIKE_RANGE_ESTIMATOR_FOOTER_RESOURCES,
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

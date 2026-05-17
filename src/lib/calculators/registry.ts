import { ahToWhDefinition } from "./definitions/ah-to-wh";
import { ampsToWattsDefinition } from "./definitions/amps-to-watts";
import { applianceDailyCostDefinition } from "./definitions/appliance-daily-cost";
import { applianceMonthlyEnergyDefinition } from "./definitions/appliance-monthly-energy";
import { batteryBankSizeDefinition } from "./definitions/battery-bank-size";
import { batteryChargingTimeDefinition } from "./definitions/battery-charging-time";
import { batteryCostDefinition } from "./definitions/battery-cost";
import { batteryPercentageDefinition } from "./definitions/battery-percentage";
import { batteryRuntimeDefinition } from "./definitions/battery-runtime";
import { evChargeTimeDefinition } from "./definitions/ev-charge-time";
import { evChargingCostDefinition } from "./definitions/ev-charging-cost";
import { inverterSizingDefinition } from "./definitions/inverter-sizing";
import { kvaToKwDefinition } from "./definitions/kva-to-kw";
import { kwToHpDefinition } from "./definitions/kw-to-hp";
import { solarBatteryBankDefinition } from "./definitions/solar-battery-bank";
import { solarDailyYieldDefinition } from "./definitions/solar-daily-yield";
import { solarPanelSizeDefinition } from "./definitions/solar-panel-size";
import { upsRuntimeDefinition } from "./definitions/ups-runtime";
import { wattsToAmpsDefinition } from "./definitions/watts-to-amps";
import { whToAhDefinition } from "./definitions/wh-to-ah";
import {
  toMeta,
  type CalculatorCategory,
  type CalculatorDefinition,
  type CalculatorId,
  type CalculatorMeta,
} from "./types";

const DEFINITIONS = {
  "ah-to-wh": ahToWhDefinition,
  "wh-to-ah": whToAhDefinition,
  "battery-percentage": batteryPercentageDefinition,
  "battery-charging-time": batteryChargingTimeDefinition,
  "battery-runtime": batteryRuntimeDefinition,
  "watts-to-amps": wattsToAmpsDefinition,
  "amps-to-watts": ampsToWattsDefinition,
  "kva-to-kw": kvaToKwDefinition,
  "kw-to-hp": kwToHpDefinition,
  "solar-panel-size": solarPanelSizeDefinition,
  "solar-battery-bank": solarBatteryBankDefinition,
  "solar-daily-yield": solarDailyYieldDefinition,
  "ev-charging-cost": evChargingCostDefinition,
  "ev-charge-time": evChargeTimeDefinition,
  "appliance-daily-cost": applianceDailyCostDefinition,
  "appliance-monthly-energy": applianceMonthlyEnergyDefinition,
  "battery-bank-size": batteryBankSizeDefinition,
  "inverter-sizing": inverterSizingDefinition,
  "battery-cost": batteryCostDefinition,
  "ups-runtime": upsRuntimeDefinition,
} as const satisfies Record<CalculatorId, CalculatorDefinition>;

export const CALCULATOR_ORDER: CalculatorId[] = [
  "ah-to-wh",
  "wh-to-ah",
  "kva-to-kw",
  "kw-to-hp",
  "watts-to-amps",
  "amps-to-watts",
  "battery-percentage",
  "battery-runtime",
  "battery-charging-time",
  "battery-bank-size",
  "solar-panel-size",
  "solar-daily-yield",
  "solar-battery-bank",
  "ev-charging-cost",
  "ev-charge-time",
  "appliance-daily-cost",
  "appliance-monthly-energy",
  "inverter-sizing",
  "battery-cost",
  "ups-runtime",
];

export function getCalculatorDefinition(id: CalculatorId): CalculatorDefinition {
  return DEFINITIONS[id];
}

export function getCalculatorMeta(id: CalculatorId): CalculatorMeta {
  return toMeta(getCalculatorDefinition(id));
}

export function getAllCalculatorDefinitions(): CalculatorDefinition[] {
  return CALCULATOR_ORDER.map((id) => DEFINITIONS[id]);
}

export function getAllCalculatorMeta(): CalculatorMeta[] {
  return CALCULATOR_ORDER.map((id) => toMeta(DEFINITIONS[id]));
}

export function getCalculatorsByCategory(
  category: CalculatorCategory
): CalculatorMeta[] {
  return getAllCalculatorMeta().filter((c) => c.category === category);
}

export function getSuggestions(ids: CalculatorId[]): CalculatorMeta[] {
  return ids.map((id) => getCalculatorMeta(id));
}

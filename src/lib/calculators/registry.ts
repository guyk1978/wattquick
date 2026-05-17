/** Register new calculators in DEFINITIONS and add the id to `utils.ts`. */
import { ahToWhDefinition } from "./definitions/ah-to-wh";
import { ampsToWattsDefinition } from "./definitions/amps-to-watts";
import { batteryChargingTimeDefinition } from "./definitions/battery-charging-time";
import { batteryCostDefinition } from "./definitions/battery-cost";
import { batteryPercentageDefinition } from "./definitions/battery-percentage";
import { batteryRuntimeDefinition } from "./definitions/battery-runtime";
import { solarPanelSizeDefinition } from "./definitions/solar-panel-size";
import { upsRuntimeDefinition } from "./definitions/ups-runtime";
import { wattsToAmpsDefinition } from "./definitions/watts-to-amps";
import { whToAhDefinition } from "./definitions/wh-to-ah";
import {
  toMeta,
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
  "solar-panel-size": solarPanelSizeDefinition,
  "battery-cost": batteryCostDefinition,
  "ups-runtime": upsRuntimeDefinition,
} as const satisfies Record<CalculatorId, CalculatorDefinition>;

/** Stable homepage / sitemap order */
const ORDER: CalculatorId[] = [
  "ah-to-wh",
  "wh-to-ah",
  "battery-percentage",
  "battery-charging-time",
  "battery-runtime",
  "watts-to-amps",
  "amps-to-watts",
  "solar-panel-size",
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
  return ORDER.map((id) => DEFINITIONS[id]);
}

export function getAllCalculatorMeta(): CalculatorMeta[] {
  return ORDER.map((id) => toMeta(DEFINITIONS[id]));
}

export function getSuggestions(ids: CalculatorId[]): CalculatorMeta[] {
  return ids.map((id) => getCalculatorMeta(id));
}

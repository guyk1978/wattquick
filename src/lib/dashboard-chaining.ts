import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition, getCalculatorMeta } from "@/lib/calculators/registry";

export interface CalculatorChainStep {
  nextId: CalculatorId;
  title: string;
  reason: string;
}

/** Curated “next step” paths for Command Center modal chaining */
const CHAIN_OVERRIDES: Partial<Record<CalculatorId, CalculatorChainStep>> = {
  "battery-bank-size": {
    nextId: "bess-roi",
    title: "BESS ROI",
    reason: "Model payback and LCOS for the bank you sized.",
  },
  "solar-daily-yield": {
    nextId: "solar-degradation-20-year-roi",
    title: "20-year solar ROI",
    reason: "Layer degradation and lifetime savings on your yield.",
  },
  "solar-panel-size": {
    nextId: "solar-daily-yield",
    title: "Daily solar yield",
    reason: "Estimate kWh/day from the array you sized.",
  },
  "bess-roi": {
    nextId: "electricity-rate-plan",
    title: "TOU vs flat rate",
    reason: "Confirm your peak/off-peak spread drives BESS savings.",
  },
  "battery-arbitrage-roi": {
    nextId: "electricity-rate-plan",
    title: "Electricity rate plan",
    reason: "Compare TOU blended cost against a flat tariff.",
  },
  "battery-runtime": {
    nextId: "battery-charging-time",
    title: "Battery charging time",
    reason: "See how long it takes to refill after your runtime.",
  },
  "ev-charging-cost": {
    nextId: "ev-charging-cable-loss",
    title: "EV cable loss",
    reason: "Add charger and wire efficiency to home charging cost.",
  },
  "electricity-rate-plan": {
    nextId: "tou-shifting-savings",
    title: "TOU shifting savings",
    reason: "Quantify savings from moving flexible loads off-peak.",
  },
  "energy-consumption": {
    nextId: "appliance-daily-cost",
    title: "Appliance daily cost",
    reason: "Break down which loads dominate your kWh bill.",
  },
  "generator-runtime-savings": {
    nextId: "generator-vs-solar-hybrid",
    title: "Generator vs solar hybrid",
    reason: "Compare hybrid backup economics over 10 years.",
  },
  "12v-to-120v-inverter": {
    nextId: "inverter-peak-load-surge",
    title: "Inverter surge sizing",
    reason: "Check peak/surge headroom for motor loads.",
  },
  "tou-shifting-savings": {
    nextId: "battery-arbitrage-roi",
    title: "Battery arbitrage ROI",
    reason: "See daily profit from automated peak/off-peak cycles.",
  },
};

export function getNextCalculatorStep(
  id: CalculatorId
): CalculatorChainStep | null {
  const override = CHAIN_OVERRIDES[id];
  if (override) return override;

  const def = getCalculatorDefinition(id);
  const nextId = def.suggestions[0];
  if (!nextId) return null;

  const meta = getCalculatorMeta(nextId);
  return {
    nextId,
    title: meta.title,
    reason: "Suggested follow-up in this workflow.",
  };
}

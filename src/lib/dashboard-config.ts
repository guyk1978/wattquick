import type { CalculatorId } from "@/lib/calculators";

export type EnergySystemProfile =
  | "solar-home"
  | "battery-tou"
  | "ev-home"
  | "off-grid"
  | "rv-marine";

export type FlowNodeId = "solar" | "battery" | "grid" | "load" | "ev" | "generator";

export interface FlowNodeConfig {
  id: FlowNodeId;
  label: string;
  calculatorId: CalculatorId;
  accent: "emerald" | "cyan" | "blue" | "amber" | "violet";
}

export interface EnergyFlowEdge {
  from: FlowNodeId;
  to: FlowNodeId;
  /** Particle color along this segment */
  tone: "green" | "blue" | "mixed";
}

export interface EnergyProfileConfig {
  id: EnergySystemProfile;
  label: string;
  description: string;
  nodes: FlowNodeConfig[];
  edges: EnergyFlowEdge[];
}

const NODE = {
  solar: (calc: CalculatorId): FlowNodeConfig => ({
    id: "solar",
    label: "Solar array",
    calculatorId: calc,
    accent: "emerald",
  }),
  battery: (calc: CalculatorId): FlowNodeConfig => ({
    id: "battery",
    label: "Battery bank",
    calculatorId: calc,
    accent: "cyan",
  }),
  grid: (calc: CalculatorId): FlowNodeConfig => ({
    id: "grid",
    label: "Utility grid",
    calculatorId: calc,
    accent: "blue",
  }),
  load: (calc: CalculatorId): FlowNodeConfig => ({
    id: "load",
    label: "Loads & usage",
    calculatorId: calc,
    accent: "amber",
  }),
  ev: (calc: CalculatorId): FlowNodeConfig => ({
    id: "ev",
    label: "EV charging",
    calculatorId: calc,
    accent: "violet",
  }),
  generator: (calc: CalculatorId): FlowNodeConfig => ({
    id: "generator",
    label: "Backup generator",
    calculatorId: calc,
    accent: "amber",
  }),
} as const;

export const ENERGY_PROFILES: EnergyProfileConfig[] = [
  {
    id: "solar-home",
    label: "Solar + battery home",
    description: "PV production, BESS arbitrage, and household consumption.",
    nodes: [
      NODE.solar("solar-daily-yield"),
      NODE.battery("bess-roi"),
      NODE.grid("electricity-rate-plan"),
      NODE.load("energy-consumption"),
    ],
    edges: [
      { from: "solar", to: "battery", tone: "green" },
      { from: "battery", to: "load", tone: "mixed" },
      { from: "grid", to: "battery", tone: "blue" },
      { from: "solar", to: "load", tone: "green" },
    ],
  },
  {
    id: "battery-tou",
    label: "TOU + storage",
    description: "Peak/off-peak shifting with home battery economics.",
    nodes: [
      NODE.battery("battery-arbitrage-roi"),
      NODE.grid("electricity-rate-plan"),
      NODE.load("tou-shifting-savings"),
    ],
    edges: [
      { from: "grid", to: "battery", tone: "blue" },
      { from: "battery", to: "load", tone: "mixed" },
      { from: "grid", to: "load", tone: "blue" },
    ],
  },
  {
    id: "ev-home",
    label: "EV + smart home",
    description: "Charging cost, cable loss, and whole-home kWh planning.",
    nodes: [
      NODE.grid("electricity-rate-plan"),
      NODE.ev("ev-charging-cost"),
      NODE.load("energy-consumption"),
      NODE.solar("solar-daily-yield"),
    ],
    edges: [
      { from: "grid", to: "ev", tone: "blue" },
      { from: "grid", to: "load", tone: "blue" },
      { from: "solar", to: "ev", tone: "green" },
      { from: "solar", to: "load", tone: "green" },
    ],
  },
  {
    id: "off-grid",
    label: "Off-grid hybrid",
    description: "Solar yield, generator runtime, and battery runtime.",
    nodes: [
      NODE.solar("solar-daily-yield"),
      NODE.battery("battery-runtime"),
      NODE.generator("generator-runtime-savings"),
      NODE.load("energy-consumption"),
    ],
    edges: [
      { from: "solar", to: "battery", tone: "green" },
      { from: "generator", to: "battery", tone: "mixed" },
      { from: "battery", to: "load", tone: "mixed" },
      { from: "solar", to: "load", tone: "green" },
    ],
  },
  {
    id: "rv-marine",
    label: "RV & marine",
    description: "12 V systems, battery runtime, and DC wiring.",
    nodes: [
      NODE.solar("solar-daily-yield"),
      NODE.battery("battery-runtime"),
      NODE.load("12v-to-120v-inverter"),
    ],
    edges: [
      { from: "solar", to: "battery", tone: "green" },
      { from: "battery", to: "load", tone: "mixed" },
    ],
  },
];

export const DEFAULT_ENERGY_PROFILE: EnergySystemProfile = "solar-home";

export function getProfileConfig(
  profile: EnergySystemProfile
): EnergyProfileConfig {
  return (
    ENERGY_PROFILES.find((p) => p.id === profile) ??
    ENERGY_PROFILES[0]!
  );
}

/** Normalized node positions (0–1) for the flow canvas */
export const NODE_LAYOUT: Record<
  FlowNodeId,
  { x: number; y: number }
> = {
  solar: { x: 0.14, y: 0.22 },
  battery: { x: 0.5, y: 0.48 },
  grid: { x: 0.5, y: 0.82 },
  load: { x: 0.86, y: 0.42 },
  ev: { x: 0.86, y: 0.78 },
  generator: { x: 0.14, y: 0.78 },
};

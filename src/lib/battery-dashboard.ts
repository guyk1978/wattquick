import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators";

export type BatteryGlow = "healthy" | "caution" | "critical";

export type BatteryDashboardKind =
  | "runtime"
  | "stateOfCharge"
  | "energy"
  | "discharge"
  | "duration";

export interface BatteryDashboardMetrics {
  kind: BatteryDashboardKind;
  fillPercent: number;
  glow: BatteryGlow;
  hours: number | null;
  microcopy: string;
  emoji: string;
  /** Primary number for count-up animation */
  countTarget: number | null;
  countDecimals: number;
}

const EXCLUDED_IDS = new Set<CalculatorId>([
  "inverter-loss-calculator",
  "battery-voltage-drop",
  "battery-charging-time",
]);

/** Calculators that show the gamified battery results dashboard */
export function usesBatteryDashboard(
  category: CalculatorCategory,
  id: CalculatorId
): boolean {
  if (EXCLUDED_IDS.has(id)) return false;
  if (category === "battery" || category === "backup") return true;
  return id === "ah-to-wh" || id === "wh-to-ah";
}

export function extractHoursFromResult(
  value: string,
  unit: string | undefined,
  detail: string | null | undefined
): number | null {
  const fromDetail = detail?.match(/([\d.]+)\s+hours total/i);
  if (fromDetail) return parseFloat(fromDetail[1]);

  const fromCrate = detail?.match(/~([\d.]+)\s*h\s*\(/i);
  if (fromCrate) return parseFloat(fromCrate[1]);

  const numeric = parseFloat(value.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) {
    const hm = value.match(/^(\d+)\s*h\s*(\d+)\s*m/i);
    if (hm) {
      return parseInt(hm[1], 10) + parseInt(hm[2], 10) / 60;
    }
    return null;
  }

  const u = (unit ?? "").toLowerCase();
  if (u === "hours" || u === "hour" || u === "hrs" || u === "hr") return numeric;
  if (u === "min") return numeric / 60;
  if (u === "sec") return numeric / 3600;
  return null;
}

function parsePercentValue(value: string, unit?: string): number | null {
  const n = parseFloat(value.replace(/,/g, ""));
  if (!Number.isFinite(n)) return null;
  if (unit?.includes("%") || unit === "%") return Math.min(100, Math.max(0, n));
  return null;
}

function parseEnergyWh(value: string, unit?: string): number | null {
  const n = parseFloat(value.replace(/,/g, ""));
  if (!Number.isFinite(n)) return null;
  if (unit?.toLowerCase().includes("wh")) return n;
  if (unit?.toLowerCase() === "ah") return null;
  return null;
}

function runtimeFillFromHours(hours: number): number {
  return Math.round(Math.min(100, Math.max(8, (hours / 12) * 100)));
}

function glowFromHours(hours: number): BatteryGlow {
  if (hours >= 4) return "healthy";
  if (hours >= 0.5) return "caution";
  return "critical";
}

function chargingMicrocopy(hours: number): {
  text: string;
  emoji: string;
  glow: BatteryGlow;
} {
  if (hours <= 1.5) {
    return {
      emoji: "⚡",
      text: "Quick zap — you'll be topped up in no time.",
      glow: "healthy",
    };
  }
  if (hours <= 6) {
    return {
      emoji: "🔌",
      text: "Steady charge — perfect for a coffee break.",
      glow: "healthy",
    };
  }
  return {
    emoji: "⏳",
    text: "Marathon charge — let it run overnight.",
    glow: "caution",
  };
}

function runtimeMicrocopy(hours: number): { text: string; emoji: string } {
  if (hours >= 12) {
    return {
      emoji: "🔋",
      text: "Pure Powerhouse! You're good for a blackout.",
    };
  }
  if (hours >= 4) {
    return {
      emoji: "✨",
      text: "Solid reserve — you've got breathing room.",
    };
  }
  if (hours >= 1) {
    return {
      emoji: "⏱️",
      text: "Decent runway — plan a recharge soon.",
    };
  }
  if (hours >= 0.5) {
    return {
      emoji: "⚡",
      text: "Tight window — don't wander far from a charger.",
    };
  }
  return {
    emoji: "⚠️",
    text: "Running on Fumes! Keep that charger close.",
  };
}

function socMicrocopy(percent: number): { text: string; emoji: string; glow: BatteryGlow } {
  if (percent >= 80) {
    return { emoji: "🔋", text: "Fully juiced — you're in the green zone.", glow: "healthy" };
  }
  if (percent >= 50) {
    return { emoji: "✨", text: "Healthy charge — smooth sailing ahead.", glow: "healthy" };
  }
  if (percent >= 20) {
    return { emoji: "⏱️", text: "Mid-pack — top up when you can.", glow: "caution" };
  }
  return { emoji: "⚠️", text: "Low charge — plug in before it's critical.", glow: "critical" };
}

function energyMicrocopy(wh: number): { text: string; emoji: string } {
  if (wh >= 5000) {
    return { emoji: "🔋", text: "Serious storage — that's a beefy power bank!" };
  }
  if (wh >= 1500) {
    return { emoji: "✨", text: "Strong capacity — plenty of electrons in reserve." };
  }
  if (wh >= 500) {
    return { emoji: "⚡", text: "Mid-size pack — good for gadgets and essentials." };
  }
  return { emoji: "🔌", text: "Compact cell — perfect for portable gear." };
}

function energyFillFromWh(wh: number): number {
  return Math.round(Math.min(100, Math.max(12, (wh / 5000) * 100)));
}

function dischargeMicrocopy(
  dodPercent: number,
  isDod: boolean
): { text: string; emoji: string; glow: BatteryGlow } {
  if (isDod) {
    return socMicrocopy(100 - dodPercent);
  }
  return {
    ...runtimeMicrocopy(dodPercent),
    glow: glowFromHours(dodPercent),
  };
}

const RUNTIME_LABEL_HINTS = [
  "runtime",
  "backup time",
  "charge time",
  "discharge",
  "duration",
  "recharge",
];

export function deriveBatteryDashboardMetrics(
  calculatorId: CalculatorId,
  label: string,
  value: string | null,
  unit?: string,
  detail?: string | null
): BatteryDashboardMetrics | null {
  if (value === null) return null;

  const labelLower = label.toLowerCase();
  const hours = extractHoursFromResult(value, unit, detail);
  const percent = parsePercentValue(value, unit);
  const wh = parseEnergyWh(value, unit);

  const isRuntimeLabel = RUNTIME_LABEL_HINTS.some((h) => labelLower.includes(h));
  const isSoc =
    calculatorId === "battery-percentage" ||
    (percent !== null && (unit === "%" || labelLower.includes("charge level")));
  const isDod =
    calculatorId === "battery-depth-of-discharge" ||
    (percent !== null && labelLower.includes("depth of discharge"));
  const isEnergy =
    wh !== null ||
    calculatorId === "ah-to-wh" ||
    calculatorId === "wh-to-ah" ||
    calculatorId === "battery-energy" ||
    unit?.toLowerCase().includes("wh");

  if (
    hours !== null &&
    (labelLower.includes("charge time") || calculatorId === "battery-charging-time")
  ) {
    const { text, emoji, glow } = chargingMicrocopy(hours);
    return {
      kind: "duration",
      fillPercent: Math.round(Math.min(100, Math.max(15, (3 / hours) * 60))),
      glow,
      hours,
      microcopy: text,
      emoji,
      countTarget: parseCountTarget(value, unit, hours),
      countDecimals: countDecimalsFor(value, unit),
    };
  }

  if (hours !== null && (isRuntimeLabel || calculatorId.includes("runtime") || calculatorId === "ups-runtime")) {
    const { text, emoji } = runtimeMicrocopy(hours);
    return {
      kind: "runtime",
      fillPercent: runtimeFillFromHours(hours),
      glow: glowFromHours(hours),
      hours,
      microcopy: text,
      emoji,
      countTarget: parseCountTarget(value, unit, hours),
      countDecimals: countDecimalsFor(value, unit),
    };
  }

  if (isSoc && percent !== null) {
    const { text, emoji, glow } = socMicrocopy(percent);
    return {
      kind: "stateOfCharge",
      fillPercent: Math.round(percent),
      glow,
      hours: null,
      microcopy: text,
      emoji,
      countTarget: percent,
      countDecimals: 1,
    };
  }

  if (isDod && percent !== null) {
    const fill = Math.round(100 - percent);
    const { text, emoji, glow } = dischargeMicrocopy(percent, true);
    return {
      kind: "discharge",
      fillPercent: fill,
      glow,
      hours: null,
      microcopy: text,
      emoji,
      countTarget: percent,
      countDecimals: 1,
    };
  }

  if (hours !== null && calculatorId === "battery-c-rate") {
    const { text, emoji } = runtimeMicrocopy(hours);
    return {
      kind: "duration",
      fillPercent: runtimeFillFromHours(hours),
      glow: glowFromHours(hours),
      hours,
      microcopy: text,
      emoji,
      countTarget: parseCountTarget(value, unit, hours),
      countDecimals: 2,
    };
  }

  if (isEnergy && wh !== null) {
    const { text, emoji } = energyMicrocopy(wh);
    return {
      kind: "energy",
      fillPercent: energyFillFromWh(wh),
      glow: wh >= 1500 ? "healthy" : wh >= 500 ? "caution" : "healthy",
      hours: null,
      microcopy: text,
      emoji,
      countTarget: wh,
      countDecimals: value.includes(".") ? 2 : 0,
    };
  }

  if (calculatorId === "home-backup-sizing") {
    const ah = parseFloat(value.replace(/,/g, ""));
    if (!Number.isFinite(ah)) return null;
    const fill = Math.min(100, Math.max(15, (ah / 400) * 100));
    return {
      kind: "energy",
      fillPercent: Math.round(fill),
      glow: ah >= 200 ? "healthy" : "caution",
      hours: null,
      microcopy: "Sized for your backup window — wire it up and rest easy.",
      emoji: "🏠",
      countTarget: ah,
      countDecimals: 0,
    };
  }

  if (hours !== null) {
    const { text, emoji } = runtimeMicrocopy(hours);
    return {
      kind: "runtime",
      fillPercent: runtimeFillFromHours(hours),
      glow: glowFromHours(hours),
      hours,
      microcopy: text,
      emoji,
      countTarget: parseCountTarget(value, unit, hours),
      countDecimals: countDecimalsFor(value, unit),
    };
  }

  if (percent !== null) {
    const { text, emoji, glow } = socMicrocopy(percent);
    return {
      kind: "stateOfCharge",
      fillPercent: Math.round(percent),
      glow,
      hours: null,
      microcopy: text,
      emoji,
      countTarget: percent,
      countDecimals: 1,
    };
  }

  return null;
}

function parseCountTarget(
  value: string,
  unit: string | undefined,
  hours: number
): number {
  const hm = value.match(/^(\d+)\s*h\s*(\d+)\s*m/i);
  if (hm) return parseInt(hm[1], 10) + parseInt(hm[2], 10) / 60;

  const n = parseFloat(value.replace(/,/g, ""));
  if (Number.isFinite(n)) return n;

  return hours;
}

function countDecimalsFor(value: string, unit?: string): number {
  if (value.includes(".")) return 1;
  const u = (unit ?? "").toLowerCase();
  if (u === "c") return 2;
  return 0;
}

export const BATTERY_GLOW_COLORS: Record<
  BatteryGlow,
  { fill: string; glow: string; glowDark: string }
> = {
  healthy: {
    fill: "#22C55E",
    glow: "rgba(34, 197, 94, 0.35)",
    glowDark: "rgba(34, 197, 94, 0.55)",
  },
  caution: {
    fill: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.35)",
    glowDark: "rgba(245, 158, 11, 0.5)",
  },
  critical: {
    fill: "#EF4444",
    glow: "rgba(239, 68, 68, 0.35)",
    glowDark: "rgba(239, 68, 68, 0.55)",
  },
};

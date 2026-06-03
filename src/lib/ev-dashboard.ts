import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators";
import { extractHoursFromResult } from "@/lib/battery-dashboard";

export type EvGlow = "fast" | "steady" | "slow";

export type EvDashboardKind = "chargeTime" | "range" | "stateOfHealth" | "comparison";

export interface EvDashboardMetrics {
  kind: EvDashboardKind;
  fillPercent: number;
  glow: EvGlow;
  microcopy: string;
  emoji: string;
  countTarget: number | null;
  countDecimals: number;
  /** Display string when count-up cannot represent value (e.g. "2h 30m") */
  useRawValue: boolean;
}

const COST_ROUTED_EV_IDS = new Set<CalculatorId>([
  "ev-charging-cost",
  "ev-public-charging-cost",
  "ev-cost-per-mile",
  "ev-vs-gas-savings",
  "ev-preconditioning-cost",
  "ev-tire-wear-cost",
  "ev-vs-ice-maintenance",
]);

export function usesEvDashboard(
  category: CalculatorCategory,
  id: CalculatorId
): boolean {
  if (COST_ROUTED_EV_IDS.has(id)) return false;
  if (category === "ev") return true;
  if (category === "commercial-ev") {
    if (id.includes("tco") || id.includes("savings")) return false;
    return (
      id.includes("runtime") ||
      id.includes("range") ||
      id.includes("battery") ||
      id.includes("efficiency")
    );
  }
  return false;
}

export function extractEvHours(
  value: string,
  unit: string | undefined,
  detail: string | null | undefined
): number | null {
  const hours = extractHoursFromResult(value, unit, detail);
  if (hours !== null) return hours;

  const minOnly = value.trim().match(/^(\d+)\s*m$/i);
  if (minOnly) return parseInt(minOnly[1], 10) / 60;

  const hm = value.match(/^(\d+)\s*h\s*(\d+)\s*m/i);
  if (hm) return parseInt(hm[1], 10) + parseInt(hm[2], 10) / 60;

  return null;
}

function chargeFillFromHours(hours: number): number {
  return Math.round(Math.min(100, Math.max(10, (2.5 / Math.max(hours, 0.05)) * 100)));
}

function chargeTimeMicrocopy(hours: number): {
  text: string;
  emoji: string;
  glow: EvGlow;
} {
  if (hours < 0.5) {
    return {
      emoji: "⚡",
      text: "Supercharged! Grab a quick coffee and go.",
      glow: "fast",
    };
  }
  if (hours <= 3) {
    return {
      emoji: "🚗",
      text: "Decent pitstop. Perfect timing for a lunch break.",
      glow: "steady",
    };
  }
  if (hours <= 6) {
    return {
      emoji: "🔌",
      text: "Steady session — good time to run errands.",
      glow: "steady",
    };
  }
  return {
    emoji: "💤",
    text: "Overnight Zap. Plug it in and go to sleep.",
    glow: "slow",
  };
}

function rangeMicrocopy(miles: number, lossPercent?: number): {
  text: string;
  emoji: string;
  glow: EvGlow;
} {
  if (lossPercent !== undefined && lossPercent >= 25) {
    return {
      emoji: "❄️",
      text: "Winter bite — precondition while plugged in.",
      glow: "slow",
    };
  }
  if (miles >= 250) {
    return { emoji: "🛣️", text: "Road-trip ready — range for days.", glow: "fast" };
  }
  if (miles >= 120) {
    return { emoji: "🚗", text: "Solid range for daily driving.", glow: "steady" };
  }
  return { emoji: "🔋", text: "City hops — plan a top-up on longer trips.", glow: "steady" };
}

function sohMicrocopy(percent: number): { text: string; emoji: string; glow: EvGlow } {
  if (percent >= 90) {
    return { emoji: "✨", text: "Pack looks healthy — keep up the good habits.", glow: "fast" };
  }
  if (percent >= 80) {
    return { emoji: "🔋", text: "Normal wear — still plenty of life left.", glow: "steady" };
  }
  return { emoji: "📉", text: "Notable fade — gentle charging helps.", glow: "slow" };
}

function parseNumeric(value: string): number | null {
  const n = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function isCompositeDuration(value: string): boolean {
  return /^\d+\s*h\s*\d+\s*m/i.test(value) || /^\d+\s*m$/i.test(value);
}

const CHARGE_LABEL_HINTS = ["charge time", "charging time", "recharge", "backup time"];

export function deriveEvDashboardMetrics(
  calculatorId: CalculatorId,
  label: string,
  value: string | null,
  unit?: string,
  detail?: string | null
): EvDashboardMetrics | null {
  if (value === null) return null;

  const labelLower = label.toLowerCase();
  const hours = extractEvHours(value, unit, detail);
  const numeric = parseNumeric(value);
  const useRawValue = isCompositeDuration(value);

  if (
    hours !== null &&
    (CHARGE_LABEL_HINTS.some((h) => labelLower.includes(h)) ||
      calculatorId.includes("charge") ||
      calculatorId === "ev-level1-vs-level2")
  ) {
    const { text, emoji, glow } = chargeTimeMicrocopy(hours);
    return {
      kind: "chargeTime",
      fillPercent: chargeFillFromHours(hours),
      glow,
      microcopy: text,
      emoji,
      countTarget: useRawValue ? null : parseCountTarget(value, hours),
      countDecimals: countDecimalsFor(value, unit),
      useRawValue,
    };
  }

  if (
    labelLower.includes("state of health") ||
    labelLower.includes("soh") ||
    unit?.toLowerCase().includes("soh")
  ) {
    const pct = numeric ?? 0;
    const { text, emoji, glow } = sohMicrocopy(pct);
    return {
      kind: "stateOfHealth",
      fillPercent: Math.round(Math.min(100, pct)),
      glow,
      microcopy: text,
      emoji,
      countTarget: pct,
      countDecimals: 1,
      useRawValue: false,
    };
  }

  if (
    labelLower.includes("range") ||
    unit?.toLowerCase() === "miles" ||
    calculatorId.includes("range")
  ) {
    const miles = numeric ?? 0;
    const lossMatch = detail?.match(/\((\d+)%\s*loss\)/i);
    const lossPercent = lossMatch ? parseInt(lossMatch[1], 10) : undefined;
    const { text, emoji, glow } = rangeMicrocopy(miles, lossPercent);
    const fill = Math.min(100, Math.max(12, (miles / 320) * 100));
    return {
      kind: "range",
      fillPercent: Math.round(fill),
      glow,
      microcopy: text,
      emoji,
      countTarget: miles,
      countDecimals: 0,
      useRawValue: false,
    };
  }

  if (hours !== null) {
    const { text, emoji, glow } = chargeTimeMicrocopy(hours);
    return {
      kind: "chargeTime",
      fillPercent: chargeFillFromHours(hours),
      glow,
      microcopy: text,
      emoji,
      countTarget: useRawValue ? null : parseCountTarget(value, hours),
      countDecimals: countDecimalsFor(value, unit),
      useRawValue,
    };
  }

  if (numeric !== null && unit?.toLowerCase().includes("kwh")) {
    return {
      kind: "comparison",
      fillPercent: Math.min(100, Math.max(15, (numeric / 100) * 100)),
      glow: "steady",
      microcopy: "Energy packed — ready to hit the road.",
      emoji: "⚡",
      countTarget: numeric,
      countDecimals: value.includes(".") ? 1 : 0,
      useRawValue: false,
    };
  }

  return null;
}

function parseCountTarget(value: string, hours: number): number {
  const hm = value.match(/^(\d+)\s*h\s*(\d+)\s*m/i);
  if (hm) return parseInt(hm[1], 10) + parseInt(hm[2], 10) / 60;
  const n = parseFloat(value.replace(/,/g, ""));
  if (Number.isFinite(n)) return n;
  return hours;
}

function countDecimalsFor(value: string, unit?: string): number {
  if (value.includes(".")) return 1;
  const u = (unit ?? "").toLowerCase();
  if (u === "min") return 0;
  return 0;
}

export const EV_GLOW_COLORS: Record<
  EvGlow,
  { fill: string; accent: string; glow: string; glowDark: string }
> = {
  fast: {
    fill: "#3B82F6",
    accent: "#06B6D4",
    glow: "rgba(59, 130, 246, 0.4)",
    glowDark: "rgba(6, 182, 212, 0.55)",
  },
  steady: {
    fill: "#3B82F6",
    accent: "#60A5FA",
    glow: "rgba(59, 130, 246, 0.35)",
    glowDark: "rgba(59, 130, 246, 0.5)",
  },
  slow: {
    fill: "#6366F1",
    accent: "#818CF8",
    glow: "rgba(99, 102, 241, 0.35)",
    glowDark: "rgba(99, 102, 241, 0.55)",
  },
};

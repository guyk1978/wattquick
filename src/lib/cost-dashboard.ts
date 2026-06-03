import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators";

export type CostTier = "eco" | "standard" | "hog";

export interface CostDashboardMetrics {
  tier: CostTier;
  /** 0 = eco (green), 100 = hog (red) — drives needle */
  needlePercent: number;
  microcopy: string;
  emoji: string;
  countTarget: number | null;
  countDecimals: number;
  /** True when value is currency string */
  isCurrency: boolean;
}

const EV_COST_IDS = new Set<CalculatorId>([
  "ev-charging-cost",
  "ev-public-charging-cost",
  "ev-cost-per-mile",
  "ev-vs-gas-savings",
  "ev-preconditioning-cost",
  "ev-vs-ice-maintenance",
]);

const EXCLUDED_COST_IDS = new Set<CalculatorId>([]);

export function usesCostDashboard(
  category: CalculatorCategory,
  id: CalculatorId
): boolean {
  if (EXCLUDED_COST_IDS.has(id)) return false;
  if (category === "cost" || category === "appliance") return true;
  if (EV_COST_IDS.has(id)) return true;
  if (category === "commercial-ev" && (id.includes("savings") || id.includes("cost"))) {
    return true;
  }
  return false;
}

function parseCurrency(value: string): number | null {
  const n = parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseNumeric(value: string): number | null {
  const n = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** Normalize to approximate daily USD for tiering */
function normalizeDailyUsd(
  amount: number,
  unit?: string,
  label?: string
): number {
  const combined = `${label ?? ""} ${unit ?? ""}`.toLowerCase();

  if (combined.includes("/mi") || combined.includes("per mile")) {
    return amount * 30;
  }
  if (
    combined.includes("/mo") ||
    combined.includes("monthly") ||
    combined.includes("/month")
  ) {
    return amount / 30;
  }
  if (
    combined.includes("/yr") ||
    combined.includes("annual") ||
    combined.includes("yearly")
  ) {
    return amount / 365;
  }
  if (combined.includes("bill") && !combined.includes("daily")) {
    return amount / 30;
  }
  if (combined.includes("kwh/mo") || combined.includes("monthly energy")) {
    return (amount * 0.15) / 30;
  }
  if (combined.includes("kwh") && !combined.includes("/")) {
    return (amount * 0.15) / 30;
  }
  if (combined.includes("/day") || combined.includes("daily")) {
    return amount;
  }
  if (
    combined.includes("standby") ||
    combined.includes("period") ||
    combined.includes("vampire")
  ) {
    return amount / 365;
  }
  return amount / 30;
}

function tierFromDailyUsd(daily: number): CostTier {
  if (daily < 0.75) return "eco";
  if (daily < 4) return "standard";
  return "hog";
}

function needleFromDailyUsd(daily: number): number {
  return Math.round(Math.min(100, Math.max(4, (daily / 10) * 100)));
}

function costMicrocopy(tier: CostTier): { text: string; emoji: string } {
  switch (tier) {
    case "eco":
      return {
        emoji: "🌱",
        text: "Pennies! This appliance barely sips power.",
      };
    case "standard":
      return {
        emoji: "⚖️",
        text: "Standard Draw. Average impact on your next bill.",
      };
    case "hog":
      return {
        emoji: "💸",
        text: "Power Hog! This thing is running up your electricity bill.",
      };
  }
}

function savingsMicrocopy(monthlySavings: number): { text: string; emoji: string; tier: CostTier } {
  if (monthlySavings >= 80) {
    return {
      emoji: "🎉",
      text: "Major savings — your wallet loves this EV!",
      tier: "eco",
    };
  }
  if (monthlySavings >= 20) {
    return {
      emoji: "✨",
      text: "Nice chunk back every month vs. gas.",
      tier: "eco",
    };
  }
  if (monthlySavings > 0) {
    return {
      emoji: "⚖️",
      text: "Modest savings — every bit helps at the pump.",
      tier: "standard",
    };
  }
  return {
    emoji: "⛽",
    text: "Gas wins this scenario — check rates and efficiency.",
    tier: "hog",
  };
}

export function deriveCostDashboardMetrics(
  calculatorId: CalculatorId,
  label: string,
  value: string | null,
  unit?: string,
  detail?: string | null
): CostDashboardMetrics | null {
  if (value === null) return null;

  const labelLower = label.toLowerCase();
  const isCurrency =
    value.includes("$") ||
    labelLower.includes("cost") ||
    labelLower.includes("bill") ||
    labelLower.includes("savings");

  const currencyAmount = parseCurrency(value);
  const numeric = parseNumeric(value);

  if (calculatorId === "ev-preconditioning-cost" && currencyAmount !== null) {
    const tier: CostTier =
      currencyAmount < 0.5 ? "eco" : currencyAmount < 2 ? "standard" : "hog";
    const microcopy =
      tier === "eco"
        ? "Low thermal cost — short conditioning at a good rate."
        : tier === "standard"
          ? "Typical pack heat/cool before fast charge."
          : "Heavy conditioning — check kW draw and minutes.";
    return {
      tier,
      needlePercent: needleFromDailyUsd(currencyAmount),
      microcopy,
      emoji: tier === "hog" ? "🌡️" : "🔋",
      countTarget: currencyAmount,
      countDecimals: 2,
      isCurrency: true,
    };
  }

  if (calculatorId === "ev-vs-gas-savings" && currencyAmount !== null) {
    const { text, emoji, tier } = savingsMicrocopy(currencyAmount);
    return {
      tier,
      needlePercent: tier === "eco" ? 15 : tier === "standard" ? 50 : 88,
      microcopy: text,
      emoji,
      countTarget: currencyAmount,
      countDecimals: 2,
      isCurrency: true,
    };
  }

  if (currencyAmount !== null && isCurrency) {
    const daily = normalizeDailyUsd(currencyAmount, unit, label);
    const tier = tierFromDailyUsd(daily);
    const { text, emoji } = costMicrocopy(tier);
    return {
      tier,
      needlePercent: needleFromDailyUsd(daily),
      microcopy: text,
      emoji,
      countTarget: currencyAmount,
      countDecimals: 2,
      isCurrency: true,
    };
  }

  if (calculatorId === "ev-cost-per-mile" && currencyAmount !== null) {
    const daily = currencyAmount * 30;
    const tier = tierFromDailyUsd(daily);
    const { text, emoji } = costMicrocopy(tier);
    return {
      tier,
      needlePercent: needleFromDailyUsd(daily),
      microcopy:
        tier === "eco"
          ? "Efficient miles — EV sipping cents per mile."
          : text,
      emoji,
      countTarget: currencyAmount,
      countDecimals: 3,
      isCurrency: true,
    };
  }

  if (numeric !== null && unit?.toLowerCase().includes("kwh")) {
    const estimatedDaily = (numeric * 0.15) / 30;
    const tier = tierFromDailyUsd(estimatedDaily);
    const { text, emoji } = costMicrocopy(tier);
    return {
      tier,
      needlePercent: needleFromDailyUsd(estimatedDaily),
      microcopy: text,
      emoji,
      countTarget: numeric,
      countDecimals: 1,
      isCurrency: false,
    };
  }

  if (numeric !== null && isCurrency) {
    const daily = normalizeDailyUsd(numeric, unit, label);
    const tier = tierFromDailyUsd(daily);
    const { text, emoji } = costMicrocopy(tier);
    return {
      tier,
      needlePercent: needleFromDailyUsd(daily),
      microcopy: text,
      emoji,
      countTarget: numeric,
      countDecimals: 2,
      isCurrency: true,
    };
  }

  return null;
}

export const COST_TIER_COLORS: Record<
  CostTier,
  { needle: string; glow: string; glowDark: string }
> = {
  eco: {
    needle: "#22C55E",
    glow: "rgba(34, 197, 94, 0.35)",
    glowDark: "rgba(34, 197, 94, 0.5)",
  },
  standard: {
    needle: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.35)",
    glowDark: "rgba(245, 158, 11, 0.45)",
  },
  hog: {
    needle: "#EF4444",
    glow: "rgba(239, 68, 68, 0.35)",
    glowDark: "rgba(239, 68, 68, 0.55)",
  },
};

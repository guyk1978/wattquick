import { cn } from "@/lib/utils";

/** Deep glass panel — blur, inset lip, theme-aware */
export const glassSurface = "glass-surface";

/** Gradient neon border + ambient glow (set --neon-from / --neon-to or use modifiers) */
export const glassNeon = "glass-neon";

export type GlassNeonAccent =
  | "battery"
  | "ev"
  | "cost"
  | "primary"
  | "cat";

export function glassNeonAccent(accent: GlassNeonAccent) {
  const map: Record<GlassNeonAccent, string> = {
    battery: "glass-neon--battery",
    ev: "glass-neon--ev",
    cost: "glass-neon--cost",
    primary: "glass-neon--primary",
    cat: "glass-neon-cat",
  };
  return map[accent];
}

export function glassDashboard(accent: GlassNeonAccent = "primary") {
  return cn(
    glassSurface,
    glassNeon,
    glassNeonAccent(accent),
    "relative overflow-hidden rounded-2xl sm:rounded-3xl"
  );
}

export function glassPanel() {
  return cn(
    glassSurface,
    glassNeon,
    glassNeonAccent("primary"),
    "relative overflow-hidden rounded-2xl sm:rounded-3xl"
  );
}

/** Recessed tactile input slot */
export const glassInsetInput = "glass-inset-input";

/** Large dashboard result numerals (size via .neon-hero-number in globals.css) */
export const neonHeroNumber =
  "neon-hero-number font-mono font-bold tabular-nums tracking-tight text-foreground";

/** Grid wrappers for pairs/triplets of CalculatorResult cards */
export const calculatorResultsGrid =
  "calculator-results-grid grid grid-cols-1 gap-4 sm:grid-cols-2";

export const calculatorResultsGrid3 =
  "calculator-results-grid grid grid-cols-1 gap-4 sm:grid-cols-3";

export const calculatorResultCard = "calculator-result-card min-w-0";

export const calculatorResultValueRow = "calculator-result-value-row";

export const calculatorStatValue =
  "calculator-stat-value font-mono font-bold tabular-nums text-foreground";

/** Etched neon pill for secondary actions */
export const neonPillBtn = "neon-pill-btn";

export const neonBadge = "neon-badge";

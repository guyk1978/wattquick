import { cn } from "@/lib/utils";

/** Flat panel — white card, 1px border, sharp corners (replaces glass-surface) */
export const flatPanel = "flat-panel";

/** Chart / gauge wrapper inside calculators */
export const flatVisualPanel = "flat-visual-panel";

/** Tip, warning, or info callout row */
export const flatAlert = "flat-alert";

/** SEO aside / nested comparison block */
export const flatSubPanel = "flat-subpanel";

/** @deprecated Use flatPanel */
export const glassSurface = flatPanel;

/** @deprecated Neon borders removed — use flatPanel */
export const glassNeon = "";

export type GlassNeonAccent =
  | "battery"
  | "ev"
  | "cost"
  | "primary"
  | "cat";

/** @deprecated No-op — accent rings removed */
export function glassNeonAccent(_accent: GlassNeonAccent) {
  return "";
}

/** Dashboard / diagram shell — flat, no neon */
export function glassDashboard(_accent: GlassNeonAccent = "primary") {
  return cn(flatPanel, "relative overflow-hidden");
}

/** Generic flat panel */
export function glassPanel() {
  return cn(flatPanel, "relative overflow-hidden");
}

/** Command-center calculator shell — square corners, deep shadow, no neon ring */
export function calculatorCommandPanel() {
  return cn("calculator-command-panel", "relative overflow-hidden", "p-4 sm:p-6");
}

/** Result block — flat dark surface, sans-serif values */
export function calculatorCommandResult() {
  return cn("calculator-command-result", calculatorResultCard, "p-6 sm:p-8");
}

/** Primary result value — clean sans-serif (no mono glow) */
export const calculatorResultValue =
  "calculator-result-value font-sans font-semibold tabular-nums tracking-tight text-foreground";

/** Flat rectilinear input surface */
export const calculatorCommandInput = "calculator-command-input";

/** Share icon — integrated on panel, no neon pill */
export const calculatorCommandShareBtn = "calculator-command-share-btn";

/** Flat PDF save row — no neon ring */
export const calculatorCommandPdfSection = "calculator-command-pdf";

/** Flat action button inside calculator panels */
export const calculatorCommandBtn = "calculator-command-btn";

/** Nested sub-panel (e.g. comparison cards) */
export const calculatorCommandSubPanel = "calculator-command-subpanel";

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

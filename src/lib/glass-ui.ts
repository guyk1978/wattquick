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
  return cn("calculator-command-result", calculatorResultCard, "p-4 sm:p-5");
}

/** Primary result value — clean sans-serif (no mono glow) */
export const calculatorResultValue =
  "calculator-result-value font-sans font-semibold tabular-nums tracking-tight text-foreground";

/** Flat rectilinear input surface */
export const calculatorCommandInput = "calculator-command-input";

/** Valid calculator field — bold green border + mint fill (reference mockup) */
export const calculatorFieldValidInput = cn(
  "!rounded-md !border-2 !border-status-success !bg-status-success-input",
  "focus-visible:!border-status-success focus-visible:!bg-status-success-input",
  "focus-visible:!shadow-[0_0_0_3px_var(--color-status-success-muted)]"
);

/** @deprecated Use calculator-status-board CSS shell */
export const calculatorResultSuccessCard = "";

/** Primary metric value in success state */
export const calculatorResultSuccessValue = "text-status-success";

/** Warning alert bar at bottom of result card */
export const calculatorStatusWarningAlert = cn(
  "border-status-warning-border bg-status-warning-surface text-status-warning"
);

/** Share icon — integrated on panel, no neon pill */
export const calculatorCommandShareBtn = "calculator-command-share-btn";

/** Flat PDF save row — no neon ring */
export const calculatorCommandPdfSection = "calculator-command-pdf";

/** Primary / secondary action — muted green hover (site-wide) */
export const calculatorCommandBtn = "calculator-command-btn matte-action-btn";

/** Empty state panel — muted success tint */
export const matteEmptyState = "matte-empty-state";

/** Directory / hub card — subtle status border */
export const matteStatusCard = "matte-status-card";

/** Nested sub-panel (e.g. comparison cards) */
export const calculatorCommandSubPanel = "calculator-command-subpanel";

/** Recessed tactile input slot */
export const glassInsetInput = "glass-inset-input";

/** Large dashboard result numerals (size via .neon-hero-number in globals.css) */
export const neonHeroNumber =
  "neon-hero-number font-mono font-bold tabular-nums tracking-tight text-foreground";

/** Grid wrappers for pairs/triplets of CalculatorResult cards */
export const calculatorResultsGrid =
  "calculator-results-grid calculator-secondary-results calculator-status-metrics-grid";

export const calculatorResultsGrid3 =
  "calculator-results-grid calculator-secondary-results calculator-status-metrics-grid calculator-status-metrics-grid--triple";

export const calculatorResultCard = "calculator-result-card min-w-0";

export const calculatorResultValueRow = "calculator-result-value-row";

export const calculatorStatValue =
  "calculator-stat-value font-mono font-bold tabular-nums text-foreground";

/** Etched neon pill for secondary actions */
export const neonPillBtn = "neon-pill-btn";

export const neonBadge = "neon-badge";

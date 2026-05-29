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

/** Large dashboard result numerals */
export const neonHeroNumber =
  "neon-hero-number font-mono text-[2.75rem] font-bold leading-none tracking-tight text-foreground sm:text-6xl";

/** Etched neon pill for secondary actions */
export const neonPillBtn = "neon-pill-btn";

export const neonBadge = "neon-badge";

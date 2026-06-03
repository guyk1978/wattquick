import type { CSSProperties } from "react";
import type { CalculatorCategory } from "@/data/calculator-types";

export type CategoryTheme = {
  /** Primary accent (hex) */
  color: string;
  /** Gradient end / deeper shade */
  colorDark: string;
  /** CTA label text on gradient button */
  ctaText: string;
};

/** Vibrant gamified palette per calculator category */
export const CALCULATOR_CATEGORY_THEME: Record<CalculatorCategory, CategoryTheme> =
  {
    battery: { color: "#22C55E", colorDark: "#16A34A", ctaText: "#FFFFFF" },
    solar: { color: "#F59E0B", colorDark: "#D97706", ctaText: "#FFFFFF" },
    ev: { color: "#3B82F6", colorDark: "#2563EB", ctaText: "#FFFFFF" },
    power: { color: "#A855F7", colorDark: "#9333EA", ctaText: "#FFFFFF" },
    tou: { color: "#8B5CF6", colorDark: "#7C3AED", ctaText: "#FFFFFF" },
    cost: { color: "#FACC15", colorDark: "#EAB308", ctaText: "#18181B" },
    convert: { color: "#06B6D4", colorDark: "#0891B2", ctaText: "#FFFFFF" },
    appliance: { color: "#F97316", colorDark: "#EA580C", ctaText: "#FFFFFF" },
    sizing: { color: "#10B981", colorDark: "#059669", ctaText: "#FFFFFF" },
    backup: { color: "#EF4444", colorDark: "#DC2626", ctaText: "#FFFFFF" },
    "commercial-ev": {
      color: "#3B82F6",
      colorDark: "#1D4ED8",
      ctaText: "#FFFFFF",
    },
    "rv-marine": { color: "#0EA5E9", colorDark: "#0284C7", ctaText: "#FFFFFF" },
    "green-home": {
      color: "#84CC16",
      colorDark: "#65A30D",
      ctaText: "#18181B",
    },
    pool: { color: "#06B6D4", colorDark: "#0891B2", ctaText: "#FFFFFF" },
  };

export function getCategoryTheme(category: CalculatorCategory): CategoryTheme {
  return CALCULATOR_CATEGORY_THEME[category];
}

export function categoryThemeVars(theme: CategoryTheme): CSSProperties {
  return {
    "--cat": theme.color,
    "--cat-dark": theme.colorDark,
    "--cat-cta-text": theme.ctaText,
  } as CSSProperties;
}

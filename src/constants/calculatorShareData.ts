import type { CalculatorId } from "@/lib/calculators";

export type CalculatorShareEntry = {
  title: string;
  description: string;
  /** Path under /public, e.g. /images/share/battery-percentage.webp */
  imageUrl: string;
};

/**
 * Per-calculator share copy and OG preview image.
 * Add a key + image file only — ShareButtons and metadata pick it up automatically.
 */
export const calculatorShareData: Partial<
  Record<CalculatorId, CalculatorShareEntry>
> = {
  "battery-percentage": {
    title: "Battery Percentage Calculator",
    description: "Easily calculate your remaining battery life.",
    imageUrl: "/images/share/battery-percentage.webp",
  },
  "battery-runtime": {
    title: "Battery Runtime Calculator",
    description: "Estimate how long a battery lasts at a given power draw.",
    imageUrl: "/images/share/battery-runtime.webp",
  },
  "battery-charging-time": {
    title: "Battery Charging Time Calculator",
    description:
      "Calculate how long it takes to charge a battery at a given current.",
    imageUrl: "/images/share/battery-charging-time.webp",
  },
};

import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { DcCableSizeGuideIllustration } from "@/components/calculator/visual-guides/dc-cable-size-guide-illustration";
import { BatteryPercentageGuideIllustration } from "@/components/calculator/visual-guides/battery-percentage-guide-illustration";
import { BatteryRuntimeGuideIllustration } from "@/components/calculator/visual-guides/battery-runtime-guide-illustration";
import { EscooterRangeGuideIllustration } from "@/components/calculator/visual-guides/escooter-range-guide-illustration";
import { EbikeRangeGuideIllustration } from "@/components/calculator/visual-guides/ebike-range-guide-illustration";

export interface CalculatorVisualGuideConfig {
  calculatorTitle: string;
  caption: string;
  Illustration: ComponentType<{ className?: string }>;
}

export const CALCULATOR_VISUAL_GUIDES: Partial<
  Record<CalculatorId, CalculatorVisualGuideConfig>
> = {
  "dc-cable-size": {
    calculatorTitle: "DC Cable Size Calculator",
    caption:
      "Enter load current, one-way cable length, and system voltage. The tool looks up ampacity for a safe gauge, then checks voltage drop over the round-trip run—delivering a recommended AWG.",
    Illustration: DcCableSizeGuideIllustration,
  },
  "battery-percentage": {
    calculatorTitle: "Battery Percentage",
    caption:
      "Enter current charge and full rated capacity in the same unit (mAh or Ah). The calculator divides current by full capacity and multiplies by 100 to show remaining charge as a percentage—capped at 100% if current exceeds rated capacity.",
    Illustration: BatteryPercentageGuideIllustration,
  },
  "battery-runtime": {
    calculatorTitle: "Battery Runtime",
    caption:
      "Enter battery capacity in mAh, nominal voltage, and load power in watts. The tool converts mAh to watt-hours (÷ 1,000 × V), then divides Wh by watts to estimate how long the pack lasts at that draw.",
    Illustration: BatteryRuntimeGuideIllustration,
  },
  "escooter-range": {
    calculatorTitle: "E-Scooter Range Calculator",
    caption:
      "Set SOC on the slider, tyre pressure versus recommended bar, and nominal pack voltage (36 / 48 / 52 V). The model builds usable Wh from charge level, adjusts Wh/km for rolling resistance and voltage sag, then returns estimated remaining range in kilometres.",
    Illustration: EscooterRangeGuideIllustration,
  },
  "ebike-range-estimator": {
    calculatorTitle: "E-Bike Range Estimator",
    caption:
      "Enter battery Wh, pedal-assist level, total mass, and wind/terrain factor. Consumption Wh/km combines a rolling baseline, assist multiplier, conditions, and weight penalty; range km equals usable pack energy divided by that consumption.",
    Illustration: EbikeRangeGuideIllustration,
  },
};

export function hasCalculatorVisualGuide(calculatorId: CalculatorId): boolean {
  return calculatorId in CALCULATOR_VISUAL_GUIDES;
}

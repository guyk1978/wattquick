import { Percent } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const batteryPercentageDefinition: CalculatorDefinition = {
  id: "battery-percentage",
  href: "/battery-percentage",
  title: "Battery Percentage",
  description: "Find remaining charge as a percentage of full capacity.",
  icon: Percent,
  tag: "Battery",
  category: "battery",
  suggestions: ["battery-runtime", "battery-charging-time", "ups-runtime"],
  fields: [
    {
      id: "current",
      label: "Current charge",
      unit: "mAh",
      placeholder: "3200",
    },
    {
      id: "full",
      label: "Full capacity",
      unit: "mAh",
      placeholder: "5000",
    },
  ],
  result: {
    label: "Charge level",
    emptyMessage: "Enter current and full capacity",
  },
  seo: {
    sections: [
      {
        heading: "How battery percentage works",
        body: "Percentage = (current charge ÷ full capacity) × 100. Use the same unit for both values—milliamp-hours (mAh) or amp-hours (Ah).",
      },
      {
        heading: "Why estimates differ from your phone",
        body: "Devices estimate state-of-charge with voltage curves and usage history. This calculator gives a simple linear ratio useful for pack planning and quick checks.",
      },
    ],
  },
  compute(values) {
    const current = parsePositive(values.current ?? "");
    const full = parsePositive(values.full ?? "");
    if (current === null || full === null) return { value: null };

    const percent = Math.min((current / full) * 100, 100);
    return {
      value: formatNumber(percent, { maxDecimals: 1 }),
      unit: "%",
      detail:
        current > full
          ? "Capped at 100% (current exceeds rated capacity)"
          : `${formatNumber(current, { maxDecimals: 0 })} of ${formatNumber(full, { maxDecimals: 0 })} mAh`,
    };
  },
};

import { ArrowRightLeft } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const whToAhDefinition: CalculatorDefinition = {
  id: "wh-to-ah",
  href: "/wh-to-ah",
  title: "Wh to Ah Converter",
  description: "Convert watt-hours to amp-hours using system voltage.",
  icon: ArrowRightLeft,
  tag: "Convert",
  category: "convert",
  suggestions: ["ah-to-wh", "battery-runtime", "ups-runtime"],
  fields: [
    { id: "wh", label: "Energy", unit: "Wh", placeholder: "1200" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
  ],
  result: {
    label: "Equivalent capacity",
    emptyMessage: "Enter Wh and voltage",
  },
  seo: {
    sections: [
      {
        heading: "Wh to Ah formula",
        body: "Divide watt-hours by voltage to get amp-hours: Ah = Wh ÷ V. A 1,200 Wh pack at 12 V equals 100 Ah.",
      },
      {
        heading: "Practical tip",
        body: "Always use the nominal system voltage your battery runs at. Lithium cells are often counted at 3.7 V per cell in marketing, while lead-acid is commonly 12 V.",
      },
    ],
  },
  compute(values) {
    const wh = parsePositive(values.wh ?? "");
    const v = parsePositive(values.voltage ?? "");
    if (wh === null || v === null) return { value: null };

    const ah = wh / v;
    return {
      value: formatNumber(ah, { maxDecimals: 2 }),
      unit: "Ah",
      detail: `${formatNumber(wh, { maxDecimals: 0 })} Wh ÷ ${formatNumber(v, { maxDecimals: 1 })} V`,
    };
  },
};

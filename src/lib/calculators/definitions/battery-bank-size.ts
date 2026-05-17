import { Battery } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const batteryBankSizeDefinition: CalculatorDefinition = {
  id: "battery-bank-size",
  href: "/battery-bank-size",
  title: "Battery Bank Size (Ah)",
  description: "Size a battery bank in amp-hours from load, runtime, and voltage.",
  icon: Battery,
  tag: "Sizing",
  category: "sizing",
  suggestions: ["solar-battery-bank", "battery-runtime", "inverter-sizing"],
  fields: [
    { id: "loadW", label: "Load power", unit: "W", placeholder: "500" },
    { id: "hours", label: "Runtime needed", unit: "hrs", placeholder: "8" },
    { id: "voltage", label: "System voltage", unit: "V", placeholder: "12" },
  ],
  result: {
    label: "Required capacity",
    emptyMessage: "Enter load W, hours & voltage",
  },
  seo: {
    sections: [
      {
        heading: "Ah sizing formula",
        body: "Wh needed = watts × hours. Ah = Wh ÷ voltage. Example: 500 W for 8 h at 12 V needs about 333 Ah (before efficiency losses).",
      },
      {
        heading: "Add safety margin",
        body: "Multiply by 1.2–1.5 for inverter loss, aging, and temperature. For off-grid solar, start with the Solar Battery Bank calculator in Wh first.",
      },
    ],
  },
  compute(values) {
    const loadW = parsePositive(values.loadW ?? "");
    const hours = parsePositive(values.hours ?? "");
    const voltage = parsePositive(values.voltage ?? "");
    if (loadW === null || hours === null || voltage === null) return { value: null };
    const wh = loadW * hours;
    const ah = wh / voltage;
    return {
      value: formatNumber(ah, { maxDecimals: 0 }),
      unit: "Ah",
      detail: `${formatNumber(wh, { maxDecimals: 0 })} Wh ÷ ${formatNumber(voltage, { maxDecimals: 0 })} V`,
    };
  },
};

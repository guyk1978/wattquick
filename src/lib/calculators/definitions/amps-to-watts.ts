import { Zap } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const ampsToWattsDefinition: CalculatorDefinition = {
  id: "amps-to-watts",
  href: "/amps-to-watts",
  title: "Amps to Watts",
  description: "Convert current (amps) and voltage into power (watts).",
  icon: Zap,
  tag: "Power",
  category: "power",
  suggestions: ["watts-to-amps", "battery-runtime", "ups-runtime"],
  fields: [
    { id: "amps", label: "Current", unit: "A", placeholder: "10" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
  ],
  result: {
    label: "Power",
    emptyMessage: "Enter amps and voltage",
  },
  seo: {
    sections: [
      {
        heading: "Amps to watts formula",
        body: "Power in watts equals current times voltage: W = A × V. A 10 A draw at 12 V is 120 W.",
      },
      {
        heading: "Sizing batteries and UPS",
        body: "Once you know load watts, use the Battery Runtime or UPS Runtime calculators to estimate how long your system will last.",
      },
    ],
  },
  compute(values) {
    const amps = parsePositive(values.amps ?? "");
    const voltage = parsePositive(values.voltage ?? "");
    if (amps === null || voltage === null) return { value: null };

    const watts = amps * voltage;
    return {
      value: formatNumber(watts, { maxDecimals: 1 }),
      unit: "W",
      detail: `${formatNumber(amps, { maxDecimals: 2 })} A × ${formatNumber(voltage, { maxDecimals: 1 })} V`,
    };
  },
};

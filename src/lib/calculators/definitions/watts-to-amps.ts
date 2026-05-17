import { Zap } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const wattsToAmpsDefinition: CalculatorDefinition = {
  id: "watts-to-amps",
  href: "/watts-to-amps",
  title: "Watts to Amps",
  description: "Convert electrical power (watts) to current (amps) at a given voltage.",
  icon: Zap,
  tag: "Power",
  category: "power",
  suggestions: ["amps-to-watts", "battery-runtime", "solar-panel-size"],
  fields: [
    { id: "watts", label: "Power", unit: "W", placeholder: "120" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
  ],
  result: {
    label: "Current draw",
    emptyMessage: "Enter watts and voltage",
  },
  seo: {
    sections: [
      {
        heading: "Watts to amps formula",
        body: "For DC circuits: Amps = Watts ÷ Volts. Example: a 120 W load on a 12 V system draws 10 A.",
      },
      {
        heading: "Related calculators",
        body: "Pair this with the Amps to Watts converter when sizing fuses, wire gauge, or battery discharge current.",
      },
    ],
  },
  compute(values) {
    const watts = parsePositive(values.watts ?? "");
    const voltage = parsePositive(values.voltage ?? "");
    if (watts === null || voltage === null) return { value: null };

    const amps = watts / voltage;
    return {
      value: formatNumber(amps, { maxDecimals: 2 }),
      unit: "A",
      detail: `${formatNumber(watts, { maxDecimals: 0 })} W ÷ ${formatNumber(voltage, { maxDecimals: 1 })} V`,
    };
  },
};

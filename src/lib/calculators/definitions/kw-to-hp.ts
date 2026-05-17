import { ArrowRightLeft } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const kwToHpDefinition: CalculatorDefinition = {
  id: "kw-to-hp",
  href: "/kw-to-hp",
  title: "kW to HP Converter",
  description: "Convert kilowatts to mechanical horsepower instantly.",
  icon: ArrowRightLeft,
  tag: "Convert",
  category: "convert",
  suggestions: ["kva-to-kw", "amps-to-watts", "watts-to-amps"],
  fields: [
    { id: "kw", label: "Power", unit: "kW", placeholder: "7.5" },
  ],
  result: {
    label: "Horsepower",
    emptyMessage: "Enter kilowatts",
  },
  seo: {
    sections: [
      {
        heading: "kW to HP formula",
        body: "1 mechanical horsepower ≈ 0.7457 kW. HP = kW ÷ 0.7457. This is the standard conversion for motors and generators in the US.",
      },
      {
        heading: "Metric horsepower",
        body: "Metric hp (PS) is slightly different (≈ 0.7355 kW). This calculator uses mechanical horsepower (hp).",
      },
    ],
  },
  compute(values) {
    const kw = parsePositive(values.kw ?? "");
    if (kw === null) return { value: null };
    const hp = kw / 0.7457;
    return {
      value: formatNumber(hp, { maxDecimals: 2 }),
      unit: "HP",
      detail: `${formatNumber(kw, { maxDecimals: 2 })} kW ÷ 0.7457`,
    };
  },
};

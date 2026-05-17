import { ArrowRightLeft } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const kvaToKwDefinition: CalculatorDefinition = {
  id: "kva-to-kw",
  href: "/kva-to-kw",
  title: "kVA to kW Converter",
  description: "Convert apparent power (kVA) to real power (kW) using power factor.",
  icon: ArrowRightLeft,
  tag: "Convert",
  category: "convert",
  suggestions: ["kw-to-hp", "amps-to-watts", "inverter-sizing"],
  fields: [
    { id: "kva", label: "Apparent power", unit: "kVA", placeholder: "10" },
    {
      id: "pf",
      label: "Power factor",
      unit: "0–1",
      placeholder: "0.9",
      hint: "Enter as decimal (e.g. 0.9 for 90%)",
    },
  ],
  result: {
    label: "Real power",
    emptyMessage: "Enter kVA and power factor",
  },
  seo: {
    sections: [
      {
        heading: "kVA to kW formula",
        body: "kW = kVA × power factor. Power factor is the ratio of real power to apparent power in AC systems.",
      },
      {
        heading: "Typical power factors",
        body: "Resistive loads (heaters) are near 1.0. Motors and fluorescent lighting are often 0.7–0.9. Poor power factor increases current and may incur utility penalties.",
      },
    ],
  },
  compute(values) {
    const kva = parsePositive(values.kva ?? "");
    const pf = parsePositive(values.pf ?? "");
    if (kva === null || pf === null || pf > 1) return { value: null };
    const kw = kva * pf;
    return {
      value: formatNumber(kw, { maxDecimals: 2 }),
      unit: "kW",
      detail: `${formatNumber(kva, { maxDecimals: 1 })} kVA × ${formatNumber(pf, { maxDecimals: 2 })} PF`,
    };
  },
};

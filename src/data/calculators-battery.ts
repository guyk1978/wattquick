import { Cable, Cpu, Home, Layers, Gauge } from "lucide-react";
import {
  formatNumber,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
import {
  calculateBatteryVoltageDrop,
  calculateCrate,
  calculateHomeBackupSizing,
  calculateInverterLoss,
  calculateSeriesParallel,
} from "@/lib/calculators/battery";
import type { CalculatorDataEntry } from "@/data/calculator-types";

/** Battery micro-calculators (batch 5) */
export const calculatorsBattery = [
  {
    slug: "battery-series-parallel",
    href: "/battery-series-parallel",
    title: "Battery Series & Parallel Calculator",
    description:
      "Calculate pack voltage, amp-hours, and watt-hours from series/parallel cell layout.",
    keywords: [
      "battery series parallel",
      "battery bank wiring",
      "series parallel ah voltage",
    ],
    icon: Layers,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-bank-size", "battery-energy", "ah-to-wh"],
    fields: [
      { id: "seriesCount", label: "Cells in series", unit: "S", placeholder: "4" },
      { id: "parallelCount", label: "Strings in parallel", unit: "P", placeholder: "2" },
      { id: "cellVoltage", label: "Cell voltage", unit: "V", placeholder: "3.2" },
      { id: "cellCapacityAh", label: "Cell capacity", unit: "Ah", placeholder: "100" },
    ],
    result: {
      label: "Pack energy",
      emptyMessage: "Enter series, parallel & cell specs",
    },
    seo: {
      sections: [
        {
          heading: "Series vs. parallel",
          body: "Series adds voltage (4 × 3.2 V = 12.8 V). Parallel adds capacity (2 × 100 Ah = 200 Ah). Pack Wh = total V × total Ah.",
        },
        {
          heading: "Configuration label",
          body: "A 4S2P pack means four cells in series per string and two strings in parallel—common for DIY lithium banks.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Must all cells match? A: Yes—use matched cells and a BMS rated for your series count. Q: Can I mix old and new? A: No—parallel strings should be balanced and matched.",
        },
      ],
    },
    compute(values) {
      const seriesCount = parsePositive(values.seriesCount ?? "");
      const parallelCount = parsePositive(values.parallelCount ?? "");
      const cellVoltage = parsePositive(values.cellVoltage ?? "");
      const cellCapacityAh = parsePositive(values.cellCapacityAh ?? "");
      if (
        seriesCount === null ||
        parallelCount === null ||
        cellVoltage === null ||
        cellCapacityAh === null
      ) {
        return { value: null };
      }
      const result = calculateSeriesParallel({
        seriesCount,
        parallelCount,
        cellVoltage,
        cellCapacityAh,
      });
      return {
        value: formatNumber(result.totalWh, { maxDecimals: 0 }),
        unit: "Wh",
        detail: `${result.configuration} · ${result.totalVoltage} V · ${result.totalCapacityAh} Ah`,
      };
    },
  },
  {
    slug: "battery-c-rate",
    href: "/battery-c-rate",
    title: "Battery C-Rate Calculator",
    description:
      "Find discharge C-rate and runtime from capacity and load current—updates live.",
    keywords: ["battery c rate calculator", "discharge rate ah", "battery discharge time"],
    icon: Gauge,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-runtime", "battery-charging-time", "watts-to-amps"],
    fields: [
      { id: "capacityAh", label: "Battery capacity", unit: "Ah", placeholder: "100" },
      { id: "dischargeAmps", label: "Discharge current", unit: "A", placeholder: "50" },
    ],
    result: {
      label: "Discharge C-rate",
      emptyMessage: "Enter Ah and discharge amps",
    },
    seo: {
      sections: [
        {
          heading: "C-rate formula",
          body: "C-rate = discharge current ÷ capacity (A ÷ Ah). 1C on a 100 Ah pack = 100 A and ~1 hour to empty. 0.5C = 50 A and ~2 hours.",
        },
        {
          heading: "Why C-rate matters",
          body: "High C-rates heat cells and reduce effective capacity. Check your battery datasheet for max continuous discharge.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this linear? A: Real packs sag under load—this is an ideal estimate. Q: What about Peukert? A: Lead-acid loses more capacity at high C; lithium is closer to linear for planning.",
        },
      ],
    },
    compute(values) {
      const capacityAh = parsePositive(values.capacityAh ?? "");
      const dischargeAmps = parsePositive(values.dischargeAmps ?? "");
      if (capacityAh === null || dischargeAmps === null) return { value: null };
      const result = calculateCrate({ capacityAh, dischargeAmps });
      return {
        value: formatNumber(result.cRate, { maxDecimals: 2 }),
        unit: "C",
        detail: `~${result.hoursToEmpty} h (${result.minutesToEmpty} min) to empty at constant current`,
      };
    },
  },
  {
    slug: "inverter-loss-calculator",
    href: "/inverter-loss-calculator",
    title: "Inverter Loss Calculator",
    description:
      "Convert DC input watts to AC output and show power lost as heat in the inverter.",
    keywords: ["inverter loss calculator", "inverter efficiency watts", "dc to ac loss"],
    icon: Cpu,
    tag: "Battery",
    category: "battery",
    suggestions: ["inverter-sizing", "solar-inverter-efficiency", "ups-runtime"],
    fields: [
      { id: "dcInputWatts", label: "DC input power", unit: "W", placeholder: "1200" },
      {
        id: "efficiencyPercent",
        label: "Inverter efficiency",
        inputType: "range",
        min: 80,
        max: 99,
        step: 1,
        defaultValue: "92",
        unit: "%",
        colSpan: 2,
      },
    ],
    result: {
      label: "AC output power",
      emptyMessage: "Enter DC watts and efficiency",
    },
    seo: {
      sections: [
        {
          heading: "Efficiency formula",
          body: "AC output = DC input × (efficiency ÷ 100). Loss watts = DC − AC. Size batteries for DC input including losses.",
        },
        {
          heading: "Sizing tip",
          body: "When sizing backup, divide load watts by efficiency before converting to Ah. Pair with Home Backup Sizing for bank capacity.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why is efficiency below 100%? A: Switching losses and heat in the inverter. Q: Does efficiency change with load? A: Yes—often lowest at very light load.",
        },
      ],
    },
    compute(values) {
      const dcInputWatts = parsePositive(values.dcInputWatts ?? "");
      const efficiencyPercent = Number(values.efficiencyPercent?.trim() || "92");
      if (
        dcInputWatts === null ||
        !Number.isFinite(efficiencyPercent) ||
        efficiencyPercent <= 0 ||
        efficiencyPercent > 100
      ) {
        return { value: null };
      }
      const result = calculateInverterLoss({ dcInputWatts, efficiencyPercent });
      return {
        value: formatNumber(result.acOutputWatts, { maxDecimals: 0 }),
        unit: "W AC",
        detail: `Loss ${formatNumber(result.lossWatts, { maxDecimals: 0 })} W (${result.lossPercent}%) from ${dcInputWatts} W DC`,
      };
    },
  },
  {
    slug: "home-backup-sizing",
    href: "/home-backup-sizing",
    title: "Home Backup Battery Sizing Calculator",
    description:
      "Size a backup battery bank for essential loads, runtime, voltage, and depth of discharge.",
    keywords: [
      "home backup battery sizing",
      "off grid backup ah",
      "emergency battery bank",
    ],
    icon: Home,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-bank-size", "ups-runtime", "inverter-loss-calculator"],
    fields: [
      { id: "loadWatts", label: "Essential load", unit: "W", placeholder: "800" },
      { id: "backupHours", label: "Backup time", unit: "hrs", placeholder: "8" },
      { id: "systemVoltage", label: "System voltage", unit: "V", placeholder: "48" },
      {
        id: "depthOfDischargePercent",
        label: "Usable depth of discharge",
        inputType: "range",
        min: 50,
        max: 95,
        step: 5,
        defaultValue: "80",
        unit: "%",
      },
      {
        id: "inverterEfficiencyPercent",
        label: "Inverter efficiency",
        unit: "%",
        placeholder: "92",
        defaultValue: "92",
      },
    ],
    result: {
      label: "Minimum bank size",
      emptyMessage: "Enter load, hours & voltage",
    },
    seo: {
      sections: [
        {
          heading: "Sizing formula",
          body: "Wh needed = (load W × hours) ÷ inverter efficiency. Bank Wh = Wh needed ÷ (DoD ÷ 100). Bank Ah = bank Wh ÷ system voltage.",
        },
        {
          heading: "Add margin",
          body: "Consider 10–20% extra for battery aging and cold weather. Lithium often allows 80–90% DoD; lead-acid is typically 50%.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this for whole house? A: Use essential circuits only—fridge, lights, internet. Q: Include solar? A: This is storage-only; add solar yield separately.",
        },
      ],
    },
    compute(values) {
      const loadWatts = parsePositive(values.loadWatts ?? "");
      const backupHours = parsePositive(values.backupHours ?? "");
      const systemVoltage = parsePositive(values.systemVoltage ?? "");
      const depthOfDischargePercent = Number(
        values.depthOfDischargePercent?.trim() || "80"
      );
      const inverterEfficiencyPercent = parsePositive(
        values.inverterEfficiencyPercent ?? ""
      );
      if (
        loadWatts === null ||
        backupHours === null ||
        systemVoltage === null ||
        inverterEfficiencyPercent === null ||
        depthOfDischargePercent <= 0 ||
        depthOfDischargePercent > 100
      ) {
        return { value: null };
      }
      const result = calculateHomeBackupSizing({
        loadWatts,
        backupHours,
        systemVoltage,
        depthOfDischargePercent,
        inverterEfficiencyPercent,
      });
      return {
        value: formatNumber(result.bankAh, { maxDecimals: 0 }),
        unit: "Ah",
        detail: `${result.bankWh} Wh bank · ${result.whNeeded} Wh load energy incl. inverter loss`,
      };
    },
  },
  {
    slug: "battery-voltage-drop",
    href: "/battery-voltage-drop",
    title: "Battery Voltage Drop Calculator",
    description:
      "Estimate DC wire voltage drop and voltage at the load from amps, length, and system voltage.",
    keywords: [
      "battery voltage drop calculator",
      "dc wire voltage drop",
      "battery cable loss",
    ],
    icon: Cable,
    tag: "Battery",
    category: "battery",
    suggestions: ["dc-cable-size", "watts-to-amps", "battery-runtime"],
    fields: [
      { id: "loadAmps", label: "Load current", unit: "A", placeholder: "40" },
      { id: "oneWayLengthFt", label: "One-way wire length", unit: "ft", placeholder: "15" },
      { id: "systemVoltage", label: "System voltage", unit: "V", placeholder: "12" },
    ],
    result: {
      label: "Voltage at load",
      emptyMessage: "Enter amps, length & voltage",
    },
    seo: {
      sections: [
        {
          heading: "Why voltage drop matters",
          body: "Undersized cables cause sag that trips inverters and reduces performance. Aim for ≤3% drop on critical DC runs.",
        },
        {
          heading: "Wire sizing",
          body: "We recommend a conservative AWG from ampacity tables, then calculate drop for that gauge. Use DC Cable Size for manual gauge picks.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: One-way or round-trip? A: Enter one-way length; math uses round-trip resistance. Q: Copper only? A: Yes—aluminum needs larger gauge.",
        },
      ],
    },
    compute(values) {
      const loadAmps = parsePositive(values.loadAmps ?? "");
      const oneWayLengthFt = parsePositive(values.oneWayLengthFt ?? "");
      const systemVoltage = parsePositive(values.systemVoltage ?? "");
      if (loadAmps === null || oneWayLengthFt === null || systemVoltage === null) {
        return { value: null };
      }
      const result = calculateBatteryVoltageDrop({
        loadAmps,
        oneWayLengthFt,
        systemVoltage,
      });
      return {
        value: formatNumber(result.voltageAtLoad, { maxDecimals: 2 }),
        unit: "V",
        detail: `${result.dropPercent}% drop (${result.dropVolts} V) · ${result.recommendedAwg} AWG recommended`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];

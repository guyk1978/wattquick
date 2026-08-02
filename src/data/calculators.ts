import {
  Activity,
  ArrowRightLeft,
  Battery,
  BatteryCharging,
  Cable,
  Car,
  Cpu,
  DollarSign,
  Percent,
  Refrigerator,
  Shield,
  Sun,
  Thermometer,
  Zap,
} from "lucide-react";
import {
  calculateBatteryDodEnergyYield,
  calculateConductorResistance,
  calculateReactivePower,
  formatConductorResistanceDetail,
  isConductorMaterial,
} from "@/lib/calculators/converters";
import {
  calculateResidentialVoltageDrop,
  isAcWireSizeKey,
} from "@/lib/calculators/electrical";
import {
  formatCurrency,
  formatDuration,
  formatNumber,
  parsePositive,
} from "@/lib/format";
import type { CalculatorDataEntry } from "@/data/calculator-types";
import { calculatorsAppliances } from "@/data/calculators-appliances";
import { calculatorsBattery } from "@/data/calculators-battery";
import { calculatorsCommercialEv } from "@/data/calculators-commercial-ev";
import { calculatorsEv } from "@/data/calculators-ev";
import { calculatorsExtra } from "@/data/calculators-extra";
import { calculatorsGreenHome } from "@/data/calculators-green-home";
import { calculatorsRvMarine } from "@/data/calculators-rv-marine";
import { calculatorsSolar } from "@/data/calculators-solar";
import { calculatorsEbike } from "@/data/calculators-ebike";
import { calculatorsEscooter } from "@/data/calculators-escooter";
import { calculatorsMobility } from "@/data/calculators-mobility";
import { calculatorsTariffs } from "@/data/calculators-tariffs";

/**
 * Single source of truth for all calculator tools.
 * Add a new calculator by appending one object to this array.
 */
export const calculators = [
  {
    slug: "ah-to-wh",
    href: "/ah-to-wh",

  title: "Ah to Wh Converter",
  description: "Convert amp-hours to watt-hours using battery voltage.",
    keywords: ["ah to wh", "amp hours to watt hours", "battery energy converter"],
  icon: ArrowRightLeft,
  tag: "Convert",
  category: "convert",
  suggestions: ["wh-to-ah", "battery-runtime", "battery-cost"],
  fields: [
    { id: "ah", label: "Capacity", unit: "Ah", placeholder: "100" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
  ],
  result: {
    label: "Energy capacity",
    emptyMessage: "Enter Ah and voltage",
  },
  seo: {
    sections: [
      {
        heading: "Ah to Wh formula",
        body: "Watt-hours (Wh) measure energy. Multiply amp-hours (Ah) by voltage (V): Wh = Ah × V. For example, a 100 Ah 12 V battery stores 1,200 Wh.",
      },
      {
        heading: "When to use this converter",
        body: "Use this tool when comparing batteries, sizing solar storage, or matching loads rated in watts to a battery rated in amp-hours.",
      },
    ],
  },
  compute(values) {
    const ah = parsePositive(values.ah ?? "");
    const v = parsePositive(values.voltage ?? "");
    if (ah === null || v === null) return { value: null };

    const wh = ah * v;
    return {
      value: formatNumber(wh, { maxDecimals: 2 }),
      unit: "Wh",
      detail: `${formatNumber(ah, { maxDecimals: 1 })} Ah × ${formatNumber(v, { maxDecimals: 1 })} V`,
    };
  },
},
  {
    slug: "wh-to-ah",
    href: "/wh-to-ah",

  title: "Wh to Ah Converter",
  description: "Convert watt-hours to amp-hours using system voltage.",
    keywords: ["wh to ah", "watt hours to amp hours", "battery capacity converter"],
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
},
  {
    slug: "kva-to-kw",
    href: "/kva-to-kw",

  title: "kVA to kW Converter",
  description: "Convert apparent power (kVA) to real power (kW) using power factor.",
    keywords: ["kva to kw", "apparent power converter", "power factor calculator"],
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
},
  {
    slug: "conductor-resistance-temperature",
    href: "/conductor-resistance-temperature",
    title: "Conductor Resistance & Temperature Calculator",
    description:
      "Calculate copper or aluminum conductor resistance from cross-section, length, and operating temperature.",
    keywords: [
      "conductor resistance calculator",
      "wire temperature derating",
      "copper resistance mm2",
      "aluminum cable resistance",
      "temperature coefficient wire",
    ],
    icon: Thermometer,
    tag: "Convert",
    category: "convert",
    suggestions: ["dc-cable-size", "dc-cable-voltage-drop", "ohms-law", "residential-voltage-drop"],
    fields: [
      {
        id: "material",
        label: "Conductor material",
        inputType: "select",
        defaultValue: "copper",
        options: [
          { value: "copper", label: "Copper (Cu)" },
          { value: "aluminum", label: "Aluminum (Al)" },
        ],
      },
      {
        id: "crossSectionMm2",
        label: "Cross-section",
        unit: "mm²",
        inputType: "select",
        defaultValue: "6",
        options: [
          { value: "1.5", label: "1.5 mm² (≈16 AWG)" },
          { value: "2.5", label: "2.5 mm² (≈14 AWG)" },
          { value: "4", label: "4 mm² (≈12 AWG)" },
          { value: "6", label: "6 mm² (≈10 AWG)" },
          { value: "10", label: "10 mm² (≈8 AWG)" },
          { value: "16", label: "16 mm² (≈6 AWG)" },
          { value: "25", label: "25 mm² (≈4 AWG)" },
          { value: "35", label: "35 mm² (≈2 AWG)" },
          { value: "50", label: "50 mm² (≈1/0 AWG)" },
        ],
      },
      {
        id: "lengthM",
        label: "One-way length",
        unit: "m",
        placeholder: "15",
        defaultValue: "15",
      },
      {
        id: "temperatureC",
        label: "Operating temperature",
        unit: "°C",
        placeholder: "40",
        defaultValue: "25",
        hint: "Resistance rises ~0.4%/°C above 20°C reference",
      },
    ],
    result: {
      label: "Resistance at temperature",
      emptyMessage: "Enter material, size, length & temperature",
    },
    seo: {
      sections: [
        {
          heading: "Temperature-adjusted resistance",
          body: "R(T) = R₂₀ × [1 + α(T − 20°C)] where R₂₀ = ρL/A. Copper ρ ≈ 0.0175 Ω·mm²/m; aluminum ρ ≈ 0.0282 Ω·mm²/m at 20°C.",
        },
        {
          heading: "Why it matters for DC cable BOM",
          body: "Hot conductors increase I²R loss and voltage drop. Size cables using field temperature—not datasheet 25°C values—before quoting wire quantities.",
        },
      ],
    },
    compute(values) {
      const materialRaw = values.material ?? "copper";
      const crossSectionMm2 = parsePositive(values.crossSectionMm2 ?? "");
      const lengthM = parsePositive(values.lengthM ?? "");
      const temperatureC = Number(values.temperatureC?.trim() ?? "");
      if (
        !isConductorMaterial(materialRaw) ||
        crossSectionMm2 === null ||
        lengthM === null ||
        !Number.isFinite(temperatureC)
      ) {
        return { value: null };
      }

      const result = calculateConductorResistance({
        material: materialRaw,
        crossSectionMm2,
        lengthM,
        temperatureC,
      });

      return {
        value: formatNumber(result.resistanceOhm, { maxDecimals: 4 }),
        unit: "Ω",
        detail: formatConductorResistanceDetail(result),
        snapshotResults: {
          "Resistance at temperature": `${formatNumber(result.resistanceOhm, { maxDecimals: 4 })} Ω`,
          "Resistance at 20°C": `${formatNumber(result.resistanceAt20, { maxDecimals: 4 })} Ω`,
          "Resistance per meter": `${formatNumber(result.resistancePerM, { maxDecimals: 6 })} Ω/m`,
          "Temperature factor": formatNumber(result.tempFactor, { maxDecimals: 4 }),
        },
      };
    },
  },
  {
    slug: "reactive-power-calculator",
    href: "/reactive-power-calculator",
    title: "Reactive Power & Power Factor Calculator",
    description:
      "Convert kVA to real kW and reactive kVAR for motor and driver loads—plan inverter and conductor sizing.",
    keywords: [
      "reactive power calculator",
      "kvar calculator",
      "power factor kva kw",
      "apparent power converter",
      "motor reactive load",
    ],
    icon: Activity,
    tag: "Convert",
    category: "convert",
    suggestions: ["kva-to-kw", "power-factor", "inverter-sizing", "amps-to-watts"],
    fields: [
      {
        id: "kva",
        label: "Apparent power",
        unit: "kVA",
        placeholder: "12",
        defaultValue: "12",
      },
      {
        id: "pf",
        label: "Power factor",
        unit: "0–1",
        placeholder: "0.85",
        defaultValue: "0.85",
        hint: "Motors often 0.7–0.9; resistive loads near 1.0",
      },
    ],
    result: {
      label: "Reactive power",
      emptyMessage: "Enter kVA and power factor",
    },
    seo: {
      sections: [
        {
          heading: "Real, apparent, and reactive power",
          body: "kW = kVA × PF. Reactive power kVAR = √(kVA² − kW²). Poor power factor increases current without delivering useful work.",
        },
        {
          heading: "Sizing with reactive load",
          body: "Inverter and breaker ratings must cover apparent power (kVA), not just real watts. Include reactive kVAR in project BOM when quoting AC distribution.",
        },
      ],
    },
    compute(values) {
      const kva = parsePositive(values.kva ?? "");
      const pf = parsePositive(values.pf ?? "");
      if (kva === null || pf === null || pf > 1) return { value: null };

      const result = calculateReactivePower({
        apparentKva: kva,
        powerFactor: pf,
      });

      return {
        value: formatNumber(result.reactiveKvar, { maxDecimals: 2 }),
        unit: "kVAR",
        detail: `${formatNumber(result.realKw, { maxDecimals: 2 })} kW real · ${formatNumber(result.apparentKva, { maxDecimals: 1 })} kVA · φ ${formatNumber(result.phaseAngleDeg, { maxDecimals: 1 })}°`,
        snapshotResults: {
          "Real power": `${formatNumber(result.realKw, { maxDecimals: 2 })} kW`,
          "Reactive power": `${formatNumber(result.reactiveKvar, { maxDecimals: 2 })} kVAR`,
          "Apparent power": `${formatNumber(result.apparentKva, { maxDecimals: 1 })} kVA`,
          "Power factor": formatNumber(result.powerFactor, { maxDecimals: 2 }),
        },
      };
    },
  },
  {
    slug: "battery-dod-energy-yield",
    href: "/battery-dod-energy-yield",
    title: "Battery DoD to Energy Yield Calculator",
    description:
      "Convert nominal battery capacity and depth of discharge to usable kWh for backup and critical-load planning.",
    keywords: [
      "battery dod energy yield",
      "depth of discharge kwh",
      "usable battery capacity",
      "battery energy calculator",
      "lithium dod planning",
    ],
    icon: BatteryCharging,
    tag: "Convert",
    category: "convert",
    suggestions: [
      "battery-depth-of-discharge",
      "ah-to-wh",
      "critical-load-analysis",
      "home-backup-sizing",
    ],
    fields: [
      {
        id: "nominalCapacityKwh",
        label: "Nominal capacity",
        unit: "kWh",
        placeholder: "10",
        defaultValue: "10",
      },
      {
        id: "depthOfDischargePercent",
        label: "Depth of discharge",
        unit: "%",
        inputType: "range",
        min: 10,
        max: 100,
        step: 5,
        defaultValue: "80",
        hint: "Lithium often 80–90%; lead-acid typically 50%",
      },
    ],
    result: {
      label: "Usable energy",
      emptyMessage: "Enter nominal kWh and DoD %",
    },
    seo: {
      sections: [
        {
          heading: "Usable energy formula",
          body: "Usable kWh = nominal capacity × (DoD ÷ 100). A 10 kWh bank at 80% DoD delivers 8 kWh to loads before hitting your reserve floor.",
        },
        {
          heading: "Critical load alignment",
          body: "Compare usable kWh against Critical Load Analysis Wh requirements. Save both snapshots to the same project for accurate BOM battery sizing.",
        },
      ],
    },
    compute(values) {
      const nominalCapacityKwh = parsePositive(values.nominalCapacityKwh ?? "");
      const depthOfDischargePercent = parsePositive(
        values.depthOfDischargePercent ?? ""
      );
      if (nominalCapacityKwh === null || depthOfDischargePercent === null) {
        return { value: null };
      }

      const result = calculateBatteryDodEnergyYield({
        nominalCapacityKwh,
        depthOfDischargePercent,
      });

      return {
        value: formatNumber(result.usableKwh, { maxDecimals: 2 }),
        unit: "kWh",
        detail: `${formatNumber(result.usableWh, { maxDecimals: 0 })} Wh usable · ${formatNumber(result.reservedKwh, { maxDecimals: 2 })} kWh reserve (${formatNumber(result.reservedPercent, { maxDecimals: 0 })}%)`,
        snapshotResults: {
          "Usable energy": `${formatNumber(result.usableKwh, { maxDecimals: 2 })} kWh`,
          "Usable energy (Wh)": `${formatNumber(result.usableWh, { maxDecimals: 0 })} Wh`,
          "Nominal capacity": `${formatNumber(result.nominalCapacityKwh, { maxDecimals: 2 })} kWh`,
          "Depth of discharge": `${formatNumber(result.depthOfDischargePercent, { maxDecimals: 0 })} %`,
        },
      };
    },
  },
  {
    slug: "kw-to-hp",
    href: "/kw-to-hp",

  title: "kW to HP Converter",
  description: "Convert kilowatts to mechanical horsepower instantly.",
    keywords: ["kw to hp", "kilowatt to horsepower", "motor hp calculator"],
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
},
  {
    slug: "watts-to-amps",
    href: "/watts-to-amps",

  title: "Watts to Amps",
  description: "Convert electrical power (watts) to current (amps) at a given voltage.",
    keywords: ["watts to amps", "power to current", "dc amps calculator"],
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
},
  {
    slug: "amps-to-watts",
    href: "/amps-to-watts",

  title: "Amps to Watts",
  description: "Convert current (amps) and voltage into power (watts).",
    keywords: ["amps to watts", "current to power", "wattage calculator"],
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
},
  {
    slug: "residential-voltage-drop",
    href: "/residential-voltage-drop",
    title: "Residential AC Voltage Drop Calculator",
    description:
      "Calculate AC voltage drop in home wiring from supply voltage, amps, cable length (m), and AWG or mm² copper size.",
    keywords: [
      "residential voltage drop calculator",
      "ac wire voltage drop",
      "voltage drop awg mm2",
      "home electrical wire sizing",
      "nec 3 percent voltage drop",
    ],
    icon: Cable,
    tag: "Power",
    category: "power",
    suggestions: ["watts-to-amps", "dc-cable-size", "battery-voltage-drop"],
    fields: [
      {
        id: "supplyVoltage",
        label: "Supply voltage",
        unit: "V",
        placeholder: "120",
        hint: "Line-to-neutral (120 V) or line voltage (230 V) for your circuit",
      },
      { id: "loadAmps", label: "Load current", unit: "A", placeholder: "20" },
      {
        id: "oneWayLengthM",
        label: "One-way cable length",
        unit: "m",
        placeholder: "25",
        hint: "Panel to outlet/appliance — one-way distance",
      },
      {
        id: "wireSize",
        label: "Copper conductor",
        inputType: "select",
        defaultValue: "awg-12",
        options: [
          { value: "awg-14", label: "14 AWG (2.08 mm²)" },
          { value: "awg-12", label: "12 AWG (3.31 mm²)" },
          { value: "awg-10", label: "10 AWG (5.26 mm²)" },
          { value: "awg-8", label: "8 AWG (8.37 mm²)" },
          { value: "awg-6", label: "6 AWG (13.3 mm²)" },
          { value: "mm2-1.5", label: "1.5 mm²" },
          { value: "mm2-2.5", label: "2.5 mm²" },
          { value: "mm2-4", label: "4 mm²" },
          { value: "mm2-6", label: "6 mm²" },
          { value: "mm2-10", label: "10 mm²" },
          { value: "mm2-16", label: "16 mm²" },
        ],
        colSpan: 2,
      },
    ],
    result: {
      label: "Voltage drop",
      emptyMessage: "Enter voltage, amps, length & wire size",
    },
    seo: {
      sections: [
        {
          heading: "Why voltage drop matters at home",
          body: "Long or undersized copper runs add resistance. Loads see less than nominal voltage—motors overheat, chargers throttle, and lights dim. Most guides target ≤3% drop on branch circuits and ≤5% total feeder plus branch.",
        },
        {
          heading: "AC drop formula (copper)",
          body: "Drop (V) = current (A) × resistance × 2 (out-and-back) × one-way length (m). Drop % = 100 × drop ÷ supply voltage. Uses typical copper Ω/m at 20 °C for AWG or mm².",
        },
        {
          heading: "AWG vs. mm²",
          body: "Pick the conductor you are installing. Metric installs use mm²; North American branch wiring often lists AWG. When in doubt, size up one step for continuous loads (EVSE, HVAC, heat pump).",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: 120 V or 240 V? A: Use the voltage the load actually sees (usually 120 V line-to-neutral in US branch circuits). Q: Power factor? A: This is a resistive planning estimate—inductive motor starts may need larger wire. Q: Aluminum wire? A: Copper only here; AL needs larger area.",
        },
      ],
    },
    compute(values) {
      const supplyVoltage = parsePositive(values.supplyVoltage ?? "");
      const loadAmps = parsePositive(values.loadAmps ?? "");
      const oneWayLengthM = parsePositive(values.oneWayLengthM ?? "");
      const wireSize = values.wireSize ?? "";
      if (
        supplyVoltage === null ||
        loadAmps === null ||
        oneWayLengthM === null ||
        !isAcWireSizeKey(wireSize)
      ) {
        return { value: null };
      }
      const result = calculateResidentialVoltageDrop({
        supplyVoltage,
        loadAmps,
        oneWayLengthM,
        wireSize,
      });
      return {
        value: formatNumber(result.dropVolts, { maxDecimals: 2 }),
        unit: "V",
        detail: `${result.dropPercent}% drop · ${result.voltageAtLoad} V at load · ${result.recommendation}`,
      };
    },
  },
  {
    slug: "battery-percentage",
    href: "/battery-percentage",

  title: "Battery Percentage",
  description: "Find remaining charge as a percentage of full capacity.",
    keywords: ["battery percentage", "state of charge", "battery level calculator"],
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
},
  {
    slug: "battery-runtime",
    href: "/battery-runtime",

  title: "Battery Runtime",
  description: "Estimate how long a battery lasts at a given power draw.",
    keywords: ["battery runtime", "battery life calculator", "how long battery lasts"],
  icon: Battery,
  tag: "Runtime",
  category: "battery",
  suggestions: ["battery-charging-time", "ups-runtime", "watts-to-amps"],
  fields: [
    {
      id: "capacity",
      label: "Battery capacity",
      unit: "mAh",
      placeholder: "5000",
    },
    {
      id: "voltage",
      label: "Voltage",
      unit: "V",
      placeholder: "3.7",
    },
    {
      id: "power",
      label: "Power draw",
      unit: "W",
      placeholder: "10",
      colSpan: 2,
    },
  ],
  result: {
    label: "Estimated runtime",
    emptyMessage: "Enter capacity, voltage & power",
  },
  seo: {
    sections: [
      {
        heading: "Battery runtime explained",
        body: "Convert mAh to Wh (÷1000 × V), then divide by load watts. Example: 5,000 mAh at 3.7 V is 18.5 Wh; at 10 W draw, runtime is about 1.85 hours.",
      },
      {
        heading: "Real-world factors",
        body: "Heat, age, and discharge rate reduce usable capacity. For critical designs, derate by 20% or use the Charging Time calculator to plan recharge.",
      },
    ],
  },
  compute(values) {
    const mAh = parsePositive(values.capacity ?? "");
    const v = parsePositive(values.voltage ?? "");
    const w = parsePositive(values.power ?? "");
    if (mAh === null || v === null || w === null) {
      return { value: null };
    }

    const wh = (mAh * v) / 1000;
    const hours = wh / w;
    const duration = formatDuration(hours);

    return {
      value: duration.display,
      unit: duration.unit,
      detail: `${formatNumber(wh, { maxDecimals: 1 })} Wh · ${duration.detail}`,
    };
  },
},
  {
    slug: "battery-charging-time",
    href: "/battery-charging-time",

  title: "Battery Charging Time",
  description:
    "Calculate how long it takes to charge a battery at a given current.",
    keywords: ["battery charging time", "charge time calculator", "mAh charging"],
  icon: BatteryCharging,
  tag: "Charging",
  category: "battery",
  suggestions: ["battery-runtime", "solar-panel-size", "battery-cost"],
  fields: [
    {
      id: "capacity",
      label: "Battery Cap.",
      unit: "mAh",
      placeholder: "5000",
    },
    {
      id: "current",
      label: "Charger Cur.",
      unit: "mA",
      placeholder: "2000",
    },
    {
      id: "efficiency",
      label: "Charge Eff.",
      unit: "%",
      placeholder: "100",
      defaultValue: "100",
      hint: "Account for heat loss and taper charging",
      colSpan: 2,
    },
  ],
  result: {
    label: "Estimated Charge Time",
    emptyMessage: "Enter capacity & charger current",
  },
  seo: {
    sections: [
      {
        heading: "Charging time formula",
        body: "Base time = capacity (mAh) ÷ charge current (mA). Adjust for efficiency: actual time = base time ÷ (efficiency ÷ 100).",
      },
      {
        heading: "Why charging takes longer in practice",
        body: "Most chargers taper current above ~80% state of charge. Use a lower efficiency (85–95%) for a safer estimate, or pair with Solar Panel Size for off-grid planning.",
      },
    ],
  },
  compute(values) {
    const mAh = parsePositive(values.capacity ?? "");
    const mA = parsePositive(values.current ?? "");
    const eff = parsePositive(values.efficiency ?? "");
    if (mAh === null || mA === null || eff === null || eff > 100) {
      return { value: null };
    }

    const hours = mAh / mA / (eff / 100);
    const duration = formatDuration(hours);

    return {
      value: duration.display,
      unit: duration.unit,
      detail: `At ${formatNumber(mA, { maxDecimals: 0 })} mA · ${eff}% efficiency`,
    };
  },
},
  {
    slug: "battery-bank-size",
    href: "/battery-bank-size",

  title: "Battery Bank Size (Ah)",
  description: "Size a battery bank in amp-hours from load, runtime, and voltage.",
    keywords: ["battery bank ah", "battery bank sizing", "amp hour bank"],
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
},
  {
    slug: "solar-panel-size",
    href: "/solar-panel-size",

  title: "Solar Panel Size",
  description:
    "Estimate minimum panel wattage from daily energy use and sun hours.",
    keywords: ["solar panel size", "solar panel calculator", "pv sizing"],
  icon: Sun,
  tag: "Solar",
  category: "solar",
  suggestions: ["solar-daily-yield", "solar-battery-bank", "battery-bank-size"],
  fields: [
    {
      id: "dailyWh",
      label: "Daily energy need",
      unit: "Wh/day",
      placeholder: "2400",
    },
    {
      id: "sunHours",
      label: "Peak sun hours",
      unit: "hrs",
      placeholder: "5",
      hint: "Average full-sun equivalent hours for your location",
    },
    {
      id: "efficiency",
      label: "System efficiency",
      unit: "%",
      placeholder: "80",
      defaultValue: "80",
    },
  ],
  result: {
    label: "Minimum panel size",
    emptyMessage: "Enter daily use, sun hours & efficiency",
  },
  seo: {
    sections: [
      {
        heading: "How this estimate works",
        body: "Panel watts ≈ daily Wh ÷ (peak sun hours × efficiency). Peak sun hours depend on location and season—typical values range from 3–6 hours.",
      },
      {
        heading: "Add margin for real installs",
        body: "Real systems need extra capacity for cloudy days, battery losses, and inverter efficiency. Treat this result as a starting point, then add 20–30% headroom.",
      },
    ],
  },
  compute(values) {
    const dailyWh = parsePositive(values.dailyWh ?? "");
    const sunHours = parsePositive(values.sunHours ?? "");
    const efficiency = parsePositive(values.efficiency ?? "");
    if (dailyWh === null || sunHours === null || efficiency === null || efficiency > 100) {
      return { value: null };
    }

    const panelW = dailyWh / (sunHours * (efficiency / 100));
    return {
      value: formatNumber(panelW, { maxDecimals: 0 }),
      unit: "W",
      detail: `${formatNumber(dailyWh, { maxDecimals: 0 })} Wh/day · ${formatNumber(sunHours, { maxDecimals: 1 })} h sun · ${efficiency}% eff.`,
    };
  },
},
  {
    slug: "solar-daily-yield",
    href: "/solar-daily-yield",

  title: "Solar Daily Yield",
  description: "Estimate daily energy output from panel wattage and sun hours.",
    keywords: ["solar daily yield", "solar output calculator", "panel output wh"],
  icon: Sun,
  tag: "Solar",
  category: "solar",
  suggestions: ["solar-panel-size", "solar-battery-bank", "appliance-monthly-energy"],
  fields: [
    { id: "panelW", label: "Panel rating", unit: "W", placeholder: "400" },
    { id: "sunHours", label: "Peak sun hours", unit: "hrs", placeholder: "5" },
    {
      id: "efficiency",
      label: "System efficiency",
      unit: "%",
      placeholder: "80",
      defaultValue: "80",
    },
  ],
  result: {
    label: "Daily energy yield",
    emptyMessage: "Enter panel W, sun hours & efficiency",
  },
  seo: {
    sections: [
      {
        heading: "Daily yield formula",
        body: "Daily Wh ≈ panel watts × peak sun hours × (efficiency ÷ 100). This estimates AC or battery energy after system losses.",
      },
      {
        heading: "Compare to load",
        body: "If yield is less than your daily consumption, add panels or reduce load. Pair with Solar Panel Size to work backward from load to required watts.",
      },
    ],
  },
  compute(values) {
    const panelW = parsePositive(values.panelW ?? "");
    const sunHours = parsePositive(values.sunHours ?? "");
    const efficiency = parsePositive(values.efficiency ?? "");
    if (panelW === null || sunHours === null || efficiency === null || efficiency > 100) {
      return { value: null };
    }
    const dailyWh = panelW * sunHours * (efficiency / 100);
    return {
      value: formatNumber(dailyWh, { maxDecimals: 0 }),
      unit: "Wh/day",
      detail: `${formatNumber(panelW, { maxDecimals: 0 })} W × ${formatNumber(sunHours, { maxDecimals: 1 })} h × ${efficiency}%`,
    };
  },
},
  {
    slug: "solar-battery-bank",
    href: "/solar-battery-bank",

  title: "Solar Battery Bank Size",
  description: "Size an off-grid battery bank from daily use and backup days.",
    keywords: ["solar battery bank", "off grid battery size", "solar storage"],
  icon: Sun,
  tag: "Solar",
  category: "solar",
  suggestions: ["solar-panel-size", "solar-daily-yield", "battery-bank-size"],
  fields: [
    { id: "dailyWh", label: "Daily energy use", unit: "Wh/day", placeholder: "3000" },
    { id: "days", label: "Autonomy days", unit: "days", placeholder: "2" },
    {
      id: "dod",
      label: "Usable depth of discharge",
      unit: "%",
      placeholder: "80",
      defaultValue: "80",
      hint: "LiFePO4 often 80–90%; lead-acid often 50%",
    },
  ],
  result: {
    label: "Minimum bank size",
    emptyMessage: "Enter daily use, days & DoD",
  },
  seo: {
    sections: [
      {
        heading: "Sizing formula",
        body: "Bank Wh = (daily Wh × autonomy days) ÷ (DoD ÷ 100). This is the minimum nameplate energy before efficiency losses.",
      },
      {
        heading: "Next steps",
        body: "Add 20% for inverter and wiring losses, then use the Battery Bank Ah calculator to convert to amp-hours at your system voltage.",
      },
    ],
  },
  compute(values) {
    const dailyWh = parsePositive(values.dailyWh ?? "");
    const days = parsePositive(values.days ?? "");
    const dod = parsePositive(values.dod ?? "");
    if (dailyWh === null || days === null || dod === null || dod > 100) {
      return { value: null };
    }
    const bankWh = (dailyWh * days) / (dod / 100);
    return {
      value: formatNumber(bankWh, { maxDecimals: 0 }),
      unit: "Wh",
      detail: `${formatNumber(dailyWh, { maxDecimals: 0 })} Wh/day × ${days} days @ ${dod}% DoD`,
    };
  },
},
  {
    slug: "ev-charging-cost",
    href: "/ev-charging-cost",

  title: "EV Charging Cost",
  description: "Estimate home charging cost from energy used and your utility rate.",
    keywords: ["ev charging cost", "electric car charging cost", "home ev charging"],
  icon: Car,
  tag: "EV",
  category: "ev",
  relatedArticleId: "ev-home-charging-cost",
  suggestions: ["ev-charge-time", "appliance-daily-cost", "appliance-monthly-energy"],
  fields: [
    { id: "kwh", label: "Energy delivered", unit: "kWh", placeholder: "60" },
    { id: "rate", label: "Electricity rate", unit: "$/kWh", placeholder: "0.15" },
  ],
  result: {
    label: "Charging cost",
    emptyMessage: "Enter kWh and rate",
  },
  seo: {
    sections: [
      {
        heading: "Cost formula",
        body: "Cost = kWh × $/kWh. Use the kWh drawn from the wall (including charging losses) for the most accurate bill estimate.",
      },
      {
        heading: "Time-of-use rates",
        body: "Many utilities charge less overnight. If your rate varies, run the calculation for off-peak and peak separately.",
      },
    ],
  },
  compute(values) {
    const kwh = parsePositive(values.kwh ?? "");
    const rate = parsePositive(values.rate ?? "");
    if (kwh === null || rate === null) return { value: null };
    const cost = kwh * rate;
    return {
      value: formatCurrency(cost),
      unit: "",
      detail: `${formatNumber(kwh, { maxDecimals: 1 })} kWh × $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
    };
  },
},
  {
    slug: "ev-charge-time",
    href: "/ev-charge-time",

  title: "EV Charge Time",
  description: "Estimate how long an EV charge takes at a given charger power.",
    keywords: ["ev charge time", "electric car charge time", "level 2 charging time"],
  icon: Car,
  tag: "EV",
  category: "ev",
  suggestions: ["ev-charging-cost", "battery-charging-time", "watts-to-amps"],
  fields: [
    { id: "kwh", label: "Energy needed", unit: "kWh", placeholder: "55" },
    { id: "chargerKw", label: "Charger power", unit: "kW", placeholder: "11" },
    {
      id: "efficiency",
      label: "Charging efficiency",
      unit: "%",
      placeholder: "90",
      defaultValue: "90",
    },
  ],
  result: {
    label: "Estimated charge time",
    emptyMessage: "Enter kWh, charger kW & efficiency",
  },
  seo: {
    sections: [
      {
        heading: "Charge time formula",
        body: "Hours ≈ kWh ÷ (kW × efficiency ÷ 100). Level 2 home chargers are often 7–11 kW; DC fast charging is much higher but rarely used for full 0–100% cycles.",
      },
      {
        heading: "Real-world taper",
        body: "The last 10–20% charges slower as the BMS balances cells. Add buffer time for a full charge, especially on cold days.",
      },
    ],
  },
  compute(values) {
    const kwh = parsePositive(values.kwh ?? "");
    const chargerKw = parsePositive(values.chargerKw ?? "");
    const efficiency = parsePositive(values.efficiency ?? "");
    if (kwh === null || chargerKw === null || efficiency === null || efficiency > 100) {
      return { value: null };
    }
    const hours = kwh / (chargerKw * (efficiency / 100));
    const duration = formatDuration(hours);
    return {
      value: duration.display,
      unit: duration.unit,
      detail: `${formatNumber(kwh, { maxDecimals: 0 })} kWh @ ${formatNumber(chargerKw, { maxDecimals: 1 })} kW · ${efficiency}% eff.`,
    };
  },
},
  {
    slug: "appliance-daily-cost",
    href: "/appliance-daily-cost",

  title: "Appliance Daily Cost",
  description: "Calculate daily electricity cost for any appliance from watts and runtime.",
    keywords: ["appliance daily cost", "electricity cost per day", "power cost"],
  icon: Refrigerator,
  tag: "Appliance",
  category: "appliance",
  suggestions: ["appliance-monthly-energy", "watts-to-amps", "ev-charging-cost"],
  fields: [
    { id: "watts", label: "Power draw", unit: "W", placeholder: "150" },
    { id: "hours", label: "Hours per day", unit: "hrs", placeholder: "24" },
    { id: "rate", label: "Electricity rate", unit: "$/kWh", placeholder: "0.15" },
  ],
  result: {
    label: "Daily cost",
    emptyMessage: "Enter watts, hours & rate",
  },
  seo: {
    sections: [
      {
        heading: "Daily cost formula",
        body: "kWh per day = (watts × hours) ÷ 1000. Daily cost = kWh × $/kWh. A 150 W device running 24 hours uses 3.6 kWh/day.",
      },
      {
        heading: "Find wattage",
        body: "Check the nameplate, manual, or a plug-in power meter. Compressors and heaters cycle on and off—use average watts for fridges and AC.",
      },
    ],
  },
  compute(values) {
    const watts = parsePositive(values.watts ?? "");
    const hours = parsePositive(values.hours ?? "");
    const rate = parsePositive(values.rate ?? "");
    if (watts === null || hours === null || rate === null) return { value: null };
    const kwh = (watts * hours) / 1000;
    const cost = kwh * rate;
    return {
      value: formatCurrency(cost),
      unit: "/day",
      detail: `${formatNumber(kwh, { maxDecimals: 2 })} kWh/day @ $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
    };
  },
},
  {
    slug: "appliance-monthly-energy",
    href: "/appliance-monthly-energy",

  title: "Appliance Monthly Energy",
  description: "Convert appliance watts and daily use into monthly kWh.",
    keywords: ["appliance monthly kwh", "monthly energy use", "kwh per month"],
  icon: Refrigerator,
  tag: "Appliance",
  category: "appliance",
  suggestions: ["appliance-daily-cost", "solar-daily-yield", "solar-panel-size"],
  fields: [
    { id: "watts", label: "Power draw", unit: "W", placeholder: "900" },
    { id: "hours", label: "Hours per day", unit: "hrs", placeholder: "3" },
  ],
  result: {
    label: "Monthly energy use",
    emptyMessage: "Enter watts and hours per day",
  },
  seo: {
    sections: [
      {
        heading: "Monthly kWh formula",
        body: "Monthly kWh = (watts × hours per day × 30) ÷ 1000. Adjust the 30-day factor if you prefer 365÷12 for an average month.",
      },
      {
        heading: "Stack your loads",
        body: "Run this for each major appliance and sum the results to estimate household consumption before sizing solar or batteries.",
      },
    ],
  },
  compute(values) {
    const watts = parsePositive(values.watts ?? "");
    const hours = parsePositive(values.hours ?? "");
    if (watts === null || hours === null) return { value: null };
    const monthlyKwh = (watts * hours * 30) / 1000;
    return {
      value: formatNumber(monthlyKwh, { maxDecimals: 1 }),
      unit: "kWh/mo",
      detail: `${formatNumber(watts, { maxDecimals: 0 })} W × ${formatNumber(hours, { maxDecimals: 1 })} h/day × 30 days`,
    };
  },
},
  {
    slug: "inverter-sizing",
    href: "/inverter-sizing",

  title: "Inverter Sizing",
  description: "Find minimum inverter size from peak load and safety margin.",
    keywords: ["inverter sizing", "inverter size calculator", "inverter watts"],
  icon: Cpu,
  tag: "Sizing",
  category: "sizing",
  suggestions: ["battery-bank-size", "watts-to-amps", "ups-runtime"],
  fields: [
    { id: "peakW", label: "Peak load", unit: "W", placeholder: "1800" },
    {
      id: "margin",
      label: "Safety margin",
      unit: "%",
      placeholder: "25",
      defaultValue: "25",
      hint: "Covers surge loads and future expansion",
    },
  ],
  result: {
    label: "Minimum inverter size",
    emptyMessage: "Enter peak load & margin",
  },
  seo: {
    sections: [
      {
        heading: "Inverter sizing formula",
        body: "Inverter W = peak load × (1 + margin ÷ 100). Motors and compressors can draw 2–3× surge at startup—consider a higher margin if you have pumps or fridges.",
      },
      {
        heading: "Continuous vs peak",
        body: "Inverter datasheets list continuous and peak (surge) watts. Size so peak rating covers motor start surges, not just steady-state load.",
      },
    ],
  },
  compute(values) {
    const peakW = parsePositive(values.peakW ?? "");
    const margin = parsePositive(values.margin ?? "");
    if (peakW === null || margin === null) return { value: null };
    const inverterW = peakW * (1 + margin / 100);
    return {
      value: formatNumber(inverterW, { maxDecimals: 0 }),
      unit: "W",
      detail: `${formatNumber(peakW, { maxDecimals: 0 })} W peak + ${margin}% margin`,
    };
  },
},
  {
    slug: "battery-cost",
    href: "/battery-cost",

  title: "Battery Cost Estimator",
  description: "Estimate pack cost from capacity, voltage, and price per watt-hour.",
    keywords: ["battery cost", "battery price calculator", "cost per wh"],
  icon: DollarSign,
  tag: "Cost",
  category: "cost",
  suggestions: ["ah-to-wh", "battery-charging-time", "solar-panel-size"],
  fields: [
    { id: "ah", label: "Capacity", unit: "Ah", placeholder: "100" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
    {
      id: "pricePerWh",
      label: "Price per Wh",
      unit: "$/Wh",
      placeholder: "0.15",
      hint: "Typical LiFePO4 packs: $0.10–$0.25/Wh",
    },
  ],
  result: {
    label: "Estimated cost",
    emptyMessage: "Enter Ah, voltage & $/Wh",
  },
  seo: {
    sections: [
      {
        heading: "Cost calculation",
        body: "Total cost = Ah × V × price per Wh. Energy (Wh) equals amp-hours times voltage, so you can compare packs of different voltages fairly.",
      },
      {
        heading: "Compare battery deals",
        body: "Divide pack price by rated Wh to get $/Wh. Lower is generally better, but consider cycle life, warranty, and BMS quality—not just upfront cost.",
      },
    ],
  },
  compute(values) {
    const ah = parsePositive(values.ah ?? "");
    const v = parsePositive(values.voltage ?? "");
    const price = parsePositive(values.pricePerWh ?? "");
    if (ah === null || v === null || price === null) return { value: null };

    const wh = ah * v;
    const cost = wh * price;
    return {
      value: formatCurrency(cost),
      unit: "",
      detail: `${formatNumber(wh, { maxDecimals: 0 })} Wh × $${formatNumber(price, { maxDecimals: 2 })}/Wh`,
    };
  },
},
  {
    slug: "ups-runtime",
    href: "/ups-runtime",

  title: "UPS Runtime",
  description: "Estimate backup time from battery energy and load power.",
    keywords: ["ups runtime", "backup time calculator", "ups battery life"],
  icon: Shield,
  tag: "Backup",
  category: "backup",
  suggestions: ["solar-backup-calculator", "battery-runtime", "amps-to-watts", "critical-load-analysis"],
  fields: [
    { id: "wh", label: "Battery energy", unit: "Wh", placeholder: "500" },
    { id: "load", label: "Load power", unit: "W", placeholder: "150" },
  ],
  result: {
    label: "Estimated backup time",
    emptyMessage: "Enter Wh and load watts",
  },
  seo: {
    sections: [
      {
        heading: "UPS runtime formula",
        body: "Runtime (hours) = battery watt-hours ÷ load watts. This assumes constant load and ignores inverter efficiency—real runtime is often 10–20% shorter.",
      },
      {
        heading: "Finding battery Wh",
        body: "Check your UPS specs for internal battery Wh, or multiply Ah × V. For a 12 V 42 Ah battery: 504 Wh.",
      },
    ],
  },
  compute(values) {
    const wh = parsePositive(values.wh ?? "");
    const load = parsePositive(values.load ?? "");
    if (wh === null || load === null) return { value: null };

    const hours = wh / load;
    const duration = formatDuration(hours);
    return {
      value: duration.display,
      unit: duration.unit,
      detail: `${formatNumber(wh, { maxDecimals: 0 })} Wh ÷ ${formatNumber(load, { maxDecimals: 0 })} W · ${duration.detail}`,
    };
  },
},
  // Batches 2–3: extra tools, EV, solar
  ...calculatorsExtra,
  ...calculatorsEv,
  ...calculatorsSolar,
  // Batch 5–6: battery & appliances
  ...calculatorsBattery,
  ...calculatorsAppliances,
  // Batch 4: commercial EV, RV/marine, tariffs, green home (19 tools)
  ...calculatorsCommercialEv,
  ...calculatorsRvMarine,
  ...calculatorsTariffs,
  ...calculatorsGreenHome,
  ...calculatorsEbike,
  ...calculatorsEscooter,
  ...calculatorsMobility,
] as const satisfies readonly CalculatorDataEntry[];

export type CalculatorSlug = (typeof calculators)[number]["slug"];
export const CALCULATOR_SLUGS: CalculatorSlug[] = calculators.map((c) => c.slug);

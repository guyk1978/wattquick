import {
  Activity,
  Bolt,
  Battery,
  BatteryLow,
  Cable,
  Car,
  DollarSign,
  Flame,
  Gauge,
  Plug,
  Refrigerator,
  Snowflake,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  formatCurrency,
  formatDuration,
  formatNumber,
  parseLatitude,
  parsePositive,
} from "@/lib/format";
import {
  calculateAcInrushCurrent,
  dcVoltageDropPercent,
  formatOhmsDetail,
  ohmsLawLabel,
  recommendDcAwg,
  solveOhmsLaw,
} from "@/lib/calculators/electrical";
import type { CalculatorDataEntry } from "@/data/calculator-types";

/** 20 additional calculators (batch 2) */
export const calculatorsExtra = [
  // —— Phase 1: Core electrical ——
  {
    slug: "ohms-law",
    href: "/ohms-law",
    title: "Ohm's Law Calculator",
    description:
      "Find voltage, current, or resistance when you know any two values (V = I × R).",
    keywords: ["ohms law calculator", "voltage current resistance", "ohm law"],
    icon: Activity,
    tag: "Power",
    category: "power",
    suggestions: ["watts-to-amps", "amps-to-watts", "volts-to-watts"],
    fields: [
      { id: "voltage", label: "Voltage", unit: "V", placeholder: "12", hint: "Leave blank to solve" },
      { id: "current", label: "Current", unit: "A", placeholder: "10", hint: "Leave blank to solve" },
      { id: "resistance", label: "Resistance", unit: "Ω", placeholder: "1.2", hint: "Leave blank to solve" },
    ],
    result: { label: "Calculated value", emptyMessage: "Enter any two values" },
    seo: {
      sections: [
        {
          heading: "Ohm's law formula",
          body: "Voltage (V) equals current (A) times resistance (Ω): V = I × R. Rearrange to find current (I = V ÷ R) or resistance (R = V ÷ I). Enter exactly two known values and leave the third empty.",
        },
        {
          heading: "When to use this tool",
          body: "Use Ohm's law for DC circuits, LED resistor sizing, fuse checks, and quick bench calculations. For power in watts, pair with the Watts to Amps or Volts to Watts calculators.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: How many values do I need? A: Exactly two—leave the unknown blank. Q: Does this work for AC? A: It applies to resistive AC loads; reactive loads need impedance, not just R.",
        },
      ],
    },
    compute(values) {
      const solved = solveOhmsLaw(
        values.voltage ?? "",
        values.current ?? "",
        values.resistance ?? ""
      );
      if (!solved) return { value: null };
      return {
        value: formatNumber(solved.value, { maxDecimals: 3 }),
        unit: solved.unit,
        detail: `${ohmsLawLabel(solved.variable)} · ${formatOhmsDetail(solved)}`,
      };
    },
  },
  {
    slug: "volts-to-watts",
    href: "/volts-to-watts",
    title: "Volts to Watts Calculator",
    description: "Convert voltage and current into electrical power in watts.",
    keywords: ["volts to watts", "voltage amps to watts", "power calculator"],
    icon: Zap,
    tag: "Power",
    category: "power",
    suggestions: ["watts-to-volts", "amps-to-watts", "watts-to-amps"],
    fields: [
      { id: "voltage", label: "Voltage", unit: "V", placeholder: "120" },
      { id: "amps", label: "Current", unit: "A", placeholder: "15" },
    ],
    result: { label: "Power", emptyMessage: "Enter voltage and current" },
    seo: {
      sections: [
        {
          heading: "Volts to watts formula",
          body: "Power (watts) = voltage (volts) × current (amps): W = V × A. Example: 120 V at 15 A is 1,800 W.",
        },
        {
          heading: "Practical uses",
          body: "Size breakers, estimate heat output, or compare loads before using the Energy Consumption calculator for kWh over time.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this for DC or AC? A: The formula W = V × A works for both; AC real power also depends on power factor for non-resistive loads.",
        },
      ],
    },
    compute(values) {
      const v = parsePositive(values.voltage ?? "");
      const a = parsePositive(values.amps ?? "");
      if (v === null || a === null) return { value: null };
      const w = v * a;
      return {
        value: formatNumber(w, { maxDecimals: 1 }),
        unit: "W",
        detail: `${formatNumber(v, { maxDecimals: 1 })} V × ${formatNumber(a, { maxDecimals: 2 })} A`,
      };
    },
  },
  {
    slug: "watts-to-volts",
    href: "/watts-to-volts",
    title: "Watts to Volts Calculator",
    description: "Find voltage from power and current (V = W ÷ A).",
    keywords: ["watts to volts", "power to voltage", "voltage from watts"],
    icon: Zap,
    tag: "Power",
    category: "power",
    suggestions: ["volts-to-watts", "watts-to-amps", "ohms-law"],
    fields: [
      { id: "watts", label: "Power", unit: "W", placeholder: "1800" },
      { id: "amps", label: "Current", unit: "A", placeholder: "15" },
    ],
    result: { label: "Voltage", emptyMessage: "Enter watts and current" },
    seo: {
      sections: [
        {
          heading: "Watts to volts formula",
          body: "Voltage = watts ÷ amps: V = W ÷ A. If a load draws 1,800 W at 15 A, the system voltage is 120 V.",
        },
        {
          heading: "When this helps",
          body: "Useful when you know appliance wattage and measured current but need nominal circuit voltage, or when verifying inverter output.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Can current be zero? A: No—division by zero is undefined. Enter a positive current value.",
        },
      ],
    },
    compute(values) {
      const w = parsePositive(values.watts ?? "");
      const a = parsePositive(values.amps ?? "");
      if (w === null || a === null) return { value: null };
      const v = w / a;
      return {
        value: formatNumber(v, { maxDecimals: 2 }),
        unit: "V",
        detail: `${formatNumber(w, { maxDecimals: 0 })} W ÷ ${formatNumber(a, { maxDecimals: 2 })} A`,
      };
    },
  },
  {
    slug: "power-factor",
    href: "/power-factor",
    title: "Power Factor Calculator",
    description: "Calculate power factor from real power (kW) and apparent power (kVA).",
    keywords: ["power factor calculator", "kw kva power factor", "pf calculator"],
    icon: Gauge,
    tag: "Power",
    category: "power",
    suggestions: ["kva-to-kw", "inverter-sizing", "watts-to-amps"],
    fields: [
      { id: "kw", label: "Real power", unit: "kW", placeholder: "8" },
      { id: "kva", label: "Apparent power", unit: "kVA", placeholder: "10" },
    ],
    result: { label: "Power factor", emptyMessage: "Enter kW and kVA" },
    seo: {
      sections: [
        {
          heading: "Power factor formula",
          body: "Power factor = real power ÷ apparent power: PF = kW ÷ kVA. A PF of 0.8 means 80% of apparent power does useful work.",
        },
        {
          heading: "Why power factor matters",
          body: "Low PF increases current draw on feeders and may incur utility penalties. Motors and fluorescent loads often need correction capacitors.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Can PF exceed 1? A: No—enter kW ≤ kVA. Q: Is PF the same as efficiency? A: No; PF is the phase relationship between V and I, not heat loss.",
        },
      ],
    },
    compute(values) {
      const kw = parsePositive(values.kw ?? "");
      const kva = parsePositive(values.kva ?? "");
      if (kw === null || kva === null || kw > kva) return { value: null };
      const pf = kw / kva;
      return {
        value: formatNumber(pf, { maxDecimals: 3 }),
        unit: "",
        detail: `${formatNumber(kw, { maxDecimals: 2 })} kW ÷ ${formatNumber(kva, { maxDecimals: 2 })} kVA`,
      };
    },
  },
  {
    slug: "energy-consumption",
    href: "/energy-consumption",
    title: "Energy Consumption Calculator",
    description: "Estimate total kWh from watts, hours per day, and number of days.",
    keywords: ["energy consumption calculator", "kwh usage", "watts to kwh"],
    icon: Plug,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["appliance-monthly-energy", "electricity-bill", "appliance-daily-cost"],
    fields: [
      { id: "watts", label: "Power draw", unit: "W", placeholder: "1500" },
      { id: "hoursPerDay", label: "Hours per day", unit: "hrs", placeholder: "8" },
      { id: "days", label: "Days", unit: "days", placeholder: "30" },
    ],
    result: { label: "Energy used", emptyMessage: "Enter watts, hours & days" },
    seo: {
      sections: [
        {
          heading: "kWh formula",
          body: "kWh = (watts × hours per day × days) ÷ 1,000. Example: 1,500 W for 8 h/day over 30 days ≈ 360 kWh.",
        },
        {
          heading: "Plan your bill",
          body: "Multiply kWh by your utility rate in the Electricity Bill Estimator, or use Appliance Daily Cost for single-day estimates.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Should I use nameplate watts? A: Use measured or average draw when possible—nameplate is often higher than real use.",
        },
      ],
    },
    compute(values) {
      const watts = parsePositive(values.watts ?? "");
      const hours = parsePositive(values.hoursPerDay ?? "");
      const days = parsePositive(values.days ?? "");
      if (watts === null || hours === null || days === null) return { value: null };
      const kwh = (watts * hours * days) / 1000;
      return {
        value: formatNumber(kwh, { maxDecimals: 2 }),
        unit: "kWh",
        detail: `${formatNumber(watts, { maxDecimals: 0 })} W × ${hours} h/day × ${days} days`,
      };
    },
  },
  // —— Phase 2: Battery + solar ——
  {
    slug: "battery-energy",
    href: "/battery-energy",
    title: "Battery Energy Calculator",
    description: "Calculate battery energy in watt-hours from amp-hours and voltage.",
    keywords: ["battery energy calculator", "wh from ah", "battery wh"],
    icon: Battery,
    tag: "Battery",
    category: "battery",
    suggestions: ["ah-to-wh", "battery-runtime", "battery-bank-size"],
    fields: [
      { id: "ah", label: "Capacity", unit: "Ah", placeholder: "100" },
      { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
    ],
    result: { label: "Stored energy", emptyMessage: "Enter Ah and voltage" },
    seo: {
      sections: [
        {
          heading: "Battery energy formula",
          body: "Watt-hours = amp-hours × voltage: Wh = Ah × V. A 100 Ah 12 V battery stores 1,200 Wh (1.2 kWh).",
        },
        {
          heading: "Compare packs fairly",
          body: "Wh is the best metric for comparing different voltages. Use Battery Runtime once you know load watts.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this the usable energy? A: No—usable energy depends on depth of discharge and chemistry. See the DoD calculator.",
        },
      ],
    },
    compute(values) {
      const ah = parsePositive(values.ah ?? "");
      const v = parsePositive(values.voltage ?? "");
      if (ah === null || v === null) return { value: null };
      const wh = ah * v;
      return {
        value: formatNumber(wh, { maxDecimals: 0 }),
        unit: "Wh",
        detail: `${formatNumber(ah, { maxDecimals: 1 })} Ah × ${formatNumber(v, { maxDecimals: 1 })} V`,
      };
    },
  },
  {
    slug: "battery-depth-of-discharge",
    href: "/battery-depth-of-discharge",
    title: "Battery Depth of Discharge Calculator",
    description: "Calculate how much of a battery's capacity has been used (DoD %).",
    keywords: ["depth of discharge", "battery dod calculator", "discharge percentage"],
    icon: BatteryLow,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-percentage", "solar-battery-bank", "battery-energy"],
    fields: [
      { id: "used", label: "Energy used", unit: "Wh", placeholder: "600" },
      { id: "total", label: "Total capacity", unit: "Wh", placeholder: "1200" },
    ],
    result: { label: "Depth of discharge", emptyMessage: "Enter used and total Wh" },
    seo: {
      sections: [
        {
          heading: "DoD formula",
          body: "Depth of discharge (%) = (energy used ÷ total capacity) × 100. A 600 Wh draw from a 1,200 Wh pack is 50% DoD.",
        },
        {
          heading: "Battery life tip",
          body: "Lithium often allows 80–90% DoD daily; lead-acid is typically limited to 50% for longevity. Size banks using the Solar Battery Bank calculator.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is DoD the same as 100% minus state of charge? A: Yes—50% DoD means 50% charge remains.",
        },
      ],
    },
    compute(values) {
      const used = parsePositive(values.used ?? "");
      const total = parsePositive(values.total ?? "");
      if (used === null || total === null || used > total) return { value: null };
      const dod = (used / total) * 100;
      return {
        value: formatNumber(dod, { maxDecimals: 1 }),
        unit: "% DoD",
        detail: `${formatNumber(used, { maxDecimals: 0 })} Wh of ${formatNumber(total, { maxDecimals: 0 })} Wh`,
      };
    },
  },
  {
    slug: "battery-efficiency",
    href: "/battery-efficiency",
    title: "Battery Efficiency Calculator",
    description: "Calculate round-trip efficiency from energy out and energy in.",
    keywords: ["battery efficiency calculator", "round trip efficiency", "battery loss"],
    icon: TrendingUp,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-charging-time", "battery-energy", "solar-inverter-efficiency"],
    fields: [
      { id: "output", label: "Energy out", unit: "Wh", placeholder: "950" },
      { id: "input", label: "Energy in", unit: "Wh", placeholder: "1000" },
    ],
    result: { label: "Efficiency", emptyMessage: "Enter output and input Wh" },
    seo: {
      sections: [
        {
          heading: "Efficiency formula",
          body: "Efficiency (%) = (energy out ÷ energy in) × 100. Charging 1,000 Wh and getting 950 Wh back is 95% efficiency.",
        },
        {
          heading: "What affects efficiency",
          body: "Heat, BMS losses, and Peukert effect reduce real-world efficiency. Lithium is often 95%+; lead-acid can be 80–85%.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Can efficiency exceed 100%? A: No—output cannot exceed input in a passive battery system.",
        },
      ],
    },
    compute(values) {
      const out = parsePositive(values.output ?? "");
      const input = parsePositive(values.input ?? "");
      if (out === null || input === null || out > input) return { value: null };
      const eff = (out / input) * 100;
      return {
        value: formatNumber(eff, { maxDecimals: 1 }),
        unit: "%",
        detail: `${formatNumber(out, { maxDecimals: 0 })} Wh ÷ ${formatNumber(input, { maxDecimals: 0 })} Wh`,
      };
    },
  },
  {
    slug: "solar-charge-controller-size",
    href: "/solar-charge-controller-size",
    title: "Solar Charge Controller Size Calculator",
    description: "Estimate minimum charge controller amperage from panel watts and system voltage.",
    keywords: ["solar charge controller size", "mppt sizing", "controller amps"],
    icon: Sun,
    tag: "Solar",
    category: "solar",
    suggestions: ["solar-panel-size", "solar-array-current", "solar-battery-bank"],
    fields: [
      { id: "panelW", label: "Total panel watts", unit: "W", placeholder: "800" },
      { id: "voltage", label: "Battery voltage", unit: "V", placeholder: "12" },
      {
        id: "margin",
        label: "Safety margin",
        unit: "%",
        placeholder: "25",
        defaultValue: "25",
      },
    ],
    result: { label: "Minimum controller", emptyMessage: "Enter panel W and voltage" },
    seo: {
      sections: [
        {
          heading: "Sizing method",
          body: "Controller amps ≈ (panel watts ÷ battery voltage) × (1 + safety margin). Short-circuit current (Isc) on panels can be higher—check module specs.",
        },
        {
          heading: "MPPT vs PWM",
          body: "MPPT controllers handle higher Voc and extract more energy in cold weather. PWM is simpler for small 12 V systems with matched panels.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why add margin? A: Panel output can exceed STC in cold sun; margin avoids clipping and overheating the controller.",
        },
      ],
    },
    compute(values) {
      const panelW = parsePositive(values.panelW ?? "");
      const voltage = parsePositive(values.voltage ?? "");
      const margin = parsePositive(values.margin ?? "") ?? 25;
      if (panelW === null || voltage === null) return { value: null };
      const amps = (panelW / voltage) * (1 + margin / 100);
      return {
        value: formatNumber(amps, { maxDecimals: 0 }),
        unit: "A min.",
        detail: `${formatNumber(panelW, { maxDecimals: 0 })} W ÷ ${voltage} V + ${margin}% margin`,
      };
    },
  },
  {
    slug: "solar-inverter-efficiency",
    href: "/solar-inverter-efficiency",
    title: "Solar Inverter Efficiency Calculator",
    description: "Calculate inverter efficiency from AC output and DC input power.",
    keywords: ["inverter efficiency calculator", "solar inverter loss", "dc to ac efficiency"],
    icon: Sun,
    tag: "Solar",
    category: "solar",
    suggestions: ["inverter-sizing", "solar-daily-yield", "battery-efficiency"],
    fields: [
      { id: "acOut", label: "AC output", unit: "W", placeholder: "2850" },
      { id: "dcIn", label: "DC input", unit: "W", placeholder: "3000" },
    ],
    result: { label: "Inverter efficiency", emptyMessage: "Enter AC out and DC in" },
    seo: {
      sections: [
        {
          heading: "Efficiency formula",
          body: "Efficiency (%) = (AC output ÷ DC input) × 100. Modern grid-tie inverters are often 96–98% at rated load.",
        },
        {
          heading: "Partial load losses",
          body: "Efficiency drops at very low load. Size inverters near typical operating power for best yield.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Does this include MPPT gain? A: This is conversion efficiency only—MPPT harvest is separate from DC-to-AC conversion.",
        },
      ],
    },
    compute(values) {
      const ac = parsePositive(values.acOut ?? "");
      const dc = parsePositive(values.dcIn ?? "");
      if (ac === null || dc === null || ac > dc) return { value: null };
      const eff = (ac / dc) * 100;
      return {
        value: formatNumber(eff, { maxDecimals: 1 }),
        unit: "%",
        detail: `${formatNumber(ac, { maxDecimals: 0 })} W AC ÷ ${formatNumber(dc, { maxDecimals: 0 })} W DC`,
      };
    },
  },
  {
    slug: "solar-array-current",
    href: "/solar-array-current",
    title: "Solar Array Current Calculator",
    description: "Estimate array current from total panel watts and system voltage.",
    keywords: ["solar array current", "pv string current", "panel amps calculator"],
    icon: Sun,
    tag: "Solar",
    category: "solar",
    suggestions: ["solar-charge-controller-size", "watts-to-amps", "solar-panel-size"],
    fields: [
      { id: "panelW", label: "Array watts", unit: "W", placeholder: "1200" },
      { id: "voltage", label: "Operating voltage", unit: "V", placeholder: "48" },
    ],
    result: { label: "Array current", emptyMessage: "Enter watts and voltage" },
    seo: {
      sections: [
        {
          heading: "Current estimate",
          body: "Current (A) ≈ array watts ÷ operating voltage. Use nominal MPPT voltage for string calculations, not open-circuit Voc.",
        },
        {
          heading: "Wire and fuse sizing",
          body: "Size conductors for 125% of continuous current where code requires. Pair with the DC Cable Size calculator for battery-side wiring.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Should I use Isc or Imp? A: This tool uses power/voltage (~Imp). Fuse sizing often references Isc from panel labels.",
        },
      ],
    },
    compute(values) {
      const w = parsePositive(values.panelW ?? "");
      const v = parsePositive(values.voltage ?? "");
      if (w === null || v === null) return { value: null };
      const amps = w / v;
      return {
        value: formatNumber(amps, { maxDecimals: 2 }),
        unit: "A",
        detail: `${formatNumber(w, { maxDecimals: 0 })} W ÷ ${formatNumber(v, { maxDecimals: 0 })} V`,
      };
    },
  },
  {
    slug: "solar-panel-tilt",
    href: "/solar-panel-tilt",
    title: "Solar Panel Tilt Calculator",
    description: "Recommended panel tilt angle based on your latitude (year-round estimate).",
    keywords: ["solar panel tilt angle", "optimal tilt calculator", "panel angle latitude"],
    icon: Sun,
    tag: "Solar",
    category: "solar",
    suggestions: ["solar-panel-size", "solar-daily-yield", "solar-array-current"],
    fields: [
      {
        id: "latitude",
        label: "Latitude",
        unit: "°",
        placeholder: "40",
        hint: "Positive for north, negative for south",
      },
    ],
    result: { label: "Recommended tilt", emptyMessage: "Enter latitude" },
    seo: {
      sections: [
        {
          heading: "Tilt rule of thumb",
          body: "For year-round fixed mounts, tilt ≈ latitude (absolute value). Example: 40°N → about 40° tilt from horizontal.",
        },
        {
          heading: "Seasonal adjustments",
          body: "Summer: latitude − 15°. Winter: latitude + 15°. Adjust azimuth toward equator for best annual yield.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this exact? A: It's a starting estimate—local shading, roof pitch, and utility TOU may favor different angles.",
        },
      ],
    },
    compute(values) {
      const lat = parseLatitude(values.latitude ?? "");
      if (lat === null) return { value: null };
      const tilt = Math.abs(lat);
      return {
        value: formatNumber(tilt, { maxDecimals: 0 }),
        unit: "°",
        detail: `Year-round fixed mount ≈ |latitude| (${formatNumber(lat, { maxDecimals: 1 })}°)`,
      };
    },
  },
  // —— Phase 3: EV ——
  {
    slug: "ev-cost-per-mile",
    href: "/ev-cost-per-mile",
    title: "EV Cost Per Mile Calculator",
    description: "Estimate driving cost from electricity rate and energy used per mile.",
    keywords: ["ev cost per mile", "electric car cost mile", "ev charging cost mile"],
    icon: Car,
    tag: "EV",
    category: "ev",
    suggestions: ["ev-charging-cost", "ev-battery-range", "energy-consumption"],
    fields: [
      { id: "kwhPerMile", label: "Energy per mile", unit: "kWh/mi", placeholder: "0.30" },
      { id: "rate", label: "Electricity rate", unit: "$/kWh", placeholder: "0.15" },
    ],
    result: { label: "Cost per mile", emptyMessage: "Enter kWh/mi and rate" },
    seo: {
      sections: [
        {
          heading: "Cost per mile formula",
          body: "Cost/mile = kWh per mile × $/kWh. At $0.15/kWh and 0.30 kWh/mi, driving costs about $0.045 per mile.",
        },
        {
          heading: "Find kWh per mile",
          body: "Divide kWh per 100 miles by 100, or check your EV's trip meter. Compare to gas using local fuel prices.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Does this include charging loss? A: Use metered kWh from your bill for best accuracy—wall losses add ~5–10%.",
        },
      ],
    },
    compute(values) {
      const kwhMi = parsePositive(values.kwhPerMile ?? "");
      const rate = parsePositive(values.rate ?? "");
      if (kwhMi === null || rate === null) return { value: null };
      const cost = kwhMi * rate;
      return {
        value: formatCurrency(cost),
        unit: "/mi",
        detail: `${formatNumber(kwhMi, { maxDecimals: 3 })} kWh/mi × $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
      };
    },
  },
  {
    slug: "ev-battery-range",
    href: "/ev-battery-range",
    title: "EV Battery Range Calculator",
    description: "Estimate driving range from battery size, efficiency, and consumption.",
    keywords: ["ev range calculator", "electric car range", "battery range miles"],
    icon: Car,
    tag: "EV",
    category: "ev",
    suggestions: ["ev-cost-per-mile", "ev-charge-time", "battery-energy"],
    fields: [
      { id: "kwh", label: "Battery capacity", unit: "kWh", placeholder: "75" },
      {
        id: "efficiency",
        label: "Usable capacity",
        unit: "%",
        placeholder: "90",
        defaultValue: "90",
        hint: "Account for buffer & aging",
      },
      { id: "kwhPerMile", label: "Consumption", unit: "kWh/mi", placeholder: "0.32" },
    ],
    result: { label: "Estimated range", emptyMessage: "Enter kWh, usable % & kWh/mi" },
    seo: {
      sections: [
        {
          heading: "Range formula",
          body: "Range (miles) = (battery kWh × usable %) ÷ kWh per mile. A 75 kWh pack at 90% usable and 0.32 kWh/mi ≈ 211 miles.",
        },
        {
          heading: "Real-world range",
          body: "Cold weather, speed, and terrain reduce range. EPA ratings are tested cycles—your consumption may differ.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why not use 100% capacity? A: Most EVs reserve buffer; 90% is a practical planning figure.",
        },
      ],
    },
    compute(values) {
      const kwh = parsePositive(values.kwh ?? "");
      const eff = parsePositive(values.efficiency ?? "");
      const kwhMi = parsePositive(values.kwhPerMile ?? "");
      if (kwh === null || eff === null || kwhMi === null || eff > 100) return { value: null };
      const miles = (kwh * (eff / 100)) / kwhMi;
      return {
        value: formatNumber(miles, { maxDecimals: 0 }),
        unit: "miles",
        detail: `${kwh} kWh × ${eff}% ÷ ${formatNumber(kwhMi, { maxDecimals: 3 })} kWh/mi`,
      };
    },
  },
  {
    slug: "ev-level1-vs-level2",
    href: "/ev-level1-vs-level2",
    title: "Level 1 vs Level 2 EV Charging Time",
    description: "Compare how long the same charge takes on Level 1 and Level 2 home charging.",
    keywords: ["level 1 vs level 2 charging", "ev charge time comparison", "home ev charging"],
    icon: Car,
    tag: "EV",
    category: "ev",
    suggestions: ["ev-charge-time", "ev-charging-cost", "ev-battery-range"],
    fields: [
      { id: "kwh", label: "Energy to add", unit: "kWh", placeholder: "50" },
      {
        id: "level1kw",
        label: "Level 1 power",
        unit: "kW",
        placeholder: "1.4",
        defaultValue: "1.4",
      },
      {
        id: "level2kw",
        label: "Level 2 power",
        unit: "kW",
        placeholder: "7.2",
        defaultValue: "7.2",
      },
    ],
    result: { label: "Level 2 charge time", emptyMessage: "Enter kWh and charger kW" },
    seo: {
      sections: [
        {
          heading: "Charge time formula",
          body: "Hours = kWh ÷ kW (ignoring losses). Level 1 (~1.4 kW) is slow overnight; Level 2 (6–11 kW) suits daily top-ups.",
        },
        {
          heading: "Which to install",
          body: "If you drive under ~40 miles/day, Level 1 may suffice. Higher mileage or large packs benefit from a 240 V Level 2 circuit.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Are times exact? A: Add ~10% for charging losses. Cold batteries may charge slower at high SOC.",
        },
      ],
    },
    compute(values) {
      const kwh = parsePositive(values.kwh ?? "");
      const l1 = parsePositive(values.level1kw ?? "");
      const l2 = parsePositive(values.level2kw ?? "");
      if (kwh === null || l1 === null || l2 === null) return { value: null };
      const h1 = kwh / l1;
      const h2 = kwh / l2;
      const d2 = formatDuration(h2);
      return {
        value: d2.display,
        unit: d2.unit,
        detail: `Level 1: ${formatDuration(h1).display} ${formatDuration(h1).unit} · Level 2: ${d2.display} ${d2.unit}`,
      };
    },
  },
  // —— Phase 4: Appliance + home ——
  {
    slug: "electricity-bill",
    href: "/electricity-bill",
    title: "Electricity Bill Estimator",
    description: "Estimate your bill from total kWh usage and rate per kWh.",
    keywords: ["electricity bill calculator", "kwh bill estimate", "utility bill estimator"],
    icon: DollarSign,
    tag: "Cost",
    category: "cost",
    suggestions: ["energy-consumption", "appliance-monthly-energy", "appliance-daily-cost"],
    fields: [
      { id: "kwh", label: "Energy used", unit: "kWh", placeholder: "850" },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: { label: "Estimated bill", emptyMessage: "Enter kWh and rate" },
    seo: {
      sections: [
        {
          heading: "Bill formula",
          body: "Bill = kWh × $/kWh. Fixed fees, tiers, and taxes are not included—check your utility tariff for exact amounts.",
        },
        {
          heading: "Reduce usage",
          body: "Use Energy Consumption or Appliance Monthly Energy to find heavy loads before the next billing cycle.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why is my real bill higher? A: Delivery charges, demand fees, and tiered rates can add significantly to energy-only math.",
        },
      ],
    },
    compute(values) {
      const kwh = parsePositive(values.kwh ?? "");
      const rate = parsePositive(values.rate ?? "");
      if (kwh === null || rate === null) return { value: null };
      const bill = kwh * rate;
      return {
        value: formatCurrency(bill),
        unit: "",
        detail: `${formatNumber(kwh, { maxDecimals: 0 })} kWh × $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
      };
    },
  },
  {
    slug: "heater-cost",
    href: "/heater-cost",
    title: "Electric Heater Cost Calculator",
    description: "Estimate heating cost from wattage, run hours, days, and electricity rate.",
    keywords: ["electric heater cost", "space heater cost calculator", "heating cost kwh"],
    icon: Flame,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["appliance-daily-cost", "electricity-bill", "energy-consumption"],
    fields: [
      { id: "watts", label: "Heater power", unit: "W", placeholder: "1500" },
      { id: "hours", label: "Hours per day", unit: "hrs", placeholder: "6" },
      { id: "days", label: "Days", unit: "days", placeholder: "30" },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: { label: "Estimated cost", emptyMessage: "Enter watts, hours, days & rate" },
    seo: {
      sections: [
        {
          heading: "Heater cost formula",
          body: "Cost = (watts × hours × days ÷ 1,000) × $/kWh. A 1,500 W heater running 6 h/day for 30 days at $0.14/kWh ≈ $37.80.",
        },
        {
          heading: "Save on heating",
          body: "Lower thermostat settings, zone heating, and insulation reduce run hours more than undersizing wattage.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is 1,500 W typical? A: Many portable heaters are 1,500 W on high—check your nameplate.",
        },
      ],
    },
    compute(values) {
      const watts = parsePositive(values.watts ?? "");
      const hours = parsePositive(values.hours ?? "");
      const days = parsePositive(values.days ?? "");
      const rate = parsePositive(values.rate ?? "");
      if (watts === null || hours === null || days === null || rate === null) return { value: null };
      const kwh = (watts * hours * days) / 1000;
      const cost = kwh * rate;
      return {
        value: formatCurrency(cost),
        unit: "",
        detail: `${formatNumber(kwh, { maxDecimals: 1 })} kWh · ${formatNumber(watts, { maxDecimals: 0 })} W × ${hours} h × ${days} d`,
      };
    },
  },
  {
    slug: "ac-energy-cost",
    href: "/ac-energy-cost",
    title: "Air Conditioner Energy Cost Calculator",
    description: "Estimate monthly AC electricity cost from watts, daily hours, and rate.",
    keywords: ["ac energy cost", "air conditioner cost calculator", "cooling cost kwh"],
    icon: Snowflake,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["heater-cost", "electricity-bill", "appliance-monthly-energy"],
    fields: [
      { id: "watts", label: "AC power draw", unit: "W", placeholder: "1200" },
      { id: "hours", label: "Hours per day", unit: "hrs", placeholder: "8" },
      { id: "days", label: "Days", unit: "days", placeholder: "30" },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: { label: "Estimated cost", emptyMessage: "Enter watts, hours, days & rate" },
    seo: {
      sections: [
        {
          heading: "AC cost formula",
          body: "Monthly cost = (watts × hours/day × days ÷ 1,000) × $/kWh. Duty cycle varies—use average watts if the compressor cycles.",
        },
        {
          heading: "SEER and sizing",
          body: "Oversized or inefficient units cost more. Compare SEER ratings when replacing equipment.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Should I use rated BTU? A: Use measured or estimated watts; BTU/h ÷ 3.412 ≈ watts for rough conversion.",
        },
      ],
    },
    compute(values) {
      const watts = parsePositive(values.watts ?? "");
      const hours = parsePositive(values.hours ?? "");
      const days = parsePositive(values.days ?? "");
      const rate = parsePositive(values.rate ?? "");
      if (watts === null || hours === null || days === null || rate === null) return { value: null };
      const kwh = (watts * hours * days) / 1000;
      const cost = kwh * rate;
      return {
        value: formatCurrency(cost),
        unit: "",
        detail: `${formatNumber(kwh, { maxDecimals: 1 })} kWh · ${formatNumber(watts, { maxDecimals: 0 })} W avg.`,
      };
    },
  },
  {
    slug: "fridge-energy-usage",
    href: "/fridge-energy-usage",
    title: "Refrigerator Energy Usage Calculator",
    description: "Estimate refrigerator kWh and cost from wattage and electricity rate.",
    keywords: ["refrigerator energy calculator", "fridge kwh usage", "fridge electricity cost"],
    icon: Refrigerator,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["appliance-monthly-energy", "electricity-bill", "energy-consumption"],
    fields: [
      {
        id: "watts",
        label: "Average power",
        unit: "W",
        placeholder: "150",
        hint: "Typical running average, not peak",
      },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: { label: "Monthly estimate", emptyMessage: "Enter watts and rate" },
    seo: {
      sections: [
        {
          heading: "Fridge energy estimate",
          body: "Monthly kWh ≈ (watts × 24 × 30) ÷ 1,000. Compressors cycle—150 W average is common for modern fridges.",
        },
        {
          heading: "Energy Star tip",
          body: "Older units can use 2× the energy of Energy Star models. Check the yellow EnergyGuide label for rated kWh/year.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why 24 hours? A: Fridges run intermittently all day; average watts accounts for on/off cycles.",
        },
      ],
    },
    compute(values) {
      const watts = parsePositive(values.watts ?? "");
      const rate = parsePositive(values.rate ?? "");
      if (watts === null || rate === null) return { value: null };
      const kwh = (watts * 24 * 30) / 1000;
      const cost = kwh * rate;
      return {
        value: formatNumber(kwh, { maxDecimals: 0 }),
        unit: "kWh/mo",
        detail: `≈ ${formatCurrency(cost)}/mo at $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
      };
    },
  },
  {
    slug: "dc-cable-size",
    href: "/dc-cable-size",
    title: "DC Cable Size Calculator",
    description: "Recommend DC wire gauge from current, one-way length, and system voltage.",
    keywords: ["dc wire size calculator", "dc cable gauge", "battery wire sizing"],
    icon: Cable,
    tag: "Sizing",
    category: "sizing",
    suggestions: ["watts-to-amps", "battery-bank-size", "solar-array-current"],
    fields: [
      { id: "amps", label: "Load current", unit: "A", placeholder: "40" },
      { id: "length", label: "One-way length", unit: "ft", placeholder: "20" },
      { id: "voltage", label: "System voltage", unit: "V", placeholder: "12" },
    ],
    result: { label: "Recommended AWG", emptyMessage: "Enter amps, length & voltage" },
    seo: {
      sections: [
        {
          heading: "DC wire sizing basics",
          body: "Undersized wire causes voltage drop and heat. This tool picks a conservative AWG from ampacity tables, then checks ~3% drop over your run length.",
        },
        {
          heading: "When to go larger",
          body: "Inverters, motors, and lithium charging spikes may need the next size up. Follow local electrical code for final installs.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: One-way or round-trip length? A: Enter one-way distance; drop math uses round-trip resistance. Q: Copper only? A: Yes—aluminum needs larger gauge.",
        },
      ],
    },
    compute(values) {
      const amps = parsePositive(values.amps ?? "");
      const length = parsePositive(values.length ?? "");
      const voltage = parsePositive(values.voltage ?? "");
      if (amps === null || length === null || voltage === null) return { value: null };
      const awg = recommendDcAwg(amps);
      const drop = dcVoltageDropPercent(amps, length, voltage, awg);
      const dropNote =
        drop !== null
          ? ` · ~${formatNumber(drop, { maxDecimals: 1 })}% voltage drop`
          : "";
      return {
        value: awg,
        unit: "AWG",
        detail: `${formatNumber(amps, { maxDecimals: 0 })} A · ${length} ft one-way @ ${voltage} V${dropNote}`,
      };
    },
  },
  {
    slug: "ac-inrush-current",
    href: "/ac-inrush-current",
    title: "AC Inrush Current Limit Calculator",
    description:
      "Find nominal amps, peak motor inrush, and recommended breaker size with B/C/D curve guidance.",
    keywords: [
      "inrush current calculator",
      "motor starting amps",
      "breaker sizing inrush",
      "type c breaker motor",
      "nuisance trip breaker",
    ],
    icon: Bolt,
    tag: "Power",
    category: "power",
    suggestions: [
      "watts-to-amps",
      "amps-to-watts",
      "residential-voltage-drop",
    ],
    fields: [
      {
        id: "nominalPowerW",
        label: "Nominal power",
        unit: "W",
        placeholder: "1800",
        hint: "Running or nameplate steady-state watts",
      },
      {
        id: "operatingVoltageV",
        label: "Operating voltage",
        unit: "V",
        placeholder: "120",
        hint: "Line voltage the load sees (120 or 230/240)",
      },
      {
        id: "inrushFactor",
        label: "Inrush factor",
        unit: "×",
        placeholder: "6",
        defaultValue: "6",
        hint: "Peak ÷ running current — motors often 5–7×",
      },
    ],
    result: {
      label: "Peak inrush current",
      emptyMessage: "Enter watts, voltage & inrush factor",
    },
    seo: {
      sections: [
        {
          heading: "Why inrush trips breakers",
          body: "Motors, transformers, and SMPS draw brief startup current many times higher than running amps. Thermal breaker curves allow short magnetic overload—if inrush exceeds the magnetic trip band, the breaker opens even though steady-state amps are fine.",
        },
        {
          heading: "Formulas",
          body: "I_run = P ÷ V. I_peak = I_run × inrush factor. Breaker ≥ max(1.25 × I_run, I_peak ÷ magnetic multiple for curve type). Type B ~5×, Type C ~7.5×, Type D ~12.5× rated current for instantaneous region (planning).",
        },
        {
          heading: "Curve selection",
          body: "Resistive loads: Type B. Small motors and compressors: Type C. High inrush tools and large motors: Type D. Always verify local code, manufacturer data, and coordinated protection.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Duration of inrush? A: Often 50–200 ms—this tool sizes breaker class, not time-current curves. Q: Power factor? A: Use nameplate running watts/amps when available. Q: Soft-start? A: Lowers effective inrush factor—enter reduced multiplier.",
        },
      ],
    },
    compute(values) {
      const nominalPowerW = parsePositive(values.nominalPowerW ?? "");
      const operatingVoltageV = parsePositive(values.operatingVoltageV ?? "");
      const inrushFactor = parsePositive(values.inrushFactor ?? "");
      if (
        nominalPowerW === null ||
        operatingVoltageV === null ||
        inrushFactor === null ||
        inrushFactor < 1
      ) {
        return { value: null };
      }
      const result = calculateAcInrushCurrent({
        nominalPowerW,
        operatingVoltageV,
        inrushFactor,
      });
      return {
        value: formatNumber(result.peakInrushAmps, { maxDecimals: 1 }),
        unit: "A",
        detail: `${result.nominalAmps} A run · ${result.recommendedBreakerAmps} A ${result.recommendedCurveType} breaker`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];

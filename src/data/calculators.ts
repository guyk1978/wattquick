import {
  ArrowRightLeft, Battery, BatteryCharging, Car, Cpu, DollarSign, Percent, Refrigerator, Shield, Sun, Zap,
} from "lucide-react";
import {
  formatCurrency,
  formatDuration,
  formatNumber,
  parsePositive,
} from "@/lib/format";
import type { CalculatorDataEntry } from "@/data/calculator-types";
import { calculatorsExtra } from "@/data/calculators-extra";

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
      label: "Battery capacity",
      unit: "mAh",
      placeholder: "5000",
    },
    {
      id: "current",
      label: "Charger current",
      unit: "mA",
      placeholder: "2000",
    },
    {
      id: "efficiency",
      label: "Charge efficiency",
      unit: "%",
      placeholder: "100",
      defaultValue: "100",
      hint: "Account for heat loss and taper charging",
      colSpan: 2,
    },
  ],
  result: {
    label: "Estimated charge time",
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
  suggestions: ["battery-runtime", "amps-to-watts", "battery-percentage"],
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
  ...calculatorsExtra,
] as const satisfies readonly CalculatorDataEntry[];

export type CalculatorSlug = (typeof calculators)[number]["slug"];
export const CALCULATOR_SLUGS: CalculatorSlug[] = calculators.map((c) => c.slug);

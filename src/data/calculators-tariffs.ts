import {
  Activity,
  ArrowLeftRight,
  Battery,
  Clock,
  Gauge,
  Leaf,
  Scale,
  TrendingDown,
} from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import {
  calculateBatteryArbitrage,
  calculateCarbonOffset,
  calculateDemandCharge,
  calculateElectricityRatePlan,
  calculateGridFrequencyReward,
  calculatePeakShavingPotential,
  calculateTouShiftingSavings,
  calculateV2gReturn,
  type GridFrequencyRateType,
} from "@/lib/calculators/tariffs";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const seo = (heading: string, body: string, faq: string) => ({
  sections: [{ heading, body }, { heading: "Frequently asked questions", body: faq }],
});

export const calculatorsTariffs = [
  {
    slug: "tou-shifting-savings",
    href: "/tou-shifting-savings",
    title: "Time-of-Use Load Shifting Savings",
    description: "Savings from moving kWh from peak to off-peak rate periods.",
    keywords: ["time of use savings", "peak off peak shifting", "tou rate calculator"],
    icon: Clock,
    tag: "TOU",
    category: "tou",
    suggestions: [
      "electricity-rate-plan",
      "electricity-bill",
      "battery-arbitrage-roi",
      "appliance-daily-cost",
    ],
    fields: [
      { id: "shiftableKwh", label: "Shiftable load", unit: "kWh/mo", placeholder: "350" },
      { id: "peakRate", label: "Peak rate", unit: "$/kWh", placeholder: "0.42" },
      { id: "offPeakRate", label: "Off-peak rate", unit: "$/kWh", placeholder: "0.11" },
    ],
    result: { label: "Monthly savings", emptyMessage: "Enter kWh & rates" },
    seo: seo(
      "TOU shifting",
      "Savings = shiftable kWh × (peak $/kWh − off-peak $/kWh). EV charging and dishwashers are common shift targets.",
      "Q: Include demand charges? A: No—this is energy rate only."
    ),
    compute(values) {
      const k = parsePositive(values.shiftableKwh ?? "");
      const peak = parsePositive(values.peakRate ?? "");
      const off = parsePositive(values.offPeakRate ?? "");
      if (k === null || peak === null || off === null) return { value: null };
      const r = calculateTouShiftingSavings({
        shiftableKwh: k,
        peakRatePerKwh: peak,
        offPeakRatePerKwh: off,
      });
      return {
        value: formatCurrency(r.monthlySavings),
        unit: "/mo",
        detail: `${formatCurrency(r.annualSavings)}/yr · $${r.savingsPerKwh}/kWh spread`,
      };
    },
  },
  {
    slug: "demand-charge-calculator",
    href: "/demand-charge-calculator",
    title: "Commercial Demand Charge Calculator",
    description: "Monthly penalty from peak kW demand and $/kW tariff.",
    keywords: ["demand charge calculator", "peak kw penalty", "commercial demand ratchet"],
    icon: Gauge,
    tag: "Demand",
    category: "tou",
    suggestions: ["tou-shifting-savings", "energy-consumption", "electricity-bill"],
    fields: [
      { id: "peakKw", label: "Peak demand", unit: "kW", placeholder: "85" },
      { id: "demandChargePerKw", label: "Demand charge", unit: "$/kW", placeholder: "12" },
    ],
    result: { label: "Monthly demand charge", emptyMessage: "Enter peak kW & rate" },
    seo: seo(
      "Demand charges",
      "Bill adder ≈ peak kW × $/kW. One 15-minute interval can set the whole month—peak shaving and batteries target this.",
      "Q: Same as energy kWh? A: No—demand is power spike billing separate from consumption."
    ),
    compute(values) {
      const kw = parsePositive(values.peakKw ?? "");
      const rate = parsePositive(values.demandChargePerKw ?? "");
      if (kw === null || rate === null) return { value: null };
      const r = calculateDemandCharge({ peakKw: kw, demandChargePerKw: rate });
      return {
        value: formatCurrency(r.monthlyCharge),
        unit: "/mo",
        detail: `${formatCurrency(r.annualCharge)}/yr at ${kw} kW peak`,
      };
    },
  },
  {
    slug: "v2g-financial-return",
    href: "/v2g-financial-return",
    title: "V2G Grid Buyback Revenue Calculator",
    description: "Estimate monthly revenue from bidirectional EV export at utility buyback rates.",
    keywords: ["v2g revenue", "vehicle to grid payment", "ev grid export credit"],
    icon: ArrowLeftRight,
    tag: "V2G",
    category: "tou",
    suggestions: ["solar-net-metering", "battery-arbitrage-roi", "ev-charging-cost"],
    fields: [
      { id: "kwhExported", label: "kWh per session", unit: "kWh", placeholder: "15" },
      { id: "buybackRate", label: "Buyback rate", unit: "$/kWh", placeholder: "0.25" },
      { id: "sessionsPerMonth", label: "Sessions / month", unit: "#", placeholder: "12" },
    ],
    result: { label: "Monthly revenue", emptyMessage: "Enter kWh, rate & sessions" },
    seo: seo(
      "V2G economics",
      "Revenue = kWh × buyback $/kWh × sessions. Programs vary—some cap export hours or require utility enrollment.",
      "Q: Battery wear? A: Factor cycle cost—not modeled here."
    ),
    compute(values) {
      const k = parsePositive(values.kwhExported ?? "");
      const r = parsePositive(values.buybackRate ?? "");
      const s = parsePositive(values.sessionsPerMonth ?? "");
      if (k === null || r === null || s === null) return { value: null };
      const res = calculateV2gReturn({
        kwhExportedPerSession: k,
        buybackRatePerKwh: r,
        sessionsPerMonth: s,
      });
      return {
        value: formatCurrency(res.monthlyRevenue),
        unit: "/mo",
        detail: `${formatCurrency(res.annualRevenue)}/yr potential`,
      };
    },
  },
  {
    slug: "battery-arbitrage-roi",
    href: "/battery-arbitrage-roi",
    title: "Home Battery Arbitrage ROI Calculator",
    description: "Profit from charging on cheap night rates and discharging at peak.",
    keywords: ["battery arbitrage", "time of use battery profit", "peak shaving battery roi"],
    icon: Battery,
    tag: "Arbitrage",
    category: "tou",
    suggestions: ["tou-shifting-savings", "solar-battery-bank", "battery-cost"],
    fields: [
      { id: "batteryKwh", label: "Usable battery", unit: "kWh", placeholder: "10" },
      { id: "roundTripEff", label: "Round-trip efficiency", unit: "%", placeholder: "90", defaultValue: "90" },
      { id: "nightRate", label: "Night rate", unit: "$/kWh", placeholder: "0.09" },
      { id: "dayRate", label: "Peak day rate", unit: "$/kWh", placeholder: "0.38" },
      { id: "cyclesPerDay", label: "Cycles per day", unit: "#", placeholder: "1" },
    ],
    result: { label: "Estimated daily profit", emptyMessage: "Enter battery & rates" },
    seo: seo(
      "Arbitrage math",
      "Daily $ = kWh × efficiency × (day − night) × cycles. Real programs may limit export power or cycle count.",
      "Q: Include solar? A: This is tariff spread only."
    ),
    compute(values) {
      const k = parsePositive(values.batteryKwh ?? "");
      const eff = parsePositive(values.roundTripEff ?? "");
      const night = parsePositive(values.nightRate ?? "");
      const day = parsePositive(values.dayRate ?? "");
      const c = parsePositive(values.cyclesPerDay ?? "");
      if (k === null || eff === null || night === null || day === null || c === null)
        return { value: null };
      const r = calculateBatteryArbitrage({
        batteryKwh: k,
        roundTripEfficiencyPercent: eff,
        nightRatePerKwh: night,
        dayRatePerKwh: day,
        cyclesPerDay: c,
      });
      return {
        value: formatCurrency(r.dailyProfit),
        unit: "/day",
        detail: `${formatCurrency(r.monthlyProfit)}/mo · ${formatCurrency(r.annualProfit)}/yr`,
      };
    },
  },
  {
    slug: "carbon-footprint-offset",
    href: "/carbon-footprint-offset",
    title: "Solar & EV Carbon Offset Calculator",
    description: "kg CO₂ avoided from clean kWh vs. grid emissions factor.",
    keywords: ["carbon offset calculator", "solar co2 savings", "ev emissions offset"],
    icon: Leaf,
    tag: "Carbon",
    category: "tou",
    suggestions: ["solar-daily-yield", "energy-consumption", "ev-cost-per-mile"],
    fields: [
      { id: "cleanKwh", label: "Clean energy used", unit: "kWh", placeholder: "900" },
      {
        id: "gridKgCo2",
        label: "Grid intensity",
        unit: "kg/kWh",
        placeholder: "0.42",
        hint: "EPA eGRID regional avg",
      },
    ],
    result: { label: "CO₂ avoided", emptyMessage: "Enter kWh & grid factor" },
    seo: seo(
      "Offset estimate",
      "kg CO₂ = clean kWh × grid kg/kWh. Solar self-use and EV miles displacing gasoline both count as clean kWh in planning.",
      "Q: Exact lifecycle? A: Planning figure—LCA studies add manufacturing."
    ),
    compute(values) {
      const k = parsePositive(values.cleanKwh ?? "");
      const g = parsePositive(values.gridKgCo2 ?? "");
      if (k === null || g === null) return { value: null };
      const r = calculateCarbonOffset({ cleanKwh: k, gridKgCo2PerKwh: g });
      return {
        value: formatNumber(r.kgCo2Avoided, { maxDecimals: 0 }),
        unit: "kg CO₂",
        detail: `${r.lbsCo2} lbs · ~${r.milesEquivalentCar} mi car-equivalent`,
      };
    },
  },
  {
    slug: "grid-frequency-reward",
    href: "/grid-frequency-reward",
    title: "Grid Frequency Response Reward Calculator",
    description:
      "Estimate monthly and annual revenue from battery or DER frequency-response programs—capacity kW, participation hours, and availability.",
    keywords: [
      "grid frequency response reward",
      "ancillary services battery revenue",
      "FCR FRR compensation calculator",
      "VPP grid services payment",
      "battery grid stability earnings",
    ],
    icon: Activity,
    tag: "Grid Services",
    category: "tou",
    suggestions: [
      "battery-arbitrage-roi",
      "v2g-financial-return",
      "demand-charge-calculator",
    ],
    fields: [
      {
        id: "availableKw",
        label: "Available grid-service capacity",
        unit: "kW",
        placeholder: "5",
        hint: "Power you can commit for frequency regulation",
      },
      {
        id: "participationHours",
        label: "Participation hours",
        unit: "hrs/day",
        placeholder: "18",
        hint: "Hours per day enrolled and responsive",
      },
      {
        id: "rateType",
        label: "Reward rate type",
        inputType: "select",
        defaultValue: "kw-month",
        options: [
          { value: "kw-month", label: "Capacity ($/kW-month)" },
          { value: "kwh", label: "Energy ($/kWh dispatched)" },
        ],
        colSpan: 2,
      },
      {
        id: "rewardRate",
        label: "Average reward rate",
        unit: "$",
        placeholder: "8",
        hint: "Program average—check aggregator or ISO tariff sheet",
      },
      {
        id: "availabilityPercent",
        label: "Availability",
        inputType: "range",
        min: 50,
        max: 100,
        step: 5,
        defaultValue: "90",
        unit: "%",
        colSpan: 2,
        hint: "Uptime / compliance factor applied to payments",
      },
    ],
    result: {
      label: "Estimated monthly revenue",
      emptyMessage: "Enter kW, hours, rate & availability",
    },
    seo: {
      sections: [
        {
          heading: "Why frequency response pays",
          body: "Grid operators need fast up/down power when frequency drifts from 50 or 60 Hz. Batteries and aggregated DER can respond in seconds—programs compensate enrolled capacity ($/kW-month), dispatched energy ($/kWh), or both through utilities and VPP aggregators.",
        },
        {
          heading: "How this estimate works",
          body: "Effective kW = available kW × (availability % ÷ 100) × min(1, participation hours ÷ 24). Capacity mode: monthly $ = effective kW × $/kW-month. Energy mode: monthly kWh ≈ effective kW × hours × 30 days × ~12% activation duty × $/kWh. Annual = monthly × 12.",
        },
        {
          heading: "Availability scenarios",
          body: "The calculator table compares 60–100% availability so you can see how compliance penalties or outages affect revenue. Real programs may also require minimum response time and SOC windows.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Same as TOU arbitrage? A: No—frequency services are grid-stability products, not retail rate spreads. Q: Home battery eligible? A: Only where utility or VPP enrollment exists—check interconnection. Q: Include battery wear? A: Pair with degradation cost in planning; this tool shows gross revenue only.",
        },
      ],
    },
    compute(values) {
      const availableKw = parsePositive(values.availableKw ?? "");
      const participationHours = parsePositive(values.participationHours ?? "");
      const rewardRate = parsePositive(values.rewardRate ?? "");
      const rateType = values.rateType as GridFrequencyRateType;
      const availabilityPercent = Number(
        values.availabilityPercent?.trim() || "90"
      );
      if (
        availableKw === null ||
        participationHours === null ||
        rewardRate === null ||
        !["kw-month", "kwh"].includes(rateType) ||
        !Number.isFinite(availabilityPercent) ||
        availabilityPercent < 0 ||
        availabilityPercent > 100
      ) {
        return { value: null };
      }
      const result = calculateGridFrequencyReward({
        availableKw,
        participationHoursPerDay: participationHours,
        rewardRate,
        rateType,
        availabilityPercent,
      });
      const rateLabel = rateType === "kw-month" ? "$/kW-mo" : "$/kWh";
      return {
        value: formatCurrency(result.monthlyRevenue),
        unit: "/mo",
        detail: `${formatCurrency(result.annualRevenue)}/yr · ${result.effectiveKw} kW effective · ${rateLabel} @ ${formatNumber(rewardRate, { maxDecimals: 2 })}`,
      };
    },
  },
  {
    slug: "peak-shaving-potential",
    href: "/peak-shaving-potential",
    title: "Peak Shaving Potential Calculator",
    description:
      "Estimate monthly and annual TOU savings from shifting peak kWh to off-peak—compare bills before and after load shifting.",
    keywords: [
      "peak shaving calculator",
      "load shifting savings",
      "time of use bill reduction",
      "peak off peak kwh",
      "tou peak shaving home",
    ],
    icon: TrendingDown,
    tag: "Peak Shaving",
    category: "tou",
    suggestions: [
      "tou-shifting-savings",
      "electricity-bill",
      "battery-arbitrage-roi",
    ],
    fields: [
      {
        id: "peakKwh",
        label: "Peak-hour use",
        unit: "kWh/mo",
        placeholder: "420",
        hint: "Average kWh billed on-peak each month",
      },
      {
        id: "offPeakKwh",
        label: "Off-peak use",
        unit: "kWh/mo",
        placeholder: "680",
      },
      {
        id: "peakRate",
        label: "Peak rate",
        unit: "$/kWh",
        placeholder: "0.38",
      },
      {
        id: "offPeakRate",
        label: "Off-peak rate",
        unit: "$/kWh",
        placeholder: "0.11",
      },
      {
        id: "shiftablePercent",
        label: "Shiftable share of peak load",
        inputType: "range",
        min: 0,
        max: 100,
        step: 5,
        defaultValue: "40",
        unit: "%",
        colSpan: 2,
        hint: "EV, laundry, dishwasher, pool pump—flexible peak kWh",
      },
    ],
    result: {
      label: "Monthly savings",
      emptyMessage: "Enter peak/off-peak kWh, rates & shift %",
    },
    seo: {
      sections: [
        {
          heading: "Why peak shaving matters",
          body: "TOU tariffs charge more when the grid is stressed. Peak shaving moves flexible loads into cheap off-peak windows—same comfort, lower weighted $/kWh. Savings scale with your rate spread and how much peak energy you can reschedule.",
        },
        {
          heading: "Bill before vs. after",
          body: "Before = peak kWh × peak $/kWh + off-peak kWh × off-peak $/kWh. After moves (peak kWh × shift %) from peak to off-peak buckets. Monthly savings = before − after; annual = monthly × 12.",
        },
        {
          heading: "Home vs. commercial",
          body: "Homes usually optimize energy $/kWh. Businesses may also face demand kW charges—pair with Demand Charge Calculator when ratchets apply.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Different from TOU Shifting Savings? A: That tool takes shiftable kWh directly; this one starts from your peak/off-peak split and a shift %. Q: 100% shift realistic? A: Rare—HVAC and cooking often stay on-peak. Q: Super-off-peak tiers? A: Use your lowest overnight rate in off-peak field.",
        },
      ],
    },
    compute(values) {
      const peakKwh = parsePositive(values.peakKwh ?? "");
      const offPeakKwh = parsePositive(values.offPeakKwh ?? "");
      const peakRate = parsePositive(values.peakRate ?? "");
      const offPeakRate = parsePositive(values.offPeakRate ?? "");
      const shiftablePercent = Number(values.shiftablePercent?.trim() || "40");
      if (
        peakKwh === null ||
        offPeakKwh === null ||
        peakRate === null ||
        offPeakRate === null ||
        !Number.isFinite(shiftablePercent) ||
        shiftablePercent < 0 ||
        shiftablePercent > 100
      ) {
        return { value: null };
      }
      const result = calculatePeakShavingPotential({
        peakKwh,
        offPeakKwh,
        peakRatePerKwh: peakRate,
        offPeakRatePerKwh: offPeakRate,
        shiftablePercent,
      });
      return {
        value: formatCurrency(result.monthlySavings),
        unit: "/mo",
        detail: `${formatCurrency(result.annualSavings)}/yr · ${formatCurrency(result.beforeCost)} → ${formatCurrency(result.afterCost)} bill · ${result.shiftableKwh} kWh shifted`,
      };
    },
  },
  {
    slug: "electricity-rate-plan",
    href: "/electricity-rate-plan",
    title: "Electricity Rate Plan Calculator (TOU vs Flat)",
    description:
      "Compare flat-rate vs. time-of-use monthly bills from your kWh split and peak, shoulder, and off-peak tariffs—see annual savings.",
    keywords: [
      "tou vs flat rate calculator",
      "time of use electricity plan",
      "compare electricity rate plans",
      "peak off peak tariff",
      "tou bill calculator",
    ],
    icon: Scale,
    tag: "TOU",
    category: "tou",
    suggestions: [
      "tou-shifting-savings",
      "peak-shaving-potential",
      "ac-inverter-savings",
      "electricity-bill",
    ],
    fields: [
      {
        id: "monthlyKwh",
        label: "Average monthly use",
        unit: "kWh/mo",
        placeholder: "450",
        defaultValue: "450",
      },
      {
        id: "peakPercent",
        label: "Peak-hour share",
        inputType: "range",
        min: 0,
        max: 80,
        step: 5,
        defaultValue: "35",
        unit: "%",
        colSpan: 2,
        hint: "Late afternoon / evening on-peak (utility portal)",
      },
      {
        id: "shoulderPercent",
        label: "Mid (shoulder) share",
        inputType: "range",
        min: 0,
        max: 60,
        step: 5,
        defaultValue: "25",
        unit: "%",
        colSpan: 2,
        hint: "Remaining % = off-peak",
      },
      {
        id: "flatRatePerKwh",
        label: "Flat rate",
        unit: "per kWh",
        placeholder: "0.52",
        defaultValue: "0.52",
        hint: "Single tariff (₪, $, €, etc.)",
      },
      {
        id: "peakRatePerKwh",
        label: "TOU peak rate",
        unit: "per kWh",
        placeholder: "0.68",
        defaultValue: "0.68",
      },
      {
        id: "shoulderRatePerKwh",
        label: "TOU shoulder rate",
        unit: "per kWh",
        placeholder: "0.42",
        defaultValue: "0.42",
      },
      {
        id: "offPeakRatePerKwh",
        label: "TOU off-peak rate",
        unit: "per kWh",
        placeholder: "0.22",
        defaultValue: "0.22",
      },
    ],
    result: {
      label: "Potential annual savings",
      emptyMessage: "Enter monthly kWh, usage split & all rates",
    },
    seo: {
      sections: [
        {
          heading: "Flat vs. TOU math",
          body: "Flat bill = total kWh × flat rate. TOU bill = peak kWh × peak rate + shoulder kWh × shoulder rate + off-peak kWh × off-peak rate. We show monthly costs and annual savings for whichever plan is cheaper at your current usage profile—before you change habits.",
        },
        {
          heading: "Usage split",
          body: "Estimate peak % from your utility dashboard or hourly chart. Shoulder is mid-tier hours; the remainder is off-peak. Shifting loads later can improve TOU results beyond this snapshot.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Fixed charges? A: Energy-only comparison—add monthly service fees to both plans equally. Q: Super off-peak? A: Fold into off-peak rate. Q: Shift more load? A: Use Peak Shaving Potential after you pick TOU.",
        },
      ],
    },
    compute(values) {
      const monthlyKwh = parsePositive(values.monthlyKwh ?? "");
      const peakPercent = Number(values.peakPercent?.trim() ?? "");
      const shoulderPercent = Number(values.shoulderPercent?.trim() ?? "");
      const flatRatePerKwh = parsePositive(values.flatRatePerKwh ?? "");
      const peakRatePerKwh = parsePositive(values.peakRatePerKwh ?? "");
      const shoulderRatePerKwh = parsePositive(values.shoulderRatePerKwh ?? "");
      const offPeakRatePerKwh = parsePositive(values.offPeakRatePerKwh ?? "");
      if (
        monthlyKwh === null ||
        flatRatePerKwh === null ||
        peakRatePerKwh === null ||
        shoulderRatePerKwh === null ||
        offPeakRatePerKwh === null ||
        !Number.isFinite(peakPercent) ||
        !Number.isFinite(shoulderPercent) ||
        peakPercent + shoulderPercent > 100
      ) {
        return { value: null };
      }
      const result = calculateElectricityRatePlan({
        monthlyKwh,
        peakPercent,
        shoulderPercent,
        flatRatePerKwh,
        peakRatePerKwh,
        shoulderRatePerKwh,
        offPeakRatePerKwh,
      });
      if (!result) return { value: null };
      return {
        value: formatCurrency(result.annualSavings),
        unit: "/yr",
        detail: `${result.betterPlanLabel} · flat ${formatCurrency(result.flatMonthlyCost)}/mo vs TOU ${formatCurrency(result.touMonthlyCost)}/mo`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];

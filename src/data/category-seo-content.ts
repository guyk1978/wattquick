import type { CalculatorCategory } from "@/data/calculator-types";
import { CALCULATOR_CATEGORY_LABELS } from "@/data/calculator-types";

export interface CategoryGuideHighlight {
  title: string;
  body: string;
}

export interface CategorySeoContent {
  /** Short accent line used in compact SEO contexts */
  eyebrow: string;
  /** Long-form paragraphs for the engineering guide body */
  paragraphs: string[];
  /** Visible H2 for the mid-page marketing / guide block */
  guideTitle: string;
  /** One-sentence lead under the guide title */
  lead: string;
  /** Three unique value / context cards for this category */
  highlights: readonly CategoryGuideHighlight[];
}

export const categorySeoContent: Record<CalculatorCategory, CategorySeoContent> = {
  sizing: {
    eyebrow: "Best practices for battery sizing in off-grid solar systems",
    guideTitle: "Engineering & Practical Guide: Battery Sizing",
    lead:
      "Translate daily loads, sun hours, and depth of discharge into a bank that survives real weather—not just a spreadsheet best case.",
    highlights: [
      {
        title: "Load-first sizing",
        body: "Build amp-hour and watt-hour targets from real appliance hours before shopping cells or racking.",
      },
      {
        title: "DoD & chemistry",
        body: "Lead-acid and LiFePO₄ need different usable fractions—size for cycle life, not just nameplate Ah.",
      },
      {
        title: "Inverter headroom",
        body: "Peak motor surges can sink a bank that looks fine on average Wh. Match continuous and surge together.",
      },
    ],
    paragraphs: [
      "Battery sizing is the foundation of any reliable off-grid solar, RV, or marine power system. Undersize the bank and you run out of energy on cloudy days or during evening peaks. Oversize it and you pay for capacity you rarely use, plus extra weight, space, and charging time. The right size balances daily load, sun hours, depth of discharge, and inverter demand into a bank that survives real-world use—not just a spreadsheet best case.",
      "Start by listing every load you expect to run, its wattage, and how many hours per day it operates. Convert those figures into daily watt-hours, then add a safety margin for inverter losses, battery aging, and seasonal shortfall. In off-grid solar, plan for the worst sun month in your location, not the annual average. Pair that load profile with your charge source—solar array watts, generator hours, or shore power—and estimate how many amp-hours you need at your system voltage.",
      "Depth of discharge matters as much as total capacity. Lead-acid batteries should rarely be drawn below 50% state of charge if you want long cycle life. Lithium iron phosphate (LiFePO₄) tolerates deeper daily cycling, but you still need headroom for cloudy stretches. Size the bank so normal daily use lands around 70–80% state of charge after a typical solar day, leaving reserve for one or two poor generation days before you must shed loads or start a generator.",
      "Inverter sizing runs in parallel with battery sizing. A bank that can supply enough watt-hours still fails if it cannot deliver peak surge for motors, compressors, or pump starts. Match inverter continuous and surge ratings to your largest simultaneous loads, then confirm the battery can supply the DC current those peaks require without excessive voltage sag.",
      "WattQuick's battery sizing calculators help you move from rough estimates to defensible numbers in minutes. Use them to compare bank voltages, estimate inverter requirements, and sanity-check vendor quotes before you buy cells, BMS hardware, or racking. Consistent inputs across tools make it easier to iterate as your load list evolves.",
    ],
  },
  convert: {
    eyebrow: "Unit conversion essentials for battery and power planning",
    guideTitle: "About Unit Conversion for Power Systems",
    lead:
      "Keep Ah, Wh, VA, and kW honest across datasheets so shopping and design decisions stay on the same footing.",
    highlights: [
      {
        title: "Energy vs capacity",
        body: "Amp-hours alone hide voltage. Normalize to watt-hours before comparing packs or chemistries.",
      },
      {
        title: "Watts vs VA",
        body: "Motors and cheap PSUs draw apparent power—generator and inverter limits often care about VA.",
      },
      {
        title: "Voltage discipline",
        body: "Same Ah at 12 V and 48 V are not equal energy. Lock voltage into every conversion step.",
      },
    ],
    paragraphs: [
      "Electrical projects mix units constantly. Battery datasheets quote amp-hours. Appliance labels list watts. Solar panels are rated in watts and volts. Inverters advertise volt-amps. EV chargers show kilowatts. Converting between these units correctly prevents expensive mismatches—a 100 Ah 12 V bank is not the same energy reservoir as 100 Ah at 48 V, and confusing watts with volt-amps can leave you short on backup capacity.",
      "The most common conversions in battery work are between amp-hours (Ah), watt-hours (Wh), and kilowatt-hours (kWh). Energy in watt-hours equals amp-hours multiplied by nominal voltage. Once you have watt-hours, dividing by load watts gives runtime. Converting mAh to Ah is a simple divide-by-1,000 step, but skipping it is a frequent source of mobile and small-cell errors.",
      "Power conversions tie apparent power (VA) to real power (watts) through power factor. Motors, pumps, and cheap power supplies draw more apparent power than their real work suggests. When sizing generators, UPS units, or inverter chargers, treat VA ratings seriously—especially for mixed resistive and inductive loads.",
      "Unit discipline also helps when comparing chemistries and form factors. A 3.7 V lithium cell bank quoted in mAh must be normalized to watt-hours before you compare it to a 12 V lead-acid pack. Likewise, DC bus voltage changes current for the same power level: doubling voltage halves amperage, which affects wire gauge and fuse selection.",
      "WattQuick's conversion calculators are built for quick cross-checks during design and shopping. Keep voltage in the same field every time you convert, write results into your load table, and re-run when you change system architecture. Small conversion errors compound across an entire bill of materials.",
    ],
  },
  battery: {
    eyebrow: "Battery runtime, charging, and state-of-charge fundamentals",
    guideTitle: "About Battery Runtime, Charging & Health",
    lead:
      "Nameplate Ah is only a starting point—runtime, charge strategy, and temperature decide what you actually get.",
    highlights: [
      {
        title: "Real runtime",
        body: "Peukert effects, BMS cutoffs, and inverter floors shrink usable energy under load.",
      },
      {
        title: "Charge stages",
        body: "Bulk, absorption, and float exist for a reason—match charger amps to chemistry guidance.",
      },
      {
        title: "SoC awareness",
        body: "Voltage under load misleads; resting readings and shunts improve when-to-shed decisions.",
      },
    ],
    paragraphs: [
      "Batteries are judged on capacity, voltage, chemistry, and how they behave under real loads—not just nameplate numbers. Runtime depends on discharge rate, temperature, age, and how deeply you cycle each day. A 100 Ah label does not guarantee 100 Ah of usable energy in every scenario. Peukert effects, BMS limits, and inverter cutoff voltages all shrink practical runtime.",
      "Charging strategy is equally important. Bulk, absorption, and float stages exist because chemistries respond differently to current over time. Charging too fast generates heat and gas in flooded lead-acid. Charging too slow leaves lithium cells at partial state of charge too long. Match charger amperage to manufacturer guidance and to what your generator or solar array can sustain.",
      "State-of-charge (SoC) estimation drives user decisions: when to start a generator, when to shed loads, and when a bank is healthy enough for an overnight outage. Voltage-based SoC is approximate—especially under load—but still useful when calibrated for your chemistry and resting intervals. Coulomb counting and shunt monitors improve accuracy when you invest in instrumentation.",
      "Temperature changes effective capacity. Cold reduces lithium and lead-acid performance; heat accelerates aging. If your bank lives in an unconditioned garage, RV bay, or engine compartment, derate capacity and revisit charging voltage temperature compensation.",
      "Use WattQuick battery calculators to estimate runtime from capacity and load, model charging duration from charger amps, and translate vendor specs into comparable watt-hours. Run the same scenarios at summer and winter temperatures when your application is exposed. Document assumptions so future upgrades start from a clear baseline.",
    ],
  },
  power: {
    eyebrow: "Watts, amps, and electrical power calculations explained",
    guideTitle: "Engineering & Practical Guide: Electrical Power",
    lead:
      "Connect watts, amps, volts, and VA so breakers, cables, and generators are sized for real circuit demand.",
    highlights: [
      {
        title: "P = V × I",
        body: "Trace trips and brownouts from overloaded circuits back to fundamental power math.",
      },
      {
        title: "AC realities",
        body: "Separate real watts from apparent VA when motors and switching supplies share a feeder.",
      },
      {
        title: "DC current density",
        body: "Low-voltage high-watt loads mean heavy cable—plan fusing and voltage drop early.",
      },
    ],
    paragraphs: [
      "Power math is the language of electrical sizing. Watts describe real work. Amps describe current flow. Volts describe electrical pressure. Ohm's law and the power formula (P = V × I) connect them. Master these relationships and you can trace a problem from a tripped breaker back to an overloaded circuit or an undersized cable.",
      "In AC systems, distinguish real power (watts) from apparent power (VA). Resistive loads like heaters and incandescent bulbs align closely. Motors, transformers, and switching power supplies draw extra apparent power. Your utility meter bills real power (with power factor penalties on some commercial tariffs), but your inverter or generator limit may be published in VA.",
      "DC power calculations look simpler but still demand respect for losses. Every inverter conversion, every long cable run, and every connector adds resistance. A 1,200 W load at 12 V is 100 A on paper—real systems need heavier gauge wire, tight terminations, and fusing sized for that sustained current.",
      "Three-phase and split-phase residential service introduce additional factors for larger workshops, well pumps, and commercial gear. Single-phase shortcut formulas do not always transfer. When in doubt, measure with a clamp meter under real operation instead of relying on nameplate guesses alone.",
      "WattQuick power calculators help you convert between watts and amps at a given voltage, estimate circuit demand, and cross-check vendor claims. Use them while building load tables, before specifying breakers, and when validating whether a portable generator can start your largest motor load.",
    ],
  },
  solar: {
    eyebrow: "Solar panel sizing, yield, and off-grid storage planning",
    guideTitle: "About Solar Yield, Arrays & Storage",
    lead:
      "Honest load accounting and realistic sun hours beat nameplate optimism when you size panels and batteries together.",
    highlights: [
      {
        title: "Real yield",
        body: "Tilt, shade, heat, and controller type cut production far below sticker watts.",
      },
      {
        title: "Array ↔ battery",
        body: "Panels must refill daily use plus losses inside available peak sun—plan for winter months.",
      },
      {
        title: "Aligned layers",
        body: "String voltage, MPPT limits, and BMS charge caps must agree before you buy hardware.",
      },
    ],
    paragraphs: [
      "Solar design starts with honest load accounting and realistic sun data. Nameplate panel watts are laboratory figures. Real yield depends on tilt, azimuth, shading, temperature, soiling, and controller efficiency. A 400 W module might produce far less than its sticker suggests on a winter roof with partial shade and a PWM controller.",
      "Array sizing ties directly to battery storage. Panels must replace daily consumption plus efficiency losses within available sun hours. Off-grid designers often target surplus summer production to carry lean winter weeks, or pair smaller arrays with generator backup. Neither approach is wrong—but the math must be explicit.",
      "Charge controllers and inverter-chargers define how much of captured energy reaches the battery. MPPT controllers extract more from high-voltage strings. Inverter chargers limit AC pass-through and charging current. String voltage must respect controller maximums while staying above minimum operating thresholds in cold weather when panel open-circuit voltage rises.",
      "Battery chemistry influences how aggressively you can charge from solar. Lead-acid wants staged absorption time. Lithium BMS systems may cap charge current independently of controller settings. Align all three layers—array, controller, battery limits—before purchasing hardware.",
      "WattQuick solar calculators translate daily loads into rough array and storage targets, estimate seasonal yield, and help compare PWM versus MPPT scenarios. Re-run calculations when you add loads like DC refrigeration, Starlink, or a second inverter. Solar is iterative; your tool inputs should be too.",
    ],
  },
  ev: {
    eyebrow: "Home EV charging time, cost, and circuit planning",
    guideTitle: "Engineering & Practical Guide: Home EV Charging",
    lead:
      "Match charger power, panel capacity, and time-of-use rates to the miles you actually recover overnight.",
    highlights: [
      {
        title: "Session math",
        body: "kWh needed ÷ charger kW ≈ hours—then add taper near full SoC and efficiency losses.",
      },
      {
        title: "Circuit reality",
        body: "Continuous-load rules shrink what a breaker can feed a wall connector versus nameplate amps.",
      },
      {
        title: "Tariff leverage",
        body: "Off-peak overnight charging often beats daytime peaks—and solar self-use changes the curve again.",
      },
    ],
    paragraphs: [
      "Home EV charging blends electrical capacity, schedule, and electricity cost. Level 1 charging from a standard outlet is slow but accessible. Level 2 hardware on a dedicated circuit is how most owners achieve overnight recovery. The right choice depends on daily miles, battery size, time-of-use rates, and whether your panel has spare amperage.",
      "Charging time math links kilowatt-hours needed to charger power in kilowatts. A 75 kWh pack from 20% to 80% needs roughly 45 kWh delivered to the battery—not 75 kWh. Charger efficiency and onboard conversion losses add margin. Divide required kWh by charger kW for hours, then add time if the car tapers current at high state of charge.",
      "Circuit sizing must cover continuous load rules. A 40 A circuit does not mean 40 A to the car continuously—breaker and wire derating apply. Hardwired wall connectors specify maximum output; the vehicle may accept less. Verify panel space, conduit paths, and grounding before committing to install quotes.",
      "Cost planning should include energy rate structure. Charging on overnight off-peak tariffs can cut annual fuel expense dramatically versus daytime peaks. Solar self-consumption changes the story again when production overlaps with parked-at-home hours.",
      "WattQuick EV calculators estimate session duration from charger level, approximate home charging cost per month, and help sanity-check whether your electrical service supports a desired charge rate. Pair results with your utility bill and real trip logs for a complete picture.",
    ],
  },
  appliance: {
    eyebrow: "Home appliance electricity use and daily operating cost",
    guideTitle: "About Appliance Energy & Operating Cost",
    lead:
      "Itemize watts and hours so refrigerators, heaters, and standby loads stop hiding inside a mysterious bill.",
    highlights: [
      {
        title: "Watts × hours",
        body: "Convert daily Wh to monthly kWh and dollars using your real tariff—not national averages.",
      },
      {
        title: "Vampire loads",
        body: "Always-on routers, AV stacks, and chargers add baseload that metering strips make visible.",
      },
      {
        title: "Seasonal spikes",
        body: "Model AC, dehumidifiers, and garage freezers separately when troubleshooting summer bills.",
      },
    ],
    paragraphs: [
      "Appliances dominate residential energy bills when you add their hidden hours. Refrigerators cycle all day. Routers and DVRs draw standby power year-round. Old freezers in the garage run harder in summer. Lighting schedules vary by room. Without itemized estimates, it is easy to blame the wrong device for a high bill.",
      "Start with nameplate watts or measured draw, then multiply by hours of use. A 1,500 W space heater for four hours is 6 kWh per day—far more than a modern LED bulb left on all night. Convert daily watt-hours to monthly kilowatt-hours and multiply by your tariff to see cost impact in dollars, not abstract units.",
      "Standby and vampire loads deserve their own line item. Phone chargers, smart speakers, and entertainment centers consume watts 24/7. Individually small, collectively meaningful. Power strips with scheduling or metering outlets make reduction measurable.",
      "Seasonal appliances—AC, dehumidifiers, pool pumps—shift the load curve. Model them separately for summer months instead of spreading across an annual average if you are troubleshooting spikes.",
      "WattQuick appliance calculators turn watts and hours into daily and monthly cost, highlight standby waste, and help compare efficient replacements. Use them before buying a second freezer, upgrading a gaming PC, or leaving crypto miners on idle schedules.",
    ],
  },
  cost: {
    eyebrow: "Battery pack pricing, energy cost, and total ownership estimates",
    guideTitle: "About Energy Cost & Pack Economics",
    lead:
      "Price projects on usable kWh over life—not sticker stickers—so lithium, labor, and tariffs stay comparable.",
    highlights: [
      {
        title: "$/kWh honesty",
        body: "Include BMS, shipping, install, and replacement cycles when comparing chemistries.",
      },
      {
        title: "Levelized cost",
        body: "Divide total spend by delivered energy across realistic DoD and warranty assumptions.",
      },
      {
        title: "Tariff context",
        body: "TOU and demand charges decide whether arbitrage batteries actually earn their keep.",
      },
    ],
    paragraphs: [
      "Energy economics decide whether a project pencils out. Battery packs are priced per kilowatt-hour, but installation, BMS, shipping, and cycle life change true ownership cost. A cheap lead-acid bank replaced every few years can exceed lithium lifetime cost when labor and downtime count.",
      "Levelized cost divides total spend by usable energy over life. Include expected cycle count, depth of discharge habits, and warranty terms. Marketing sheets love best-case cycles at partial depth; your application may differ.",
      "Electricity tariffs layer time-of-use, demand charges, and fixed fees. A battery that arbitrages peak/off-peak spreads only wins when round-trip efficiency and cycling limits still leave margin after inverter losses.",
      "DIY pack assembly trades labor for savings. Factor cell matching, spot welding, enclosure venting, and compliance with local codes. Commercial integrated packs cost more per kWh but ship with certifications and support.",
      "WattQuick cost calculators translate component lists into rough pack prices, compare chemistries on a simple cost-per-kWh basis, and estimate operating expense from duty cycles. Use them to bracket quotes—not to replace supplier invoices—but to catch order-of-magnitude mistakes early.",
    ],
  },
  backup: {
    eyebrow: "Backup power, UPS runtime, and critical load planning",
    guideTitle: "Engineering & Practical Guide: Backup & UPS",
    lead:
      "Separate critical circuits from comfort loads so inverter, battery, and generator choices match real outages.",
    highlights: [
      {
        title: "Critical first",
        body: "Medical, sump, fridge, and communications define minimum inverter and storage size.",
      },
      {
        title: "UPS vs whole home",
        body: "IT ride-through is minutes; house backup is hours—don't mix the design goals.",
      },
      {
        title: "Start sequencing",
        body: "Stagger motors and soft-starts so generators and hybrid inverters survive surge stacks.",
      },
    ],
    paragraphs: [
      "Backup power planning separates wants from needs. Critical loads—medical devices, sump pumps, communications, refrigeration—define minimum inverter and battery size. Everything else is negotiable during an outage. List critical circuits first, then add optional comforts if budget and weight allow.",
      "UPS runtime for computers and networking gear is measured in minutes, not hours. The goal is graceful shutdown or ride-through until a generator starts. Battery capacity must cover that interval at the efficiency of the UPS inverter, including dead battery cutoff above zero percent state of charge.",
      "Whole-home backup introduces transfer switches, generator interlocks, and load-shedding strategies. Oversizing a generator wastes fuel; undersizing prevents motor starts. Staggered start sequences and soft-start modules reduce peak demand.",
      "Fuel storage, maintenance intervals, and exercise schedules matter for fossil generators. Battery+solar backup shifts failure modes to weather and state of charge instead of stale gasoline.",
      "WattQuick backup calculators estimate runtime for defined loads, size UPS banks for IT gear, and help compare gasoline versus battery approaches for the same critical circuit list. Revisit the list after each outage—real events reveal surprises.",
    ],
  },
  "commercial-ev": {
    eyebrow: "Fleet and commercial EV charging infrastructure planning",
    guideTitle: "About Fleet & Commercial EV Infrastructure",
    lead:
      "Scale single-vehicle charging math across routes, depot peaks, and utility demand charges before hardware arrives.",
    highlights: [
      {
        title: "Duty cycles",
        body: "Vans, trucks, and buses recover different kWh windows—map routes before buying chargers.",
      },
      {
        title: "Service upgrades",
        body: "Transformers and switchgear often cost more than connectors—start load studies early.",
      },
      {
        title: "Demand exposure",
        body: "Stacked 5 p.m. returns can collide with building HVAC peaks and set expensive ratchets.",
      },
    ],
    paragraphs: [
      "Commercial EV deployments multiply single-vehicle math across schedules, routes, and peak demand. Fleet vans returning at 5 p.m. can stack charging load against building HVAC peaks. Depots need feeder capacity, load management, and often demand charge awareness that home charging rarely faces.",
      "Duty cycles differ by vehicle class. Last-mile vans cycle daily with predictable ranges. Class trucks may sit overnight but draw high power when they do charge. Buses need midday top-ups or overnight depots with staggered connectors. Map each route to required kWh recovery window.",
      "Electrical service upgrades are frequently the gating cost. Transformer capacity, switchgear, trenching, and utility timelines exceed charger hardware on many bids. Early load studies prevent purchasing chargers that cannot be fed.",
      "Incentives, carbon reporting, and fuel displacement metrics increasingly justify capital expense. Document kWh per mile and maintenance savings alongside upfront install quotes for finance teams.",
      "WattQuick commercial EV calculators help fleet managers estimate aggregate charging demand, session durations at depot power levels, and rough demand charge exposure. Pair outputs with utility interval data before signing infrastructure contracts.",
    ],
  },
  "rv-marine": {
    eyebrow: "RV solar, marine banks, and mobile power system design",
    guideTitle: "Engineering & Practical Guide: RV & Marine Power",
    lead:
      "Design for weight, shade, and vibration so every amp-hour earns its locker space on the road or water.",
    highlights: [
      {
        title: "Autonomy vs mass",
        body: "Mobile banks compete with gear for space—size Ah for real camping days, not brochure dreams.",
      },
      {
        title: "Partial shade",
        body: "Roof vents and tree sites cut solar yield; marine decks add salt and flex to the same math.",
      },
      {
        title: "Multi-source charge",
        body: "Alternators, shore power, and solar must play nice without back-feeding starting batteries.",
      },
    ],
    paragraphs: [
      "Mobile power systems trade space and weight for autonomy. RV and marine installs squeeze batteries under benches, behind settees, or into engine compartments with ventilation limits. Every amp-hour must earn its place when groceries and gear compete for the same lockers.",
      "Solar on RV roofs fights shading from vents, AC units, and tree campsites. Marine decks add salt, flex, and tilting at anchor. Expect partial shading behavior and lower real yield than residential roof models predict.",
      "Dual systems—alternator charging, shore power, inverter-chargers—interact with solar regulators and battery isolators that must prevent back-feeding starting batteries while still accepting high-current alternator bursts when engines run.",
      "Corrosion, vibration, and ABYC or RVIA practices influence wire gauge, fuse placement, and battery box venting. A calculation that ignores voltage drop on a 20-foot return run can leave appliances browning out despite adequate nominal capacity.",
      "WattQuick RV and marine calculators size banks for weekend boondocking, estimate solar recovery hours, and translate appliance lists into realistic amp-hour budgets. Update inputs when you add induction cooktops, 12 V refrigeration, or inverter loads that changed your lifestyle on the road or water.",
    ],
  },
  tou: {
    eyebrow: "Time-of-use rates, peak shaving, and demand charge strategies",
    guideTitle: "About Time-of-Use & Peak Shaving Strategy",
    lead:
      "Exploit clock-based rates and demand peaks only when round-trip losses still leave measurable savings.",
    highlights: [
      {
        title: "Energy vs demand",
        body: "kWh savings and kW peak shaving solve different bill lines—model both when relevant.",
      },
      {
        title: "Arbitrage margin",
        body: "Peak/off-peak spreads shrink after inverter losses and reserve SoC for backup.",
      },
      {
        title: "Tariff drift",
        body: "Summer and winter windows change—re-run economics when your utility updates schedules.",
      },
    ],
    paragraphs: [
      "Time-of-use (TOU) tariffs price electricity by clock and season. Peak afternoon blocks can cost several times off-peak overnight energy. Batteries, load shifting, and smart charging exist largely to exploit those spreads—if round-trip efficiency and cycling limits still leave savings after equipment cost.",
      "Peak shaving targets maximum demand kilowatts, not just energy kilowatt-hours. Commercial bills may add demand charges based on the highest 15-minute interval each month. A single poorly timed HVAC start plus oven and EV charging can set an expensive ratchet for weeks.",
      "Arbitrage math must include inverter losses, battery usable capacity, and minimum state of charge reserves for backup. Saving ten cents per kWh on paper means little if you only shift two kWh per day through a 90% efficient path.",
      "Rate schedules change with regulators and utilities. Summer and winter peak windows differ. Re-run economics when your tariff version updates or when you add solar export credits.",
      "WattQuick TOU calculators model simple peak/off-peak savings, estimate demand charge exposure from load peaks, and help compare timer-based load shifting versus battery assist. Validate against your actual interval meter data when available.",
    ],
  },
  "green-home": {
    eyebrow: "Home efficiency, insulation, and standby power reduction",
    guideTitle: "About Green Home Efficiency Upgrades",
    lead:
      "Cut waste before adding generation so solar and storage cover a larger share of real household need.",
    highlights: [
      {
        title: "Envelope first",
        body: "Insulation and sealing shrink HVAC loads—and the panels or batteries you still need.",
      },
      {
        title: "Lighting ROI",
        body: "LED retrofits deliver fast payback with measurable wattage drops room by room.",
      },
      {
        title: "Phantom baseload",
        body: "Always-on electronics quietly raise 24/7 demand—meter before you guess.",
      },
    ],
    paragraphs: [
      "Green home improvements attack waste before adding generation. Insulation, air sealing, efficient lighting, and modern HVAC cut baseline load so solar and batteries cover a larger fraction of real need. The cheapest kilowatt-hour is still the one you never draw.",
      "Thermal envelope upgrades change HVAC sizing. Oversized equipment short-cycles and dehumidifies poorly. Undersized systems struggle on design days. Load calculations tied to insulation values prevent both mistakes.",
      "Lighting retrofits from incandescent or halogen to LED slash watts immediately with short payback. Daylight and occupancy controls extend savings in low-traffic rooms.",
      "Standby power and always-on electronics are silent consumers. Entertainment centers, routers, and old appliance controls add baseload 24/7. Metering strips reveal culprits better than guessing.",
      "WattQuick green home calculators quantify insulation impact simplistically, compare lighting upgrades, estimate HVAC-related electrical draw, and highlight phantom loads. Use them to prioritize retrofits with the fastest carbon and cost return before capital moves to rooftop solar.",
    ],
  },
  pool: {
    eyebrow: "Pool pump, heating, and seasonal electricity planning",
    guideTitle: "Engineering & Practical Guide: Pool Energy",
    lead:
      "Treat pumps and heaters as seasonal systems—schedules, covers, and tariffs decide the real operating cost.",
    highlights: [
      {
        title: "VSP schedules",
        body: "Lower watts for longer hours usually beat short high-power bursts for turnover.",
      },
      {
        title: "Heat strategy",
        body: "Covers and heat pumps change kWh far more than pump brand alone.",
      },
      {
        title: "Summer tariffs",
        body: "Peak pricing seasons often align with pool season—model both together.",
      },
    ],
    paragraphs: [
      "Pools are seasonal energy systems pretending to be appliances. Pumps run hours daily. Heaters spike demand when nights cool. Covers reduce evaporation and heating load dramatically but are often skipped in casual estimates.",
      "Variable-speed pumps save energy by running longer at lower watts instead of short bursts at high power. The optimal schedule depends on turnover requirements, plumbing length, and solar cover use. Comparing single-speed nameplate amps to VSP programmed watts needs honest hours per speed step.",
      "Heat pumps transfer BTUs with coefficients of performance above resistive heaters, but their electrical draw still matters for panel capacity. Gas heaters shift cost from kWh to therms—include fuel when comparing total season expense.",
      "Solar thermal and pool solar covers reduce electrical heating need but change maintenance routines. Budget time, not just dollars.",
      "WattQuick pool calculators estimate pump operating cost by horsepower and schedule, model heating loads versus cover strategies, and help plan seasonal panel or tariff impacts. Revisit when your utility switches to summer peak pricing.",
    ],
  },
  ebike: {
    eyebrow: "E-bike range, charging, motor power, and battery health",
    guideTitle: "About E-Bike Range, Motors & Battery Health",
    lead:
      "Calibrate brochure range against rider weight, hills, assist level, and how you actually charge and store the pack.",
    highlights: [
      {
        title: "Wh truth",
        body: "Normalize 36 V and 48 V packs to watt-hours before comparing range claims.",
      },
      {
        title: "Terrain load",
        body: "Grades and cargo raise current until sag hits controller or BMS limits.",
      },
      {
        title: "Cycle care",
        body: "Heat and full-charge storage age packs faster than frequent moderate top-ups.",
      },
    ],
    paragraphs: [
      "E-bike performance blends human input, motor efficiency, battery chemistry, and terrain. Range claims from manufacturers assume ideal assist levels, light riders, and flat paths. Real commuting includes stops, headwinds, tire pressure, and cargo weight.",
      "Battery voltage and amp-hour ratings define watt-hour capacity, but BMS cutoff and voltage sag under hill climbs reduce usable energy. Comparing 36 V versus 48 V systems requires normalizing to watt-hours and noting controller current limits.",
      "Charging habits affect cycle life. Frequent top-ups are fine for lithium if temperatures stay moderate. Storing at full charge in hot garages accelerates degradation. Winter storage partial charge protects cells.",
      "Motor power and torque requirements rise with grade and total system weight. Controllers must deliver phase current without overheating connectors or battery BMS limits.",
      "WattQuick e-bike calculators estimate range from Wh and assist assumptions, charging time from charger amps, motor power needs on hills, and simple total cost of ownership comparisons. Log your own trips to calibrate pessimism or optimism in the defaults.",
    ],
  },
  escooter: {
    eyebrow: "E-scooter range, tire pressure, hill climb, and commuter economics",
    guideTitle: "Engineering & Practical Guide: E-Scooters",
    lead:
      "Small packs punish tire pressure, rider weight, and stop-and-go more than larger light EVs—plan around that physics.",
    highlights: [
      {
        title: "PSI matters",
        body: "Under-inflation can erase double-digit percent range on lightweight hubs.",
      },
      {
        title: "Hill current",
        body: "Grade plus rider mass drives sag—match motor torque to your steepest commute.",
      },
      {
        title: "Commuter TCO",
        body: "Include battery replacement years when comparing scooters to transit or ride-hail.",
      },
    ],
    paragraphs: [
      "E-scooters compress EV math into lightweight packs and hub motors. Small watt-hour batteries mean tire pressure, rider weight, and repeated acceleration events dominate range more than they do on e-bikes. Under-inflated tires can cost double-digit percentage range loss.",
      "Hill climbing draws current until voltage sag triggers controller limits or BMS protection. Peak grade and rider weight should inform whether a 350 W commuter scooter is sufficient or whether a higher-torque drive is warranted.",
      "Charging from wall adapters varies in quality. Nameplate output does not always match real delivered current. Charging time estimates need measured adapter performance when possible.",
      "Commuter economics compare electricity per charge to transit fares, fuel, or ride-hail. Include battery replacement every few years in TCO—not just nightly watt-hours.",
      "WattQuick e-scooter calculators cover range, optimal tire pressure effects, hill climb power, charge duration, and commute cost per month. Use them when evaluating upgrades from entry-level scooters to higher-voltage platforms with larger Wh packs.",
    ],
  },
};

export function getCategorySeoContent(
  category: CalculatorCategory
): CategorySeoContent {
  return categorySeoContent[category];
}

/** Convenience label helper for guide headings when a custom title is unused. */
export function getDefaultCategoryGuideTitle(
  category: CalculatorCategory
): string {
  return `About ${CALCULATOR_CATEGORY_LABELS[category]}`;
}

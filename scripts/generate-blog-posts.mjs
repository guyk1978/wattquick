import fs from "fs";
import path from "path";

const OUT = "src/content/blog";
fs.mkdirSync(OUT, { recursive: true });

const posts = [
  {
    file: "how-fast-can-you-dc-charge.md",
    front: {
      title: "How Fast Can You DC Charge an EV? The 10–80% Window Explained",
      description:
        "Learn why DC fast charging slows after 80% SOC, how taper curves work, and how to estimate session time without guesswork.",
      slug: "how-fast-can-you-dc-charge",
      category: "EV Charging",
      date: "2026-04-12",
    },
    body: `DC fast charging feels effortless until the last twenty percent. Most drivers discover the same pattern on their first road trip: the battery rockets from a low state of charge to about eighty percent, then the station display seems to stall. That behavior is not a broken charger—it is battery management doing its job.

## Why manufacturers focus on 10–80%

Lithium-ion cells accept current aggressively when they are neither empty nor full. Automakers and charging networks quote peak kW in this middle band because it is where drivers actually spend their session time when traveling. Below roughly ten percent, BMS logic may limit power to protect a weak cell. Above eighty percent, voltage rises and the charger must back off to avoid exceeding cell limits.

Think of the pack as a stadium filling with fans. Early arrivals spread out easily. Once the seats near capacity, ushers slow entry so nobody gets crushed. Your EV's battery management system is the usher.

<CalculatorEmbed slug="ev-fast-charging-time" />

## Peak kW is not constant power

A 250 kW label on a highway stall is a ceiling, not a promise for the whole session. Cold weather, shared site load, battery temperature, and state of charge all reduce what you see on screen. Two identical cars on adjacent dispensers can charge at different speeds if one arrived with a warm pack from highway driving and the other sat in freezing parking.

Preconditioning—when your car heats or cools the pack before you plug in—can shave minutes off a stop. Check your owner's app before you arrive at high-power sites in winter.

## Level 2 is different math

Home and destination AC charging does not follow the same taper curve. A 7.2 kW Level 2 unit delivers steady power for hours because the pack is not asking for hundreds of kilowatts. Road-trip planning should separate "overnight fill" from "highway burst."

<CalculatorEmbed slug="ev-charge-time" />

## Practical trip-planning habits

Arrive with a low-but-not-zero buffer when you want the fastest energy per minute. Plan meals and breaks around the 10–80 window instead of chasing 100 percent at every stop. Use your app's rated curve if available, and keep a margin for charger congestion.

### Key takeaway

DC speed is a story about state of charge, not just station marketing. Understanding the taper helps you plan shorter, cheaper stops—and reduces the frustration of watching kW fall while you wait for the last few percent.`,
  },
  {
    file: "why-ev-range-drops-in-winter.md",
    front: {
      title: "Why EV Range Drops in Winter (and What You Can Do About It)",
      description:
        "Cold batteries, cabin heat, and winter driving physics explain seasonal range loss—and how to plan realistic winter miles.",
      slug: "why-ev-range-drops-in-winter",
      category: "EV Charging",
      date: "2026-04-10",
    },
    body: `If your dashboard range estimate looked honest in July and optimistic in January, you are not alone. Winter range loss is one of the most discussed EV ownership topics—and one of the least mysterious once you separate battery chemistry from comfort loads.

## Cold chemistry and internal resistance

Lithium cells prefer moderate temperatures. When the pack is cold, internal resistance rises. The same amount of current produces more heat inside the cell and less usable energy at the wheels. Many cars also limit power until the pack warms, which protects longevity but shrinks the window where you can drive aggressively.

Preconditioning while plugged in transfers grid energy into heat before you unplug, which preserves driving range for the trip itself.

## Cabin heat is real load

Gas cars scavenge engine waste heat. EVs must create heat electrically—often several kilowatts on a cold morning. Seat heaters and a lower cabin setpoint routinely save more miles than any hypermiling trick on the highway.

<CalculatorEmbed slug="ev-winter-range-loss" />

### Mild vs. freezing: plan in bands

A forty-degree rainy day costs less than a sub-twenty-degree night with blasting defrost. Build a mental model: mild winter might cost five to ten percent; deep cold with generous heat can cost twenty-five percent or more versus EPA ratings.

## Driving mechanics still matter

Cold air is denser, tires lose pressure, and slush increases rolling resistance. Regenerative braking may also feel weaker on icy mornings when the BMS limits regen to keep stability. None of these effects mean your car is defective—they are physics plus software guardrails.

<CalculatorEmbed slug="ev-battery-range" />

## What actually helps

Plug in at home when possible so you start warm. Use scheduled departure to finish conditioning right before you leave. Favor seat and wheel heat over roasting the cabin. Slow down slightly on highway legs—the energy savings compound with temperature loss.

Winter range anxiety fades when you plan with realistic miles instead of summer marketing numbers. Measure your own commute loop once temperatures settle—you will know your true seasonal budget.`,
  },
  {
    file: "is-ev-cheaper-than-gas.md",
    front: {
      title: "Is an EV Cheaper Than Gas? A Straightforward Cost Comparison",
      description:
        "Compare per-mile energy cost, home charging rates, and when electric driving beats gasoline for your actual mileage.",
      slug: "is-ev-cheaper-than-gas",
      category: "EV Charging",
      date: "2026-04-08",
    },
    body: `The honest answer to "Is an EV cheaper than gas?" is the one every engineer hates: it depends on your rates, your car, and where you fuel. The good news is that the math is simple enough to run in a few minutes once you separate purchase price from energy price.

## Energy cost per mile is the fair comparison

Depreciation, insurance, and tires differ by model. For apples-to-apples operating cost, compare what you pay to move one mile on electricity versus gasoline. Take your local $/kWh, multiply by your observed kWh per mile, and stack that against fuel price divided by MPG.

Home charging at off-peak rates often wins dramatically. Heavy public DC use at premium per-kWh pricing can narrow or erase the gap.

<CalculatorEmbed slug="ev-vs-gas-savings" />

## When home charging wins big

If you plug in overnight on a residential time-of-use plan, your effective per-mile cost can land well below an efficient hybrid on gasoline. The break-even mileage point moves in your favor the more you drive annually—high-mileage commuters benefit first.

## When the gap shrinks

Road-trip-only charging, expensive DC sites, or regions with high residential electricity can push EV energy cost toward gas equivalents. Tax credits and maintenance savings may still tilt total cost of ownership, but this article focuses on fueling math.

<CalculatorEmbed slug="ev-cost-per-mile" />

## Build your own numbers

Pull one month of utility data and one tank of gas receipts. Use real kWh from your EV screen, not nameplate battery size. If you cannot charge at home, include session fees and idle charges where applicable.

### Bottom line

EVs are not magically cheap—they convert fuel into electrons efficiently. For many drivers with home charging, that efficiency shows up as lower monthly energy spend. Run your own figures instead of trusting slogans on either side of the debate.`,
  },
  {
    file: "prolong-ev-battery-life.md",
    front: {
      title: "How to Prolong EV Battery Life: Habits That Actually Matter",
      description:
        "Daily charge limits, DC fast-charging frequency, and temperature habits that slow degradation—without myth-heavy advice.",
      slug: "prolong-ev-battery-life",
      category: "EV Charging",
      date: "2026-04-05",
    },
    body: `EV batteries are designed to last years, but they are not immortal. Capacity fades gradually as calendar time, mileage, and heat accumulate. The habits that matter are boring—and effective.

## Understand state of health (SoH)

SoH is the percentage of usable capacity your pack retains versus new. A car at ninety-two percent SoH is still very usable; warranty thresholds often sit around seventy percent for eight years. What you are managing is the slope of decline, not chasing a perfect score.

<CalculatorEmbed slug="ev-battery-degradation" />

## Daily charging window

Staying between roughly twenty and eighty percent for routine commuting reduces time spent at high voltage stress. Many manufacturers ship with a daily limit around eighty percent for this reason. Save "charge to one hundred" for trips that need the extra miles.

## Fast charging: convenient, not free

DC sessions heat the pack and count heavily in degradation models when used weekly as primary fueling. Road trips are fine; living on 350 kW stations is harder on cells than overnight Level 2. Think of fast charging like sprinting—fine sometimes, exhausting as a lifestyle.

### Temperature and parking

Garage parking moderates summer heat soak. In winter, precondition on grid power before departure so the pack does not spend range heating itself. Avoid leaving the car at one hundred percent SoC in hot sun for days.

## Software is already helping

Your BMS balances cells, limits current when needed, and logs faults. Trust it—but give it reasonable inputs. Gentle acceleration, moderate DC use, and sane charge targets align with how packs are tested in the lab.

Battery longevity is a marathon. Small daily choices compound into years of useful range without turning ownership into a spreadsheet hobby.`,
  },
  {
    file: "hidden-costs-public-ev-charging.md",
    front: {
      title: "Hidden Costs of Public EV Charging (Session Fees, Idle Penalties, and More)",
      description:
        "Per-kWh rates are only part of the story—learn how session fees and idle charges inflate real public charging cost.",
      slug: "hidden-costs-public-ev-charging",
      category: "EV Charging",
      date: "2026-04-02",
    },
    body: `Public charging price boards love bold $/kWh numbers. The receipt tells a fuller story: connection fees, minimums, idle penalties, and membership tiers can turn a cheap-looking rate into a pricey stop.

## Energy vs. access fees

Some networks bill pure energy. Others add a flat session fee every time you plug in—painful on a twenty-minute top-up. Compare **effective** $/kWh: total dollars divided by kWh delivered, not the headline rate on the app map.

<CalculatorEmbed slug="ev-public-charging-cost" />

## Idle fees are policy, not punishment

When a stall is full and your car finishes charging, the site cannot serve the next driver. Idle fees encourage you to move within a grace period—often five to fifteen minutes. Set a phone alert when charging nears completion on busy corridors.

### Membership and peak windows

Subscriptions can lower per-kWh cost if you use the network often. Time-of-use pricing at public stations is appearing in congested markets. A stop at 6 p.m. may cost more than the same energy at midnight.

## How to compare to home

Home charging avoids session and idle line items entirely. If you road-trip twice a year but commute on public DC daily, your blended cost model should reflect that asymmetry.

## Receipt discipline

Log one month of public sessions: kWh, total paid, minutes idle. Divide total by kWh for your true rate. Use that number in ownership spreadsheets instead of the marketing card on the charger.

Transparent planning beats surprise receipts. Treat public charging like any utility bill—read the fine print, move the car when done, and know your effective price before you plug in.`,
  },
];

// Continue with remaining 15 posts in part 2 - the script is getting long
// I'll append solar, battery, appliances clusters

const posts2 = [
  {
    file: "solar-panel-roof-space-requirements.md",
    front: {
      title: "Solar Panel Roof Space Requirements: How Many Modules Fit?",
      description:
        "Roof area, setbacks, panel dimensions, and usable coverage—how to estimate max array size before you order gear.",
      slug: "solar-panel-roof-space-requirements",
      category: "Solar",
      date: "2026-03-28",
    },
    body: `Roof space is the hard ceiling on residential solar. Production calculators can optimize tilt and azimuth, but if the modules do not fit, the project stops there. Start with geometry, then refine for shade and code setbacks.

## Gross vs. usable area

Not every square foot of roof is legal or sensible for modules. Fire setbacks, vents, skylights, and walkways reduce the patch you can cover. A common planning factor is seventy to eighty-five percent of available roof plane—conservative designers stay at the low end.

Measure one plane at a time on simple gable homes. Complex roofs need segment-by-segment layouts.

<CalculatorEmbed slug="solar-roof-space" />

## Panel footprint vs. rated watts

Modern residential modules near 400 W often occupy roughly eighteen to twenty-two square feet each. Higher efficiency modules squeeze more watts into the same area—valuable on small roofs. Always use the manufacturer's datasheet dimensions, not rules of thumb from a decade ago.

## Matching production to load

Fitting panels is only step one. The array must also cover consumption. Daily kWh budget divided by local yield sets a wattage target. If the roof caps you below target, prioritize efficiency or load reduction before buying hardware.

<CalculatorEmbed slug="solar-panel-size" />

### Structural and shade reality

An engineer may limit attachment zones. A perfect south plane with a chimney shadow at 4 p.m. behaves like a smaller array. Walk the property at multiple hours before finalizing string locations.

Roof space math is blunt but honest. Know your usable area, pick a module size, and only then run production estimates—you will avoid the expensive mistake of ordering a stack of panels that have nowhere to land.`,
  },
  {
    file: "solar-roi-payback-period-guide.md",
    front: {
      title: "Solar ROI and Payback Period: A Practical Guide for Homeowners",
      description:
        "Turn installed cost, incentives, and annual kWh into a realistic payback timeline—without sales-deck optimism.",
      slug: "solar-roi-payback-period-guide",
      category: "Solar",
      date: "2026-03-25",
    },
    body: `Payback is the question behind every solar quote: "When does this investment break even?" The answer chains three inputs—upfront net cost, annual energy value, and whatever you assume about rate inflation—into a timeline you can sanity-check.

## Net cost after incentives

Start with the installed contract price, then subtract tax credits, rebates, and grants that actually apply to your tax situation. A thirty percent federal credit on a $20,000 system materially moves year one economics—but only if you have the tax liability to use it. Consult a tax professional for your filing.

## Annual savings in kWh dollars

Multiply expected first-year production by your blended electricity rate. If you export excess energy at a lower credit, split self-consumption from export instead of pretending full retail for every kWh.

<CalculatorEmbed slug="solar-payback-roi" />

## Simple payback vs. lifetime ROI

Simple payback divides net cost by annual savings. A seven-year payback on a twenty-five-year asset can be attractive. ROI over twenty-five years also counts residual value, inverter replacement, and degradation—more work, more accuracy.

### What sales decks exaggerate

Utility rates do not always rise three percent forever. Equipment fails. Consumption patterns change when you buy an EV. Model the conservative case first.

## Financing changes the story

Loans shift cash flow: lower immediate outlay, interest cost over time. Compare loan payment to pre-solar utility bill for monthly budget comfort, then still compute true payback on net cost.

Solar ROI is not magic—it is disciplined arithmetic. Know your net price, honest kWh value, and degradation, and you can spot a fair deal without relying on brochure charts.`,
  },
  {
    file: "optimize-solar-panel-tilt-angle.md",
    front: {
      title: "How to Optimize Solar Panel Tilt and Angle for Your Latitude",
      description:
        "Year-round vs. seasonal tilt, azimuth basics, and when roof pitch already gives you a free optimization.",
      slug: "optimize-solar-panel-tilt-angle",
      category: "Solar",
      date: "2026-03-22",
    },
    body: `Tilt and orientation translate sun into kilowatt-hours. The right angles maximize annual energy; the wrong ones leave production on the table. Fortunately, residential rules of thumb are stable even when inverter firmware gets complicated.

## Latitude sets the baseline

For a fixed mount optimized year-round, tilt near absolute latitude is the classic starting point. Forty degrees north? About forty-degree tilt from horizontal on a south-facing plane. Northern hemisphere modules face true south; southern hemisphere faces north.

<CalculatorEmbed slug="solar-angle-optimizer" />

## Seasonal tweaks

Summer sun rides high—tilt a bit flatter (latitude minus ten to fifteen) can help June yield. Winter sun hangs low—steeper tilt (latitude plus ten to fifteen) catches short days. Ground mounts and adjustable racks can chase this; most roof mounts inherit pitch and accept it.

<CalculatorEmbed slug="solar-panel-tilt" />

### Azimuth matters as much as tilt

A southeast or southwest array loses a few percent versus south—often acceptable if west bias helps evening loads. East-west "dual" residential layouts trade peak power for longer production curves. Know your consumption shape.

## Roof pitch is already a decision

Many installs simply parallel the roof. If pitch is close to latitude and azimuth is good, chasing extra degrees with exotic racking may not pay. Measure what you have before buying tilt kits.

Optimization is not about perfect angles on paper—it is about aligning production with when you use energy. Start with latitude math, adjust for season if you can, and validate with local yield data.`,
  },
  {
    file: "understanding-net-metering-solar.md",
    front: {
      title: "Understanding Net Metering for Home Solar (Credits, Exports, and Bills)",
      description:
        "How grid-tied billing treats exported kWh, import charges, and why NEM policy changes your payback.",
      slug: "understanding-net-metering-solar",
      category: "Solar",
      date: "2026-03-18",
    },
    body: `Net metering is the contract between your roof and the utility. It defines how exported solar energy is valued against what you draw at night. Policy names differ by state, but the mechanics rhyme.

## Self-consumption is the best kWh

When panels power loads in real time, you avoid buying retail power—full value in most regions. Export happens when production exceeds use. Credits may match retail rate (true net metering) or a lower export tariff (net billing).

<CalculatorEmbed slug="solar-net-metering" />

## Reading a post-solar bill

You will still see fixed customer charges. Energy charges split into kWh imported minus credited exports depending on tariff. Time-of-use plans reward west-facing bias if evening rates spike.

### Policy shifts matter for new projects

Utilities increasingly move toward lower export credits while keeping retail import rates. A system sized for one hundred twenty percent of last year's use under old NEM may look different under export-heavy tariffs. Model both.

## Oversizing and undersizing

Oversizing production without load can export cheap electrons. Undersizing leaves billable imports. Target net-zero on an annual kWh basis as a first pass, then refine for rate structure.

Grid-tie solar is a partnership with the meter. Understand how your utility values exports before you sign interconnection—and simulate monthly import/export, not just annual totals.`,
  },
  {
    file: "solar-panel-degradation-expectations.md",
    front: {
      title: "Solar Panel Degradation: What to Expect Over 25 Years",
      description:
        "First-year stabilization, annual fade rates, and how degradation affects long-term ROI planning.",
      slug: "solar-panel-degradation-expectations",
      category: "Solar",
      date: "2026-03-15",
    },
    body: `Panels do not produce like-new forever. Manufacturers warrant a minimum output at year twenty-five—often around eighty-seven to ninety percent of nameplate depending on tier. Planning with degradation baked in keeps finance models honest.

## First-year stabilization

Many modules show a small initial dip as encapsulants stabilize—separate from long-term fade. Warranties account for this with a year-one floor. Do not panic if year-two test is slightly below day-one flash data.

## Typical annual fade

Tier-one monocrystalline products often cite 0.4–0.6% per year after stabilization. Over twenty-five years that compounds to a noticeable but manageable loss. Cheap or unknown brands may warrant more conservative assumptions.

<CalculatorEmbed slug="solar-degradation" />

### Inverter and soiling are separate

Inverter replacement mid-life affects availability, not cell chemistry. Dust, pollen, and snow reduce output without degrading the cell—cleaning fixes the former, time fixes the latter.

## Impact on payback

If you modeled flat production for twenty-five years, add a gentle downward slope. Year ten might be five percent below year one—small in bill terms, large in aggregate NPV for commercial arrays.

Degradation is slow, predictable, and insured by spec sheets. Use realistic percentages in calculators, keep maintenance sensible, and treat warranties as the floor—not the expected outcome.`,
  },
];

const posts3 = [
  {
    file: "series-vs-parallel-battery-configurations.md",
    front: {
      title: "Series vs. Parallel Battery Configurations Explained",
      description:
        "How 4S2P wiring changes voltage and amp-hours, and why matched cells matter for DIY packs.",
      slug: "series-vs-parallel-battery-configurations",
      category: "Battery",
      date: "2026-03-12",
    },
    body: `DIY powerwalls, golf carts, and RV banks all boil down to two moves: series to raise voltage, parallel to raise capacity. Mix them wrong and a BMS rebellion follows.

## Series adds voltage

Four 3.2 V LiFePO4 cells in series become 12.8 V nominal. Amp-hours stay at the cell rating—100 Ah series strings are still 100 Ah. Power capability in watts rises because voltage rises at the same current limit.

## Parallel adds capacity

Two 100 Ah strings in parallel deliver 200 Ah at the same voltage. Each string must be identical chemistry and state of charge before you connect—or circulating current flows between strings.

<CalculatorEmbed slug="battery-series-parallel" />

## Naming conventions

4S2P means four cells in series per string, two strings in parallel. The label is shorthand installers use on diagrams. Always verify which dimension is S and which is P before ordering bus bars.

### Why matching matters

A weak cell in series limits the whole string. A low string in parallel gets hammered by its neighbor. Factory packs use matched cells and a BMS that bleeds balance energy—your bench build should aim for the same discipline.

## Cable and fuse sizing follow

Higher parallel current needs thicker conductors. Series stacks need voltage-rated contactors. After you compute V and Ah, run wire sizing for peak current—not average.

<CalculatorEmbed slug="dc-cable-size" />

Series and parallel are not interchangeable tricks—they are complementary tools. Sketch your target voltage and Ah first, then derive the configuration label before you buy a single cell.`,
  },
  {
    file: "what-is-battery-c-rate.md",
    front: {
      title: "What Is Battery C-Rate? Discharge Speed in Plain Language",
      description:
        "Convert between amps, capacity, and how long a pack can sustain a load at 1C, 2C, or higher.",
      slug: "what-is-battery-c-rate",
      category: "Battery",
      date: "2026-03-10",
    },
    body: `C-rate is how engineers talk about charge and discharge speed without guessing minutes. One C means a current equal to the capacity rating—100 A from a 100 Ah pack. Half C is gentler; two C is aggressive.

## The basic relationship

Hours to empty (ideal) ≈ 1 ÷ C-rate. At 0.5C you have about two hours. At 2C, about thirty minutes. Real packs deviate because voltage sags and BMS limits kick in, but the rule frames expectations.

<CalculatorEmbed slug="battery-c-rate" />

## Why datasheets cap C

High C heats cells and shrinks effective capacity, especially on lead-acid. Lithium iron phosphate tolerates strong discharge better than some chemistries, but still has continuous and peak limits. Inverter surge current can demand 2C briefly even when average load is low.

### Peukert on lead-acid

Lead-acid capacity collapses at high draw—a 100 Ah bank might behave like 70 Ah at heavy load. Lithium planning is closer to linear but not perfect.

## Choosing gear with C in mind

Size inverter battery current for peak C within spec. Undersized packs sag voltage, trip low-voltage cutoffs, and look "bad" when they are simply overworked.

<CalculatorEmbed slug="battery-runtime" />

C-rate is a language, not a mystery. Learn to translate your load amps into C, compare to the datasheet, and you will stop blaming batteries for trips that were predictable on paper.`,
  },
  {
    file: "managing-inverter-efficiency-losses.md",
    front: {
      title: "Managing Inverter Efficiency Losses in Off-Grid and Backup Systems",
      description:
        "Why DC-to-AC conversion eats watts, how to size input power, and where efficiency curves matter.",
      slug: "managing-inverter-efficiency-losses",
      category: "Battery",
      date: "2026-03-08",
    },
    body: `Every inverter turns some battery energy into heat. Efficiency in the mid-nineties sounds excellent until you multiply by years of runtime. Losses show up as extra Ah drawn from the bank, not as a line item on a screen.

## AC output vs. DC input

A 1,200 W load on a ninety-two percent efficient inverter might pull about 1,304 W from the battery side. Size cables and fuses for that DC number, not the AC appliance label.

<CalculatorEmbed slug="inverter-loss-calculator" />

## Partial load penalty

Many units peak efficiency near half rated load. Tiny night loads on a huge inverter waste more percentage-wise than a right-sized unit. For cabins, consider a small night inverter plus a larger daytime unit if loads are bimodal.

### Pure sine vs. modified

Motor and electronics loads care about waveform quality. Medical devices and variable-speed tools expect clean sine. Efficiency differences are secondary to whether the load runs at all.

## Sizing upstream

Inverter sizing starts with simultaneous AC loads, adds surge for motors, then divides by efficiency to get DC demand. Only then convert to Ah using system voltage and desired runtime.

<CalculatorEmbed slug="inverter-sizing" />

Treat efficiency as part of load—not a footnote. Two percentage points over a decade of off-grid nights is real money in fuel or panels you did not have to buy.`,
  },
  {
    file: "size-home-emergency-backup-battery.md",
    front: {
      title: "How to Size a Home Emergency Backup Battery Bank",
      description:
        "Essential loads, hours of autonomy, depth of discharge, and inverter losses in one sizing path.",
      slug: "size-home-emergency-backup-battery",
      category: "Battery",
      date: "2026-03-05",
    },
    body: `Whole-house backup sounds luxurious until you price a mansion-scale battery. Emergency sizing focuses on survival circuits: fridge, lights, router, well pump if needed. List watts, pick hours, add margin.

## Define the load list

Write each device and its running watts. Note which are surge loads—pumps and compressors need starting multipliers. Add ten to twenty percent for unknowns.

## Convert to watt-hours

Wh needed = total watts × hours of autonomy. Divide by inverter efficiency to get DC energy the bank must deliver. A 800 W essential panel for eight hours is 6,400 Wh before losses.

<CalculatorEmbed slug="home-backup-sizing" />

## Depth of discharge and chemistry

Lithium banks often plan at eighty percent usable; lead-acid may use fifty. Divide required Wh by usable fraction to get nameplate Wh, then convert to Ah at system voltage.

### Solar coupling

Grid-down events stretch longer when solar recharges the bank daytime. Pair storage sizing with a realistic daily harvest estimate—not summer peak only.

<CalculatorEmbed slug="solar-battery-bank" />

## Test before you trust

Run a controlled outage drill: kill the main and log voltage under load. Software models help, but a Saturday test reveals cable drops and phantom loads spreadsheets miss.

Emergency backup is engineering triage. Size for what keeps life safe and communications alive; expand later if budget allows.`,
  },
  {
    file: "understanding-battery-voltage-sag.md",
    front: {
      title: "Understanding Battery Voltage Sag Under Load",
      description:
        "Why voltage drops on DC cables and heavy loads, and how to keep inverters online.",
      slug: "understanding-battery-voltage-sag",
      category: "Battery",
      date: "2026-03-02",
    },
    body: `You measure 12.8 V at rest and watch 11.2 V under load—and wonder if the bank is dying. Often it is simply sag: resistance in cells, connections, and wire carrying current.

## Ohm's law on the bench

Voltage drop equals current times resistance. Double the amps on the same cable and drop doubles. Long thin runs are the usual villain in DIY 12 V systems.

<CalculatorEmbed slug="battery-voltage-drop" />

## When inverters trip

Low-voltage disconnect protects the battery from over-discharge but also reacts to sag. A brief compressor start can dip terminal voltage enough to reboot electronics even when average state of charge is fine. Shorter cables and heavier gauge fix many "mystery" shutdowns.

### Measure correctly

Measure at the battery terminals under load, not at the far end of a skinny extension. Compare to load current at the same instant.

## Design targets

Many installers aim for three percent or less DC drop on critical runs. High current 48 V systems help because current is lower for the same watts.

<CalculatorEmbed slug="ohms-law" />

Sag is physics, not drama. Calculate drop before you blame cells—upsize wire, tighten lugs, and watch starter loads with a clamp meter before replacing a bank that still has life.`,
  },
];

const posts4 = [
  {
    file: "crypto-mining-electricity-profitability.md",
    front: {
      title: "Crypto Mining Electricity Costs vs. Profitability Basics",
      description:
        "How to model rig watts, uptime, and $/kWh before hash rate ever enters the spreadsheet.",
      slug: "crypto-mining-electricity-profitability",
      category: "Appliances",
      date: "2026-02-28",
    },
    body: `Mining profitability debates love hash price and difficulty. Your power bill cares about simpler facts: how many watts leave the wall, how many hours they run, and what your utility charges per kilowatt-hour.

## Wall draw is the truth

Nameplate GPU TDP understates total system draw. Use a meter on the rig or PDU. Include PSU inefficiency—pulling 1,200 W at the wall might be 1,150 W delivered to cards.

<CalculatorEmbed slug="crypto-mining-power" />

## Monthly kWh arithmetic

kWh = watts × hours ÷ 1,000. A 1,200 W rig at twenty-four seven is about 864 kWh per month before cooling. Multiply by your rate for energy cost independent of coin price.

### Cooling and season

Summer AC to exhaust heat adds load not shown on the miner label. Basement winter mining may borrow free heat—still meter the fans.

## Revenue is separate

Coin price, pool fees, and hardware depreciation decide profit. Energy math only tells you the hurdle rate: revenue must exceed power cost plus hardware wear.

Track electricity honestly first. If kWh cost already exceeds gross mining income, no firmware tweak saves the project—only cheaper power or different hardware does.`,
  },
  {
    file: "vampire-energy-standby-power-waste.md",
    front: {
      title: "Vampire Energy and Standby Power Waste in the Home",
      description:
        "Find phantom loads, estimate annual cost, and cut waste without living like it's 1899.",
      slug: "vampire-energy-standby-power-waste",
      category: "Appliances",
      date: "2026-02-25",
    },
    body: `Vampire, phantom, standby—labels for the same trickle: devices that draw power while "off." Individually small, collectively a slice of residential use worth hunting.

## Typical culprits

Televisions with instant-on, game consoles, cable boxes, microwave clocks, printer sleep modes, and USB chargers with nothing plugged in. One to ten watts each adds up across a dozen devices.

<CalculatorEmbed slug="standby-power-waste" />

## Measure, do not guess

A fifteen-dollar plug meter on suspect outlets beats assumptions. Log watts, multiply by twenty-four hours, annualize, multiply by your rate. Shocking outlets justify smart strips.

### Smart strips and habits

Entertainment centers benefit from master-controlled strips. Chargers leave with laptops. For critical gear like routers, accept the draw or buy efficient models.

## Whole-home context

Standby might be five to ten percent of consumption in efficient homes, more in gadget-heavy setups. It will not rival HVAC, but it is the easiest waste to cut.

<CalculatorEmbed slug="energy-consumption" />

Vampire energy is death by a thousand milliwatts. Spend an afternoon metering suspects—you will find dollars worth unplugging without touching the thermostat.`,
  },
  {
    file: "portable-generator-fuel-consumption-runtime.md",
    front: {
      title: "Portable Generator Fuel Consumption and Runtime Planning",
      description:
        "Estimate gallons per hour and tank runtime from load watts and manufacturer fuel curves.",
      slug: "portable-generator-fuel-consumption-runtime",
      category: "Appliances",
      date: "2026-02-22",
    },
    body: `Generators are sold on peak watts and tank size. Outages ask a different question: how long will this tank last at my actual load? Answer that with fuel consumption at load, not brochure extremes.

## Rated vs. real load

A 3,500 W unit does not burn full fuel at 400 W of fridge and lights. Consumption scales roughly with electrical load—often quoted in gallons per hour at half and full load in manuals.

<CalculatorEmbed slug="generator-fuel-consumption" />

## Runtime math

Runtime = tank gallons ÷ consumption gal/hr at your load. If you do not know partial-load consumption, assume something between idle and full spec—many owners use seventy percent of full-load rate as a guess until they test.

### Safety and sizing

Never run portable units indoors. Match starting surge for motors—well pumps win the sizing fight, not LED bulbs.

## Fuel storage reality

Gasoline ages; rotate stored fuel with stabilizer. Propane models trade tank swap convenience for energy density math. Log hours per outage to refine next year's storage plan.

Generators reward conservative planning. Test once under real loads, record gal/hr, and you will never guess tank life during a storm again.`,
  },
  {
    file: "heat-pumps-vs-electric-heaters-efficiency.md",
    front: {
      title: "Heat Pumps vs. Electric Resistance Heat: Efficiency Compared",
      description:
        "COP explains why heat pumps move more BTUs per kWh than baseboard strips—and when resistance still appears.",
      slug: "heat-pumps-vs-electric-heaters-efficiency",
      category: "Appliances",
      date: "2026-02-18",
    },
    body: `Resistance heat turns one kWh into one kWh of heat—COP 1 by definition. Heat pumps move heat rather than manufacture it, delivering several kWh of heat per kWh of input when conditions are favorable.

## COP in plain language

A COP of 3.5 means three and a half units of heat delivered per unit of electricity consumed. Cold climates see COP fall; modern cold-climate units are engineered for it but still beat strips on many winter days.

<CalculatorEmbed slug="heat-pump-vs-resistance" />

## When strips still show up

Auxiliary resistance strips supplement heat pumps during defrost or extreme cold. They are backup, not the economic baseline. If your bill spikes on the coldest week, strips may be active—check runtime logs.

### Distribution matters

Forced air vs. mini-split vs. hydronic changes comfort and loss paths. COP at the outdoor unit does not always equal COP at the register.

## Cooling is the bonus

The same hardware air-conditions in summer. Compare total HVAC ownership, not heating alone.

<CalculatorEmbed slug="ac-energy-cost" />

Heat pumps are not magic—they are refrigerators run backward. Understand COP, model your climate, and resistance heat stops looking like the default comparison.`,
  },
  {
    file: "daily-watt-hour-budget-sustainable-home.md",
    front: {
      title: "Building a Daily Watt-Hour Budget for a Sustainable Home",
      description:
        "Split household use into categories, sum kWh, and connect daily budgets to bills and solar sizing.",
      slug: "daily-watt-hour-budget-sustainable-home",
      category: "Appliances",
      date: "2026-02-15",
    },
    body: `Sustainability starts with a number: how many watt-hours you spend per day. Not a vague "we should use less"—a ledger by category that informs solar, batteries, and behavior.

## Start with categories

HVAC, water heating, kitchen, laundry, lighting, plug loads, and EV charging each get a row. Estimate daily kWh per row from nameplate watts × hours ÷ 1,000, or from utility bills divided by thirty.

<CalculatorEmbed slug="whole-house-energy-budget" />

## Reconcile with the meter

Category sums rarely match the bill on the first pass. The gap is baseload, seasonal HVAC, or bad assumptions. Tune until you are within ten to fifteen percent—then trust the model.

### Daily vs. monthly thinking

Utilities bill monthly; solar and batteries think daily and seasonal. Convert: monthly kWh ÷ thirty for average day, but keep summer and winter rows separate for array sizing.

## Turn insight into action

Once kitchen and water heater dominate, you know where heat-pump upgrades or timer switches pay. Once EV charging dominates, you know where off-peak rates matter.

<CalculatorEmbed slug="appliance-daily-cost" />

A watt-hour budget is a map, not a lecture. Build it once a year, embed calculators where math helps, and your home stops being a black box that only surprises you when the bill arrives.`,
  },
];

// Legacy migrated posts
const legacy = [
  {
    file: "understanding-battery-watt-hours.md",
    front: {
      title: "Understanding Battery Watt-Hours (Wh)",
      description:
        "What watt-hours mean, how to convert from Ah, and why Wh matters for solar and EV planning.",
      slug: "understanding-battery-watt-hours",
      category: "Guides",
      date: "2026-03-01",
    },
    body: `Watt-hours (Wh) measure energy—the total amount of work a battery can deliver. Unlike amp-hours (Ah), Wh accounts for voltage, which makes it the best unit for comparing packs of different chemistries and voltages.

## The simple formula

For any battery: **Wh = Ah × V**. A 100 Ah 12 V lead-acid battery stores 1,200 Wh. A 50 Ah 48 V lithium pack stores 2,400 Wh—twice the energy despite half the amp-hours.

Use WattQuick's Ah to Wh and Wh to Ah converters for instant conversions while planning a system.

## Why it matters for solar and EV

Solar loads and appliance labels are usually in watts or kilowatt-hours. EV chargers and utility bills use kWh. Converting your battery to Wh lets you answer: how many hours will this run, or how much of my pack does this trip use?`,
  },
  {
    file: "solar-panel-sizing-basics.md",
    front: {
      title: "Solar Panel Sizing Basics for Off-Grid Systems",
      description:
        "How peak sun hours, daily energy use, and system efficiency determine the panel wattage you need.",
      slug: "solar-panel-sizing-basics",
      category: "Solar",
      date: "2026-02-18",
    },
    body: `Sizing solar starts with your daily energy budget in watt-hours (Wh). Add up everything you plan to run—lights, fridge, pumps, chargers—and multiply watts by hours of use per day.

## Peak sun hours

Panels are rated at full sun (1,000 W/m²). Real locations average fewer equivalent hours per day. Many US sites see 3–6 peak sun hours depending on season and latitude.

Required panel watts ≈ daily Wh ÷ (peak sun hours × system efficiency). Efficiency captures inverter loss, wiring, dust, and temperature—often 75–85% for good installs.

## Add margin

Cloudy weeks and battery aging mean you should oversize 20–30% beyond the calculator minimum. Pair panel sizing with a battery bank calculator for complete off-grid planning.`,
  },
  {
    file: "ev-home-charging-cost.md",
    front: {
      title: "How to Estimate EV Home Charging Cost",
      description:
        "Calculate what it costs to charge your EV at home using kWh and your utility rate.",
      slug: "ev-home-charging-cost",
      category: "EV Charging",
      date: "2026-02-05",
    },
    body: `Home charging cost is straightforward: multiply the energy delivered (kWh) by your electricity rate ($/kWh). A 60 kWh charge at $0.15/kWh costs about $9 before fees.

## Account for charging losses

The car and charger lose some energy as heat. If you pull 65 kWh from the wall to fill a 60 kWh pack, use the higher number for cost. Many drivers assume 5–10% overhead.

## Compare to gas

Divide your charging cost by miles driven for a per-mile energy cost. It's often lower than gasoline, but rates vary widely by region and time-of-use plans.`,
  },
];

function writePost({ file, front, body }) {
  const fm = [
    "---",
    `title: "${front.title.replace(/"/g, '\\"')}"`,
    `description: "${front.description.replace(/"/g, '\\"')}"`,
    `slug: "${front.slug}"`,
    `category: "${front.category}"`,
    `date: "${front.date}"`,
    "---",
    "",
    body.trim(),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(OUT, file), fm, "utf8");
  console.log("wrote", file);
}

[...posts, ...posts2, ...posts3, ...posts4, ...legacy].forEach(writePost);
console.log("done", posts.length + posts2.length + posts3.length + posts4.length + legacy.length, "files");

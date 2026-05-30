---
title: "Solar Water Pump Sizing: Why Array kWp Matters More Than Panel Stickers"
description: "Learn how pump watts, daily run hours, pumping head, and peak sun hours drive kWp, panel count, and MPPT controller choice for off-grid water."
slug: "water-pump-solar-sizing-guide"
category: "Solar"
date: "2026-05-30"
---

Stop relying on the grid for your water needs—calculate the perfect solar array to keep your pump running efficiently all day long.

Water pumping is one of the oldest off-grid loads—and one of the easiest to undersize. A sticker that says “2 hp” does not tell you how many kilowatt-hours you need before the storage tank fills, and a stack of random panels does not guarantee those hours arrive when the sun is high. Sizing starts with physics: electrical demand at the motor, hydraulic work at the impeller, and how many equivalent full-sun hours your site actually harvests.

## The “why” behind solar array sizing for pumps

Every liter lifted against gravity costs energy. Motors convert electrical watts into mechanical work; friction in pipes and fittings adds margin on top of static head. Solar arrays must deliver **daily energy in**, not just “enough volts to spin the pump once.”

### Three variables that dominate the spreadsheet

1. **Pump power (W)** — running watts at your real head, not brochure nameplate at sea level  
2. **Daily run hours** — irrigation blocks, livestock cycles, or pressure-tank duty  
3. **Pumping head (m)** — static lift plus friction; deeper wells and long lateral runs need more Wh per hour  

Peak sun hours tie the electrical budget to geography. A 750 W pump for six hours might need ~3–5 kWp in a 5-hour sun zone after system losses—very different from a 2 kWp guess based on motor horsepower alone.

<CalculatorEmbed slug="water-pump-solar-sizing" />

## DC pumps vs. AC pumps: different loss chains

**DC solar pumps** (brushless or permanent magnet) often connect through a dedicated solar drive or MPPT pump controller. You skip a general-purpose inverter, which helps efficiency—but you still need correct Voc/Isc matching and cable sizing for voltage drop on long trench runs.

**AC submersible or surface pumps** need an inverter with surge capacity for startup inrush. A 750 W running load might see 2–3× momentary draw. Array sizing must cover **daily kWh**, while inverter sizing must cover **peak watts**.

| Factor | DC solar pump | AC pump + inverter |
|--------|---------------|---------------------|
| Efficiency path | Fewer conversion stages | Inverter + motor losses |
| Startup | Often soft-start in controller | Surge rating critical |
| Maintenance | Controller at well head | Standard motor service |
| Best fit | Dedicated boreholes, drip | Existing AC infrastructure |

## Head height and final energy use

Head is not decorative—it scales hydraulic work. If your measured pump watts already include lift at your well, treat the head field as verification only. If you are using catalog watts at “rated head,” enter your true dynamic head so the model adds realistic friction margin.

Shallow sump pumps at 5 m behave differently from 80 m submersibles. Friction in 2-inch pipe over hundreds of meters can cost as much as another 10 m of static lift. When in doubt, measure amps × volts on site during a normal irrigation day.

## MPPT: when it stops being optional

PWM controllers are fine for tiny 12 V livestock fountains. Irrigation and farm systems quickly cross into **MPPT territory**:

- Array above ~150–200 W nameplate  
- Battery voltage mismatched to panel Vmp  
- Cold mornings where Voc rises and harvest improves with MPPT tracking  

The calculator flags MPPT recommendations from array size, pump watts, and head—use it as a shopping filter, then confirm controller amperage against your string Isc at max cell temperature.

## Planning checklist

1. Log pump **running** watts (clamp meter), not locked-rotor surge  
2. Sum hours the pump actually runs per day during peak season  
3. Measure or estimate total dynamic head (static + friction)  
4. Use conservative peak sun hours for your worst month, not July brochure data  
5. Add 20–30% array margin if tanks must refill on partly cloudy days  
6. Pair with [Solar Charge Controller Size](/solar-charge-controller-size/) and [Solar Battery Bank Size](/solar-battery-bank/) if you store energy for night pressure  

<CalculatorEmbed slug="water-pump-solar-sizing" />

## Go deeper

- [Solar Energy for Agriculture: Choosing a Water Pump System](/blog/solar-water-pumping-agriculture/) — DC vs. AC tradeoffs for farm water  
- [Water Independence: Complete Guide to Sizing Solar Panels for Pumps](/blog/water-independence-solar-panel-guide/) — panel count, maintenance, and field current control  

The right array is the one that refills your tank on the worst realistic sun day—not the sunniest afternoon of the year. Run the numbers, then spec hardware your installer can defend in writing.

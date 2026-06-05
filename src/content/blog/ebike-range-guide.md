---
title: 'The Complete Guide to E-Bike Battery Range: Wh, Assist, and Weight'
description: >-
  What actually determines how far an e-bike rides on one charge? Wh/km model,
  assist levels, mass, wind, BMS limits, and a free range calculator.
slug: ebike-range-guide
category: E-Bike
date: '2026-06-05'
relatedToolId: ebike-range-estimator
---

Manufacturer range figures are useful as a starting point, not as a specification you can bank on in the field. Two riders on identical bikes can report a spread of thirty percent or more on the same route because **energy consumption is a function of physics**, not marketing copy. Watts-hours (Wh) stored in the pack, watts-hours consumed per kilometre (Wh/km) on the road, and the fraction of stored energy the battery management system (BMS) actually releases under your riding conditions together define the distance you will travel before assist fades or the controller cuts out.

This guide explains the variables that dominate real-world range, introduces a practical Wh/km consumption model, and points you to tools that let you quantify assumptions instead of guessing.

## Why advertised range is an estimate, not a measurement

E-bike brands typically publish range tested on flat terrain, moderate assist, a defined rider mass, and sometimes capped speed. Change any one of those inputs and the result moves. Regulatory labels in some markets list **voltage, amp-hour (Ah) capacity, and watt-hour (Wh) rating**; range in kilometres is derived, not measured on your commute.

Three structural reasons explain the gap between brochure numbers and your experience:

1. **Consumption varies with assist level** — higher pedal-assist settings increase motor duty cycle and electrical draw even when you still pedal.
2. **Mass scales rolling resistance and climb work** — rider, cargo, and bike weight all raise the Wh/km baseline.
3. **The BMS enforces voltage and temperature guardrails** — the pack may stop delivering usable energy before every labelled Wh has been extracted.

Treat published range as a single point on a surface, not the surface itself.

## Wh versus Ah — why battery voltage matters

Amp-hours alone do not describe energy. A 10 Ah pack at 36 V stores 360 Wh; the same 10 Ah at 52 V stores 520 Wh. Range scales with **watt-hours**, not amp-hours:

```
Energy (Wh) = Nominal voltage (V) × Capacity (Ah)
```

When comparing packs, convert everything to Wh first. Two batteries labelled "500 Wh" from different vendors may still behave differently if one tolerates higher continuous current or has lower internal resistance — topics covered in our [voltage sag guide](/blog/ebike-voltage-sag-guide/) and [battery voltage comparison](/blog/ebike-battery-voltage-comparison/).

### State of charge (SOC) and usable window

Many riders operate between roughly 20 % and 80 % SOC for cell longevity. That policy intentionally leaves headroom at the top and bottom, which **reduces effective range per charge** even though the full Wh label on the housing is unchanged. Planning range on usable Wh — not nameplate Wh — avoids surprise cutouts on long loops.

## What the BMS removes before the pack is "empty"

The battery management system monitors cell voltages, temperatures, and current. It may:

- **Limit discharge current** when cells warm or sag under load
- **Cut assist** when any cell hits a low-voltage threshold
- **Refuse regeneration or charging** outside safe envelopes

From the rider's perspective the bike "runs out early." From the engineer's perspective the BMS protected the series string. Range planning should assume you will not extract 100 % of nameplate Wh on every ride, especially in cold weather or on steep gradients where sag and heat rise together.

## The Wh/km consumption model

Range estimation reduces to energy balance:

> **Range (km) = (Battery capacity (Wh) × Efficiency) ÷ Power consumption (Wh/km)**

Where:

- **Battery capacity (Wh)** — nameplate or measured usable Wh
- **Efficiency** — combined factor for drivetrain, inverter/controller, and discharge losses (often 0.88–0.95)
- **Power consumption (Wh/km)** — road load expressed as electrical draw at the pack

### Base consumption: rolling and friction

On level ground at moderate speed, a competent e-bike system often sits in a **8–10 Wh/km** band before heavy assist, headwinds, or climbing. Tyre pressure, tread compound, bearing drag, and tyre diameter nudge this baseline. Knobby off-road tyres and soft pressures push toward the top of the band; firm road tyres on smooth asphalt sit lower.

### Assist multiplier (levels 1–5)

Pedal-assist maps rider torque demand to motor output. Higher levels multiply electrical consumption even when you contribute leg power. A workable planning model maps assist level 1 to a **×1.0** factor and level 5 to **×2.5**, with linear steps between:

```
Assist factor = 1 + (level − 1) × 0.375
```

Level 3 therefore uses roughly ×1.75 the base Wh/km before other penalties. Turbo modes that ignore rider input can exceed this model — measure your own loop if you rely on level 5 daily.

### Weight penalty

Total mass — rider, bike, racks, water, tools — raises rolling resistance and climb energy. A common rule of thumb for planning:

```
Weight adder (Wh/km) = max(0, (total mass kg − 80) ÷ 10) × 0.1
```

Eighty kilograms is a reference rider-plus-bike mass; adjust mentally if you ride ultralight or carry panniers. For a deeper mass-and-terrain breakdown, see the [E-Bike Weight vs Performance calculator](/ebike-weight-performance/).

### Wind and terrain factor

Headwinds, drag at higher road speed, and gradient work multiply consumption. Planning factors often span **0.8** (tailwind, flat) to **1.5** (steep climb or strong headwind). This is not a substitute for physics-based climb integrals, but it keeps field estimates honest when you lack elevation data.

Combine terms:

```
Wh/km = (base Wh/km × assist factor × wind/terrain factor) + weight adder
```

Then apply the range formula above.

## Factors absent from the datasheet

### Temperature

Lithium-ion internal resistance rises in cold weather. The same assist setting pulls higher current for the same power, accelerates **voltage sag**, and may trigger earlier BMS limits. Winter range can fall sharply even when Wh/km at the motor controller looks unchanged on paper.

### Aerodynamic drag

Drag scales roughly with the square of speed relative to air. Pushing from 25 km/h to 35 km/h on a flat road increases aero share of load materially. Published ranges tied to 25 km/h tests will undershoot at faster cruising speeds.

### Motor and drivetrain efficiency

Mid-drive systems see chain losses; hub motors see tyre flex and unsprung mass trade-offs. Controller efficiency and battery IR losses sit between the cell and the wheel. The **pack efficiency** term in the range equation absorbs these collectively when you lack instrumented measurements.

## Calculate your range — WattQuick tool

Plug your pack Wh, assist level, total mass, base Wh/km assumption, efficiency, and wind/terrain factor into the calculator. It applies the model above and returns estimated kilometres plus a consumption breakdown.

<CalculatorEmbed slug="ebike-range-estimator" />

**Calculate it yourself in our [E-Bike Range Estimator](/ebike-range-estimator/)** — enter capacity, assist, mass, and conditions; adjust base Wh/km until your known commute distance matches reality, then reuse the calibrated values for new routes.

## Quick reference table

| Scenario | Indicative Wh/km (500 Wh pack, 92 % eff.) | Approx. range |
|----------|---------------------------------------------|---------------|
| Flat, level 1, 75 kg, calm | 9 | 51 km |
| Flat, level 3, 85 kg, calm | ~16 | 29 km |
| Rolling hills, level 3, 90 kg, ×1.2 terrain | ~19 | 24 km |
| Steep climb assist, level 5, 95 kg, ×1.5 terrain | ~28+ | 16 km |

Figures are illustrative. Calibrate against a ride you measure with a cycle computer and reported SOC drop.

## Linking range to system voltage

Higher nominal voltage does not automatically mean more range, but it changes how current flows for the same mechanical power. A 48 V system draws less amperage than 36 V for identical watts, which can reduce sag and BMS stress. Read [36V vs 48V vs 52V for e-bikes](/blog/ebike-battery-voltage-comparison/) when choosing a new pack or retrofit.

## Engineering summary

Range is energy divided by consumption. Wh is the correct energy unit; Ah requires voltage. Assist level, mass, wind, gradient, temperature, and BMS behaviour set Wh/km. Advertised range is one test point — model your own loop, keep SOC policies explicit, and re-run the numbers when you change tyres, cargo, or assist habits.

Browse all e-bike tools on the [E-Bike calculator category](/category/ebike/).

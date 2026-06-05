---
title: 'E-Bike Voltage Sag: An Engineering Guide to Voltage Drop Under Load'
description: >-
  Why terminal voltage falls when the motor draws current, how S×P pack layout
  sets internal resistance, and how to calculate sag before the BMS limits assist.
slug: ebike-voltage-sag-guide
category: E-Bike
date: '2026-06-05'
relatedToolId: ebike-voltage-sag
---

You read 48 V on a multimeter at rest. Under full throttle on a grade the display shows sag, assist softens, and sometimes the battery management system (BMS) reduces current even though the state of charge (SOC) looked healthy a moment earlier. That behaviour is **voltage sag** — the inevitable drop across the pack's internal resistance and interconnects when current flows — not necessarily a failing cell.

Understanding sag separates normal physics from defective packs, informs controller and battery pairing, and explains why two systems with identical Wh labels can feel different on climbs.

## What voltage sag is — and what it is not

**Sag** is the difference between open-circuit voltage (no load) and terminal voltage under discharge current:

```
V_sag = I_draw × R_total
V_under_load = V_nominal − V_sag
```

It is not the same as SOC depletion over minutes of riding; sag is the **instantaneous** IR drop when amps rise. A fresh pack at 80 % SOC can still sag heavily if current is high or internal resistance is elevated by cold temperature.

Confusing sag with a "bad battery" leads to unnecessary replacements. Confusing sag with BMS undervoltage protection leads to mis-sized controllers. Measure and calculate first.

## Nominal voltage versus loaded voltage

E-bike packs are described by nominal voltage — often 36 V, 48 V, or 52 V — corresponding to series cell count (10S, 13S, 14S for typical lithium-ion chemistries). Nominal is a label for planning; **loaded voltage** determines whether the inverter stage, controller capacitors, and BMS thresholds remain happy.

Example: a 13S pack near 48 V nominal might rest at 54 V fully charged and operate around 45–49 V in the mid-SOC window. Pull 25 A through 150 mΩ equivalent resistance and you lose 3.75 V instantly — the controller sees roughly 4 V less than the resting figure.

### BMS interaction

Most e-bike BMS units monitor per-cell or pack voltage. If any cell group approaches a cutoff (often near 2.8–3.0 V per cell under load, chemistry-dependent), the BMS **reduces or cuts discharge current** to protect the string. Heavy sag under load can trip that logic even when average SOC is acceptable, especially if cell balance is imperfect or one group is weaker.

Symptoms riders report: "full bars, then power dies on the hill." Engineers look at **loaded cell voltages**, not icon bars.

## Internal resistance and S×P layout

Pack resistance is dominated by cells and how they are wired:

> **R_total = (R_cell × S) ÷ P**

Where:

- **R_cell** — average internal resistance of one cell (quality 18650 or 21700 cells often quoted around 0.03 Ω DC, batch-dependent)
- **S** — cells in series (sets voltage)
- **P** — parallel groups (halves resistance when doubled)

A 13S4P pack uses thirteen series groups, each group being four cells in parallel. Parallel halves resistance; series adds it. High P counts help sag and thermal sharing; they add mass and cost.

### Where resistance hides beyond cells

Nickel strip welds, bus bars, battery management system MOSFETs, main discharge connector, and the cable to the controller contribute milliohms. A pack that tests well on a bench with thin leads can look worse on the bike. Tighten the path: short leads, adequate connector rating, and solid welds.

## When sag becomes a practical problem

### Peak versus continuous current

Controllers advertise peak and continuous amps. Sag calculations should use the **current you actually draw** at the worst point — often peak on a steep segment, not average on flat road. If peak is 30 A but you size for 15 A average, surprise cutouts follow.

### Effect on torque and speed

Brushless systems approximate constant power regions; as voltage falls, current must rise to maintain power until limits hit. Sag therefore **caps achievable power** even before SOC is exhausted. Hub and mid-drive setups differ in gearing, but the electrical side still obeys V × I.

### Rider-visible signs

- Assist "softens" on grades though SOC is mid-range
- Headlights dim momentarily under acceleration (shared pack bus)
- Error codes referencing voltage or communication after hard climbs

Log current and voltage with a display that reports pack V if available; correlate events to gradient and assist level.

## Calculate sag for your pack and controller

Use cell resistance estimate, series and parallel count, nominal voltage, and max controller draw:

<CalculatorEmbed slug="ebike-voltage-sag" />

**Calculate it yourself in our [E-Bike Voltage Sag Calculator](/ebike-voltage-sag/)** — enter S×P layout, R_cell, and max amps; read sag volts, loaded voltage, and pack resistance in milliohms.

## Reducing sag — system choices

| Lever | Effect |
|-------|--------|
| More parallel cells (higher P) | Lower R_total |
| Higher-quality lower-IR cells | Lower R_cell |
| Shorter, heavier gauge harness | Less connection loss |
| Higher nominal voltage for same power | Lower current, less I×R |

Sag reduction trades cost and mass. A 52 V system moving 500 W draws fewer amps than 36 V at the same power, which reduces I×R drop for identical pack resistance — one reason voltage tiers matter. See [36V vs 48V vs 52V](/blog/ebike-battery-voltage-comparison/).

### C-rating and continuous current

Cells and packs specify continuous discharge C-rates. Exceeding them heats the pack and raises effective resistance. Verify motor demand against pack capability with the [E-Bike Battery C-Rating calculator](/ebike-battery-c-rate/).

## Controllers, sag, and pairing

A controller sized for 40 A peaks on a pack that sags to BMS limits at 25 A wastes potential and may encourage aggressive phase current tuning. Conversely, a modest controller on a strong low-IR pack rides comfortably. Controller selection is the companion topic in our [e-bike controller guide](/blog/ebike-controller-selection-guide/) and [Amps to Watts calculator](/ebike-controller-watts/).

## Measurement discipline

1. Rest voltage at known SOC — record ambient temperature.
2. Loaded voltage during a controlled climb or brake dyno — note current if available.
3. Compare sag to calculated R_total; investigate connections if measured sag exceeds model by a wide margin.

Repeat in cold weather if you winter-ride; resistance and chemical kinetics shift.

### Instrumentation options

A hall-effect clamp on the battery lead plus a logging display reporting pack voltage gives the most actionable field data. Without logging, a single peak-current event on a known grade still bounds worst-case sag when you note resting voltage immediately before and during the climb. Avoid relying on state-of-charge icons alone — they integrate current over time and lag behind instantaneous bus voltage.

### Interpreting results against cell datasheets

If calculated R_total from S×P and published R_cell matches measured sag within ten to fifteen percent, the pack is behaving as designed under that current. Larger gaps often trace to connector resistance, damaged nickel strip, or a weak parallel group. Balance issues show as uneven group voltages at the end of discharge; sag events mid-SOC with balanced groups point to high current relative to pack design, not necessarily a dead pack.

## Relation to range planning

Sag does not directly subtract kilometres from a Wh/km model, but it can force lower assist or earlier BMS intervention, which **raises effective Wh/km** on climbs. Range and sag analyses should be read together — start with [e-bike range guide](/blog/ebike-range-guide/) and the [Range Estimator](/ebike-range-estimator/).

## Summary

Voltage sag is current times pack resistance. Layout (S×P), cell quality, temperature, and connections set resistance. Loaded voltage drives BMS and controller behaviour. Calculate sag before replacing packs or upsizing motors; pair with C-rating and controller watt checks for a complete electrical picture.

Explore all tools in the [E-Bike category](/category/ebike/).

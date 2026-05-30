---
title: "Choosing the Right Wire Size for Your Green Home Project"
description: "Link cable length and current for HVAC, EV chargers, and solar subpanels—use the residential voltage drop calculator before you pull wire."
slug: "green-home-wire-sizing-voltage-drop"
category: "Power"
date: "2026-05-30"
---

Green retrofits add **new continuous loads** in old envelopes: heat pumps where resistance heat lived, EV chargers where a table lamp once sat, battery inverters in garages built in 1978. Breaker space is easy to see; **copper length** is hidden until something underperforms.

## Length × current sets the project

Two projects with the same amp rating can need different wire:

| Project | Typical sustained A | Length risk |
|---------|---------------------|-------------|
| Heat pump (mini-split) | 15–30 | Outdoor line set + electrical whip |
| Central heat pump | 30–60 | Panel to outdoor unit |
| Level 2 EVSE | 32–48 | Garage feed dominates |
| Solar inverter subpanel | 20–40 | Roof to garage run |

Ampacity tables tell you the **minimum** gauge that will not melt. Voltage-drop math tells you the **practical** gauge that will not starve the load.

<CalculatorEmbed slug="residential-voltage-drop" />

## Workflow for electricians and DIY planners

1. **Convert power to amps** — [Watts to Amps](/watts-to-amps/) with correct voltage (240 V vs. 120 V)  
2. **Measure one-way length** — panel → disconnect → load  
3. **Pick trial AWG or mm²** from supply house stock  
4. **Run calculator** — aim ≤3% on dedicated motor/EV circuits  
5. **Step up** if borderline—copper cost is smaller than a second trench  

### Metric vs. imperial installs

European and UK projects size in **mm²**; North American branches list **AWG**. The calculator includes both—select the label on the spool you are buying, not a rough conversion from memory.

## HVAC and heat pumps

Compressors draw LRA on startup but **run hours** at FLA. Undervoltage from thin feeders shows up as:

- Brownouts on other circuits when the compressor kicks  
- Manufacturer fault codes for low supply  
- Reduced COP because the system works harder on less voltage  

Size the **electrical** run to the outdoor disconnect, not just the indoor air handler circuit if they share a marginal subfeed.

## EV charging runs

Continuous load rules mean:

- Use nameplate **maximum** current, not “average”  
- Account for **derating** in hot attic conduit  
- Long garage feeds often need **6 AWG / 10 mm²** where intuition says 10 AWG / 2.5 mm²  

Run drop at 40 A and 35 m once—you will thank yourself when the car takes full power instead of 24 A.

## Solar and battery subpanels

Inverter AC output circuits still obey drop. A 7.6 kW inverter at 240 V is ~32 A—fine on paper with 10 AWG until the combiner is 45 m from the main panel. Model it.

Pair DC runs with [DC Cable Size](/dc-cable-size/) and AC runs with [Residential Voltage Drop](/residential-voltage-drop/)—hybrid systems need both.

## Mistakes that pass inspection but fail physics

- “Breaker is 40 A, so wire must be fine” — load may be continuous  
- Reusing a 1960s garage feeder for a 2026 EVSE  
- Mixing aluminum old feed with copper extension without proper rating  

<CalculatorEmbed slug="residential-voltage-drop" />

## Related reading

- [Residential Voltage Drop Guide](/blog/residential-voltage-drop-guide/) — targets and checklist  
- [Why Home Voltage Drop Matters](/blog/why-home-voltage-drop-matters/) — motors and heat  

Green home projects fail quietly on voltage, not loudly on carbon math. Pull the right gauge the first time—the calculator is cheaper than opening finished drywall.

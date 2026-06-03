---
title: 'Battery Calendar Aging: Storage Conditions vs. Long-Term Health'
description: >-
  Model Li-ion calendar fade from average temperature, SOC, and pack
  age—capacity loss % and remaining SoH.
slug: battery-calendar-aging-guide
category: Battery
date: '2026-05-30'
relatedToolId: battery-calendar-aging
---

Batteries age even when you're not using them—calculate the impact of storage conditions on your battery's health and longevity.

Every lithium-ion pack carries two aging clocks. **Cycle aging** counts charge throughput and C-rate abuse. **Calendar aging** ticks from calendar time, temperature, and the voltage stress of how full you keep the cell—even at zero miles and zero amps. Warehouse spares, backup BESS units, and seasonal EVs all fade on the shelf.

## Why calendar aging is electrochemistry, not laziness

Inside the cell, side reactions never fully stop:

- **SEI layer growth** on the anode consumes lithium inventory  
- **Cathode electrolyte oxidation** rises with temperature and high SOC  
- **Micro-cracking and impedance rise** show up as lost capacity, not a thrown breaker  

Heat accelerates reaction rates (Arrhenius behavior—roughly double the fade rate every 10 °C above a mild reference). High SOC pushes electrodes toward potentials that favor parasitic currents. That is why “fully charged in a hot garage” is the fastest path to a tired pack.

<CalculatorEmbed slug="battery-calendar-aging" />

## What the calculator models

| Input | Physical meaning |
|-------|------------------|
| Avg storage °C | Thermal stress on side reactions |
| Avg SOC % | Electrode voltage stress while idle |
| Age (years) | Integrated calendar exposure |

Outputs:

- **Calendar loss %** — capacity fade attributed to storage time  
- **Remaining SoH %** — planning state of health vs. new  
- **%/yr fade rate** — sensitivity before you change storage habits  

Baseline assumes ~2%/year at 25 °C and 50% SOC—midpoint for many Li-ion chemistries. Real packs vary (LFP often calendars slower than high-nickel NMC). Use for **comparisons and what-if**, not warranty claims.

## Separate calendar from cycles

Driving, fast charging, and deep cycles add **cycle aging** on top. A low-mileage EV in Phoenix at 100% SOC can look “unused” yet calendar-stressed. Pair this tool with [EV Battery Degradation](/ev-battery-degradation/) when mileage matters.

<CalculatorEmbed slug="battery-calendar-aging" />

Storage is a design choice. Cooler, mid-SOC, and honest age accounting keep SoH closer to the green zone on the gauge—whether the pack powers a driveway or a blackout closet.

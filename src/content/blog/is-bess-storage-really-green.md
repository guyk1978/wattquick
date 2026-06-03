---
title: Is Your Battery Really Green? Carbon Math for Storage Systems
description: >-
  How round-trip energy losses create indirect CO₂ emissions—and why charging
  from renewables is what makes BESS carbon-neutral in operation.
slug: is-bess-storage-really-green
category: Green Home
date: '2026-05-30'
relatedToolId: bess-carbon-cost
---

A wall-mounted battery with a leaf logo is still a **conversion machine**. It buys kilowatt-hours, stores them imperfectly, and sells them back with a haircut. The haircut is heat—not a moral failure, just physics. The carbon question is: **what generation mix produced the extra kilowatt-hours you lost?**

## Round-trip losses are indirect emissions

Efficiency \(\eta\) means you must import \(C/\eta\) kWh to deliver \(C\) kWh to the house (per full cycle on capacity \(C\)).

The gap \((1/\eta - 1) \times C\) is wasted as:

- I²R in conductors  
- Inverter switching  
- Cell overpotential and thermal management  

If that gap was charged from a grid averaging 420 gCO₂/kWh, it has a footprint **even if discharge replaced clean solar hours later**. You already paid the carbon on the loss slice at charge time.

<CalculatorEmbed slug="bess-carbon-cost" />

### Example intuition

| RTE | Loss per 10 kWh cycle |
|-----|------------------------|
| 90% | ~1.11 kWh |
| 85% | ~1.76 kWh |
| 95% | ~0.53 kWh |

250 cycles/year at 1.1 kWh loss ≈ 275 kWh wasted. At 420 g/kWh → **~116 kg CO₂/yr** from losses alone.

## Why renewable charging matters

Marginal renewables (curtailed solar, behind-the-meter PV surplus) often displace near-zero **additional** grid generation on that kWh. Charging the BESS then makes loss energy **carbon-light**.

Grid-midnight charging in a coal-heavy region can flip the story—financial arbitrage savings may still exist while carbon rises.

### Not all “green tariffs” are equal

- **Matched RECs** — contractual zero if additionality is credible  
- **Average grid mix label** — may not change hour of charging  
- **Community solar** — good if production aligns with charge window  

Operational green status is a **schedule + source** problem, not a sticker problem.

## Motors and appliances are separate

Voltage drop and motor stress live on the delivery circuit. BESS carbon lives on the **charge source + efficiency** plane. Do not confuse bill savings with climate savings without running both numbers.

## Action list

1. Run [BESS Carbon Cost](/bess-carbon-cost/) with your real cycles/year  
2. Log when the battery actually charges (app export)  
3. Shift charge windows toward solar surplus or published low-carbon hours  
4. Re-run calculator with lower effective gCO₂ if charging improves  

## Related reading

- [BESS Carbon Cost Guide](/blog/bess-carbon-cost-guide/) — full methodology  
- [BESS Charge Scheduling](/blog/bess-charge-scheduling-low-carbon/) — timing tactics  

Green storage is **renewable-fed, efficient storage**—not storage alone.

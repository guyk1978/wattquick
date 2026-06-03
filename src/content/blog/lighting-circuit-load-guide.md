---
title: 'Lighting Circuit Load: Safe Sizing for Home Branch Circuits'
description: >-
  Add fixture watts, voltage, and breaker rating—check amps and the 80%
  continuous-load limit before lights flicker or breakers trip.
slug: lighting-circuit-load-guide
category: Appliances
date: '2026-05-30'
relatedToolId: lighting-circuit-load
---

Avoid flickering lights and tripped breakers—calculate your lighting circuit load accurately to ensure safe and balanced electrical design.

A lighting branch is easy to overload invisibly: twelve cans at 9 W each looks trivial until you add under-cabinet strips, porch lights on the same homerun, and a dimmer that was never rated for the stack. **Load management** is counting watts, converting to amps, and respecting the breaker’s continuous-load headroom—not guessing from “it’s only lights.”

## Why lighting circuits need their own math

- **Long run times** — kitchens, halls, and outdoor security run 3+ hours; codes treat many lighting loads as **continuous**  
- **Shared neutrals** — unbalanced LED drivers can add harmonic current on older neutrals  
- **Renovation drift** — LED retrofits lower amps, but additions (tape light, fans with lights) climb again  

Branch breakers protect wire temperature. Loading to 100% of the handle rating leaves no margin for heat or inrush.

<CalculatorEmbed slug="lighting-circuit-load" />

## The 80% continuous-load guideline

On a **15 A** breaker, plan ≤ **12 A** continuous (≈1,440 W @ 120 V).  
On a **20 A** breaker, plan ≤ **16 A** continuous (≈1,920 W @ 120 V).

```
Amps = total watts ÷ voltage
Utilization % = 100 × amps ÷ breaker rating
Alert when amps > 0.8 × breaker rating
```

The calculator flags **over 80%**, **near limit**, and **overloaded** (>100% of breaker).

### LED vs. legacy planning

| Era | Typical can | 12 fixtures |
|-----|-------------|-------------|
| Incandescent BR30 | 65 W | 780 W (~6.5 A @ 120 V) |
| LED retrofit | 9 W | 108 W (~0.9 A) |

Do not size 2026 circuits using 1990 wattages—but **do** use actual driver ratings from cut sheets, not “equivalent to 60 W” marketing.

## Design checklist

1. List **every** luminaire on the breaker (including exhaust fan/light combos)  
2. Enter **nameplate W** per fixture  
3. Confirm **circuit voltage** (120 V line-to-neutral typical in US)  
4. Enter **breaker amps** from panel schedule  
5. Stay ≤80% continuous unless a licensed designer approves otherwise  

Pair with [Residential Voltage Drop](/residential-voltage-drop/) on long garage feeds and [LED vs. Incandescent ROI](/led-vs-incandescent-roi/) when reducing load.

<CalculatorEmbed slug="lighting-circuit-load" />

## Go deeper

- [Lighting Design Without Overloading Breakers](/blog/lighting-circuit-80-percent-rule/) — continuous load and LED notes  
- [Home Lighting Circuit Safety Check](/blog/home-lighting-circuit-safety/) — DIY verification during remodels  

Lights should dim on purpose—not because the branch is gasping for amps.

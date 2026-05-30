---
title: "AC Inrush Current: Size Breakers Without Nuisance Trips"
description: "Calculate running amps, peak inrush, and recommended breaker curve from watts, voltage, and startup multiplier."
slug: "ac-inrush-current-guide"
category: "Guides"
date: "2026-05-30"
---

Prevent nuisance trips—calculate the true inrush current of your equipment and select the right breaker to keep your circuits running smoothly.

A compressor clicks, the lights dip, and the breaker opens—yet the nameplate says **15 A** and you installed a **20 A** breaker. The failure is not steady-state overload; it is **inrush**: a millisecond surge when magnetizing windings and charging capacitors. Breakers are dual creatures: thermal (seconds) and magnetic (instantaneous).

## Why inrush management matters

Undersized protection causes:

- Nuisance trips on every start  
- Technicians bumping breakers without checking wire ampacity  
- Shop owners blaming “weak utility power” when the curve was wrong  

Oversized protection without engineering causes fire risk—this tool targets **right-sized breakers with the right curve**, not “go bigger until it stops tripping.”

<CalculatorEmbed slug="ac-inrush-current" />

## The planning math

```
I_run  = P ÷ V
I_peak = I_run × inrush factor
```

Breaker handle must satisfy **both**:

1. **Continuous load** — often 125% of I_run for motor branch rules (planning)  
2. **Magnetic inrush** — peak below instantaneous trip band for curve type  

| Curve | Typical magnetic band (planning) |
|-------|----------------------------------|
| Type B | ~3–5× rated current |
| Type C | ~5–10× rated current |
| Type D | ~10–20× rated current |

Enter manufacturer inrush factor when available; otherwise use 5–7× for small motors, higher for heavy tools.

## Wire vs. breaker

Size copper for **I_run**, not I_peak. Inrush is short—breakers tolerate it; wire insulation does not tolerate sustained overcurrent.

Pair with [Residential Voltage Drop](/residential-voltage-drop/) on long branch runs.

<CalculatorEmbed slug="ac-inrush-current" />

Smooth startups need coordinated **curve + load type + sometimes soft-start**. Model the spike first—the breaker stops being a mystery.

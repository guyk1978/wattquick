---
title: "Residential AC Voltage Drop: Why Your Cables Matter More Than You Think"
description: "Model voltage loss in home copper runs from amps, length, and AWG or mm²—stay within 3–5% guidelines for safe appliance and EV charger operation."
slug: "residential-voltage-drop-guide"
category: "Power"
date: "2026-05-30"
---

Don't let long cable runs steal your power—calculate residential voltage drop and ensure your appliances get the voltage they need for safe, efficient operation.

Branch circuits look simple on paper: breaker, wire, outlet, load. In practice, **every meter of copper** adds resistance, and resistance converts part of your supply voltage into heat in the cable—not at the motor, charger, or compressor where you need it.

## Why we calculate voltage drop

Electrical codes limit how far voltage may fall between the panel and the point of use:

- **~3%** on many branch-circuit guides (motors, lighting, outlets)  
- **~5%** as a broader planning ceiling when feeder and branch are combined  

Drop is not academic. A 120 V circuit at 6% drop delivers ~113 V—compressors lug, EVSE software derates current, and dimmers buzz.

<CalculatorEmbed slug="residential-voltage-drop" />

## What drives the numbers

1. **Current (A)** — continuous load, not breaker rating alone  
2. **Length (m)** — one-way path from panel to load  
3. **Conductor size** — AWG or mm² copper area  
4. **Supply voltage (V)** — 120 V line-to-neutral, 230 V line, etc.  

Formula in plain language:

```
Drop (V) = amps × (Ω per meter × 2) × meters
Drop (%) = 100 × drop ÷ supply voltage
```

The calculator uses typical copper resistance at 20 °C and flags whether you are inside 3% or 5% bands.

### Common mistakes

| Mistake | Effect |
|---------|--------|
| Using breaker amps instead of load amps | Underestimates drop |
| Ignoring return conductor | Drop looks half as bad as reality |
| Mixing metric length with AWG from a US chart | Wrong resistance |
| Forgetting continuous EV/HVAC loads | Wire too small on paper |

## Green-home loads that need the math

- **Heat pumps** — long outdoor runs from subpanels  
- **Level 2 EVSE** — sustained 32–48 A  
- **Detached garage / barn** — 30–60 m feeds  
- **Pool heat pumps** — buried conduit length adds up  

Pair with [Watts to Amps](/watts-to-amps/) to convert nameplate kW to current before you run drop.

## Planning checklist

1. Measure **one-way** cable path (not round-trip guess)  
2. Use actual load amps (plate or clamp meter)  
3. Run [Residential Voltage Drop](/residential-voltage-drop/) at planned gauge  
4. If >3%, step up one wire size or shorten route  
5. Verify local code and permit requirements—this tool plans; AHJ approves  

<CalculatorEmbed slug="residential-voltage-drop" />

## Go deeper

- [Why Home Devices Struggle: Voltage Drop Explained](/blog/why-home-voltage-drop-matters/) — resistance, heat, motor life  
- [Wire Size for Green Home Projects](/blog/green-home-wire-sizing-voltage-drop/) — HVAC, EV, solar subpanels  

Voltage is delivered—not guaranteed. Size copper once, sleep through startup surges later.

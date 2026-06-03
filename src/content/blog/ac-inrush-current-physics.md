---
title: Why Does the Breaker Trip on Startup? Inrush Current Physics
description: >-
  Inrush in motors, transformers, and power supplies—and how to use the AC
  inrush calculator to stop nuisance AFCI/MCB trips.
slug: ac-inrush-current-physics
category: Guides
date: '2026-05-30'
relatedToolId: ac-inrush-current
---

The breaker sees a fault. The motor sees Monday morning. **Inrush current** is the brief overlap where those two stories disagree.

## What creates inrush

| Load type | Mechanism | Typical multiplier |
|-----------|-----------|-------------------|
| **Induction motor** | Flux must build; rotor at standstill looks like low impedance | 5–8× FLA |
| **Transformer** | Magnetizing inrush charging core | 8–12× for ms |
| **SMPS / drives** | Bulk capacitors charge | 10–50× for µs–ms |
| **Incandescent** | Cold filament resistance | 10–12× briefly |

Duration matters: motor inrush may be **50–300 ms**; breaker magnetic zones allow a few cycles of overload if the curve matches.

<CalculatorEmbed slug="ac-inrush-current" />

## Why thermal rating is not enough

A 20 A breaker does not mean “anything under 20 A forever.” It means:

- **Thermal element** — trips on sustained overload (~minutes)  
- **Magnetic element** — trips on sudden high current (~milliseconds)  

You can be under 20 A average and still trip if **I_peak** crosses the magnetic threshold for your curve class.

### Using the calculator to avoid nuisance trips

1. Enter **nameplate running watts** (or measured run amps × V).  
2. Enter **line voltage** at the equipment (120, 208, 230, 240).  
3. Enter **inrush factor** from manual or table (6× default for motors).  
4. Read **peak amps** and **recommended breaker + curve**.  
5. If installed breaker is smaller or Type B with high peak—upgrade curve (C/D) or add soft-start.  

Do not “fix” trips by jumping two wire sizes on breaker alone without matching conductor.

## Field symptoms vs. root cause

| Symptom | Often actually |
|---------|----------------|
| Trips only on cold start | Magnetic inrush |
| Trips after 10+ minutes | Thermal overload or bad bearing |
| Random trip under load | Loose terminal, not inrush |
| GFCI/AFCI trip | Leakage or inverter noise—different diagnosis |

<CalculatorEmbed slug="ac-inrush-current" />

Inrush is physics, not personality. Measure run and peak, match the curve, and breakers stop arguing with your motors.

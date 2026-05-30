---
title: "Choosing Motor Breakers: Type B, C, and D Explained"
description: "How breaker curves handle inrush peaks—and planning shop and lab panels before equipment arrives."
slug: "motor-breaker-selection-guide"
category: "Guides"
date: "2026-05-30"
---

Residential breakers in North America are often arc-fault or standard thermal-magnetic—curve letters B/C/D are more visible on **IEC-style** devices and industrial panels. Globally, the idea is the same: **instantaneous trip multiplier** must clear inrush without nuisance while thermal protection respects run amps.

## Curve classes in plain language

| Class | Magnetic band (typical) | Good for |
|-------|------------------------|----------|
| **B** | ~3–5× rated I | Resistive: heaters, lighting (steady) |
| **C** | ~5–10× rated I | Mix loads, compressors, small motors |
| **D** | ~10–20× rated I | High inrush: large motors, transformers, welders |

A 20 A Type C might allow ~100–150 A briefly; Type B might trip at ~80 A. Same handle rating, different **spike tolerance**.

<CalculatorEmbed slug="ac-inrush-current" />

## Workshop and home-lab planning

Before drywall closes or machines land:

1. **Inventory loads** — watts, voltage, motor vs. resistive  
2. **Assign inrush factors** — 6× default motors; 3× for VFD with soft-start  
3. Run [AC Inrush Current](/ac-inrush-current/) per branch candidate  
4. **Document breaker + curve** on panel schedule  
5. **Verify wire** ampacity for run amps × 125%, not peak  

### Example branch sketch

| Load | P | V | Factor | Peak (calc) | Breaker pick |
|------|---|---|--------|-------------|--------------|
| Table saw | 1800 W | 120 | 6× | ~90 A | 20 A Type C |
| Air compressor | 2400 W | 240 | 7× | ~70 A | 20 A Type C/D |
| LED bench supply | 400 W | 120 | 3× | ~10 A | 15 A Type B |

Numbers are illustrative—your nameplate wins.

## Common mistakes

- **Same breaker for motor and sensitive electronics** — inrush noise on shared branch  
- **#14 wire on 20 A breaker** because trips stopped after upsizing breaker only  
- **No coordination** between main and subfeed—sub trips first under combined starts  

## Hybrid and overseas installs

EU 230 V single-phase shops: I_run = P/V drops vs. 120 V, but peaks still drive curve choice. UK garage feeders often specify Type C for socket radial with motor loads.

<CalculatorEmbed slug="ac-inrush-current" />

Breaker selection is front-loaded design. Pick the curve when you still have the one-line diagram—not after the third nuisance trip ruins a batch run.

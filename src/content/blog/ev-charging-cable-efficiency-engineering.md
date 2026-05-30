---
title: "Where Did the Power Go? Engineering EV Charging Cable Efficiency"
description: "Joule heating, conductor sizing, and how to pick home EV cables that stay cool under sustained Level 2 current."
slug: "ev-charging-cable-efficiency-engineering"
category: "EV Charging"
date: "2026-05-30"
---

The electrons that miss your battery did not vanish—they became **heat in conductors** obeying $P = I^2 R$. EV owners see the symptom as a warm cable or sluggish charge; engineers see **resistance budget** violated somewhere between the breaker and the J1772 or Type 2 plug.

## Joule’s law on the charging path

For each amp through resistance $R$:

```
P_loss = I² × R   (watts)
```

$R$ scales with **length** and inversely with **cross-sectional area** for copper:

```
R_one-way ≈ 0.0175 Ω·mm²/m × L / A
R_round-trip ≈ 2 × R_one-way   (out + return conductor)
```

At 32 A and 0.05 Ω round-trip, you dissipate **51 W continuously**—like leaving a bright incandescent bulb inside the cable jacket for the whole session.

### Why “a little warm” is a signal

Insulation is rated for temperature rise. Chronic overheating:

- Accelerates jacket aging and copper oxidation  
- Increases contact resistance at strained plugs  
- Can push the EVSE to limit current when voltage sag triggers under-voltage protection  

<CalculatorEmbed slug="ev-charging-cable-loss" />

## mm² vs. amps — picking quality home cable

European installs often label **2.5, 4, 6, 10 mm²** copper. North American portable EVSEs cite **AWG**—convert mentally or use the mm² stamped on the cord jacket.

| mm² (copper) | Typical portable / fixed use |
|--------------|------------------------------|
| 2.5 | Light 16 A extension—avoid long runs at 32 A |
| 4 | 16–24 A sustained with short runs |
| 6 | Common OEM 32 A jumper, &lt; 15 m |
| 10 | Long driveway runs, outdoor heat soak margin |

**Quality** means more than copper area:

- **TPE / XLPE** jacket rated for outdoor UV and coil flex  
- **Silver-plated contacts** on replaceable ends (industrial cords)  
- **Stranded copper** with proper strand count for flex cycles  
- **No household flat triple-tap** extensions on EV duty  

Buy **EV-rated** assemblies with temperature monitoring in the plug where available.

## Home station checklist

1. Measure **one-way** cable path length (not coil diameter).  
2. Read sustained **amps** from the EVSE screen during a full session.  
3. Enter mm² from jacket printing into the loss tool.  
4. If loss watts exceed ~30–40 W, upsize or relocate the wallbox closer to the parking spot.  

### Fixed wiring vs. portable cord

Premises wiring (6 mm² back to the panel) plus a short 6 mm² EV jumper usually wins over a 15 m 2.5 mm² “convenience” cord from a distant socket. The calculator models **one continuous copper path**—sum segments separately if you chain lengths.

<CalculatorEmbed slug="ev-charging-cable-loss" />

Cable engineering is not accessory shopping—it is loss budgeting. Respect $I^2R$, size copper for the longest amp-heavy hour, and keep heat out of the plug.

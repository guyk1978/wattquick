---
title: 'Why Batteries Age at Rest: Understanding Calendar Aging'
description: >-
  Temperature- and voltage-driven side reactions in Li-ion cells—and why 100%
  charge in heat destroys packs fastest.
slug: battery-calendar-aging-explained
category: Battery
date: '2026-05-30'
relatedToolId: battery-calendar-aging
---

A battery on a shelf is not frozen in time—it is a chemical reactor held at a chosen temperature and voltage. **Calendar aging** is the slow loss of lithium inventory and electrode activity while you are not cycling the pack.

## Electrochemistry 101 (without the lab coat)

During charge, lithium ions shuttle between cathode and anode through electrolyte. Ideal reactions are reversible. Reality adds **parasitic paths**:

1. **Solid electrolyte interphase (SEI)** forms on graphite—necessary at first, then thickens and consumes lithium forever.  
2. **Cathode surface films** grow faster at high cell voltage (high SOC).  
3. **Transition metal dissolution** (some chemistries) poisons the anode over years.  

These are **temperature-activated**. A pack at 40 °C does not age twice as fast as at 25 °C—it can be much worse than linear depending on chemistry and BMS sleep current.

### The voltage story (why SOC matters)

Open-circuit voltage tracks SOC. High SOC means:

- Cathode held at oxidizing potentials → more electrolyte decomposition  
- Anode at low lithium chemical potential → SEI repair and growth  
- Gas generation risk in worst cases (swelling packs)  

Low SOC is not free either—very deep storage can raise anode-related risks on some chemistries—but for **calendar** planning, the disaster combo is **100% SOC + heat**.

<CalculatorEmbed slug="battery-calendar-aging" />

## 100% charge in a hot garage: the fast lane to fade

| Condition | Calendar stress |
|-----------|-----------------|
| 50% SOC, 20 °C | Baseline planning zone |
| 80% SOC, 30 °C | Elevated—common “plugged in” EV habit |
| 100% SOC, 38 °C | Severe—sun-loaded garage + full buffer |

EV OEMs ship **charge limits** and **thermal management** because they know calendar loss shows up in warranty data before odometers look impressive.

### Home backup and RV banks

Lead-acid veterans remember sulfation on the shelf. Lithium is different chemistry but the same lesson: **storage is a operating mode**. A 13.5 kWh wall sitting at 100% through a Texas summer calendars harder than one exercised daily at 40–60% SOC.

## Measure before you guess

Log:

- Average idle SOC (BMS app or shunt monitor)  
- Worst-case storage temperature (cheap data logger)  
- Install or first-commission date  

Enter into [Battery Calendar Aging](/battery-calendar-aging/) to see if fade is dominated by **time × heat × voltage** rather than “bad luck.”

<CalculatorEmbed slug="battery-calendar-aging" />

Calendar aging is silent capacity theft. Respect temperature and SOC when the pack rests—cycles can wait, but side reactions will not.

---
title: How to Size a Home Emergency Backup Battery Bank
description: >-
  Essential loads, hours of autonomy, depth of discharge, and inverter losses in
  one sizing path.
slug: size-home-emergency-backup-battery
category: Battery
date: '2026-03-05'
relatedToolId: home-backup-sizing
---

Whole-house backup sounds luxurious until you price a mansion-scale battery. Emergency sizing focuses on survival circuits: fridge, lights, router, well pump if needed. List watts, pick hours, add margin.

## Define the load list

Write each device and its running watts. Note which are surge loads—pumps and compressors need starting multipliers. Add ten to twenty percent for unknowns.

## Convert to watt-hours

Wh needed = total watts × hours of autonomy. Divide by inverter efficiency to get DC energy the bank must deliver. A 800 W essential panel for eight hours is 6,400 Wh before losses.

<CalculatorEmbed slug="home-backup-sizing" />

## Depth of discharge and chemistry

Lithium banks often plan at eighty percent usable; lead-acid may use fifty. Divide required Wh by usable fraction to get nameplate Wh, then convert to Ah at system voltage.

### Solar coupling

Grid-down events stretch longer when solar recharges the bank daytime. Pair storage sizing with a realistic daily harvest estimate—not summer peak only.

<CalculatorEmbed slug="solar-battery-bank" />

## Test before you trust

Run a controlled outage drill: kill the main and log voltage under load. Software models help, but a Saturday test reveals cable drops and phantom loads spreadsheets miss.

Emergency backup is engineering triage. Size for what keeps life safe and communications alive; expand later if budget allows.

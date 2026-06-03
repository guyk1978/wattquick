---
title: Understanding Battery Voltage Sag Under Load
description: >-
  Why voltage drops on DC cables and heavy loads, and how to keep inverters
  online.
slug: understanding-battery-voltage-sag
category: Battery
date: '2026-03-02'
relatedToolId: battery-voltage-drop
---

You measure 12.8 V at rest and watch 11.2 V under load—and wonder if the bank is dying. Often it is simply sag: resistance in cells, connections, and wire carrying current.

## Ohm's law on the bench

Voltage drop equals current times resistance. Double the amps on the same cable and drop doubles. Long thin runs are the usual villain in DIY 12 V systems.

<CalculatorEmbed slug="battery-voltage-drop" />

## When inverters trip

Low-voltage disconnect protects the battery from over-discharge but also reacts to sag. A brief compressor start can dip terminal voltage enough to reboot electronics even when average state of charge is fine. Shorter cables and heavier gauge fix many "mystery" shutdowns.

### Measure correctly

Measure at the battery terminals under load, not at the far end of a skinny extension. Compare to load current at the same instant.

## Design targets

Many installers aim for three percent or less DC drop on critical runs. High current 48 V systems help because current is lower for the same watts.

<CalculatorEmbed slug="ohms-law" />

Sag is physics, not drama. Calculate drop before you blame cells—upsize wire, tighten lugs, and watch starter loads with a clamp meter before replacing a bank that still has life.

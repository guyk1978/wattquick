---
title: Series vs. Parallel Battery Configurations Explained
description: >-
  How 4S2P wiring changes voltage and amp-hours, and why matched cells matter
  for DIY packs.
slug: series-vs-parallel-battery-configurations
category: Battery
date: '2026-03-12'
relatedToolId: battery-series-parallel
---

DIY powerwalls, golf carts, and RV banks all boil down to two moves: series to raise voltage, parallel to raise capacity. Mix them wrong and a BMS rebellion follows.

## Series adds voltage

Four 3.2 V LiFePO4 cells in series become 12.8 V nominal. Amp-hours stay at the cell rating—100 Ah series strings are still 100 Ah. Power capability in watts rises because voltage rises at the same current limit.

## Parallel adds capacity

Two 100 Ah strings in parallel deliver 200 Ah at the same voltage. Each string must be identical chemistry and state of charge before you connect—or circulating current flows between strings.

<CalculatorEmbed slug="battery-series-parallel" />

## Naming conventions

4S2P means four cells in series per string, two strings in parallel. The label is shorthand installers use on diagrams. Always verify which dimension is S and which is P before ordering bus bars.

### Why matching matters

A weak cell in series limits the whole string. A low string in parallel gets hammered by its neighbor. Factory packs use matched cells and a BMS that bleeds balance energy—your bench build should aim for the same discipline.

## Cable and fuse sizing follow

Higher parallel current needs thicker conductors. Series stacks need voltage-rated contactors. After you compute V and Ah, run wire sizing for peak current—not average.

<CalculatorEmbed slug="dc-cable-size" />

Series and parallel are not interchangeable tricks—they are complementary tools. Sketch your target voltage and Ah first, then derive the configuration label before you buy a single cell.

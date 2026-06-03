---
title: What Is Battery C-Rate? Discharge Speed in Plain Language
description: >-
  Convert between amps, capacity, and how long a pack can sustain a load at 1C,
  2C, or higher.
slug: what-is-battery-c-rate
category: Battery
date: '2026-03-10'
relatedToolId: battery-c-rate
---

C-rate is how engineers talk about charge and discharge speed without guessing minutes. One C means a current equal to the capacity rating—100 A from a 100 Ah pack. Half C is gentler; two C is aggressive.

## The basic relationship

Hours to empty (ideal) ≈ 1 ÷ C-rate. At 0.5C you have about two hours. At 2C, about thirty minutes. Real packs deviate because voltage sags and BMS limits kick in, but the rule frames expectations.

<CalculatorEmbed slug="battery-c-rate" />

## Why datasheets cap C

High C heats cells and shrinks effective capacity, especially on lead-acid. Lithium iron phosphate tolerates strong discharge better than some chemistries, but still has continuous and peak limits. Inverter surge current can demand 2C briefly even when average load is low.

### Peukert on lead-acid

Lead-acid capacity collapses at high draw—a 100 Ah bank might behave like 70 Ah at heavy load. Lithium planning is closer to linear but not perfect.

## Choosing gear with C in mind

Size inverter battery current for peak C within spec. Undersized packs sag voltage, trip low-voltage cutoffs, and look "bad" when they are simply overworked.

<CalculatorEmbed slug="battery-runtime" />

C-rate is a language, not a mystery. Learn to translate your load amps into C, compare to the datasheet, and you will stop blaming batteries for trips that were predictable on paper.

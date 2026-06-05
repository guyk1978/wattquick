---
title: "Shading & Strings: Why Your Central Inverter is Limiting Your Yield"
description: >-
  Why does one shaded panel drag down a whole string? Bypass diodes, MPPT
  mismatch, and when optimizers pay for themselves—plus a tool to quantify kWh
  and dollar loss.
slug: shading-and-strings-guide
category: Solar
date: '2026-06-05'
relatedToolId: solar-shading-analysis
---

Your monitoring app says the array should be producing more. The sun is out. So why is the string underperforming? Often the answer is not a failed inverter—it is **one partially shaded module** forcing the entire series string into a bad operating point.

## The weakest link: how strings work

In a classic **string inverter** layout, modules are wired in **series**. Current is the same through every panel in that string. Voltage adds—but only if the string can agree on a single maximum power point (MPP).

When one module sees less light, it becomes the weak link. The string does not average things out gracefully. It negotiates downward.

## The physics of failure

### 1. Bypass diodes and voltage drop

Modern modules split cells into substrings, each protected by a **bypass diode**. When shade covers roughly **10–15%** of a panel, those diodes can engage to protect shaded cells from overheating.

That removes about **one-third of the module's active voltage** from the string—not just the shaded cells. The remaining modules still want to run at their native V<sub>mpp</sub>, but the string voltage stack no longer matches what the inverter's MPPT algorithm expects.

### 2. Mismatch loss

The inverter hunts for a global MPP across the string. With one low-voltage module in the chain, the tracker often settles on a **sub-optimal point** where unshaded panels give up output to keep the string alive.

This **mismatch loss** is why installers warn that a single chimney shadow or tree branch can cost **double-digit percent** on a string—even when only one module is affected.

### 3. Why optimizers and microinverters behave differently

**Module-level power electronics** (DC optimizers or microinverters) let each panel hunt its own MPP. Shade on module #4 does not dictate current through modules #1–#3.

You still lose energy on the shaded module—but you stop paying a **system-wide penalty** for one bad actor.

## When to upgrade to optimizers or microinverters

Consider module-level hardware when:

- Recurring shadows from **trees, chimneys, vents, or adjacent roofs** hit the array at predictable hours
- Customer complaints sound like *"it works great in summer but falls off a cliff in winter"*
- Production is consistently **below modeled kWh** despite clean equipment and no obvious faults

The capex is real. So is the **lifetime kWh** left on the table with a central string inverter on a partially shaded roof.

## Calculate your actual loss

Do not guess what a branch costs per year. Our **Solar Shading Analysis** tool separates:

- Direct irradiance loss on shaded modules
- Bypass-diode substring effects (string topology)
- Mismatch drag on central inverters
- Annual **kWh** and **$** impact, plus optimizer payback when warranted

<CalculatorEmbed slug="solar-shading-analysis" />

## Summary

Shading is not a minor trim on production—it is a **string-level efficiency problem** on central inverter systems. Optimizers and microinverters isolate the damage to the shaded module instead of taxing the whole chain.

Quantify the loss before you spec the fix. Numbers turn a vague "my system underperforms" into a billable upgrade conversation.

---

*Ready to verify the string after mitigation? Use the [Solar Array Current Calculator](/solar-array-current/) for post-install checks. For orientation and tilt—not shading on an existing string—see [Solar Panel Tilt](/solar-panel-tilt/) and your site yield tools.*

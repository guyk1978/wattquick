---
title: Crypto Mining Electricity Costs vs. Profitability Basics
description: >-
  How to model rig watts, uptime, and $/kWh before hash rate ever enters the
  spreadsheet.
slug: crypto-mining-electricity-profitability
category: Appliances
date: '2026-02-28'
relatedToolId: crypto-mining-power
---

Mining profitability debates love hash price and difficulty. Your power bill cares about simpler facts: how many watts leave the wall, how many hours they run, and what your utility charges per kilowatt-hour.

## Wall draw is the truth

Nameplate GPU TDP understates total system draw. Use a meter on the rig or PDU. Include PSU inefficiency—pulling 1,200 W at the wall might be 1,150 W delivered to cards.

<CalculatorEmbed slug="crypto-mining-power" />

## Monthly kWh arithmetic

kWh = watts × hours ÷ 1,000. A 1,200 W rig at twenty-four seven is about 864 kWh per month before cooling. Multiply by your rate for energy cost independent of coin price.

### Cooling and season

Summer AC to exhaust heat adds load not shown on the miner label. Basement winter mining may borrow free heat—still meter the fans.

## Revenue is separate

Coin price, pool fees, and hardware depreciation decide profit. Energy math only tells you the hurdle rate: revenue must exceed power cost plus hardware wear.

Track electricity honestly first. If kWh cost already exceeds gross mining income, no firmware tweak saves the project—only cheaper power or different hardware does.

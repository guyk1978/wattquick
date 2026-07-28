"use client";

import { cn } from "@/lib/utils";

interface BessRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for BESS ROI Calculator [VIZ].
 * Shifted kWh = capacity × DoD × RTE; $ = spread × kWh × cycles.
 * Sample: 13.5 kWh · $12,000 · $0.38/$0.09 · 1×/day · 90%/90% · 10 yr
 * → $3.17/day · $96/mo · $1,157/yr · 10.4 yr payback · LCOS $0.301/kWh.
 */
export function BessRoiViz({ className }: BessRoiVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--bess-roi", className)}
      aria-label="BESS ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">BESS · TOU Arbitrage Payback</h3>
        <p className="tool-viz__subtitle">
          CapEx buys a pack that charges off-peak and discharges on peak —
          cumulative tariff savings race the install cost to payback.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg bess-roi-viz"
          role="img"
          aria-labelledby="broi-viz-title broi-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="broi-viz-title">
            BESS ROI animated payback and cash-flow diagram
          </title>
          <desc id="broi-viz-desc">
            Battery capacity, install cost, and peak versus off-peak rates
            determine daily arbitrage savings and payback years. Sample: a 13.5
            kilowatt-hour pack costing 12,000 dollars with a 0.38 to 0.09 dollar
            per kilowatt-hour spread at one cycle per day yields about 1,157
            dollars per year and a 10.4 year payback.
          </desc>

          <defs>
            <pattern
              id="broi-viz-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#262626"
                strokeWidth="0.75"
              />
            </pattern>
            <marker
              id="broi-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient
              id="broi-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="broi-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="broi-viz-cash"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#broi-viz-grid)"
            opacity="0.55"
          />
          <rect
            x="12"
            y="12"
            width="936"
            height="536"
            fill="none"
            stroke="#262626"
            strokeWidth="1"
            rx="4"
          />

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY CAPACITY
            </text>
            <text
              className="broi-viz-cap-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              13.5 kWh
            </text>

            <rect
              x="40"
              y="140"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="164"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INSTALL COST
            </text>
            <text
              className="broi-viz-cost-value"
              x="56"
              y="196"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $12,000
            </text>

            <rect
              x="40"
              y="224"
              width="220"
              height="136"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TOU · DoD · RTE
            </text>
            <text
              className="broi-viz-rates-value"
              x="56"
              y="284"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.38 → $0.09
            </text>
            <text
              className="broi-viz-params-value"
              x="56"
              y="314"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90% DoD · 90% RTE
            </text>
            <text
              x="56"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              1 cycle/day · 10 yr life
            </text>
          </g>

          {/* Flow → cash path */}
          <path
            d="M 260 84 L 310 84"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#broi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 84 L 310 84"
            fill="none"
            stroke="url(#broi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#broi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="url(#broi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#broi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="url(#broi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Cash accumulation —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PAYBACK · CASH-FLOW PATH
            </text>

            <text
              className="broi-viz-math-value"
              x="336"
              y="96"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              13.5 × 0.9 × 0.9 = 10.94 kWh/cycle
            </text>
            <text
              className="broi-viz-spread-chip"
              x="336"
              y="118"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              × $0.29 spread → $3.17/day
            </text>

            {/* CapEx vs savings bars */}
            <text
              x="336"
              y="150"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              CAPEX
            </text>
            <rect
              x="400"
              y="140"
              width="240"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="broi-viz-capex-bar"
              x="400"
              y="140"
              width="220"
              height="14"
              rx="2"
              fill="#555555"
            />
            <text
              x="412"
              y="151"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $12k
            </text>

            <text
              x="336"
              y="180"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              YR $/yr
            </text>
            <rect
              x="400"
              y="170"
              width="240"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="broi-viz-yr-bar"
              x="400"
              y="170"
              width="21"
              height="14"
              rx="2"
              fill="url(#broi-viz-bar)"
            />
            <text
              className="broi-viz-yr-chip"
              x="428"
              y="181"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $1,157
            </text>

            {/* Accumulation staircase / curve toward payback */}
            <line
              x1="360"
              y1="300"
              x2="640"
              y2="300"
              stroke="#333333"
              strokeWidth="1"
            />
            <line
              x1="360"
              y1="300"
              x2="360"
              y2="210"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="360"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 0
            </text>
            <text
              x="520"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 10
            </text>
            <text
              x="600"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              BE
            </text>

            {/* CapEx horizontal */}
            <line
              className="broi-viz-capex-line"
              x1="360"
              y1="220"
              x2="640"
              y2="220"
              stroke="#555555"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
            <text
              x="640"
              y="216"
              textAnchor="end"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              $12k
            </text>

            {/* Cumulative savings rising to cross */}
            <path
              className="broi-viz-cash-curve"
              d="M 360 300 L 420 284 L 480 268 L 540 252 L 580 236 L 610 224 L 630 214"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="broi-viz-cash-pulse"
              d="M 360 300 L 420 284 L 480 268 L 540 252 L 580 236 L 610 224 L 630 214"
              fill="none"
              stroke="url(#broi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              className="broi-viz-be-point"
              cx="618"
              cy="220"
              r="6"
              fill="currentColor"
            />
            <text
              className="broi-viz-be-chip"
              x="500"
              y="248"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              payback 10.4 yr
            </text>

            <rect
              x="348"
              y="328"
              width="284"
              height="20"
              rx="2"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="broi-viz-lcos-chip"
              x="362"
              y="342"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
              dominantBaseline="middle"
            >
              LCOS $0.301/kWh · 39,913 kWh life
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 140 L 700 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#broi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 140 L 700 140"
            fill="none"
            stroke="url(#broi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 240 L 680 240 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#broi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 240 L 680 240 L 680 280 L 700 280"
            fill="none"
            stroke="url(#broi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Payback —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PAYBACK PERIOD
            </text>
            <text
              className="broi-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10.4 yr
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cost ÷ annual savings
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="broi-viz-pb-bar"
              x="726"
              y="168"
              width="140"
              height="12"
              rx="2"
              fill="url(#broi-viz-bar)"
            />
            <text
              className="broi-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              vs 10 yr planning life
            </text>
          </g>

          {/* —— OUTPUT: Savings —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL SAVINGS
            </text>
            <text
              className="broi-viz-save-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1,157
            </text>
            <rect
              x="726"
              y="324"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="broi-viz-save-bar"
              x="726"
              y="324"
              width="120"
              height="10"
              rx="2"
              fill="url(#broi-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $96/mo · $3.17/day
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WIDER TOU SPREAD · MORE CYCLES · FASTER PAYBACK
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $0 CapEx
            </text>
            <rect
              x="140"
              y="442"
              width="480"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="broi-viz-accum-bar"
              x="140"
              y="442"
              width="384"
              height="14"
              rx="2"
              fill="url(#broi-viz-bar)"
            />
            <text
              x="480"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              ~$11.6k @ yr 10
            </text>
            <text
              x="640"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $12k
            </text>

            <path
              className="broi-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#broi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              subtract incentives from install cost first
            </text>
            <text
              className="broi-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              10.4 yr · $1,157/yr · LCOS $0.301
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

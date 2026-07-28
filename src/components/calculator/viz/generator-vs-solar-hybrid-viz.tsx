"use client";

import { cn } from "@/lib/utils";

interface GeneratorVsSolarHybridVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Generator vs Solar Hybrid [VIZ].
 * Gen OPEX from fuel + maint; hybrid = CapEx + ~12% backup fuel + maint.
 * Sample: 18 kWh/day · $1.45/L · 2.5 L/hr · $28k hybrid → $3,244/yr ·
 * 8.6 yr payback · $4,440 cheaper over 10 years.
 */
export function GeneratorVsSolarHybridViz({
  className,
}: GeneratorVsSolarHybridVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--generator-vs-solar-hybrid", className)}
      aria-label="Generator versus solar hybrid visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Genset OPEX vs Hybrid CapEx</h3>
        <p className="tool-viz__subtitle">
          Diesel burns forever; a solar+battery hybrid shifts spend upfront and
          leaves only ~12% backup fuel — cumulative costs cross at payback.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg generator-vs-solar-hybrid-viz"
          role="img"
          aria-labelledby="gvsh-viz-title gvsh-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="gvsh-viz-title">
            Generator versus solar hybrid cost comparison diagram
          </title>
          <desc id="gvsh-viz-desc">
            Daily energy use and fuel price drive generator operating cost,
            compared with hybrid solar setup cost and backup fuel. Sample: 18
            kilowatt-hours per day at 1.45 dollars per liter with a 28,000
            dollar hybrid saves about 3,244 dollars per year and is 4,440
            dollars cheaper over 10 years with an 8.6 year payback.
          </desc>

          <defs>
            <pattern
              id="gvsh-viz-grid"
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
              id="gvsh-viz-arrow"
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
              id="gvsh-viz-pulse"
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
              id="gvsh-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#gvsh-viz-grid)"
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
              DAILY ENERGY
            </text>
            <text
              className="gvsh-viz-kwh-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              18 kWh/d
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
              FUEL PRICE
            </text>
            <text
              className="gvsh-viz-fuel-value"
              x="56"
              y="196"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1.45/L
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
              GEN · HYBRID CAPEX
            </text>
            <text
              className="gvsh-viz-lph-value"
              x="56"
              y="280"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2.5 L/hr · 6.4 L/day
            </text>
            <text
              className="gvsh-viz-capex-value"
              x="56"
              y="308"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $28,000 hybrid
            </text>
            <text
              x="56"
              y="336"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ~12% backup fuel left
            </text>
          </g>

          {/* Flow → comparison */}
          <path
            d="M 260 84 L 310 84"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gvsh-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 84 L 310 84"
            fill="none"
            stroke="url(#gvsh-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gvsh-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="url(#gvsh-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gvsh-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="url(#gvsh-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Cost comparison —— */}
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
              COST-COMPARISON PATH
            </text>

            {/* Two paths: gen vs hybrid */}
            <rect
              className="gvsh-viz-gen-node"
              x="348"
              y="88"
              width="100"
              height="52"
              rx="4"
              fill="#0a0a0a"
              stroke="#555555"
              strokeWidth="1.75"
            />
            <text
              x="398"
              y="112"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              GENSET
            </text>
            <text
              x="398"
              y="130"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              2.6 h/day
            </text>

            <rect
              className="gvsh-viz-hybrid-node"
              x="532"
              y="88"
              width="100"
              height="52"
              rx="4"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <text
              x="582"
              y="112"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              HYBRID
            </text>
            <text
              x="582"
              y="130"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              PV+BESS
            </text>

            {/* Annual OPEX bars */}
            <text
              x="336"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              GEN $/yr
            </text>
            <rect
              x="420"
              y="162"
              width="220"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gvsh-viz-gen-bar"
              x="420"
              y="162"
              width="200"
              height="14"
              rx="2"
              fill="#555555"
            />
            <text
              className="gvsh-viz-gen-chip"
              x="432"
              y="173"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $3,852
            </text>

            <text
              x="336"
              y="202"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              HYB $/yr
            </text>
            <rect
              x="420"
              y="192"
              width="220"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gvsh-viz-hyb-bar"
              x="420"
              y="192"
              width="32"
              height="14"
              rx="2"
              fill="url(#gvsh-viz-bar)"
            />
            <text
              className="gvsh-viz-hyb-chip"
              x="460"
              y="203"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $608
            </text>

            {/* Cumulative curves */}
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
              y2="230"
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
              x="500"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 8.6
            </text>
            <text
              x="620"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 10
            </text>

            {/* Gen cumulative (steep) */}
            <path
              className="gvsh-viz-gen-curve"
              d="M 360 300 L 460 270 L 540 245 L 640 210"
              fill="none"
              stroke="#666666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Hybrid cumulative (starts high, flatter) */}
            <path
              className="gvsh-viz-hyb-curve"
              d="M 360 248 L 460 242 L 540 236 L 580 232 L 640 226"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="gvsh-viz-hyb-pulse"
              d="M 360 248 L 460 242 L 540 236 L 580 232 L 640 226"
              fill="none"
              stroke="url(#gvsh-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              className="gvsh-viz-be-point"
              cx="520"
              cy="240"
              r="5"
              fill="currentColor"
            />
            <text
              className="gvsh-viz-be-chip"
              x="448"
              y="236"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              BE 8.6 yr
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
              className="gvsh-viz-math-value"
              x="362"
              y="342"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
              dominantBaseline="middle"
            >
              10-yr: gen $38.5k · hyb $34.1k
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 140 L 700 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gvsh-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 140 L 700 140"
            fill="none"
            stroke="url(#gvsh-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gvsh-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#gvsh-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Annual savings —— */}
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
              ANNUAL SAVINGS
            </text>
            <text
              className="gvsh-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $3,244
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hybrid vs genset-only
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
              className="gvsh-viz-save-bar"
              x="726"
              y="168"
              width="140"
              height="12"
              rx="2"
              fill="url(#gvsh-viz-bar)"
            />
            <text
              className="gvsh-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              payback 8.6 years
            </text>
          </g>

          {/* —— OUTPUT: Fuel / 10yr —— */}
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
              10-YR ADVANTAGE
            </text>
            <text
              className="gvsh-viz-ten-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $4,440
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
              className="gvsh-viz-ten-bar"
              x="726"
              y="324"
              width="80"
              height="10"
              rx="2"
              fill="url(#gvsh-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              6.4 L/day fuel avoided mostly
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
              HIGHER FUEL $/L OR DAILY kWh · FASTER HYBRID PAYBACK
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              gen
            </text>
            <rect
              x="100"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gvsh-viz-cum-gen"
              x="100"
              y="442"
              width="500"
              height="14"
              rx="2"
              fill="#555555"
            />
            <text
              x="480"
              y="452"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $38.5k
            </text>

            <path
              className="gvsh-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#gvsh-viz-pulse)"
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
              hybrid 10-yr total ~$34.1k incl. CapEx
            </text>
            <text
              className="gvsh-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              $3,244/yr · 6.4 L/day · +$4,440 @ 10 yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface TouShiftingSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Time-of-Use Load Shifting Savings [VIZ].
 * Savings = shiftable kWh × (peak $/kWh − off-peak $/kWh).
 * Sample: 350 kWh/mo · $0.42 peak · $0.11 off-peak → $0.31/kWh · $108.50/mo.
 */
export function TouShiftingSavingsViz({
  className,
}: TouShiftingSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--tou-shifting-savings", className)}
      aria-label="Time-of-use load shifting savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Time-of-Use Load Shifting Savings</h3>
        <p className="tool-viz__subtitle">
          Move flexible kilowatt-hours off expensive peak windows into cheaper
          off-peak valleys — the rate spread times shifted energy sets monthly
          bill savings.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg tou-shifting-savings-viz"
          role="img"
          aria-labelledby="tss-viz-title tss-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="tss-viz-title">
            Time-of-use load shifting savings animated flow diagram
          </title>
          <desc id="tss-viz-desc">
            Shiftable monthly kilowatt-hours multiplied by the gap between peak
            and off-peak rates yields monthly savings. Sample: 350 kilowatt-hours
            per month shifted from 42 cents to 11 cents per kilowatt-hour saves
            108 dollars and 50 cents per month at a 31 cent per kilowatt-hour
            spread.
          </desc>

          <defs>
            <pattern
              id="tss-viz-grid"
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
              id="tss-viz-arrow"
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
              id="tss-viz-pulse"
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
              id="tss-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="tss-viz-peak-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="tss-viz-valley-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#tss-viz-grid)"
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
            rx="2"
          />

          <text
            x="48"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            INPUTS
          </text>
          <text
            x="340"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            TARIFF SHIFT PATH
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>

          {/* —— INPUT: Shiftable load —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SHIFTABLE LOAD
            </text>
            <text
              className="tss-viz-load-value"
              x="56"
              y="138"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              350 kWh
            </text>
            <text
              x="56"
              y="160"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              movable / month
            </text>
          </g>

          {/* —— INPUT: Peak rate —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK RATE
            </text>
            <text
              className="tss-viz-peak-value"
              x="56"
              y="254"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.42
            </text>
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $/kWh · on-peak window
            </text>
          </g>

          {/* —— INPUT: Off-peak rate —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="330"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              OFF-PEAK RATE
            </text>
            <text
              className="tss-viz-offpeak-value"
              x="56"
              y="370"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.11
            </text>
            <text
              x="56"
              y="392"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $/kWh · night / valley
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#tss-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#tss-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#tss-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#tss-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 320 354"
            fill="none"
            stroke="url(#tss-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#tss-viz-arrow)"
          />

          {/* —— CENTER: Tariff comparison path —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="332"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="340"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK → OFF-PEAK SHIFT
            </text>

            {/* TOU tariff curve: peak mountain then valley */}
            <path
              className="tss-viz-tariff-fill"
              d="M 352 300
                 L 352 260
                 L 390 200
                 L 430 160
                 L 470 150
                 L 510 170
                 L 540 230
                 L 570 290
                 L 610 310
                 L 640 300
                 L 640 300
                 L 352 300 Z"
              fill="url(#tss-viz-peak-fill)"
            />
            <path
              className="tss-viz-tariff-line"
              d="M 352 260
                 L 390 200
                 L 430 160
                 L 470 150
                 L 510 170
                 L 540 230
                 L 570 290
                 L 610 310
                 L 640 300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Baseline axis */}
            <line
              x1="352"
              y1="300"
              x2="640"
              y2="300"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="352"
              y="318"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              12p
            </text>
            <text
              x="460"
              y="318"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              PEAK
            </text>
            <text
              x="580"
              y="318"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              OFF-PEAK
            </text>
            <text
              x="640"
              y="318"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="end"
            >
              6a
            </text>

            {/* Peak / valley markers */}
            <circle
              className="tss-viz-peak-dot"
              cx="470"
              cy="150"
              r="5"
              fill="currentColor"
            />
            <circle
              className="tss-viz-valley-dot"
              cx="610"
              cy="310"
              r="5"
              fill="currentColor"
            />

            {/* Animated load packet shifting peak → valley */}
            <path
              className="tss-viz-shift-path"
              d="M 470 150 Q 540 180 610 310"
              fill="none"
              stroke="url(#tss-viz-pulse)"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <circle
              className="tss-viz-load-packet"
              cx="0"
              cy="0"
              r="7"
              fill="currentColor"
            />

            {/* Spread math */}
            <text
              x="340"
              y="350"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RATE SPREAD
            </text>
            <text
              className="tss-viz-spread-value"
              x="340"
              y="378"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.42 − $0.11 = $0.31/kWh
            </text>
            <rect
              x="340"
              y="392"
              width="280"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="tss-viz-spread-bar"
              x="342"
              y="394"
              width="220"
              height="6"
              rx="1"
              fill="url(#tss-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 238 L 700 238"
            fill="none"
            stroke="url(#tss-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#tss-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="332"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="720"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY SAVINGS
            </text>
            <text
              className="tss-viz-output-value"
              x="720"
              y="160"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $108.50
            </text>
            <text
              x="720"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /mo · energy rate only
            </text>

            <rect
              x="720"
              y="210"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="tss-viz-output-bar"
              x="722"
              y="212"
              width="150"
              height="8"
              rx="1"
              fill="url(#tss-viz-bar)"
            />

            <text
              x="720"
              y="252"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL
            </text>
            <text
              className="tss-viz-annual-value"
              x="720"
              y="282"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1,302/yr
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              350 × $0.31 spread
            </text>
            <text
              x="720"
              y="340"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              EV · laundry · dishwasher
            </text>
            <text
              x="720"
              y="362"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              no demand charges
            </text>
          </g>

          {/* —— Legend —— */}
          <g transform="translate(40, 448)">
            <rect
              x="0"
              y="0"
              width="880"
              height="80"
              rx="4"
              fill="#0f0f0f"
              stroke="#262626"
              strokeWidth="1"
            />
            <text
              x="20"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PATH
            </text>
            <text
              x="20"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              kWh_shift × (peak − off-peak) → monthly $ saved
            </text>
            <text
              x="520"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="520"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              350 kWh · $0.42 → $0.11 · $108.50/mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

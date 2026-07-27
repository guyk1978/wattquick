"use client";

import { cn } from "@/lib/utils";

interface LedVsIncandescentRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for LED vs Incandescent ROI [VIZ].
 * N bulbs × (W_inc − W_led) × hrs → energy $ + replacement $ → annual ROI.
 * Sample: 20 × 60 W → 9 W · 5 h · $0.14 → $261 energy + $27 bulbs = $287/yr.
 */
export function LedVsIncandescentRoiViz({
  className,
}: LedVsIncandescentRoiVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--led-vs-incandescent-roi", className)}
      aria-label="LED versus incandescent ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">LED vs. Incandescent ROI</h3>
        <p className="tool-viz__subtitle">
          Multi-fixture swaps compound: every watt cut across the count of
          bulbs lowers kWh, while longer LED life cuts replacement spend —
          together they set annual savings and payback.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg led-vs-incandescent-roi-viz"
          role="img"
          aria-labelledby="lvi-viz-title lvi-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="lvi-viz-title">
            LED versus incandescent ROI animated flow diagram
          </title>
          <desc id="lvi-viz-desc">
            Number of bulbs times the watt gap between incandescent and LED,
            times hours of use, yields daily kilowatt-hours saved and annual
            energy dollars. Fewer bulb replacements add further savings.
            Sample: twenty 60 watt lamps replaced by 9 watt LEDs used 5 hours
            per day at 14 cents per kilowatt-hour save about 261 dollars in
            energy and 27 dollars in bulbs for 287 dollars total per year.
          </desc>

          <defs>
            <pattern
              id="lvi-viz-grid"
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
              id="lvi-viz-arrow"
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
              id="lvi-viz-pulse"
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
              id="lvi-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="lvi-viz-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#lvi-viz-grid)"
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
            FLEET UPGRADE
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

          {/* —— INPUT: Count —— */}
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
              BULB COUNT
            </text>
            <text
              x="56"
              y="134"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20
            </text>
            <text
              x="56"
              y="158"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              fixtures to retrofit
            </text>
          </g>

          {/* —— INPUT: Watts —— */}
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
              INCAND → LED
            </text>
            <text
              x="56"
              y="250"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60 W → 9 W
            </text>
            <text
              x="56"
              y="274"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              −51 W each · 5 hrs/day
            </text>
          </g>

          {/* —— INPUT: Costs / life —— */}
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
              RATE · BULB $ · LIFE
            </text>
            <text
              x="56"
              y="362"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="388"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              LED $4 · 15k hrs · Inc $1 · 1k
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            d="M 270 122 L 320 122"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lvi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#lvi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lvi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="url(#lvi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lvi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="url(#lvi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— MID: Multi-bulb array —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="280"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ×20 FIXTURES
            </text>
            <g transform="translate(354, 118)" className="lvi-viz-array">
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(${i * 42}, 0)`}>
                  <ellipse
                    cx="16"
                    cy="12"
                    rx="18"
                    ry="14"
                    fill="url(#lvi-viz-glow)"
                    className="lvi-viz-glow"
                  />
                  <path
                    d="M 8 6 Q 16 -4 24 6 V 20 H 8 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinejoin="round"
                    className="lvi-viz-bulb"
                  />
                  <rect
                    x="11"
                    y="20"
                    width="10"
                    height="10"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                </g>
              ))}
            </g>
            <text
              x="346"
              y="188"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lvi-viz-fleet-value"
            >
              5.1 kWh/day saved
            </text>
            <text
              x="346"
              y="208"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              (60−9) × 5 × 20 ÷ 1000
            </text>
          </g>

          {/* —— MID: Energy + bulb paths —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="280"
              height="170"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAVINGS STACK
            </text>
            <text
              x="346"
              y="298"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Energy (kWh × rate)
            </text>
            <text
              x="346"
              y="324"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $261/yr
            </text>
            <rect
              x="430"
              y="310"
              width="150"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="lvi-viz-energy-bar"
              x="432"
              y="312"
              width="130"
              height="6"
              rx="1"
              fill="url(#lvi-viz-bar)"
            />
            <text
              x="346"
              y="360"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Bulb replacements
            </text>
            <text
              x="346"
              y="386"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $27/yr
            </text>
            <path
              className="tool-viz-flow__pulse"
              d="M 500 370 L 560 370"
              fill="none"
              stroke="url(#lvi-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#lvi-viz-arrow)"
            />
          </g>

          {/* —— Flow mid → out —— */}
          <path
            d="M 610 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lvi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 610 147 L 680 147"
            fill="none"
            stroke="url(#lvi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 610 325 L 645 325 L 645 220 L 680 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lvi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 610 325 L 645 325 L 645 220 L 680 220"
            fill="none"
            stroke="url(#lvi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="352"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL SAVINGS
            </text>
            <text
              x="706"
              y="152"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lvi-viz-output-value"
            >
              $287
            </text>
            <text
              x="706"
              y="180"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              energy + bulb ROI / yr
            </text>

            <rect
              x="706"
              y="200"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="lvi-viz-output-bar"
              x="708"
              y="202"
              width="170"
              height="8"
              rx="1"
              fill="url(#lvi-viz-bar)"
            />

            <text
              x="706"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BREAKDOWN
            </text>
            <text
              x="706"
              y="278"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              Energy $261
            </text>
            <text
              x="706"
              y="302"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              Bulbs $27
            </text>

            <text
              x="706"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              UPFRONT · PAYBACK
            </text>
            <text
              x="706"
              y="370"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lvi-viz-payback-value"
            >
              $80 LEDs
            </text>
            <text
              x="706"
              y="396"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 3.3 months to recover
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
              N × ΔW × hrs → energy $ + replacement $ → annual ROI
            </text>
            <text
              x="500"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="500"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              20 bulbs · 60→9 W · 5 h → $287/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface EvBusBatteryVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Transit Bus Battery kWh/mi [VIZ].
 * kWh/mi = energy used ÷ route miles.
 * Sample: 180 kWh ÷ 90 mi = 2.00 kWh/mi · ~400 kWh for a 200 mi day.
 */
export function EvBusBatteryViz({ className }: EvBusBatteryVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-bus-battery", className)}
      aria-label="Transit bus battery kilowatt-hours per mile visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Transit Bus · kWh per Mile</h3>
        <p className="tool-viz__subtitle">
          Metered pack energy divided by route miles yields energy intensity—
          including HVAC and auxiliaries—for heavy transit duty cycles.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-bus-battery-viz"
          role="img"
          aria-labelledby="ebb-viz-title ebb-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebb-viz-title">
            Transit bus battery energy intensity animated flow diagram
          </title>
          <desc id="ebb-viz-desc">
            Route distance in miles and total energy used in kilowatt-hours
            divide to produce energy intensity. Sample: 180 kilowatt-hours over
            90 route miles equals 2 kilowatt-hours per mile, or about 400
            kilowatt-hours for a 200 mile day.
          </desc>

          <defs>
            <pattern
              id="ebb-viz-grid"
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
              id="ebb-viz-arrow"
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
              id="ebb-viz-pulse"
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
              id="ebb-viz-energy"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ebb-viz-route"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebb-viz-grid)"
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
            x="360"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            ENERGY ÷ DISTANCE
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

          {/* —— INPUT: Route —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="160"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="114"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ROUTE DISTANCE
            </text>
            {/* Bus glyph */}
            <g
              transform="translate(56, 130)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.25"
            >
              <path
                d="M4 28 H16 L22 14 H78 L88 28 H100 V44 H4 Z"
                strokeLinejoin="round"
                className="ebb-viz-bus"
              />
              <rect x="28" y="18" width="14" height="10" rx="1" />
              <rect x="50" y="18" width="14" height="10" rx="1" />
              <circle cx="24" cy="46" r="5" />
              <circle cx="78" cy="46" r="5" />
              <path
                d="M0 56 H104"
                strokeDasharray="6 4"
                className="ebb-viz-road"
              />
            </g>
            <text
              x="56"
              y="214"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90 mi
            </text>
            <text
              x="140"
              y="214"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 145 km
            </text>
          </g>

          {/* —— INPUT: Energy —— */}
          <g>
            <rect
              x="40"
              y="268"
              width="240"
              height="160"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="294"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY USED
            </text>
            <g transform="translate(56, 310)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="32" height="48" rx="2" strokeWidth="1.3" />
              <rect
                x="8"
                y="3"
                width="16"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="ebb-viz-battery-fill"
                x="4"
                y="20"
                width="24"
                height="32"
                rx="1"
                fill="currentColor"
                fillOpacity="0.75"
                stroke="none"
              />
            </g>
            <text
              x="108"
              y="350"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              180 kWh
            </text>
            <text
              x="108"
              y="378"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              BMS / charger meter
            </text>
            <text
              x="108"
              y="398"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              net · includes HVAC/aux
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebb-viz-arrow)"
          >
            <path d="M 280 168 H 330 V 210 H 360" />
            <path d="M 280 348 H 330 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ebb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 168 H 330 V 210 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 348 H 330 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="360"
              y="72"
              width="260"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HEAVY-TRANSIT PATH
            </text>

            {/* Route strip */}
            <rect
              x="376"
              y="120"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="388"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ROUTE BAND
            </text>
            <rect
              x="388"
              y="156"
              width="204"
              height="12"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="ebb-viz-route-bar"
              x="390"
              y="158"
              width="200"
              height="8"
              rx="1"
              fill="url(#ebb-viz-route)"
            />
            <text
              x="388"
              y="184"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              90 mi operational loop
            </text>

            <text
              x="490"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ebb-viz-divide"
            >
              ÷
            </text>

            <rect
              x="376"
              y="250"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="388"
              y="272"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY POOL
            </text>
            <rect
              x="388"
              y="286"
              width="204"
              height="12"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="ebb-viz-energy-bar"
              x="390"
              y="288"
              width="200"
              height="8"
              rx="1"
              fill="url(#ebb-viz-energy)"
            />
            <text
              x="388"
              y="314"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              180 kWh metered draw
            </text>

            <rect
              x="376"
              y="340"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="388"
              y="362"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              INTENSITY
            </text>
            <text
              x="388"
              y="384"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              180 ÷ 90 ={" "}
              <tspan fill="#ededed">2.00</tspan>
            </text>

            <text
              x="490"
              y="426"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              kWh/mi = kWh ÷ mi
            </text>
            <text
              x="490"
              y="446"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              regen already in net meter
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebb-viz-arrow)"
          >
            <path d="M 620 268 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#ebb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 268 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="250"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY INTENSITY
            </text>
            <text
              x="810"
              y="230"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ebb-viz-output-value"
            >
              2.00
            </text>
            <text
              x="810"
              y="258"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              kWh/mi
            </text>
            <text
              x="810"
              y="288"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 1.24 kWh/km
            </text>
            <text
              x="810"
              y="330"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ~400 kWh
            </text>
            <text
              x="810"
              y="350"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              for a 200 mi service day
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            kWh/mi = metered kWh ÷ route mi · include depot HVAC and aux in the energy total
          </text>
        </svg>
      </div>
    </section>
  );
}

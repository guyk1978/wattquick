"use client";

import { cn } from "@/lib/utils";

interface EvBatteryRangeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Battery Range [VIZ] tab.
 * (kWh × usable %) ÷ kWh/mi → range miles.
 * Sample: (75 × 0.90) ÷ 0.32 ≈ 211 mi.
 */
export function EvBatteryRangeViz({ className }: EvBatteryRangeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-battery-range", className)}
      aria-label="EV battery range visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Battery Range</h3>
        <p className="tool-viz__subtitle">
          Usable pack energy divided by consumption per mile estimates how far
          you can drive before the next charge.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-battery-range-viz"
          role="img"
          aria-labelledby="ebr-viz-title ebr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebr-viz-title">
            EV battery range animated flow diagram
          </title>
          <desc id="ebr-viz-desc">
            Total battery capacity in kilowatt-hours adjusted by usable
            capacity percentage is divided by energy consumption in
            kilowatt-hours per mile to estimate driving range. Sample: 75
            kilowatt-hours at 90 percent usable and 0.32 kilowatt-hours per
            mile yields about 211 miles.
          </desc>

          <defs>
            <pattern
              id="ebr-viz-grid"
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
              id="ebr-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="ebr-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="ebr-viz-road"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="ebr-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebr-viz-grid)"
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
            x="370"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            CAPACITY → RANGE
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

          {/* —— INPUT: Pack capacity —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="240"
              height="118"
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
              BATTERY CAPACITY
            </text>
            <g transform="translate(56, 112)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="28" height="40" rx="2" strokeWidth="1.3" />
              <rect
                x="7"
                y="3"
                width="14"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="ebr-viz-battery-fill"
                x="4"
                y="14"
                width="20"
                height="30"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.85"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75 kWh
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate pack size
            </text>
          </g>

          {/* —— INPUT: Usable % —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="240"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="232"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              USABLE CAPACITY
            </text>
            <text
              x="56"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
            <text
              x="130"
              y="276"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              buffer · aging
            </text>
            <rect
              x="56"
              y="292"
              width="200"
              height="8"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebr-viz-usable-bar"
              x="58"
              y="294"
              width="176"
              height="4"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.85"
            />
          </g>

          {/* —— INPUT: Consumption —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="240"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="366"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONSUMPTION
            </text>
            <g
              transform="translate(56, 378)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            >
              <path
                d="M4 22 H10 L16 12 H40 L46 22 H52"
                strokeLinejoin="round"
                className="ebr-viz-car"
              />
              <circle cx="18" cy="26" r="3.5" />
              <circle cx="40" cy="26" r="3.5" />
            </g>
            <text
              x="120"
              y="408"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.32 kWh/mi
            </text>
            <text
              x="120"
              y="432"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              real-world trip rate
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebr-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ebr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 131 H 330 V 180 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 265 H 330 V 230 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.7s" }}
              d="M 280 399 H 330 V 320 H 360"
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
              (kWh × %) ÷ kWh/mi
            </text>

            <rect
              x="376"
              y="120"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · USABLE ENERGY
            </text>
            <text
              x="388"
              y="164"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              75 × 0.90 ={" "}
              <tspan fill="#a3e635">67.5 kWh</tspan>
            </text>

            <rect
              x="376"
              y="192"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="214"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · DIVIDE BY RATE
            </text>
            <text
              x="388"
              y="236"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              67.5 ÷ 0.32 kWh/mi
            </text>

            {/* Pack usable fill visual */}
            <g transform="translate(392, 270)">
              <rect
                x="0"
                y="0"
                width="56"
                height="72"
                rx="3"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.3"
              />
              <rect
                className="ebr-viz-pack-fill"
                x="6"
                y="8"
                width="44"
                height="56"
                rx="2"
                fill="url(#ebr-viz-fill)"
              />
              <text
                x="28"
                y="42"
                fill="#0a0a0a"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                90%
              </text>
              <text
                x="72"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                usable slice
              </text>
              <text
                x="72"
                y="48"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
              >
                67.5 of 75 kWh
              </text>
            </g>

            <text
              x="376"
              y="372"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RANGE BAND
            </text>
            <rect
              x="376"
              y="384"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebr-viz-range-bar"
              x="378"
              y="386"
              width="224"
              height="12"
              rx="1"
              fill="url(#ebr-viz-road)"
            />

            <text
              x="490"
              y="434"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              mi = (kWh × usable%) ÷ kWh/mi
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebr-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#ebr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 265 H 700"
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
              stroke="#a3e635"
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
              EST. DRIVING RANGE
            </text>

            {/* Road + car glyph */}
            <g
              transform="translate(778, 196)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <path d="M0 28 H64" strokeDasharray="8 5" className="ebr-viz-road-dash" />
              <path
                d="M18 12 H28 L34 22 H50 L46 34 H14 Z"
                strokeLinejoin="round"
                className="ebr-viz-car"
              />
              <circle cx="24" cy="34" r="4" />
              <circle cx="42" cy="34" r="4" />
            </g>

            <text
              x="810"
              y="280"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ebr-viz-output-value"
            >
              211 mi
            </text>
            <text
              x="810"
              y="310"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 340 km
            </text>
            <text
              x="810"
              y="342"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              67.5 kWh usable
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              cold / speed reduce real mi
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Range ≈ (pack kWh × usable %) ÷ kWh/mi · EPA ratings are cycle averages
          </text>
        </svg>
      </div>
    </section>
  );
}

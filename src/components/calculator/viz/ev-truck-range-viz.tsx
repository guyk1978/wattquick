"use client";

import { cn } from "@/lib/utils";

interface EvTruckRangeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Truck Range vs. Payload [VIZ].
 * Adjusted range = base × (1 − payload/100 × loss%/100).
 * Sample: 300 mi empty · 6,000 lbs · 0.5%/100 lbs → 210 mi (−30%).
 */
export function EvTruckRangeViz({ className }: EvTruckRangeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-truck-range", className)}
      aria-label="EV truck range versus payload visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Truck Range vs. Payload</h3>
        <p className="tool-viz__subtitle">
          Cargo mass raises rolling resistance and kWh per mile, so empty-truck
          ratings shrink once the deck is loaded for a real dispatch loop.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-truck-range-viz"
          role="img"
          aria-labelledby="etr-viz-title etr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="etr-viz-title">
            EV truck range versus payload animated flow diagram
          </title>
          <desc id="etr-viz-desc">
            Rated empty range and payload weight feed a load-scaling path that
            applies percent range loss per one hundred pounds. Sample: a 300
            mile empty rating with 6,000 pounds of cargo at 0.5 percent loss per
            100 pounds yields about 210 usable miles.
          </desc>

          <defs>
            <pattern
              id="etr-viz-grid"
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
              id="etr-viz-arrow"
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
              id="etr-viz-pulse"
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
              id="etr-viz-range"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="etr-viz-load"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#etr-viz-grid)"
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
            LOAD → RESISTANCE
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

          {/* —— INPUT: Empty range —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="130"
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
              RATED RANGE (EMPTY)
            </text>
            <g
              transform="translate(56, 114)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            >
              <path
                d="M4 22 H14 L20 12 H52 L60 22 H72 V34 H4 Z"
                strokeLinejoin="round"
                className="etr-viz-truck"
              />
              <circle cx="18" cy="36" r="4" />
              <circle cx="58" cy="36" r="4" />
            </g>
            <text
              x="56"
              y="172"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              300 mi
            </text>
            <text
              x="140"
              y="172"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              empty OEM
            </text>
          </g>

          {/* —— INPUT: Payload —— */}
          <g>
            <rect
              x="40"
              y="218"
              width="230"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PAYLOAD WEIGHT
            </text>
            <g transform="translate(56, 258)" fill="none" stroke="#ededed">
              <rect x="0" y="8" width="36" height="24" rx="2" strokeWidth="1.3" />
              <rect
                className="etr-viz-cargo-fill"
                x="4"
                y="12"
                width="28"
                height="16"
                rx="1"
                fill="url(#etr-viz-load)"
                stroke="none"
              />
            </g>
            <text
              x="108"
              y="286"
              fill="#a3e635"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6,000 lbs
            </text>
            <text
              x="108"
              y="310"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 2.7 t cargo
            </text>
          </g>

          {/* —— INPUT: Loss factor —— */}
          <g>
            <rect
              x="40"
              y="352"
              width="230"
              height="106"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="378"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOSS / 100 LBS
            </text>
            <text
              x="56"
              y="412"
              fill="#a3e635"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.5%
            </text>
            <text
              x="56"
              y="436"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              fleet-calibrated factor
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#etr-viz-arrow)"
          >
            <path d="M 270 137 H 310 V 170 H 330" />
            <path d="M 270 277 H 310 V 250 H 330" />
            <path d="M 270 405 H 310 V 360 H 330" />
          </g>
          <g
            fill="none"
            stroke="url(#etr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 270 137 H 310 V 170 H 330"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 270 277 H 310 V 250 H 330"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.65s" }}
              d="M 270 405 H 310 V 360 H 330"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="290"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="346"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MASS → kWh/mi PENALTY
            </text>

            {/* Truck + load schematic */}
            <g transform="translate(360, 120)">
              <path
                d="M0 40 H18 L28 22 H70 L86 40 H110 V58 H0 Z"
                fill="none"
                stroke="#ededed"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <rect
                className="etr-viz-cargo-fill"
                x="32"
                y="26"
                width="48"
                height="28"
                rx="2"
                fill="#a3e635"
                fillOpacity="0.45"
              />
              <circle cx="22" cy="62" r="6" fill="none" stroke="#ededed" />
              <circle cx="90" cy="62" r="6" fill="none" stroke="#ededed" />
              <path
                className="tool-viz-flow__pulse"
                d="M 110 48 H 160"
                fill="none"
                stroke="url(#etr-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              <text
                x="168"
                y="44"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                +R_roll
              </text>
              <text
                x="168"
                y="60"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                +accel load
              </text>
            </g>

            <rect
              x="352"
              y="210"
              width="246"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="232"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · LOSS %
            </text>
            <text
              x="364"
              y="254"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (6,000 ÷ 100) × 0.5 ={" "}
              <tspan fill="#a3e635">30%</tspan>
            </text>

            <rect
              x="352"
              y="280"
              width="246"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="302"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · SCALE RANGE
            </text>
            <text
              x="364"
              y="324"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              300 × (1 − 0.30)
            </text>

            <text
              x="352"
              y="364"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RANGE BAND · EMPTY → LOADED
            </text>
            <rect
              x="352"
              y="376"
              width="246"
              height="14"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            {/* Empty full bar ghost */}
            <rect
              x="354"
              y="378"
              width="242"
              height="10"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.15"
            />
            <rect
              className="etr-viz-range-bar"
              x="354"
              y="378"
              width="169"
              height="10"
              rx="1"
              fill="url(#etr-viz-range)"
            />

            <text
              x="475"
              y="420"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              mi = base × (1 − loss%)
            </text>
            <text
              x="475"
              y="440"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              grades / speed add more loss
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#etr-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#etr-viz-pulse)"
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
              y="120"
              width="220"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="148"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EMPTY RATING
            </text>
            <text
              x="716"
              y="184"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              300 mi
            </text>
          </g>

          <g>
            <rect
              x="700"
              y="228"
              width="220"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RANGE LOST
            </text>
            <text
              x="716"
              y="292"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="etr-viz-output-loss"
            >
              −90 mi
            </text>
          </g>

          <g>
            <rect
              x="700"
              y="336"
              width="220"
              height="122"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ADJUSTED RANGE
            </text>
            <text
              x="810"
              y="410"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="etr-viz-output-value"
            >
              210 mi
            </text>
            <text
              x="810"
              y="438"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 338 km · −30% loaded
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Adjusted mi ≈ empty mi × (1 − payload÷100 × loss%/100) · calibrate loss% from telematics
          </text>
        </svg>
      </div>
    </section>
  );
}

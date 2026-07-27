"use client";

import { cn } from "@/lib/utils";

interface EvFleetTcoVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Fleet TCO vs. Gas [VIZ] tab.
 * Energy-only annual OpEx: gas $ vs electricity $ across fleet miles.
 * Sample: 25 × 18k mi · gas $122,143 · EV $86,400 · save $35,743/yr.
 */
export function EvFleetTcoViz({ className }: EvFleetTcoVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-fleet-tco", className)}
      aria-label="EV fleet TCO versus gas visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Fleet TCO vs. Gas</h3>
        <p className="tool-viz__subtitle">
          Fleet size and annual miles scale two energy bills—liquid fuel versus
          depot electricity—into a clear yearly OpEx gap (energy-only TCO).
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-fleet-tco-viz"
          role="img"
          aria-labelledby="eft-viz-title eft-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="eft-viz-title">
            EV fleet TCO versus gas animated comparison diagram
          </title>
          <desc id="eft-viz-desc">
            Vehicle count and miles per year feed dual cost tracks for gasoline
            and electricity. Sample: twenty-five vehicles at eighteen thousand
            miles each cost about one hundred twenty-two thousand dollars in gas
            versus eighty-six thousand in electricity, saving about thirty-five
            thousand seven hundred dollars per year.
          </desc>

          <defs>
            <pattern
              id="eft-viz-grid"
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
              id="eft-viz-arrow"
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
              id="eft-viz-pulse"
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
              id="eft-viz-gas"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient
              id="eft-viz-ev"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#eft-viz-grid)"
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
            x="330"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DUAL ENERGY TRACKS
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            ANNUAL OUTPUT
          </text>

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="220"
              height="108"
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
              FLEET SIZE
            </text>
            <g
              transform="translate(56, 112)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.1"
            >
              <path d="M0 14 H10 L14 6 H28 L34 14 H40 V22 H0 Z" className="eft-viz-fleet" />
              <path d="M44 14 H54 L58 6 H72 L78 14 H84 V22 H44 Z" className="eft-viz-fleet" />
              <path d="M88 14 H98 L102 6 H116 L122 14 H128 V22 H88 Z" className="eft-viz-fleet" />
            </g>
            <text
              x="56"
              y="158"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25 vehicles
            </text>
          </g>

          <g>
            <rect
              x="40"
              y="196"
              width="220"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="222"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MILES / VEHICLE · YR
            </text>
            <text
              x="56"
              y="258"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              18,000 mi
            </text>
            <text
              x="56"
              y="286"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              fleet total 450,000 mi
            </text>
          </g>

          <g>
            <rect
              x="40"
              y="330"
              width="220"
              height="128"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="356"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY RATES
            </text>
            <text
              x="56"
              y="386"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Gas 14 MPG · $3.80/gal
            </text>
            <text
              x="56"
              y="410"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              EV 1.6 kWh/mi · $0.12
            </text>
            <text
              x="56"
              y="434"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              energy OpEx only
            </text>
          </g>

          {/* Flow → dual tracks */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#eft-viz-arrow)"
          >
            <path d="M 260 126 H 300 V 160 H 320" />
            <path d="M 260 255 H 300 V 250 H 320" />
            <path d="M 260 394 H 300 V 380 H 320" />
          </g>
          <g
            fill="none"
            stroke="url(#eft-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 260 126 H 300 V 160 H 320"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 260 255 H 300 V 250 H 320"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.55s" }}
              d="M 260 394 H 300 V 380 H 320"
              pathLength="100"
            />
          </g>

          {/* —— DUAL TRACKS —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="300"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="336"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SCALE × RATE → ANNUAL $
            </text>

            {/* Gas track */}
            <rect
              x="336"
              y="116"
              width="268"
              height="150"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="352"
              y="140"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              GAS TRACK
            </text>
            <text
              x="352"
              y="164"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              (mi ÷ MPG) × $/gal
            </text>
            <text
              x="352"
              y="188"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              450k ÷ 14 × $3.80
            </text>
            <text
              x="352"
              y="216"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $122,143 /yr
            </text>
            <rect
              x="352"
              y="230"
              width="236"
              height="14"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="eft-viz-bar-gas"
              x="354"
              y="232"
              width="232"
              height="10"
              rx="1"
              fill="url(#eft-viz-gas)"
            />

            {/* EV track */}
            <rect
              x="336"
              y="284"
              width="268"
              height="154"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            <text
              x="352"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV TRACK
            </text>
            <text
              x="352"
              y="332"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              mi × kWh/mi × $/kWh
            </text>
            <text
              x="352"
              y="356"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              450k × 1.6 × $0.12
            </text>
            <text
              x="352"
              y="384"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $86,400 /yr
            </text>
            <rect
              x="352"
              y="398"
              width="236"
              height="14"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="eft-viz-bar-ev"
              x="354"
              y="400"
              width="164"
              height="10"
              rx="1"
              fill="url(#eft-viz-ev)"
            />
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#eft-viz-arrow)"
          >
            <path d="M 620 191 H 680" />
            <path d="M 620 361 H 680" />
          </g>
          <g
            fill="none"
            stroke="url(#eft-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 620 191 H 680"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 361 H 680"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="680"
              y="100"
              width="240"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="128"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              GAS ENERGY OPEX
            </text>
            <text
              x="696"
              y="164"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eft-viz-output-gas"
            >
              $122,143
            </text>
          </g>

          <g>
            <rect
              x="680"
              y="206"
              width="240"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="234"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV ENERGY OPEX
            </text>
            <text
              x="696"
              y="270"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eft-viz-output-ev"
            >
              $86,400
            </text>
          </g>

          <g>
            <rect
              x="680"
              y="312"
              width="240"
              height="146"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="696"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL FLEET SAVINGS
            </text>
            <text
              x="810"
              y="388"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="eft-viz-output-save"
            >
              $35,743
            </text>
            <text
              x="810"
              y="416"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ $1,430 / vehicle
            </text>
            <text
              x="810"
              y="438"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              excludes capex · incentives
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Savings = gas OpEx − EV OpEx · scale vehicles × miles · add purchase / maint. separately
          </text>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface EbikeRangeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Range Estimator [VIZ] tab.
 * Battery Wh + pack efficiency → Wh/km consumption → estimated range km.
 */
export function EbikeRangeViz({ className }: EbikeRangeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-range", className)}
      aria-label="E-bike range estimator visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Range Estimator</h3>
        <p className="tool-viz__subtitle">
          Usable pack energy divided by Wh/km consumption yields how far you
          can ride on a full charge.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-range-viz"
          role="img"
          aria-labelledby="ebike-viz-title ebike-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebike-viz-title">
            E-bike range estimator animated flow diagram
          </title>
          <desc id="ebike-viz-desc">
            Battery capacity in watt-hours and pack efficiency feed a
            consumption path that factors Wh/km baseline, assist level, terrain
            resistance, and motor draw, then outputs estimated travel range in
            kilometers on a full charge.
          </desc>

          <defs>
            <pattern
              id="ebike-viz-grid"
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
              id="ebike-viz-arrow"
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
              id="ebike-viz-pulse"
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
              id="ebike-viz-road"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebike-viz-grid)"
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

          {/* Column labels */}
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
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            CONSUMPTION
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

          {/* —— INPUT: Battery capacity —— */}
          <g className="ebike-viz-node">
            <rect
              x="40"
              y="72"
              width="240"
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
              BATTERY CAPACITY
            </text>

            <g transform="translate(56, 112)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="32" height="48" rx="2" strokeWidth="1.3" />
              <rect
                x="8"
                y="3"
                width="16"
                height="6"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="ebike-viz-battery-fill"
                x="4"
                y="24"
                width="24"
                height="28"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.88"
                stroke="none"
              />
            </g>

            <text
              x="106"
              y="144"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 Wh
            </text>
            <text
              x="106"
              y="168"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate pack energy
            </text>
          </g>

          {/* —— INPUT: Pack efficiency —— */}
          <g className="ebike-viz-node">
            <rect
              x="40"
              y="220"
              width="240"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PACK / DRIVETRAIN η
            </text>
            <text
              x="56"
              y="284"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              92%
            </text>
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable = 500 × 0.92 = 460 Wh
            </text>
          </g>

          {/* —— INPUT: Ride conditions (compact) —— */}
          <g className="ebike-viz-node">
            <rect
              x="40"
              y="348"
              width="240"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="372"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RIDE CONDITIONS
            </text>
            <text
              x="56"
              y="396"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Assist L3 · ×1.75
            </text>
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              95 kg · calm / flat ×1.0
            </text>
          </g>

          {/* Flow: inputs → consumption */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path d="M 280 137 H 340 V 180 H 360" />
            <path d="M 280 275 H 340 V 230 H 360" />
            <path d="M 280 392 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ebike-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 137 H 340 V 180 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 275 H 340 V 230 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 280 392 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: consumption path —— */}
          <g className="ebike-viz-node ebike-viz-node--process">
            <rect
              x="360"
              y="72"
              width="260"
              height="364"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY CONSUMPTION PATH
            </text>

            {/* Stacked factors */}
            <g fontFamily="ui-monospace, monospace">
              <rect
                x="376"
                y="118"
                width="228"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <text x="388" y="136" fill="#888888" fontSize="10">
                BASE Wh/km
              </text>
              <text
                x="388"
                y="154"
                fill="#ededed"
                fontSize="13"
                fontWeight="600"
              >
                9.0 Wh/km
              </text>
              <text x="580" y="146" textAnchor="end" fill="#555555" fontSize="10">
                rolling
              </text>

              <rect
                x="376"
                y="174"
                width="228"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <text x="388" y="192" fill="#888888" fontSize="10">
                MOTOR / ASSIST DRAW
              </text>
              <text
                x="388"
                y="210"
                fill="#ededed"
                fontSize="13"
                fontWeight="600"
              >
                × 1.75
              </text>
              <text x="580" y="202" textAnchor="end" fill="#555555" fontSize="10">
                L3
              </text>

              <rect
                x="376"
                y="230"
                width="228"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
              <text x="388" y="248" fill="#f59e0b" fontSize="10">
                TERRAIN RESISTANCE
              </text>
              <text
                x="388"
                y="266"
                fill="#ededed"
                fontSize="13"
                fontWeight="600"
              >
                × 1.00
              </text>
              <text x="580" y="258" textAnchor="end" fill="#555555" fontSize="10">
                calm
              </text>

              <rect
                x="376"
                y="286"
                width="228"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <text x="388" y="304" fill="#888888" fontSize="10">
                WEIGHT PENALTY
              </text>
              <text
                x="388"
                y="322"
                fill="#ededed"
                fontSize="13"
                fontWeight="600"
              >
                + 0.15 Wh/km
              </text>
              <text x="580" y="314" textAnchor="end" fill="#555555" fontSize="10">
                95 kg
              </text>
            </g>

            <line
              x1="376"
              y1="348"
              x2="604"
              y2="348"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="376"
              y="372"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              NET CONSUMPTION
            </text>
            <text
              x="376"
              y="402"
              fill="#a3e635"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15.9 Wh/km
            </text>
            <text
              x="376"
              y="422"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              9 × 1.75 × 1.0 + 0.15
            </text>
          </g>

          {/* Process → output */}
          <path
            d="M 620 254 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebike-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 620 254 H 700"
            fill="none"
            stroke="url(#ebike-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
          />

          {/* —— OUTPUT —— */}
          <g className="ebike-viz-node ebike-viz-node--output">
            <rect
              x="700"
              y="72"
              width="220"
              height="364"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1.35"
              strokeOpacity="0.65"
            />
            <text
              x="810"
              y="104"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.12em"
            >
              ESTIMATED RANGE
            </text>

            {/* Minimal bike glyph */}
            <g
              className="ebike-viz-bike"
              transform="translate(770, 122)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="14" cy="42" r="12" />
              <circle cx="66" cy="42" r="12" />
              <path d="M14 42 L34 18 H52 L66 42" />
              <path d="M34 18 L28 42" />
              <path d="M40 18 V8 H50" />
              <circle
                className="ebike-viz-bike-hub"
                cx="14"
                cy="42"
                r="2.5"
                fill="#a3e635"
                stroke="none"
              />
              <circle
                className="ebike-viz-bike-hub"
                cx="66"
                cy="42"
                r="2.5"
                fill="#a3e635"
                stroke="none"
              />
            </g>

            <text
              className="ebike-viz-output-value"
              x="810"
              y="220"
              textAnchor="middle"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              28.9 km
            </text>
            <text
              x="810"
              y="246"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              on a full charge
            </text>

            <line
              x1="724"
              y1="266"
              x2="896"
              y2="266"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="724"
              y="294"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RANGE MATH
            </text>
            <text
              x="724"
              y="318"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              460 Wh ÷ 15.9
            </text>
            <text
              x="724"
              y="338"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable ÷ Wh/km
            </text>

            {/* Distance road marker */}
            <rect
              x="724"
              y="362"
              width="172"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ebike-viz-road-progress"
              x="724"
              y="362"
              width="172"
              height="10"
              rx="2"
              fill="url(#ebike-viz-road)"
            />
            <text
              x="724"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0 km
            </text>
            <text
              x="896"
              y="396"
              textAnchor="end"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              28.9 km
            </text>
          </g>

          {/* Footnote */}
          <rect
            x="40"
            y="460"
            width="880"
            height="72"
            rx="4"
            fill="#0f0f0f"
            stroke="#262626"
            strokeWidth="1"
          />
          <text
            x="56"
            y="488"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.08em"
          >
            FLOW
          </text>
          <text
            x="56"
            y="512"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            Range (km) = (Wh × η) ÷ (base Wh/km × assist × terrain + weight
            penalty)
          </text>
        </svg>
      </div>
    </section>
  );
}

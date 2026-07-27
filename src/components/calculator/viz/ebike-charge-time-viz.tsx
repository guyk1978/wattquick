"use client";

import { cn } from "@/lib/utils";

interface EbikeChargeTimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Charge Time [VIZ] tab.
 * Charger W × efficiency → Wh fill duration.
 */
export function EbikeChargeTimeViz({ className }: EbikeChargeTimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-charge-time", className)}
      aria-label="E-bike charge time visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Charge Time</h3>
        <p className="tool-viz__subtitle">
          Charger output flows into the pack; efficiency losses set how fast
          stored energy reaches 100%.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-charge-time-viz"
          role="img"
          aria-labelledby="ebike-charge-viz-title ebike-charge-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebike-charge-viz-title">
            E-bike charge time animated flow diagram
          </title>
          <desc id="ebike-charge-viz-desc">
            Battery capacity in watt-hours, charger output in watts, and charge
            efficiency determine how long power from the charger fills the pack
            to full charge.
          </desc>

          <defs>
            <pattern
              id="ebike-charge-viz-grid"
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
              id="ebike-charge-viz-arrow"
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
              id="ebike-charge-viz-pulse"
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
              id="ebike-charge-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.95" />
            </linearGradient>
            <clipPath id="ebike-charge-viz-battery-clip">
              <rect x="376" y="218" width="228" height="48" rx="2" />
            </clipPath>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebike-charge-viz-grid)"
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
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            ENERGY FLOW
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

          {/* Battery capacity */}
          <g className="ebike-charge-viz-node">
            <rect
              x="40"
              y="72"
              width="240"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY CAPACITY
            </text>
            <g transform="translate(56, 116)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="32" height="48" rx="2" strokeWidth="1.3" />
              <rect
                className="ebike-charge-time-viz-battery-empty"
                x="4"
                y="28"
                width="24"
                height="28"
                rx="1"
                fill="#262626"
                stroke="none"
              />
            </g>
            <text
              x="106"
              y="142"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 Wh
            </text>
            <text
              x="106"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              energy to fill
            </text>
          </g>

          {/* Charger output */}
          <g className="ebike-charge-viz-node">
            <rect
              x="40"
              y="212"
              width="240"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHARGER OUTPUT
            </text>
            <g transform="translate(56, 256)" fill="none" stroke="#ededed">
              <rect x="0" y="6" width="34" height="40" rx="2" strokeWidth="1.3" />
              <path
                className="ebike-charge-time-viz-bolt"
                d="M20 10 L12 28 H18 L14 46 L28 24 H20 Z"
                strokeWidth="1.2"
                fill="#a3e635"
                fillOpacity="0.35"
                strokeLinejoin="round"
              />
            </g>
            <text
              x="106"
              y="282"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 W
            </text>
            <text
              x="106"
              y="298"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              wall / brick supply
            </text>
          </g>

          {/* Charge efficiency */}
          <g className="ebike-charge-viz-node">
            <rect
              x="40"
              y="328"
              width="240"
              height="88"
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
              CHARGE EFFICIENCY
            </text>
            <text
              x="56"
              y="382"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
            <text
              x="56"
              y="398"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              BMS + heat · 108 W effective
            </text>
          </g>

          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path d="M 280 132 H 340 V 200 H 360" />
            <path d="M 280 272 H 340 V 240 H 360" />
            <path d="M 280 368 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ebike-charge-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 132 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 272 H 340 V 240 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 280 368 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* Process */}
          <g className="ebike-charge-viz-node ebike-charge-viz-node--process">
            <rect
              x="360"
              y="72"
              width="260"
              height="388"
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
              CHARGER → PACK
            </text>

            <text
              x="376"
              y="128"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              500 Wh ÷ (120 W × 0.9)
            </text>
            <text
              x="376"
              y="152"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              capacity ÷ effective charge power
            </text>

            <rect
              x="376"
              y="172"
              width="228"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ebike-charge-time-viz-flow-bar"
              x="376"
              y="172"
              width="228"
              height="12"
              rx="2"
              fill="url(#ebike-charge-viz-pulse)"
              opacity="0.55"
            />

            <text
              x="376"
              y="208"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PACK FILL LEVEL
            </text>
            <rect
              x="376"
              y="218"
              width="228"
              height="48"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ebike-charge-time-viz-fill-bar"
              x="376"
              y="218"
              width="228"
              height="48"
              rx="2"
              fill="url(#ebike-charge-viz-fill)"
              clipPath="url(#ebike-charge-viz-battery-clip)"
            />

            <text
              x="376"
              y="278"
              fill="#f59e0b"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              −10% BMS / thermal loss
            </text>
            <text
              x="580"
              y="278"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              90% into cells
            </text>

            <text
              x="376"
              y="312"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              last 10–20% often tapers slower in real chargers
            </text>
          </g>

          <path
            d="M 620 260 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebike-charge-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 620 260 H 700"
            fill="none"
            stroke="url(#ebike-charge-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
          />

          {/* Output */}
          <g className="ebike-charge-viz-node ebike-charge-viz-node--output">
            <rect
              x="700"
              y="72"
              width="220"
              height="388"
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
              CHARGE DURATION
            </text>

            <g
              transform="translate(786, 128)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="24" cy="28" r="22" />
              <path d="M24 14 V30 L34 36" strokeLinecap="round" />
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
              4h 38m
            </text>
            <text
              x="810"
              y="248"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              0 → 100% estimate
            </text>

            <line
              x1="724"
              y1="268"
              x2="896"
              y2="268"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="810"
              y="300"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              EFFECTIVE RATE
            </text>
            <text
              x="810"
              y="328"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              108 W into pack
            </text>
            <text
              x="810"
              y="358"
              textAnchor="middle"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              4.63 h total (ideal)
            </text>
          </g>

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
            Time = battery Wh ÷ (charger W × charge efficiency %)
          </text>
        </svg>
      </div>
    </section>
  );
}

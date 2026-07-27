"use client";

import { cn } from "@/lib/utils";

interface EvChargeTimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Charge Time [VIZ] tab.
 * Energy kWh ÷ (charger kW × efficiency) → charge duration.
 * Sample: 55 ÷ (11 × 0.90) ≈ 5h 33m.
 */
export function EvChargeTimeViz({ className }: EvChargeTimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-charge-time", className)}
      aria-label="EV charge time visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Charge Time</h3>
        <p className="tool-viz__subtitle">
          Energy needed divided by effective charger power (after efficiency)
          estimates how long a session takes before taper.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-charge-time-viz"
          role="img"
          aria-labelledby="ect-viz-title ect-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ect-viz-title">EV charge time animated flow diagram</title>
          <desc id="ect-viz-desc">
            Energy needed in kilowatt-hours divided by charger power in
            kilowatts adjusted for charging efficiency yields estimated charge
            time. Sample: 55 kilowatt-hours at 11 kilowatts with 90 percent
            efficiency takes about 5 hours 33 minutes.
          </desc>

          <defs>
            <pattern
              id="ect-viz-grid"
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
              id="ect-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="ect-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="ect-viz-fill"
              x1="0%"
              y1="0%"
              x2="100%"
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
            fill="url(#ect-viz-grid)"
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
            CHARGE FLOW
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

          {/* —— INPUT: Energy needed —— */}
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
              ENERGY NEEDED
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
                className="ect-viz-battery-fill"
                x="4"
                y="28"
                width="20"
                height="16"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.75"
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
              55 kWh
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack energy to add
            </text>
          </g>

          {/* —— INPUT: Charger power —— */}
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
              CHARGER POWER
            </text>
            <g
              transform="translate(56, 248)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <rect x="0" y="8" width="32" height="32" rx="2" />
              <path
                d="M20 12 L12 28 H18 L14 40 L26 22 H20 Z"
                className="ect-viz-bolt"
                fill="#a3e635"
                fillOpacity="0.4"
                strokeLinejoin="round"
              />
            </g>
            <text
              x="100"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              11 kW
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Level 2 home EVSE
            </text>
          </g>

          {/* —— INPUT: Efficiency —— */}
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
              CHARGING EFFICIENCY
            </text>
            <text
              x="56"
              y="410"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
            <text
              x="140"
              y="410"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              AC→DC · onboard loss
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ect-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ect-viz-pulse)"
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
              kWh ÷ (kW × EFF)
            </text>

            {/* EVSE → car */}
            <g transform="translate(392, 120)">
              <rect
                x="0"
                y="12"
                width="52"
                height="36"
                rx="3"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.3"
              />
              <text
                x="26"
                y="34"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                EVSE
              </text>
              <path
                d="M 52 30 H 90"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 52 30 H 90"
                fill="none"
                stroke="url(#ect-viz-pulse)"
                strokeWidth="2.5"
                pathLength="100"
              />
              <rect
                x="90"
                y="4"
                width="70"
                height="52"
                rx="4"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.4"
              />
              <rect
                className="ect-viz-pack-fill"
                x="96"
                y="12"
                width="58"
                height="36"
                rx="2"
                fill="#a3e635"
                fillOpacity="0.45"
              />
              <text
                x="125"
                y="35"
                fill="#0a0a0a"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                PACK
              </text>
            </g>

            <rect
              x="376"
              y="200"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="222"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · EFFECTIVE POWER
            </text>
            <text
              x="388"
              y="244"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              11 kW × 0.90 ={" "}
              <tspan fill="#a3e635">9.9 kW</tspan>
            </text>

            <rect
              x="376"
              y="270"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="292"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · DURATION
            </text>
            <text
              x="388"
              y="314"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              55 kWh ÷ 9.9 kW
            </text>

            <text
              x="376"
              y="356"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PACK FILL
            </text>
            <rect
              x="376"
              y="368"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ect-viz-fill-bar"
              x="378"
              y="370"
              width="224"
              height="12"
              rx="1"
              fill="url(#ect-viz-fill)"
            />

            <text
              x="490"
              y="416"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              h = kWh ÷ (kW × eff/100)
            </text>
            <text
              x="490"
              y="438"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              last 10–20% tapers slower
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ect-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#ect-viz-pulse)"
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
              EST. CHARGE TIME
            </text>

            <g
              transform="translate(786, 198)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.4"
            >
              <circle cx="24" cy="24" r="22" />
              <g className="ect-viz-clock-hand">
                <line
                  x1="24"
                  y1="24"
                  x2="24"
                  y2="10"
                  stroke="#a3e635"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <line x1="24" y1="24" x2="34" y2="28" strokeLinecap="round" />
            </g>

            <text
              x="810"
              y="280"
              fill="#a3e635"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ect-viz-output-value"
            >
              5h 33m
            </text>
            <text
              x="810"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              at 11 kW · 90% eff
            </text>
            <text
              x="810"
              y="342"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              55 kWh energy needed
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              add buffer for full SoC
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Hours ≈ kWh ÷ (charger kW × efficiency ÷ 100) · DC fast rare for 0–100%
          </text>
        </svg>
      </div>
    </section>
  );
}

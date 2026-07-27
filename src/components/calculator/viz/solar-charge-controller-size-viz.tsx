"use client";

import { cn } from "@/lib/utils";

interface SolarChargeControllerSizeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Charge Controller Size [VIZ].
 * (panel W ÷ battery V) × (1 + margin%) → minimum controller amps.
 * Sample: (800 ÷ 12) × 1.25 ≈ 83 A.
 */
export function SolarChargeControllerSizeViz({
  className,
}: SolarChargeControllerSizeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-charge-controller-size", className)}
      aria-label="Solar charge controller size visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Charge Controller Size</h3>
        <p className="tool-viz__subtitle">
          Array watts divided by battery voltage, then scaled by a safety
          margin, sets the minimum charge-controller amperage.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-charge-controller-size-viz"
          role="img"
          aria-labelledby="scc-viz-title scc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="scc-viz-title">
            Solar charge controller size animated flow diagram
          </title>
          <desc id="scc-viz-desc">
            Total panel watts divided by battery voltage and multiplied by a
            safety margin yields minimum controller amperage. Sample: 800 watts
            on a 12 volt bank with 25 percent margin requires about 83 amps.
          </desc>

          <defs>
            <pattern
              id="scc-viz-grid"
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
              id="scc-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient id="scc-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="scc-viz-current"
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
            fill="url(#scc-viz-grid)"
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
            W ÷ V × MARGIN
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

          {/* —— INPUT: Panel watts —— */}
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
              TOTAL PANEL WATTS
            </text>
            <g
              transform="translate(56, 112)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            >
              <rect x="0" y="4" width="36" height="28" rx="2" />
              <line x1="12" y1="4" x2="12" y2="32" />
              <line x1="24" y1="4" x2="24" y2="32" />
              <line x1="0" y1="18" x2="36" y2="18" />
              <rect
                className="scc-viz-panel-glow"
                x="2"
                y="6"
                width="32"
                height="24"
                rx="1"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="none"
              />
            </g>
            <text
              x="108"
              y="142"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              800 W
            </text>
            <text
              x="108"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              array STC total
            </text>
          </g>

          {/* —— INPUT: Battery V —— */}
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
              BATTERY VOLTAGE
            </text>
            <g transform="translate(56, 248)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="28" height="36" rx="2" strokeWidth="1.3" />
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
                className="scc-viz-battery-fill"
                x="4"
                y="14"
                width="20"
                height="26"
                rx="1"
                fill="currentColor"
                fillOpacity="0.75"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="276"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              bank / bus nominal
            </text>
          </g>

          {/* —— INPUT: Margin —— */}
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
              SAFETY MARGIN
            </text>
            <text
              x="56"
              y="410"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25%
            </text>
            <text
              x="140"
              y="410"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 1.25× headroom
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#scc-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#scc-viz-pulse)"
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
              ARRAY → CONTROLLER
            </text>

            {/* PV → SCC → Battery */}
            <g transform="translate(384, 118)">
              <rect
                x="0"
                y="8"
                width="44"
                height="32"
                rx="2"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <text
                x="22"
                y="28"
                fill="#888888"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                PV
              </text>
              <path
                d="M 44 24 H 78"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 44 24 H 78"
                fill="none"
                stroke="url(#scc-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              <rect
                x="78"
                y="4"
                width="56"
                height="40"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeOpacity="0.55"
              />
              <text
                x="106"
                y="28"
                fill="#ededed"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="scc-viz-output-value"
              >
                SCC
              </text>
              <path
                d="M 134 24 H 168"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
                d="M 134 24 H 168"
                fill="none"
                stroke="url(#scc-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              <rect
                x="168"
                y="8"
                width="36"
                height="32"
                rx="2"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <text
                x="186"
                y="28"
                fill="#888888"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                BAT
              </text>
            </g>

            <rect
              x="376"
              y="180"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="202"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · BASE CURRENT
            </text>
            <text
              x="388"
              y="224"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              800 W ÷ 12 V ={" "}
              <tspan fill="#ededed">66.7 A</tspan>
            </text>

            <rect
              x="376"
              y="250"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="272"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · × SAFETY
            </text>
            <text
              x="388"
              y="294"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              66.7 A × 1.25
            </text>

            <text
              x="376"
              y="336"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CURRENT HEADROOM
            </text>
            <text
              x="376"
              y="356"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              BASE
            </text>
            <rect
              x="420"
              y="346"
              width="184"
              height="12"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="scc-viz-base-bar"
              x="422"
              y="348"
              width="140"
              height="8"
              rx="1"
              fill="currentColor"
              fillOpacity="0.55"
            />
            <text
              x="376"
              y="382"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              +25%
            </text>
            <rect
              x="420"
              y="372"
              width="184"
              height="12"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="scc-viz-margin-bar"
              x="422"
              y="374"
              width="176"
              height="8"
              rx="1"
              fill="url(#scc-viz-current)"
            />

            <text
              x="490"
              y="420"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              A = (W ÷ V) × (1 + m/100)
            </text>
            <text
              x="490"
              y="442"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              check panel Isc cold-weather
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#scc-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#scc-viz-pulse)"
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
              MIN. CONTROLLER
            </text>

            <rect
              x="746"
              y="196"
              width="128"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeOpacity="0.5"
            />
            <text
              x="810"
              y="226"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
            >
              MPPT / PWM
            </text>

            <text
              x="810"
              y="290"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="scc-viz-output-value"
            >
              83 A
            </text>
            <text
              x="810"
              y="318"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              minimum rating
            </text>
            <text
              x="810"
              y="350"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              800 W ÷ 12 V + 25%
            </text>
            <text
              x="810"
              y="368"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              round up to next model
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Controller A ≈ (panel W ÷ battery V) × (1 + margin) · cold Isc can
            exceed STC
          </text>
        </svg>
      </div>
    </section>
  );
}

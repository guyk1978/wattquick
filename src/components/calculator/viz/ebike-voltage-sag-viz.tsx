"use client";

import { cn } from "@/lib/utils";

interface EbikeVoltageSagVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Voltage Sag [VIZ].
 * R_pack = R_cell × S ÷ P; sag = I × R_pack; V_load = V_nom − sag.
 * Sample: 48 V · 0.03 Ω · 13S4P · 25 A → 2.44 V sag · 45.6 V · ~5.1%.
 */
export function EbikeVoltageSagViz({ className }: EbikeVoltageSagVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-voltage-sag", className)}
      aria-label="E-bike voltage sag visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Voltage Sag</h3>
        <p className="tool-viz__subtitle">
          Current through pack resistance pulls terminal voltage down under
          hard throttle — that drop is sag, and it cuts power when you need it
          most.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-voltage-sag-viz"
          role="img"
          aria-labelledby="ebvs-viz-title ebvs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebvs-viz-title">
            E-bike voltage sag animated conversion diagram
          </title>
          <desc id="ebvs-viz-desc">
            Nominal voltage and cell resistance with series-parallel layout and
            max current yield voltage sag and under-load voltage. Sample: 48
            volts, 0.03 ohm cells, 13S4P at 25 amperes sags about 2.44 volts to
            45.6 volts under load, about 5.1 percent.
          </desc>

          <defs>
            <pattern
              id="ebvs-viz-grid"
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
              id="ebvs-viz-arrow"
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
              id="ebvs-viz-pulse"
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
              id="ebvs-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebvs-viz-grid)"
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
            I × R → ΔV
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

          {/* —— INPUT: Voltage —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
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
              NOMINAL VOLTAGE
            </text>
            <text
              className="ebvs-viz-v-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              open-circuit / resting
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              13S typical
            </text>
          </g>

          {/* —— INPUT: Resistance —— */}
          <g>
            <rect
              x="40"
              y="242"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CELL RESISTANCE
            </text>
            <text
              className="ebvs-viz-r-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.03 Ω
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              per 18650 cell
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              13S4P · 25 A draw
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#ebvs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebvs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#ebvs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebvs-viz-arrow)"
          />

          {/* —— CENTER —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="320"
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
              LOAD DROP
            </text>

            {/* Pack model */}
            <g transform="translate(350, 118)">
              <rect
                className="ebvs-viz-pack"
                x="0"
                y="0"
                width="120"
                height="80"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="60"
                y="28"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                PACK
              </text>
              <text
                className="ebvs-viz-layout-chip"
                x="60"
                y="50"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                13S4P
              </text>
              <text
                x="60"
                y="70"
                textAnchor="middle"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                R ≈ 97.5 mΩ
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 470 158 L 500 158"
              fill="none"
              stroke="url(#ebvs-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#ebvs-viz-arrow)"
            />

            {/* Load / I */}
            <g transform="translate(500, 118)">
              <rect
                className="ebvs-viz-load"
                x="0"
                y="0"
                width="120"
                height="80"
                rx="4"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="60"
                y="28"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                LOAD
              </text>
              <text
                className="ebvs-viz-i-chip"
                x="60"
                y="52"
                textAnchor="middle"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                25 A
              </text>
              <text
                x="60"
                y="72"
                textAnchor="middle"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                full throttle
              </text>
            </g>

            {/* Voltage bars: open vs loaded */}
            <text
              x="340"
              y="230"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              TERMINAL VOLTAGE
            </text>
            <text
              x="340"
              y="254"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              OPEN
            </text>
            <rect
              x="400"
              y="244"
              width="230"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebvs-viz-open-bar"
              x="402"
              y="246"
              width="226"
              height="6"
              rx="1"
              fill="url(#ebvs-viz-bar)"
            />
            <text
              x="340"
              y="282"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              LOAD
            </text>
            <rect
              x="400"
              y="272"
              width="230"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebvs-viz-load-bar"
              x="402"
              y="274"
              width="214"
              height="6"
              rx="1"
              fill="url(#ebvs-viz-bar)"
            />

            {/* Sag pulse line */}
            <path
              className="ebvs-viz-sag-path"
              d="M 360 310 L 420 310 L 450 340 L 520 340 L 550 310 L 620 310"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <text
              className="ebvs-viz-math-value"
              x="340"
              y="370"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25 A × 97.5 mΩ = 2.44 V
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebvs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebvs-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="320"
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
              UNDER LOAD
            </text>
            <text
              className="ebvs-viz-output-value"
              x="720"
              y="150"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              45.6
            </text>
            <text
              x="720"
              y="176"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              V
            </text>

            <rect
              x="720"
              y="196"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebvs-viz-output-bar"
              x="722"
              y="198"
              width="160"
              height="8"
              rx="1"
              fill="url(#ebvs-viz-bar)"
            />

            <text
              x="720"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VOLTAGE SAG
            </text>
            <text
              className="ebvs-viz-sag-value"
              x="720"
              y="272"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −2.44 V · 5.1%
            </text>
            <text
              className="ebvs-viz-detail-value"
              x="720"
              y="304"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              from 48 V open
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hard acceleration
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
              sag = I × (R_cell × S ÷ P)
            </text>
            <text
              x="480"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="480"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              48 V · 13S4P · 25 A → 45.6 V
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

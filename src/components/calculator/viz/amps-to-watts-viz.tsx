"use client";

import { cn } from "@/lib/utils";

interface AmpsToWattsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Amps to Watts [VIZ] tab.
 * Current A × Voltage V → power W (and kW).
 * Sample: 10 A × 12 V = 120 W = 0.12 kW.
 */
export function AmpsToWattsViz({ className }: AmpsToWattsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--amps-to-watts", className)}
      aria-label="Amps to watts visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Amps to Watts</h3>
        <p className="tool-viz__subtitle">
          Current multiplied by system voltage yields electrical power — the
          wattage your fuses, inverters, and packs must support.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg amps-to-watts-viz"
          role="img"
          aria-labelledby="atw-viz-title atw-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="atw-viz-title">Amps to watts animated flow diagram</title>
          <desc id="atw-viz-desc">
            Current in amperes multiplied by voltage in volts produces power in
            watts. Sample: 10 amps at 12 volts equals 120 watts or 0.12
            kilowatts.
          </desc>

          <defs>
            <pattern
              id="atw-viz-grid"
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
              id="atw-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="atw-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="atw-viz-power"
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
            fill="url(#atw-viz-grid)"
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
            MULTIPLY
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

          {/* —— INPUT: Current —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="116"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CURRENT
            </text>
            <g
              transform="translate(56, 136)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="18" cy="28" r="18" />
              <path
                className="atw-viz-current-flow"
                d="M 4 28 H 32"
                stroke="url(#atw-viz-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x="18"
                y="58"
                fill="#888888"
                stroke="none"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                A
              </text>
            </g>
            <text
              x="112"
              y="168"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 A
            </text>
            <text
              x="112"
              y="192"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              circuit current draw
            </text>
            <text
              x="112"
              y="212"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              continuous DC amps
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
          <g>
            <rect
              x="40"
              y="268"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VOLTAGE
            </text>
            <g
              transform="translate(56, 318)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="16" cy="24" r="18" />
              <text
                x="16"
                y="29"
                fill="#a3e635"
                stroke="none"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="atw-viz-v-pulse"
              >
                V
              </text>
            </g>
            <text
              x="112"
              y="348"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="112"
              y="374"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DC system / pack bus
            </text>
            <text
              x="112"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              use nominal operating V
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#atw-viz-arrow)"
          >
            <path d="M 280 162 H 340 V 200 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#atw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 162 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 342 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="360"
              y="88"
              width="260"
              height="328"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="118"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AMPS × VOLTS
            </text>

            <rect
              x="376"
              y="138"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="490"
              y="168"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              <tspan fill="#a3e635">10 A</tspan>
              <tspan fill="#888888"> × </tspan>
              <tspan fill="#a3e635">12 V</tspan>
            </text>
            <text
              x="490"
              y="194"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              className="atw-viz-multiply"
            >
              P = I × V
            </text>

            <text
              x="376"
              y="240"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CURRENT SCALE
            </text>
            <rect
              x="376"
              y="250"
              width="228"
              height="12"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="atw-viz-amps-bar"
              x="378"
              y="252"
              width="120"
              height="8"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.7"
            />

            <text
              x="376"
              y="290"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              VOLTAGE SCALE
            </text>
            <rect
              x="376"
              y="300"
              width="228"
              height="12"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="atw-viz-voltage-bar"
              x="378"
              y="302"
              width="96"
              height="8"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.7"
            />

            <text
              x="376"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              POWER PRODUCT
            </text>
            <rect
              x="376"
              y="350"
              width="228"
              height="40"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="atw-viz-power-fill"
              x="378"
              y="352"
              width="224"
              height="36"
              rx="2"
              fill="url(#atw-viz-power)"
            />
            <text
              x="490"
              y="376"
              fill="#0a0a0a"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
            >
              120 W
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#atw-viz-arrow)"
          >
            <path d="M 620 252 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#atw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 252 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="240"
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
              POWER
            </text>

            <g transform="translate(778, 196)" fill="none" stroke="#ededed">
              <rect x="0" y="4" width="64" height="48" rx="3" strokeWidth="1.4" />
              <path
                d="M38 12 L26 32 H34 L28 48 L46 26 H36 Z"
                strokeWidth="1.3"
                strokeLinejoin="round"
                className="atw-viz-bolt"
                fill="#a3e635"
                fillOpacity="0.35"
              />
            </g>

            <text
              x="810"
              y="290"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="atw-viz-output-value"
            >
              120 W
            </text>
            <text
              x="810"
              y="318"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              = 0.12 kW
            </text>
            <text
              x="810"
              y="350"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              10 A × 12 V
            </text>
            <text
              x="810"
              y="370"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              DC circuit power
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Watts = Amps × Volts (DC) · divide by 1000 for kW · AC may need power
            factor
          </text>
        </svg>
      </div>
    </section>
  );
}

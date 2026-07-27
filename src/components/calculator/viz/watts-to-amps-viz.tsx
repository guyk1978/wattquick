"use client";

import { cn } from "@/lib/utils";

interface WattsToAmpsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Watts to Amps [VIZ] tab.
 * Power W ÷ Voltage V → current A.
 * Sample: 120 W ÷ 12 V = 10 A.
 */
export function WattsToAmpsViz({ className }: WattsToAmpsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--watts-to-amps", className)}
      aria-label="Watts to amps visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Watts to Amps</h3>
        <p className="tool-viz__subtitle">
          Electrical power divided by system voltage yields the current the
          circuit must carry — core DC sizing for fuses, wire, and packs.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg watts-to-amps-viz"
          role="img"
          aria-labelledby="wta-viz-title wta-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="wta-viz-title">Watts to amps animated flow diagram</title>
          <desc id="wta-viz-desc">
            Power in watts divided by voltage in volts produces current in
            amperes. Sample: 120 watts on a 12 volt system draws 10 amps.
          </desc>

          <defs>
            <pattern
              id="wta-viz-grid"
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
              id="wta-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient id="wta-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="wta-viz-current"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#wta-viz-grid)"
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
            DIVIDE
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

          {/* —— INPUT: Power —— */}
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
              POWER
            </text>
            <g transform="translate(56, 136)" fill="none" stroke="#ededed">
              <rect x="0" y="8" width="36" height="44" rx="2" strokeWidth="1.3" />
              <path
                d="M22 14 L14 34 H20 L16 52 L30 28 H22 Z"
                strokeWidth="1.3"
                strokeLinejoin="round"
                className="wta-viz-bolt"
                fill="currentColor"
                fillOpacity="0.35"
              />
            </g>
            <text
              x="112"
              y="168"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 W
            </text>
            <text
              x="112"
              y="192"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              load power demand
            </text>
            <text
              x="112"
              y="212"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              P = V × I
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
                fill="#ededed"
                stroke="none"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="wta-viz-v-pulse"
              >
                V
              </text>
            </g>
            <text
              x="112"
              y="348"
              fill="#ededed"
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
            markerEnd="url(#wta-viz-arrow)"
          >
            <path d="M 280 162 H 340 V 200 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#wta-viz-pulse)"
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
              WATTS ÷ VOLTS
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
              <tspan fill="#ededed">120 W</tspan>
              <tspan fill="#888888"> ÷ </tspan>
              <tspan fill="#ededed">12 V</tspan>
            </text>
            <text
              x="490"
              y="194"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              I = P ÷ V
            </text>

            {/* Visual divider: power bar / voltage bar */}
            <text
              x="376"
              y="240"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              POWER SCALE
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
              className="wta-viz-power-bar"
              x="378"
              y="252"
              width="180"
              height="8"
              rx="1"
              fill="currentColor"
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
              className="wta-viz-voltage-bar"
              x="378"
              y="302"
              width="72"
              height="8"
              rx="1"
              fill="currentColor"
              fillOpacity="0.7"
            />

            {/* Current flow pipe */}
            <text
              x="376"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CURRENT CHANNEL
            </text>
            <rect
              x="376"
              y="352"
              width="228"
              height="28"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <path
              className="wta-viz-current-flow"
              d="M 388 366 H 592"
              fill="none"
              stroke="url(#wta-viz-current)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <text
              x="490"
              y="400"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              higher V → lower A for same W
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#wta-viz-arrow)"
          >
            <path d="M 620 252 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#wta-viz-pulse)"
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
              CURRENT DRAW
            </text>

            {/* Ammeter glyph */}
            <circle
              cx="810"
              cy="228"
              r="40"
              fill="none"
              stroke="#333333"
              strokeWidth="2"
            />
            <circle
              cx="810"
              cy="228"
              r="32"
              fill="none"
              stroke="#262626"
              strokeWidth="1"
            />
            <path
              className="wta-viz-needle"
              d="M 810 228 L 810 200"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="810" cy="228" r="4" fill="currentColor" />
            <text
              x="810"
              y="262"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              A
            </text>

            <text
              x="810"
              y="310"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="wta-viz-output-value"
            >
              10 A
            </text>
            <text
              x="810"
              y="338"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              120 W ÷ 12 V
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              DC circuit current
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Amps = Watts ÷ Volts (DC) · use RMS voltage &amp; power factor for AC
            loads
          </text>
        </svg>
      </div>
    </section>
  );
}

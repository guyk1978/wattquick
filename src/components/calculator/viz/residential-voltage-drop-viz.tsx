"use client";

import { cn } from "@/lib/utils";

interface ResidentialVoltageDropVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Residential AC Voltage Drop [VIZ].
 * Supply V, load A, one-way m, copper size → drop V / % vs 3% & 5% limits.
 * Sample: 120 V · 20 A · 25 m · 12 AWG → 5.21 V (4.34%).
 */
export function ResidentialVoltageDropViz({
  className,
}: ResidentialVoltageDropVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--residential-voltage-drop", className)}
      aria-label="Residential AC voltage drop visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Residential AC Voltage Drop</h3>
        <p className="tool-viz__subtitle">
          Load current through copper round-trip resistance reduces voltage at
          the outlet — compare drop % against 3% branch and 5% total limits.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg residential-voltage-drop-viz"
          role="img"
          aria-labelledby="rvd-viz-title rvd-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="rvd-viz-title">
            Residential AC voltage drop animated flow diagram
          </title>
          <desc id="rvd-viz-desc">
            Supply voltage, load current, one-way cable length, and copper
            conductor size determine voltage drop over a residential AC run.
            Sample: 120 volts, 20 amps, 25 meters of 12 AWG copper drops about
            5.21 volts or 4.34 percent — within a 5 percent planning limit but
            above a 3 percent branch target.
          </desc>

          <defs>
            <pattern
              id="rvd-viz-grid"
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
              id="rvd-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="rvd-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="rvd-viz-voltage-fade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#rvd-viz-grid)"
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
            x="40"
            y="44"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            INPUTS
          </text>
          <text
            x="360"
            y="44"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            AC DROP PATH
          </text>
          <text
            x="700"
            y="44"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>

          {/* —— 4 compact inputs —— */}
          <g>
            <rect
              x="36"
              y="60"
              width="248"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="48"
              y="82"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SUPPLY VOLTAGE
            </text>
            <text
              x="48"
              y="116"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 V
            </text>
            <text
              x="140"
              y="116"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              L-N branch
            </text>
          </g>

          <g>
            <rect
              x="36"
              y="160"
              width="248"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="48"
              y="182"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              LOAD CURRENT
            </text>
            <text
              x="48"
              y="216"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20 A
            </text>
            <text
              x="130"
              y="216"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              continuous
            </text>
          </g>

          <g>
            <rect
              x="36"
              y="260"
              width="248"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="48"
              y="282"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ONE-WAY LENGTH
            </text>
            <text
              x="48"
              y="316"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25 m
            </text>
            <text
              x="130"
              y="316"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 82 ft
            </text>
          </g>

          <g>
            <rect
              x="36"
              y="360"
              width="248"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="48"
              y="382"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              COPPER CONDUCTOR
            </text>
            <text
              x="48"
              y="416"
              fill="#a3e635"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 AWG
            </text>
            <text
              x="160"
              y="416"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              3.31 mm²
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.2"
            strokeLinecap="round"
            markerEnd="url(#rvd-viz-arrow)"
          >
            <path d="M 284 104 H 320 V 180 H 348" />
            <path d="M 284 204 H 320 V 220 H 348" />
            <path d="M 284 304 H 320 V 280 H 348" />
            <path d="M 284 404 H 320 V 340 H 348" />
          </g>
          <g
            fill="none"
            stroke="url(#rvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 284 104 H 320 V 180 H 348"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 284 204 H 320 V 220 H 348"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.55s" }}
              d="M 284 304 H 320 V 280 H 348"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.85s" }}
              d="M 284 404 H 320 V 340 H 348"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="348"
              y="60"
              width="280"
              height="388"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="364"
              y="88"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              I × R × 2L
            </text>

            {/* Panel → cable → load */}
            <g transform="translate(372, 108)">
              <rect
                x="0"
                y="4"
                width="48"
                height="40"
                rx="2"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <text
                x="24"
                y="28"
                fill="#888888"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                PANEL
              </text>

              <path
                d="M 48 16 H 180"
                fill="none"
                stroke="#333333"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 48 32 H 180"
                fill="none"
                stroke="#333333"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                className="rvd-viz-current-flow"
                d="M 48 16 H 180"
                fill="none"
                stroke="url(#rvd-viz-voltage-fade)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                className="rvd-viz-current-flow rvd-viz-current-flow--return"
                d="M 180 32 H 48"
                fill="none"
                stroke="url(#rvd-viz-voltage-fade)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <rect
                x="180"
                y="4"
                width="48"
                height="40"
                rx="2"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <text
                x="204"
                y="28"
                fill="#888888"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                LOAD
              </text>
            </g>

            <text
              x="488"
              y="172"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              120 V → … → 114.8 V at load
            </text>

            <rect
              x="364"
              y="188"
              width="248"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="376"
              y="210"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ROUND-TRIP R
            </text>
            <text
              x="376"
              y="232"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 0.261 Ω · 12 AWG × 25 m × 2
            </text>

            <rect
              x="364"
              y="256"
              width="248"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="376"
              y="278"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DROP
            </text>
            <text
              x="376"
              y="300"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              20 A × 0.261 Ω ={" "}
              <tspan fill="#a3e635">5.21 V</tspan>
            </text>

            {/* Threshold gauge */}
            <text
              x="364"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DROP % VS LIMITS
            </text>
            <rect
              x="364"
              y="352"
              width="248"
              height="18"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            {/* 3% mark at 3/5 * 248 ≈ 149, 5% = full */}
            <rect
              className="rvd-viz-drop-bar"
              x="366"
              y="354"
              width="210"
              height="14"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.75"
            />
            <line
              x1="513"
              y1="350"
              x2="513"
              y2="372"
              stroke="#888888"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <text
              x="513"
              y="386"
              fill="#888888"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              3%
            </text>
            <text
              x="608"
              y="386"
              fill="#555555"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              5%
            </text>
            <text
              x="488"
              y="416"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              4.34% · within 5% · over 3% branch
            </text>
            <text
              x="488"
              y="434"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              upsize for heavy motors / EVSE
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#rvd-viz-arrow)"
          >
            <path d="M 628 254 H 696" />
          </g>
          <g
            fill="none"
            stroke="url(#rvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 628 254 H 696"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="696"
              y="120"
              width="228"
              height="280"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="712"
              y="152"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VOLTAGE DROP
            </text>

            <text
              x="810"
              y="210"
              fill="#a3e635"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="rvd-viz-output-value"
            >
              5.21 V
            </text>
            <text
              x="810"
              y="242"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              className="rvd-viz-output-value"
            >
              4.34%
            </text>

            {/* Status chips */}
            <rect
              x="724"
              y="262"
              width="72"
              height="28"
              rx="2"
              fill="#0a0a0a"
              stroke="#555555"
            />
            <text
              x="760"
              y="281"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              &gt; 3%
            </text>
            <rect
              x="808"
              y="262"
              width="80"
              height="28"
              rx="2"
              fill="#0a0a0a"
              stroke="#a3e635"
              strokeOpacity="0.6"
            />
            <text
              x="848"
              y="281"
              fill="#a3e635"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≤ 5% OK
            </text>

            <text
              x="810"
              y="324"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              114.8 V at load
            </text>
            <text
              x="810"
              y="350"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              120 V · 20 A · 25 m
            </text>
            <text
              x="810"
              y="368"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              12 AWG copper
            </text>
          </g>

          <text
            x="40"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Drop V = I × R × 2 × L · target ≤3% branch / ≤5% feeder+branch · copper
            @ ~20 °C
          </text>
        </svg>
      </div>
    </section>
  );
}

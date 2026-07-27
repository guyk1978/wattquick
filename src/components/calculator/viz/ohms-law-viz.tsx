"use client";

import { cn } from "@/lib/utils";

interface OhmsLawVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Ohm's Law [VIZ] tab.
 * Any two of V, I, R → solve the third (V = I×R / I = V÷R / R = V÷I).
 * Sample: 12 V & 10 A → R = 1.2 Ω.
 */
export function OhmsLawViz({ className }: OhmsLawVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ohms-law", className)}
      aria-label="Ohm's law visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Ohm&apos;s Law Calculator</h3>
        <p className="tool-viz__subtitle">
          Enter any two of voltage, current, and resistance — the third falls
          out of V = I × R and its rearrangements.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ohms-law-viz"
          role="img"
          aria-labelledby="ohm-viz-title ohm-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ohm-viz-title">Ohm&apos;s law animated flow diagram</title>
          <desc id="ohm-viz-desc">
            Voltage, current, and resistance relate by Ohm&apos;s law. Enter any
            two values to solve the third. Sample: 12 volts and 10 amps yield
            1.2 ohms of resistance.
          </desc>

          <defs>
            <pattern
              id="ohm-viz-grid"
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
              id="ohm-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="ohm-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ohm-viz-grid)"
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
            KNOWNS
          </text>
          <text
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            CIRCUIT · V–I–R
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            SOLVED
          </text>

          {/* —— Known: Voltage —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="114"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VOLTAGE · V
            </text>
            <g
              transform="translate(56, 132)"
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
                className="ohm-viz-v-pulse"
              >
                V
              </text>
            </g>
            <text
              x="106"
              y="166"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="106"
              y="192"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              electrical pressure
            </text>
          </g>

          {/* —— Known: Current —— */}
          <g>
            <rect
              x="40"
              y="240"
              width="240"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CURRENT · I
            </text>
            <g
              transform="translate(56, 284)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="16" cy="24" r="18" />
              <path
                className="ohm-viz-current-flow"
                d="M 2 24 H 30"
                stroke="url(#ohm-viz-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
            <text
              x="106"
              y="318"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 A
            </text>
            <text
              x="106"
              y="344"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              charge flow rate
            </text>
          </g>

          {/* —— Blank: Resistance (solving) —— */}
          <g>
            <rect
              x="40"
              y="392"
              width="240"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1"
              strokeOpacity="0.45"
              strokeDasharray="4 3"
            />
            <text
              x="56"
              y="420"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RESISTANCE · R
            </text>
            <text
              x="56"
              y="452"
              fill="#555555"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              leave blank → solve
            </text>
          </g>

          {/* Flow → center */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ohm-viz-arrow)"
          >
            <path d="M 280 153 H 340 V 200 H 360" />
            <path d="M 280 305 H 340 V 280 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ohm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 153 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 305 H 340 V 280 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: triangle + formulas —— */}
          <g>
            <rect
              x="360"
              y="72"
              width="260"
              height="408"
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
              OHM TRIANGLE
            </text>

            {/* V / I–R triangle */}
            <g transform="translate(420, 120)">
              <path
                d="M 70 8 L 130 110 L 10 110 Z"
                fill="none"
                stroke="#ededed"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <line x1="20" y1="95" x2="120" y2="95" stroke="#333333" />
              <text
                x="70"
                y="55"
                fill="#a3e635"
                fontSize="22"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="ohm-viz-output-value"
              >
                V
              </text>
              <text
                x="40"
                y="130"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                I
              </text>
              <text
                x="100"
                y="130"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                R
              </text>
            </g>

            {/* Series circuit glyph */}
            <g transform="translate(392, 270)" fill="none" stroke="#ededed">
              <rect x="0" y="8" width="36" height="28" rx="2" strokeWidth="1.2" />
              <text
                x="18"
                y="26"
                fill="#888888"
                stroke="none"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                SRC
              </text>
              <path d="M 36 22 H 70" stroke="#333333" strokeWidth="1.5" />
              <path
                className="ohm-viz-current-flow"
                d="M 36 22 H 70"
                stroke="url(#ohm-viz-pulse)"
                strokeWidth="2"
              />
              {/* Resistor zigzag */}
              <path
                d="M 70 22 L 78 10 L 86 34 L 94 10 L 102 34 L 110 10 L 118 22"
                strokeWidth="1.4"
                strokeLinejoin="round"
                className="ohm-viz-resistor"
              />
              <path d="M 118 22 H 152" stroke="#333333" strokeWidth="1.5" />
              <path
                className="ohm-viz-current-flow"
                style={{ animationDelay: "0.4s" }}
                d="M 118 22 H 152"
                stroke="url(#ohm-viz-pulse)"
                strokeWidth="2"
              />
              <rect
                x="152"
                y="8"
                width="36"
                height="28"
                rx="2"
                strokeWidth="1.2"
              />
              <text
                x="170"
                y="26"
                fill="#888888"
                stroke="none"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                LOAD
              </text>
            </g>

            {/* Three formula cards */}
            <rect
              x="376"
              y="330"
              width="228"
              height="36"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="490"
              y="353"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              V = I × R
            </text>

            <rect
              x="376"
              y="374"
              width="228"
              height="36"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="490"
              y="397"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              I = V ÷ R
            </text>

            <rect
              x="376"
              y="418"
              width="228"
              height="40"
              rx="2"
              fill="#0a0a0a"
              stroke="#a3e635"
              strokeOpacity="0.5"
            />
            <text
              x="490"
              y="443"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ohm-viz-active-formula"
            >
              R = V ÷ I · active
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ohm-viz-arrow)"
          >
            <path d="M 620 276 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#ohm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 276 H 700"
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
              CALCULATED VALUE
            </text>

            <text
              x="810"
              y="220"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              Resistance
            </text>
            <text
              x="810"
              y="270"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ohm-viz-output-value"
            >
              1.2 Ω
            </text>
            <text
              x="810"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              R = 12 V ÷ 10 A
            </text>
            <text
              x="810"
              y="340"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              enter exactly two values
            </text>
            <text
              x="810"
              y="358"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              leave the unknown blank
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            V = I × R · I = V ÷ R · R = V ÷ I · resistive DC / AC; reactive loads
            need impedance
          </text>
        </svg>
      </div>
    </section>
  );
}

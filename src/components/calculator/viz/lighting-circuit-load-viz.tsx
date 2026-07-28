"use client";

import { cn } from "@/lib/utils";

interface LightingCircuitLoadVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Lighting Circuit Load [VIZ].
 * totalW = n × W; amps = W ÷ V; util% = 100 × A ÷ breaker; 80% continuous cap.
 * Sample: 12 × 60 W · 120 V · 10 A → 720 W · 6.00 A · 60% · OK.
 */
export function LightingCircuitLoadViz({
  className,
}: LightingCircuitLoadVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--lighting-circuit-load", className)}
      aria-label="Lighting circuit load visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Fixture Sum · Breaker Margin</h3>
        <p className="tool-viz__subtitle">
          Luminaire watts aggregate on the branch, convert to amps at circuit
          voltage, then measure against breaker rating and the 80% continuous
          guideline.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg lighting-circuit-load-viz"
          role="img"
          aria-labelledby="lcl-viz-title lcl-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="lcl-viz-title">
            Lighting circuit load and breaker utilization diagram
          </title>
          <desc id="lcl-viz-desc">
            Fixture count times watts per fixture yields total circuit watts;
            dividing by voltage yields load amps compared to breaker rating and
            eighty percent continuous limit. Sample: twelve fixtures at sixty
            watts each on one hundred twenty volts with a ten amp breaker draw
            six amps, sixty percent utilization, within the eight amp continuous
            cap.
          </desc>

          <defs>
            <pattern
              id="lcl-viz-grid"
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
              id="lcl-viz-arrow"
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
              id="lcl-viz-pulse"
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
              id="lcl-viz-load"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="lcl-viz-util"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#lcl-viz-grid)"
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
            rx="4"
          />

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="150"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              FIXTURES
            </text>
            <text
              className="lcl-viz-n-value"
              x="56"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12
            </text>
          </g>

          <g>
            <rect
              x="206"
              y="40"
              width="150"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="222"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              WATTS EACH
            </text>
            <text
              className="lcl-viz-w-value"
              x="222"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60 W
            </text>
          </g>

          <g>
            <rect
              x="372"
              y="40"
              width="150"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CIRCUIT VOLTAGE
            </text>
            <text
              className="lcl-viz-v-value"
              x="388"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 V
            </text>
          </g>

          <g>
            <rect
              x="538"
              y="40"
              width="142"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="554"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BREAKER
            </text>
            <text
              className="lcl-viz-bkr-value"
              x="554"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 A
            </text>
          </g>

          {/* Flow inputs → path */}
          <path
            d="M 115 132 L 115 160 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lcl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 115 132 L 115 160 L 360 160"
            fill="none"
            stroke="url(#lcl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 281 132 L 281 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 281 132 L 281 160"
            fill="none"
            stroke="url(#lcl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 447 132 L 447 160 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            d="M 609 132 L 609 160 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: Fixtures → breaker —— */}
          <g>
            <rect
              x="40"
              y="180"
              width="640"
              height="216"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="206"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BRANCH SUM · A = W ÷ V · COMPARE TO 80% OF BREAKER
            </text>

            {/* Fixture row */}
            <g className="lcl-viz-fixtures" transform="translate(56, 228)">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i} transform={`translate(${i * 42}, 0)`}>
                  <path
                    d="M 10 0 L 22 0 L 26 12 L 6 12 Z"
                    fill="none"
                    stroke="#444444"
                    strokeWidth="1.25"
                  />
                  <circle
                    className="lcl-viz-bulb"
                    cx="16"
                    cy="24"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <line
                    x1="16"
                    y1="34"
                    x2="16"
                    y2="44"
                    stroke="#444444"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <text
                x="120"
                y="64"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                ×12 fixtures · 60 W
              </text>
            </g>

            {/* Current bus */}
            <path
              d="M 56 310 L 280 310"
              fill="none"
              stroke="#444444"
              strokeWidth="2"
            />
            <path
              className="lcl-viz-current-flow"
              d="M 56 310 L 280 310"
              fill="none"
              stroke="url(#lcl-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              className="lcl-viz-total-w"
              x="168"
              y="300"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              720 W total
            </text>

            {/* Panel / breaker */}
            <g className="lcl-viz-breaker" transform="translate(300, 248)">
              <rect
                x="0"
                y="0"
                width="88"
                height="100"
                rx="3"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <rect
                x="16"
                y="16"
                width="56"
                height="28"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <line
                className="lcl-viz-toggle"
                x1="28"
                y1="30"
                x2="60"
                y2="30"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x="44"
                y="68"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                10 A
              </text>
              <text
                x="44"
                y="86"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                breaker
              </text>
            </g>

            {/* Gauge / thresholds */}
            <g transform="translate(420, 248)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                UTILIZATION vs 80% CAP
              </text>
              <rect
                x="0"
                y="16"
                width="220"
                height="14"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              {/* 60% of 220 = 132 */}
              <rect
                className="lcl-viz-util-bar"
                x="0"
                y="16"
                width="132"
                height="14"
                rx="2"
                fill="url(#lcl-viz-util)"
              />
              {/* 80% mark at 176 */}
              <line
                x1="176"
                y1="12"
                x2="176"
                y2="38"
                stroke="#888888"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x="176"
                y="52"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                80% · 8 A
              </text>
              <text
                className="lcl-viz-util-chip"
                x="0"
                y="72"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                60% · 6.00 A
              </text>
              <text
                className="lcl-viz-head-chip"
                x="0"
                y="96"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
              >
                +2.00 A headroom to continuous
              </text>
            </g>

            <rect
              x="56"
              y="348"
              width="240"
              height="28"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="lcl-viz-math-value"
              x="176"
              y="367"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              720 W ÷ 120 V = 6.00 A
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lcl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#lcl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lcl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#lcl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Load amps —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CIRCUIT LOAD
            </text>
            <text
              className="lcl-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6.00 A
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              720 W on 120 V
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="lcl-viz-load-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#lcl-viz-load)"
            />
            <text
              className="lcl-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              status · OK under 80%
            </text>
          </g>

          {/* —— OUTPUT: Utilization —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BREAKER CAPACITY
            </text>
            <text
              className="lcl-viz-pct-out"
              x="716"
              y="318"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60.0%
            </text>
            <rect
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="lcl-viz-pct-bar"
              x="716"
              y="336"
              width="103"
              height="10"
              rx="2"
              fill="url(#lcl-viz-util)"
            />
            <text
              className="lcl-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              of 10 A · cap 8.0 A
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAFETY LADDER · CONTINUOUS LOAD GUIDELINE
            </text>

            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="lcl-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="lcl-viz-tick"
              cx="360"
              cy="478"
              r="5"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="lcl-viz-tick"
              cx="560"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="lcl-viz-tick lcl-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="lcl-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#lcl-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              0 A · empty branch
            </text>
            <text
              x="360"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              6 A · this design
            </text>
            <text
              x="560"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              8 A · 80% limit
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              10 A · trip rating
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

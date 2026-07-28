"use client";

import { cn } from "@/lib/utils";

interface EscooterPeakAmpsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Peak Discharge Amps [VIZ].
 * Peak W = V × I; max pack A = Ah × C; check vs controller & pack.
 * Sample: 48 V · 65 A · 70 A ctrl · 13 Ah · 5C → 3,120 W · 65 A max · OK.
 */
export function EscooterPeakAmpsViz({ className }: EscooterPeakAmpsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-peak-amps", className)}
      aria-label="E-scooter peak discharge amps visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Peak Burst · Pack C-Limit</h3>
        <p className="tool-viz__subtitle">
          Hard acceleration multiplies pack volts by peak amps — then check that
          burst against controller phase limit and Ah × continuous C-rating.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-peak-amps-viz"
          role="img"
          aria-labelledby="espa-viz-title espa-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="espa-viz-title">
            E-scooter peak discharge amps and pack C-rate diagram
          </title>
          <desc id="espa-viz-desc">
            Battery voltage times peak draw yields peak watts; pack amp-hours
            times C-rating sets max pack amps. Sample: 48 volts at 65 amps peak
            with a 70 amp controller and a 13 amp-hour 5C pack delivers 3,120
            watts and stays within both controller and pack limits at 65 amps
            max.
          </desc>

          <defs>
            <pattern
              id="espa-viz-grid"
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
              id="espa-viz-arrow"
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
              id="espa-viz-pulse"
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
              id="espa-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="espa-viz-surge"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.5" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#espa-viz-grid)"
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
              x="36"
              y="36"
              width="200"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="58"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY VOLTAGE
            </text>
            <text
              className="espa-viz-v-value"
              x="52"
              y="88"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>

            <rect
              x="36"
              y="120"
              width="200"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="142"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK DRAW
            </text>
            <text
              className="espa-viz-a-value"
              x="52"
              y="172"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              65 A
            </text>

            <rect
              x="36"
              y="204"
              width="200"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="226"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONTROLLER LIMIT
            </text>
            <text
              className="espa-viz-ctrl-value"
              x="52"
              y="256"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              70 A
            </text>

            <rect
              x="36"
              y="288"
              width="200"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="310"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PACK · C-RATING
            </text>
            <text
              className="espa-viz-pack-value"
              x="52"
              y="340"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              13 Ah · 5C
            </text>
            <text
              x="52"
              y="362"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              65 A ÷ 13 Ah = 5C
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 72 L 300 72 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#espa-viz-arrow)"
            />
            <path
              className="espa-viz-timeline-pulse"
              d="M 236 72 L 300 72 L 300 140"
              fill="none"
              stroke="url(#espa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 156 L 280 156 L 280 180 L 300 180"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="espa-viz-surge-pulse"
              d="M 236 156 L 280 156 L 280 180 L 300 180"
              fill="none"
              stroke="url(#espa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 236 332 L 288 332 L 288 260 L 300 260"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#espa-viz-arrow)"
            />
            <path
              className="espa-viz-surge-pulse"
              d="M 236 332 L 288 332 L 288 260 L 300 260"
              fill="none"
              stroke="url(#espa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.45s" }}
            />
          </g>

          {/* —— CENTER: DISCHARGE PATH —— */}
          <g>
            <rect
              x="300"
              y="48"
              width="340"
              height="360"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="320"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BURST DISCHARGE PATH
            </text>

            {/* Pack → motor with surge */}
            <g className="espa-viz-batt-node">
              <rect
                x="320"
                y="92"
                width="100"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="370"
                y="114"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                PACK
              </text>
              <text
                className="espa-viz-batt-chip"
                x="370"
                y="134"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                48 V
              </text>
            </g>

            <path
              d="M 420 120 L 500 120"
              fill="none"
              stroke="#555555"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              className="espa-viz-surge-pulse"
              d="M 420 120 L 500 120"
              fill="none"
              stroke="url(#espa-viz-surge)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text
              className="espa-viz-burst-chip"
              x="460"
              y="108"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              65 A PEAK
            </text>

            <g className="espa-viz-motor-node">
              <rect
                x="500"
                y="92"
                width="120"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="530"
                cy="120"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 530 106 L 530 134 M 516 120 L 544 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                className="espa-viz-motor-chip"
                x="575"
                y="124"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                HUB
              </text>
            </g>

            {/* P = V × I */}
            <text
              x="320"
              y="180"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              P = V × I · PEAK POWER
            </text>
            <rect
              x="320"
              y="190"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="espa-viz-w-bar"
              x="320"
              y="190"
              width="300"
              height="14"
              rx="2"
              fill="url(#espa-viz-bar)"
            />
            <text
              className="espa-viz-w-chip"
              x="480"
              y="226"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 × 65 = 3,120 W
            </text>

            {/* Limits compare */}
            <text
              x="320"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              MAX PACK A · Ah × C
            </text>
            <rect
              x="320"
              y="268"
              width="300"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="espa-viz-pack-bar"
              x="320"
              y="268"
              width="279"
              height="12"
              rx="2"
              fill="url(#espa-viz-bar)"
            />
            <text
              className="espa-viz-max-chip"
              x="480"
              y="302"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              13 × 5 = 65.0 A
            </text>

            <rect
              x="320"
              y="320"
              width="140"
              height="40"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="espa-viz-ok-ctrl"
              x="390"
              y="345"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              CTRL OK ≤70 A
            </text>
            <rect
              x="480"
              y="320"
              width="140"
              height="40"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="espa-viz-ok-pack"
              x="550"
              y="345"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              PACK OK ≤65 A
            </text>

            <text
              x="320"
              y="388"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              2C cells fail here · verify cell datasheet C
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#espa-viz-arrow)"
            />
            <path
              className="espa-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#espa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="110"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="696"
              y="74"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK POWER
            </text>
            <text
              className="espa-viz-output-value"
              x="696"
              y="120"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3,120
            </text>
            <text
              x="696"
              y="142"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              W burst
            </text>

            <rect
              x="680"
              y="174"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="200"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MAX PACK AMPS
            </text>
            <text
              className="espa-viz-max-out"
              x="696"
              y="228"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              65.0 A
            </text>

            <rect
              x="680"
              y="262"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="288"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HEADROOM
            </text>
            <text
              className="espa-viz-head-out"
              x="696"
              y="316"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Ctrl +5 A · Pack 0 A
            </text>

            <rect
              x="680"
              y="350"
              width="244"
              height="58"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="espa-viz-flags-out"
              x="802"
              y="376"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Within ctrl · Within pack
            </text>
            <text
              x="802"
              y="394"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              at 5C continuous rating
            </text>
          </g>

          {/* —— MATH STRIP —— */}
          <g>
            <rect
              x="36"
              y="420"
              width="888"
              height="52"
              rx="4"
              fill="#0d0d0d"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="espa-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              48 V × 65 A = 3,120 W · max pack = 13 Ah × 5C = 65 A · peak ≤ both
            </text>
          </g>

          <path
            className="espa-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#espa-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="56"
            y="528"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            heat accumulates on repeated launches · leave C-rate margin
          </text>
          <text
            className="espa-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            required ≈ 5C
          </text>
        </svg>
      </div>
    </section>
  );
}

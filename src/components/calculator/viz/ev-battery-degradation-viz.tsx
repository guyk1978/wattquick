"use client";

import { cn } from "@/lib/utils";

interface EvBatteryDegradationVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Battery Health & Degradation [VIZ].
 * SoH ≈ 100 − (calendar + mileage + DCFC factors).
 * Sample: 3 yr · 45,000 mi · rarely → 92.5% SoH (Excellent).
 */
export function EvBatteryDegradationViz({
  className,
}: EvBatteryDegradationVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-battery-degradation", className)}
      aria-label="EV battery health and degradation visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Battery Health</h3>
        <p className="tool-viz__subtitle">
          Calendar years and miles chip away at lithium-ion capacity — state of
          health is what remains versus a new pack.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-battery-degradation-viz"
          role="img"
          aria-labelledby="ebd-viz-title ebd-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebd-viz-title">
            EV battery health and degradation animated diagram
          </title>
          <desc id="ebd-viz-desc">
            Vehicle age, total mileage, and DC fast-charging habits reduce
            state of health from 100 percent. Sample: 3 years and 45,000 miles
            with rare fast charging estimates 92.5 percent SoH.
          </desc>

          <defs>
            <pattern
              id="ebd-viz-grid"
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
              id="ebd-viz-arrow"
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
              id="ebd-viz-pulse"
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
              id="ebd-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ebd-viz-soh"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebd-viz-grid)"
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
            AGING CURVE
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

          {/* —— INPUT: Age —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="96"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VEHICLE AGE
            </text>
            <text
              className="ebd-viz-age-value"
              x="56"
              y="140"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 yr
            </text>
            <text
              x="140"
              y="140"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              calendar
            </text>
          </g>

          {/* —— INPUT: Mileage —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="212"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TOTAL MILEAGE
            </text>
            <text
              className="ebd-viz-mi-value"
              x="56"
              y="256"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              45,000 mi
            </text>
          </g>

          {/* —— INPUT: DCFC —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DC FAST CHARGING
            </text>
            <text
              className="ebd-viz-dcfc-value"
              x="56"
              y="362"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Rarely
            </text>
            <text
              x="140"
              y="362"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              road trips
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#ebd-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#ebd-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 348 L 320 348"
            fill="none"
            stroke="url(#ebd-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebd-viz-arrow)"
          />

          {/* —— CENTER: Aging curve + pack —— */}
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
              CAPACITY FADE
            </text>

            {/* Pack SoH fill */}
            <g transform="translate(350, 118)">
              <rect
                className="ebd-viz-pack"
                x="0"
                y="0"
                width="100"
                height="120"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="36"
                y="-8"
                width="28"
                height="10"
                rx="2"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              {/* Fill from bottom ~92.5% of inner height */}
              <rect
                className="ebd-viz-soh-fill"
                x="8"
                y="16"
                width="84"
                height="96"
                rx="2"
                fill="url(#ebd-viz-soh)"
              />
              <text
                className="ebd-viz-pack-label"
                x="50"
                y="72"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                92.5%
              </text>
            </g>

            {/* Aging curve plot */}
            <g transform="translate(470, 118)">
              <rect
                x="0"
                y="0"
                width="170"
                height="120"
                rx="2"
                fill="#0a0a0a"
                stroke="#333333"
              />
              {/* Axes */}
              <line
                x1="16"
                y1="100"
                x2="154"
                y2="100"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                x1="16"
                y1="100"
                x2="16"
                y2="16"
                stroke="#444444"
                strokeWidth="1"
              />
              {/* 100% guide */}
              <line
                x1="16"
                y1="24"
                x2="154"
                y2="24"
                stroke="#333333"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x="20"
                y="20"
                fill="#666666"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
              >
                100%
              </text>
              {/* Aging curve: start high, gentle decline to ~92.5 */}
              <path
                className="ebd-viz-curve"
                d="M 16 24 Q 60 28 90 36 T 140 42"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                className="ebd-viz-curve-dot"
                cx="140"
                cy="42"
                r="4"
                fill="currentColor"
              />
              <text
                x="85"
                y="114"
                textAnchor="middle"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                years · miles
              </text>
            </g>

            {/* Loss chips */}
            <g transform="translate(340, 268)">
              <rect
                x="0"
                y="0"
                width="90"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="10"
                y="18"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                AGE
              </text>
              <text
                className="ebd-viz-loss-age"
                x="10"
                y="36"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −5.5%
              </text>
            </g>
            <g transform="translate(440, 268)">
              <rect
                x="0"
                y="0"
                width="90"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="10"
                y="18"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                MILES
              </text>
              <text
                className="ebd-viz-loss-mi"
                x="10"
                y="36"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −1.5%
              </text>
            </g>
            <g transform="translate(540, 268)">
              <rect
                x="0"
                y="0"
                width="100"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="10"
                y="18"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                DCFC
              </text>
              <text
                className="ebd-viz-loss-dcfc"
                x="10"
                y="36"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −0.5%
              </text>
            </g>

            <text
              className="ebd-viz-math-value"
              x="340"
              y="348"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 − 7.5 = 92.5% SoH
            </text>
            <rect
              x="340"
              y="362"
              width="280"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebd-viz-scale-bar"
              x="342"
              y="364"
              width="250"
              height="6"
              rx="1"
              fill="url(#ebd-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebd-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebd-viz-arrow)"
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
              STATE OF HEALTH
            </text>
            <text
              className="ebd-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              92.5
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              % SoH
            </text>

            <rect
              x="720"
              y="202"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebd-viz-output-bar"
              x="722"
              y="204"
              width="160"
              height="8"
              rx="1"
              fill="url(#ebd-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              STATUS
            </text>
            <text
              className="ebd-viz-status-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Excellent
            </text>
            <text
              className="ebd-viz-detail-value"
              x="720"
              y="310"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 yr · 45k mi
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              planning estimate
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
              SoH = 100 − age − miles − DCFC
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
              3 yr · 45k mi · rare → 92.5%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

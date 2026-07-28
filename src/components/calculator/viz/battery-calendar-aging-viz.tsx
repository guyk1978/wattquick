"use client";

import { cn } from "@/lib/utils";

interface BatteryCalendarAgingVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Calendar Aging [VIZ].
 * Base ~2%/yr @ 25 °C · 50% SOC; scales with tempFactor × socFactor × years.
 * Sample: 25 °C · 60% SOC · 3 yr → 6.5% loss · 93.5% SoH · 2.18%/yr.
 */
export function BatteryCalendarAgingViz({
  className,
}: BatteryCalendarAgingVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-calendar-aging", className)}
      aria-label="Battery calendar aging visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Calendar Fade · Storage SoH</h3>
        <p className="tool-viz__subtitle">
          Idle heat and high average SOC accelerate side reactions — capacity
          slips away even with zero cycles.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-calendar-aging-viz"
          role="img"
          aria-labelledby="bca-viz-title bca-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bca-viz-title">
            Battery calendar aging animated degradation diagram
          </title>
          <desc id="bca-viz-desc">
            Storage temperature, average state of charge, and pack age drive
            calendar capacity loss and remaining state of health. Sample: three
            years at 25 degrees Celsius and 60 percent SOC yields about 6.5
            percent calendar loss and 93.5 percent remaining SoH.
          </desc>

          <defs>
            <pattern
              id="bca-viz-grid"
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
              id="bca-viz-arrow"
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
              id="bca-viz-pulse"
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
              id="bca-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bca-viz-soh"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient
              id="bca-viz-fade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bca-viz-grid)"
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
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              STORAGE TEMP
            </text>
            <text
              className="bca-viz-temp-value"
              x="56"
              y="110"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25°C
            </text>

            <rect
              x="40"
              y="152"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AVG CHARGE (SoC)
            </text>
            <text
              className="bca-viz-soc-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60%
            </text>

            <rect
              x="40"
              y="252"
              width="220"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PACK AGE
            </text>
            <text
              className="bca-viz-age-value"
              x="56"
              y="320"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 years
            </text>
            <text
              x="56"
              y="344"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              calendar-only · no cycles
            </text>
          </g>

          {/* Flow → aging path */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bca-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#bca-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 196 L 290 196 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bca-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 196 L 290 196 L 290 140 L 310 140"
            fill="none"
            stroke="url(#bca-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bca-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="url(#bca-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Degradation path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHEMICAL AGING PATH
            </text>

            {/* Factor chips */}
            <rect
              x="336"
              y="84"
              width="140"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="352"
              y="104"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              TEMP FACTOR
            </text>
            <text
              className="bca-viz-tf-chip"
              x="352"
              y="122"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×1.00
            </text>

            <rect
              x="492"
              y="84"
              width="148"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="508"
              y="104"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              SOC FACTOR
            </text>
            <text
              className="bca-viz-sf-chip"
              x="508"
              y="122"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×1.09
            </text>

            <text
              className="bca-viz-math-value"
              x="336"
              y="160"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2%/yr × 1.00 × 1.09 = 2.18%/yr
            </text>

            {/* Fade curve over years */}
            <line
              x1="360"
              y1="280"
              x2="640"
              y2="280"
              stroke="#333333"
              strokeWidth="1"
            />
            <line
              x1="360"
              y1="280"
              x2="360"
              y2="180"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="360"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 0
            </text>
            <text
              x="500"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 3
            </text>
            <text
              x="620"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 5
            </text>
            <text
              x="336"
              y="188"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              SoH
            </text>

            {/* SoH decline curve: 100 → 93.5 at yr3 → ~89 at yr5 */}
            <path
              className="bca-viz-curve"
              d="M 360 190 C 420 192, 480 200, 500 208 C 560 220, 600 232, 640 244"
              fill="none"
              stroke="url(#bca-viz-fade)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className="bca-viz-curve-pulse"
              d="M 360 190 C 420 192, 480 200, 500 208 C 560 220, 600 232, 640 244"
              fill="none"
              stroke="url(#bca-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              className="bca-viz-op-point"
              cx="500"
              cy="208"
              r="6"
              fill="currentColor"
            />
            <text
              className="bca-viz-op-chip"
              x="510"
              y="200"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              93.5%
            </text>

            {/* Pack SoH fill */}
            <rect
              className="bca-viz-pack"
              x="400"
              y="312"
              width="180"
              height="32"
              rx="4"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              className="bca-viz-soh-fill"
              x="408"
              y="318"
              width="150"
              height="20"
              rx="2"
              fill="url(#bca-viz-soh)"
            />
            <text
              className="bca-viz-loss-chip"
              x="490"
              y="333"
              textAnchor="middle"
              fill="#0a0a0a"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              −6.5% fade
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bca-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#bca-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bca-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#bca-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: SoH —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              REMAINING SoH
            </text>
            <text
              className="bca-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              93.5%
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              excellent storage profile
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bca-viz-soh-bar"
              x="726"
              y="168"
              width="151"
              height="12"
              rx="2"
              fill="url(#bca-viz-bar)"
            />
            <text
              className="bca-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              healthy · ≥85%
            </text>
          </g>

          {/* —— OUTPUT: Loss —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CALENDAR LOSS
            </text>
            <text
              className="bca-viz-loss-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6.5%
            </text>
            <rect
              x="726"
              y="324"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bca-viz-loss-bar"
              x="726"
              y="324"
              width="42"
              height="10"
              rx="2"
              fill="#555555"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              2.18%/yr · SEI / oxidation
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOT + HIGH SoC · FASTER FADE · IDEAL ~50% SoC · 15–25°C
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              cool/low
            </text>
            <rect
              x="128"
              y="442"
              width="480"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bca-viz-stress-bar"
              x="128"
              y="442"
              width="120"
              height="14"
              rx="2"
              fill="url(#bca-viz-bar)"
            />
            <text
              x="160"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              mild
            </text>
            <text
              x="628"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              hot/100% SoC
            </text>

            <path
              className="bca-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#bca-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~2× rate per +10°C above 25°C
            </text>
            <text
              className="bca-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              93.5% SoH · −6.5% · 2.18%/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface EscooterHillClimbVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Hill Climb [VIZ] tab.
 * P_eff = P_nom × (SOC/100) × voltage efficiency → max climb grade %.
 * Sample: 48 V · 40% SOC · 500 W · 90 kg → ~7.0% grade (vs ~19.5% nominal).
 */
export function EscooterHillClimbViz({ className }: EscooterHillClimbVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-hill-climb", className)}
      aria-label="E-scooter hill climb visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Scooter Hill Climb Grade</h3>
        <p className="tool-viz__subtitle">
          Low SOC and pack voltage sag cut effective motor watts — the same
          scooter that clears a grade at full charge may stall mid-climb.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-hill-climb-viz"
          role="img"
          aria-labelledby="eshc-viz-title eshc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="eshc-viz-title">
            E-scooter hill climb animated flow diagram
          </title>
          <desc id="eshc-viz-desc">
            Nominal voltage, state of charge, motor watts, and total mass feed
            an incline-torque path where voltage sag reduces effective power and
            maximum climb grade. Sample: a 48 volt pack at 40 percent SOC with a
            500 watt motor and 90 kilogram total mass yields about 7 percent
            grade versus 19.5 percent at full nominal power.
          </desc>

          <defs>
            <pattern
              id="eshc-viz-grid"
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
              id="eshc-viz-arrow"
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
              id="eshc-viz-pulse"
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
              id="eshc-viz-soc"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="eshc-viz-grade"
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
            fill="url(#eshc-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            SAG · TORQUE PATH
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

          {/* —— INPUT: Voltage + SOC —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="160"
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
              VOLTAGE · SOC
            </text>
            <text
              x="56"
              y="136"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V · 40%
            </text>
            <rect
              x="56"
              y="156"
              width="198"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="eshc-viz-soc-bar"
              x="58"
              y="158"
              width="78"
              height="6"
              rx="1"
              fill="url(#eshc-viz-soc)"
            />
            <text
              x="56"
              y="196"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              sag ×1.33 under load
            </text>
            <text
              x="56"
              y="216"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~4 V effective sag
            </text>
          </g>

          {/* —— INPUT: Motor / mass —— */}
          <g>
            <rect
              x="40"
              y="250"
              width="230"
              height="178"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MOTOR · MASS
            </text>
            <text
              x="56"
              y="314"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 W
            </text>
            <text
              x="56"
              y="342"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              90 kg all-in · 8 km/h crawl
            </text>
            <text
              x="56"
              y="370"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              η_motor 75%
            </text>
            <text
              x="56"
              y="400"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              P = m·g·sin(θ)·v
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 152 L 320 152"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eshc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 152 L 320 152"
            fill="none"
            stroke="url(#eshc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 340 L 300 340 L 300 210 L 320 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eshc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 340 L 300 340 L 300 210 L 320 210"
            fill="none"
            stroke="url(#eshc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Effective power / sag —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="168"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EFFECTIVE POWER
            </text>
            <text
              x="346"
              y="126"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              P_nom × SOC × V_eff
            </text>
            <text
              x="346"
              y="166"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eshc-viz-power-value"
            >
              183 W
            </text>
            <text
              x="346"
              y="194"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              from 500 W rated · 37% avail
            </text>
            <rect
              x="346"
              y="210"
              width="198"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="eshc-viz-power-bar"
              x="348"
              y="212"
              width="72"
              height="6"
              rx="1"
              fill="url(#eshc-viz-grade)"
            />
          </g>

          {/* —— FLOW: Incline schematic —— */}
          <g>
            <rect
              x="330"
              y="258"
              width="300"
              height="170"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="284"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INCLINE · TORQUE
            </text>

            {/* Slope triangle */}
            <g transform="translate(360, 310)">
              <path
                d="M 0 90 L 220 90 L 220 20 Z"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="eshc-viz-slope"
                d="M 0 90 L 220 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Scooter on slope */}
              <g className="eshc-viz-scooter" transform="translate(95, 42)">
                <circle cx="0" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="28" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M 0 18 L 28 10 M 28 10 L 34 -6"
                  fill="none"
                  stroke="#ededed"
                  strokeWidth="1.25"
                />
              </g>
              <text
                x="175"
                y="78"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                θ
              </text>
              <path
                className="eshc-viz-force"
                d="M 130 55 L 130 78"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                markerEnd="url(#eshc-viz-arrow)"
              />
            </g>
            <text
              x="346"
              y="412"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              torque drop ≈ 63%
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 156 L 680 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eshc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 156 L 680 156"
            fill="none"
            stroke="url(#eshc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 343 L 655 343 L 655 250 L 680 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eshc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 343 L 655 343 L 655 250 L 680 250"
            fill="none"
            stroke="url(#eshc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MAX CLIMB GRADE
            </text>
            <text
              x="706"
              y="160"
              fill="#ededed"
              fontSize="48"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eshc-viz-output-value"
            >
              7.0%
            </text>
            <text
              x="706"
              y="192"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              at 40% SOC · 48 V
            </text>

            <rect
              x="706"
              y="216"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="eshc-viz-grade-bar"
              x="708"
              y="218"
              width="56"
              height="8"
              rx="1"
              fill="url(#eshc-viz-grade)"
            />

            <text
              x="706"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              FULL POWER REF
            </text>
            <text
              x="706"
              y="298"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              19.5%
            </text>
            <text
              x="706"
              y="326"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              nominal · no sag
            </text>

            <rect
              x="706"
              y="348"
              width="198"
              height="8"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="eshc-viz-ref-bar"
              x="708"
              y="350"
              width="156"
              height="4"
              rx="1"
              fill="#555555"
            />

            <text
              x="706"
              y="400"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eshc-viz-output-value"
            >
              −12.5 pt grade loss
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
              SOC × V_eff → P_eff → sin(θ) → grade %
            </text>
            <text
              x="500"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="500"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              48 V · 40% · 500 W · 90 kg → 7.0%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

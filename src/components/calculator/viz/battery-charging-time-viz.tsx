"use client";

import { cn } from "@/lib/utils";

interface BatteryChargingTimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Charging Time [VIZ] tab.
 * Capacity mAh ÷ charger mA ÷ (efficiency/100) → charge duration.
 * Sample: 5000 ÷ 2000 ÷ 0.90 ≈ 2h 47m.
 */
export function BatteryChargingTimeViz({
  className,
}: BatteryChargingTimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-charging-time", className)}
      aria-label="Battery charging time visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Charging Time</h3>
        <p className="tool-viz__subtitle">
          Charger current fills pack capacity; efficiency accounts for heat and
          taper so estimated time matches real charge cycles.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-charging-time-viz"
          role="img"
          aria-labelledby="bct-viz-title bct-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bct-viz-title">
            Battery charging time animated flow diagram
          </title>
          <desc id="bct-viz-desc">
            Battery capacity in milliamp-hours divides by charger current in
            milliamps, then adjusts for charge efficiency to estimate total
            charging duration. Sample: 5000 mAh at 2000 mA with 90 percent
            efficiency is about 2 hours 47 minutes.
          </desc>

          <defs>
            <pattern
              id="bct-viz-grid"
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
              id="bct-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="bct-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="bct-viz-fill"
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
            fill="url(#bct-viz-grid)"
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
            CHARGE FLOW
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

          {/* —— INPUT: Capacity —— */}
          <g>
            <rect
              x="40"
              y="80"
              width="240"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="108"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY CAPACITY
            </text>
            <g transform="translate(56, 124)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="30" height="46" rx="2" strokeWidth="1.3" />
              <rect
                x="8"
                y="3"
                width="14"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="bct-viz-battery-fill"
                x="4"
                y="30"
                width="22"
                height="20"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.75"
                stroke="none"
              />
            </g>
            <text
              x="102"
              y="156"
              fill="#a3e635"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5000 mAh
            </text>
            <text
              x="102"
              y="182"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              empty → full target
            </text>
          </g>

          {/* —— INPUT: Charger current —— */}
          <g>
            <rect
              x="40"
              y="230"
              width="240"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHARGER CURRENT
            </text>
            <g
              transform="translate(56, 276)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <rect x="2" y="8" width="28" height="36" rx="2" />
              <path d="M10 8 V2 M22 8 V2" />
              <path
                d="M20 16 L12 30 H18 L14 42 L26 24 H20 Z"
                className="bct-viz-bolt"
                fill="#a3e635"
                fillOpacity="0.4"
                strokeLinejoin="round"
              />
            </g>
            <text
              x="102"
              y="306"
              fill="#a3e635"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2000 mA
            </text>
            <text
              x="102"
              y="332"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              constant-current phase
            </text>
          </g>

          {/* —— INPUT: Efficiency —— */}
          <g>
            <rect
              x="40"
              y="380"
              width="240"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="408"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHARGE EFFICIENCY
            </text>
            <text
              x="56"
              y="444"
              fill="#a3e635"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
            <text
              x="130"
              y="444"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              heat + taper loss
            </text>
          </g>

          {/* Flow inputs → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#bct-viz-arrow)"
          >
            <path d="M 280 145 H 330 V 180 H 360" />
            <path d="M 280 295 H 330 V 250 H 360" />
            <path d="M 280 430 H 330 V 340 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#bct-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 145 H 330 V 180 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 295 H 330 V 250 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.7s" }}
              d="M 280 430 H 330 V 340 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="360"
              y="80"
              width="260"
              height="400"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="110"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CAPACITY ÷ CURRENT ÷ EFF
            </text>

            {/* Charger → battery schematic */}
            <g transform="translate(392, 130)">
              {/* Charger brick */}
              <rect
                x="0"
                y="20"
                width="56"
                height="40"
                rx="3"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.3"
              />
              <text
                x="28"
                y="45"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                CHG
              </text>
              {/* Cable */}
              <path
                d="M 56 40 H 90"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 56 40 H 90"
                fill="none"
                stroke="url(#bct-viz-pulse)"
                strokeWidth="2.5"
                pathLength="100"
              />
              {/* Pack */}
              <rect
                x="90"
                y="8"
                width="70"
                height="64"
                rx="4"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.4"
              />
              <rect
                x="112"
                y="2"
                width="26"
                height="8"
                rx="1"
                fill="#333333"
              />
              <rect
                className="bct-viz-pack-fill"
                x="96"
                y="16"
                width="58"
                height="48"
                rx="2"
                fill="#a3e635"
                fillOpacity="0.55"
              />
            </g>

            {/* Formula steps */}
            <rect
              x="376"
              y="220"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="242"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · BASE TIME
            </text>
            <text
              x="388"
              y="268"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              5000 mAh ÷ 2000 mA = 2.5 h
            </text>

            <rect
              x="376"
              y="300"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="322"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · EFFICIENCY
            </text>
            <text
              x="388"
              y="348"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              2.5 h ÷ 0.90 = 2.78 h
            </text>

            {/* Fill progress bar */}
            <text
              x="376"
              y="396"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PACK FILL
            </text>
            <rect
              x="376"
              y="408"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="bct-viz-flow-bar"
              x="378"
              y="410"
              width="224"
              height="12"
              rx="1"
              fill="url(#bct-viz-fill)"
            />

            <text
              x="490"
              y="456"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              time = (mAh ÷ mA) ÷ (eff / 100)
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#bct-viz-arrow)"
          >
            <path d="M 620 280 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#bct-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 280 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="150"
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
              y="182"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EST. CHARGE TIME
            </text>

            <g
              transform="translate(786, 208)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.4"
            >
              <circle cx="24" cy="24" r="22" />
              <g className="bct-viz-clock-hand">
                <line
                  x1="24"
                  y1="24"
                  x2="24"
                  y2="10"
                  stroke="#a3e635"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <line x1="24" y1="24" x2="34" y2="28" strokeLinecap="round" />
            </g>

            <text
              x="810"
              y="290"
              fill="#a3e635"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="bct-viz-output-value"
            >
              2h 47m
            </text>
            <text
              x="810"
              y="318"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              at 2000 mA · 90% eff
            </text>
            <text
              x="810"
              y="350"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              5000 mAh pack capacity
            </text>
            <text
              x="810"
              y="368"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              includes heat &amp; taper
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Charge time = (capacity ÷ current) ÷ (efficiency ÷ 100) · taper above
            ~80% SoC stretches the last phase
          </text>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface BatteryRuntimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Runtime [VIZ] tab.
 * mAh × V → Wh ÷ load W → estimated runtime.
 * Sample: 5000 mAh × 3.7 V = 18.5 Wh; ÷ 10 W ≈ 1h 51m.
 */
export function BatteryRuntimeViz({ className }: BatteryRuntimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-runtime", className)}
      aria-label="Battery runtime visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Runtime</h3>
        <p className="tool-viz__subtitle">
          Capacity and voltage convert to watt-hours, then discharge through the
          load to estimate how long the pack lasts.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-runtime-viz"
          role="img"
          aria-labelledby="br-viz-title br-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="br-viz-title">Battery runtime animated flow diagram</title>
          <desc id="br-viz-desc">
            Battery capacity in milliamp-hours and nominal voltage convert to
            watt-hours, then divide by connected load power in watts to estimate
            runtime. Sample: 5000 mAh at 3.7 V is 18.5 Wh; at 10 W about 1 hour
            51 minutes.
          </desc>

          <defs>
            <pattern
              id="br-viz-grid"
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
              id="br-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="br-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="br-viz-drain"
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
            fill="url(#br-viz-grid)"
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

          {/* Column labels */}
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
            ENERGY → TIME
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
              y="72"
              width="240"
              height="118"
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
              BATTERY CAPACITY
            </text>
            <g transform="translate(56, 112)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="28" height="42" rx="2" strokeWidth="1.3" />
              <rect
                x="7"
                y="3"
                width="14"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="br-viz-battery-fill"
                x="4"
                y="18"
                width="20"
                height="28"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.88"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5000 mAh
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack rating
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="240"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="232"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              NOMINAL VOLTAGE
            </text>
            <g
              transform="translate(56, 248)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <circle cx="14" cy="22" r="16" />
              <text
                x="14"
                y="27"
                fill="#a3e635"
                stroke="none"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                V
              </text>
            </g>
            <text
              x="100"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.7 V
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cell / pack nominal
            </text>
          </g>

          {/* —— INPUT: Power draw —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="240"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="366"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER DRAW
            </text>
            <g transform="translate(56, 382)" fill="none" stroke="#ededed">
              <rect x="0" y="6" width="28" height="36" rx="2" strokeWidth="1.3" />
              <path
                d="M18 10 L10 26 H16 L12 40 L24 20 H18 Z"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="br-viz-load-bolt"
                fill="#a3e635"
                fillOpacity="0.35"
              />
            </g>
            <text
              x="100"
              y="410"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 W
            </text>
            <text
              x="100"
              y="434"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous load
            </text>
          </g>

          {/* Flow: inputs → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#br-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#br-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 131 H 330 V 180 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 265 H 330 V 230 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.7s" }}
              d="M 280 399 H 330 V 320 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: Wh then ÷ load —— */}
          <g>
            <rect
              x="360"
              y="72"
              width="260"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              mAh × V → Wh ÷ LOAD
            </text>

            {/* Step 1: convert to Wh */}
            <rect
              x="376"
              y="120"
              width="228"
              height="88"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · ENERGY
            </text>
            <text
              x="388"
              y="168"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (5000 × 3.7) ÷ 1000
            </text>
            <text
              x="388"
              y="192"
              fill="#a3e635"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="br-viz-output-value"
            >
              = 18.5 Wh
            </text>

            {/* Step 2: divide by load */}
            <rect
              x="376"
              y="224"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="246"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · DISCHARGE
            </text>
            <text
              x="388"
              y="274"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              18.5 Wh ÷ 10 W
            </text>

            {/* Drain gauge */}
            <text
              x="376"
              y="326"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY DRAIN
            </text>
            <rect
              x="376"
              y="338"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="br-viz-drain-bar"
              x="378"
              y="340"
              width="224"
              height="12"
              rx="1"
              fill="url(#br-viz-drain)"
            />

            <text
              x="490"
              y="390"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              hours = Wh ÷ watts
            </text>
            <text
              x="490"
              y="414"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ideal · derate ~20% for real use
            </text>
            <text
              x="490"
              y="438"
              fill="#a3e635"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="br-viz-output-value"
            >
              1.85 h
            </text>
          </g>

          {/* Flow: process → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#br-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#br-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 265 H 700"
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
              ESTIMATED RUNTIME
            </text>

            {/* Clock glyph */}
            <g
              transform="translate(786, 198)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.4"
            >
              <circle cx="24" cy="24" r="22" />
              <g className="br-viz-clock-hand">
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
              y="280"
              fill="#a3e635"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="br-viz-output-value"
            >
              1h 51m
            </text>
            <text
              x="810"
              y="308"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              at 10 W continuous
            </text>
            <text
              x="810"
              y="340"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              from 18.5 Wh pack energy
            </text>
            <text
              x="810"
              y="362"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              5000 mAh · 3.7 V
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Runtime = (mAh × V ÷ 1000) ÷ W · heat, age &amp; Peukert reduce usable
            capacity
          </text>
        </svg>
      </div>
    </section>
  );
}

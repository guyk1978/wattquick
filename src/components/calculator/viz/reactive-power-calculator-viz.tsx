"use client";

import { cn } from "@/lib/utils";

interface ReactivePowerCalculatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Reactive Power & Power Factor [VIZ].
 * kW = kVA × PF; kVAR = kVA × sin(acos(PF)).
 * Sample: 12 kVA · 0.85 PF → 10.2 kW · 6.32 kVAR · φ 31.8°.
 */
export function ReactivePowerCalculatorViz({
  className,
}: ReactivePowerCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--reactive-power-calculator", className)}
      aria-label="Reactive power and power factor visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Power Triangle · kW / kVAR</h3>
        <p className="tool-viz__subtitle">
          Apparent power and power factor set the angle — resolve into real
          working kilowatts and reactive kilovars on the AC triangle.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg reactive-power-calculator-viz"
          role="img"
          aria-labelledby="rpc-viz-title rpc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="rpc-viz-title">
            Reactive power and power factor animated triangle diagram
          </title>
          <desc id="rpc-viz-desc">
            Apparent power in kVA and power factor resolve into real power in
            kilowatts and reactive power in kilovars. Sample: 12 kilovolt-amps
            at 0.85 power factor yields 10.2 kilowatts real, 6.32 kilovars
            reactive, and a phase angle of 31.8 degrees.
          </desc>

          <defs>
            <pattern
              id="rpc-viz-grid"
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
              id="rpc-viz-arrow"
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
              id="rpc-viz-pulse"
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
              id="rpc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="rpc-viz-fill"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#rpc-viz-grid)"
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

          {/* —— INPUT: kVA —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="160"
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
              APPARENT POWER
            </text>
            <text
              className="rpc-viz-kva-value"
              x="56"
              y="114"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 kVA
            </text>
            <text
              x="56"
              y="142"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              S · vector magnitude
            </text>
            <text
              x="56"
              y="164"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              motor · feeder · inverter
            </text>
            <text
              x="56"
              y="182"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              size conductors to S
            </text>
          </g>

          {/* —— INPUT: PF —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER FACTOR
            </text>
            <text
              className="rpc-viz-pf-value"
              x="56"
              y="292"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.85
            </text>
            <text
              x="56"
              y="320"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cos φ · 0–1
            </text>
            <text
              x="56"
              y="342"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              motors often 0.7–0.9
            </text>
          </g>

          {/* Flow → triangle */}
          <path
            d="M 260 120 L 310 120"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 120 L 310 120"
            fill="none"
            stroke="url(#rpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 180 L 310 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 290 L 290 290 L 290 180 L 310 180"
            fill="none"
            stroke="url(#rpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Power triangle —— */}
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
              AC POWER TRIANGLE
            </text>

            {/*
              Triangle geometry (origin bottom-left of triangle area):
              P (real) horizontal: length proportional to 10.2
              Q (reactive) vertical: length proportional to 6.32
              S hypotenuse: 12
              Scale: ~14 px per kVA unit → P=143, Q=88, S≈168
              Origin at (380, 280), P goes right, Q goes up
            */}
            <g transform="translate(380, 280)">
              {/* Fill */}
              <path
                className="rpc-viz-triangle-fill"
                d="M 0 0 L 143 0 L 143 -88 Z"
                fill="url(#rpc-viz-fill)"
              />
              {/* P leg (real) */}
              <line
                className="rpc-viz-p-leg"
                x1="0"
                y1="0"
                x2="143"
                y2="0"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Q leg (reactive) */}
              <line
                className="rpc-viz-q-leg"
                x1="143"
                y1="0"
                x2="143"
                y2="-88"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* S hypotenuse */}
              <line
                className="rpc-viz-s-hyp"
                x1="0"
                y1="0"
                x2="143"
                y2="-88"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Angle arc at origin */}
              <path
                className="rpc-viz-angle-arc"
                d="M 36 0 A 36 36 0 0 0 30.6 -18.9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <circle
                className="rpc-viz-vertex"
                cx="0"
                cy="0"
                r="4"
                fill="currentColor"
              />
              <circle
                className="rpc-viz-vertex"
                cx="143"
                cy="0"
                r="3"
                fill="#888888"
              />
              <circle
                className="rpc-viz-vertex"
                cx="143"
                cy="-88"
                r="3"
                fill="currentColor"
              />

              <text
                className="rpc-viz-p-label"
                x="72"
                y="20"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                P = 10.2 kW
              </text>
              <text
                className="rpc-viz-q-label"
                x="160"
                y="-40"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                Q = 6.32
              </text>
              <text
                className="rpc-viz-s-label"
                x="55"
                y="-55"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                S = 12 kVA
              </text>
              <text
                className="rpc-viz-phi-label"
                x="48"
                y="-8"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                φ 31.8°
              </text>
            </g>

            {/* Formula chip */}
            <rect
              x="348"
              y="300"
              width="284"
              height="40"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="rpc-viz-math-value"
              x="364"
              y="326"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              kW = 12 × 0.85 · Q = S·sin(φ)
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#rpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 260 L 680 260 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 260 L 680 260 L 680 280 L 700 280"
            fill="none"
            stroke="url(#rpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Reactive —— */}
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
              REACTIVE POWER
            </text>
            <text
              className="rpc-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6.32 kVAR
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Q · circulating / magnetizing
            </text>
            <rect
              x="726"
              y="160"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="rpc-viz-q-bar"
              x="726"
              y="160"
              width="100"
              height="12"
              rx="2"
              fill="url(#rpc-viz-bar)"
            />
            <text
              className="rpc-viz-detail-value"
              x="726"
              y="196"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~52.7% of S as Q
            </text>
          </g>

          {/* —— OUTPUT: Real —— */}
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
              REAL POWER
            </text>
            <text
              className="rpc-viz-kw-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10.2 kW
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
              className="rpc-viz-p-bar"
              x="726"
              y="324"
              width="138"
              height="10"
              rx="2"
              fill="url(#rpc-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              useful work · P = S × PF
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
              EFFICIENCY AT A GLANCE · PF DRIVES P vs Q
            </text>

            {/* PF scale */}
            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              PF 0.5
            </text>
            <rect
              x="120"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="rpc-viz-pf-bar"
              x="120"
              y="442"
              width="364"
              height="14"
              rx="2"
              fill="url(#rpc-viz-bar)"
            />
            <text
              x="500"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              0.85
            </text>
            <text
              x="652"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              PF 1.0
            </text>

            <path
              className="rpc-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#rpc-viz-pulse)"
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
              low PF → more kVAR overhead
            </text>
            <text
              className="rpc-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              10.2 kW · 6.32 kVAR · φ 31.8°
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

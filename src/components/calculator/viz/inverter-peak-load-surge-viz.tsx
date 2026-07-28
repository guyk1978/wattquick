"use client";

import { cn } from "@/lib/utils";

interface InverterPeakLoadSurgeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Inverter Peak Load & Surge [VIZ].
 * Continuous = Σ running; peak = cont + largest surge margin + 35% of second.
 * Sample: fridge 150×3 · AC 1,200×5 · pump 750×4 → 2,100 W cont · 7,688 W peak
 * → 5,000 W / 10,000 W recommended pure-sine tier.
 */
export function InverterPeakLoadSurgeViz({
  className,
}: InverterPeakLoadSurgeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--inverter-peak-load-surge", className)}
      aria-label="Inverter peak load and surge visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Peak Load · Motor Surge</h3>
        <p className="tool-viz__subtitle">
          Running watts stack into continuous demand; the largest motor start
          margins set peak surge — then snap to a pure-sine inverter tier.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg inverter-peak-load-surge-viz"
          role="img"
          aria-labelledby="ipls-viz-title ipls-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ipls-viz-title">
            Inverter peak load and surge animated sizing diagram
          </title>
          <desc id="ipls-viz-desc">
            Appliance running watts sum to continuous load. Peak watts add the
            largest motor surge margin plus thirty-five percent of the second
            largest. Sample: refrigerator 150 watts at 3x, air conditioner
            1,200 watts at 5x, and water pump 750 watts at 4x yield 2,100 watts
            continuous, 7,688 watts peak, recommending a 5,000 watt continuous
            and 10,000 watt surge inverter.
          </desc>

          <defs>
            <pattern
              id="ipls-viz-grid"
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
              id="ipls-viz-arrow"
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
              id="ipls-viz-pulse"
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
              id="ipls-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ipls-viz-surge"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ipls-viz-grid)"
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

          {/* —— INPUT: Loads —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="240"
              height="320"
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
              APPLIANCE LOADS
            </text>

            {/* Load 1 fridge */}
            <rect
              className="ipls-viz-load"
              x="56"
              y="84"
              width="208"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="68"
              y="106"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              FRIDGE
            </text>
            <text
              className="ipls-viz-load-value"
              x="68"
              y="130"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              150 W · ×3
            </text>

            {/* Load 2 AC */}
            <rect
              className="ipls-viz-load"
              x="56"
              y="160"
              width="208"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="68"
              y="182"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              AIR CONDITIONER
            </text>
            <text
              className="ipls-viz-load-value"
              x="68"
              y="206"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 W · ×5
            </text>

            {/* Load 3 pump */}
            <rect
              className="ipls-viz-load"
              x="56"
              y="236"
              width="208"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="68"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              WATER PUMP
            </text>
            <text
              className="ipls-viz-load-value"
              x="68"
              y="282"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              750 W · ×4
            </text>

            <text
              x="56"
              y="332"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              motors 3×–7× running
            </text>
            <text
              x="56"
              y="348"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              staggered start model
            </text>
          </g>

          {/* Flow → stack */}
          <path
            d="M 280 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ipls-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 280 200 L 320 200"
            fill="none"
            stroke="url(#ipls-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Surge stack —— */}
          <g>
            <rect
              x="330"
              y="40"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SURGE-LOAD CAPACITY PATH
            </text>

            {/* Continuous base bar */}
            <text
              x="346"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              CONTINUOUS Σ
            </text>
            <rect
              x="346"
              y="112"
              width="308"
              height="18"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ipls-viz-cont-bar"
              x="346"
              y="112"
              width="84"
              height="18"
              rx="2"
              fill="url(#ipls-viz-bar)"
            />
            <text
              className="ipls-viz-cont-chip"
              x="360"
              y="125"
              fill="#0a0a0a"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              2,100 W
            </text>

            {/* Peak with surge spike */}
            <text
              x="346"
              y="158"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              PEAK · + LARGEST + 35% 2ND
            </text>
            <rect
              x="346"
              y="170"
              width="308"
              height="18"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ipls-viz-peak-bar"
              x="346"
              y="170"
              width="288"
              height="18"
              rx="2"
              fill="url(#ipls-viz-bar)"
            />
            <text
              className="ipls-viz-peak-chip"
              x="360"
              y="183"
              fill="#0a0a0a"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              7,688 W
            </text>

            {/* Waveform: continuous floor + surge spike */}
            <path
              className="ipls-viz-wave"
              d="M 360 280 L 400 280 L 420 280 L 440 160 L 460 280 L 500 280 L 520 220 L 540 280 L 620 280"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="ipls-viz-wave-pulse"
              d="M 360 280 L 400 280 L 420 280 L 440 160 L 460 280 L 500 280 L 520 220 L 540 280 L 620 280"
              fill="none"
              stroke="url(#ipls-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="360"
              y1="280"
              x2="640"
              y2="280"
              stroke="#333333"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="346"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              START SPIKE
            </text>
            <circle
              className="ipls-viz-spike"
              cx="440"
              cy="160"
              r="5"
              fill="currentColor"
            />
            <text
              className="ipls-viz-margin-chip"
              x="490"
              y="156"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +4,800 W margin
            </text>

            <rect
              x="346"
              y="308"
              width="308"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="ipls-viz-math-value"
              x="362"
              y="332"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,100 + 4,800 + 0.35×2,250
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 670 140 L 700 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ipls-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 670 140 L 700 140"
            fill="none"
            stroke="url(#ipls-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 670 220 L 685 220 L 685 260 L 700 260"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ipls-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 670 220 L 685 220 L 685 260 L 700 260"
            fill="none"
            stroke="url(#ipls-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUTS —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="100"
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
              CONTINUOUS
            </text>
            <text
              className="ipls-viz-out-cont"
              x="726"
              y="104"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,100 W
            </text>

            <rect
              x="710"
              y="152"
              width="210"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK SURGE
            </text>
            <text
              className="ipls-viz-out-peak"
              x="726"
              y="216"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              7,688 W
            </text>

            <rect
              x="710"
              y="264"
              width="210"
              height="96"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="290"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RECOMMENDED
            </text>
            <text
              className="ipls-viz-output-value"
              x="726"
              y="322"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5,000 W
            </text>
            <text
              className="ipls-viz-detail-value"
              x="726"
              y="344"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              / 10,000 W surge
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
              HEADROOM · 15% CONT · 5% PEAK · ~2× SURGE CLASS
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              need
            </text>
            <rect
              x="100"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ipls-viz-need-bar"
              x="100"
              y="442"
              width="400"
              height="14"
              rx="2"
              fill="url(#ipls-viz-bar)"
            />
            <text
              x="280"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              2.4 kW cont · 8.1 kW peak
            </text>
            <text
              x="640"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              tier → 5 kW
            </text>

            <path
              className="ipls-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#ipls-viz-pulse)"
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
              one full start + partial overlap · verify LRA
            </text>
            <text
              className="ipls-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              2,100 · 7,688 · 5,000 / 10,000 W
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

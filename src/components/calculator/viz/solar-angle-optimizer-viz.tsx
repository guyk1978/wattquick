"use client";

import { cn } from "@/lib/utils";

interface SolarAngleOptimizerVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Panel Angle & Tilt Optimizer [VIZ].
 * Year-round ≈ |lat|; summer = |lat|−15°; winter = |lat|+15°.
 * Sample: 40° N · winter → 55° tilt · azimuth 180° (true south).
 */
export function SolarAngleOptimizerViz({
  className,
}: SolarAngleOptimizerVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-angle-optimizer", className)}
      aria-label="Solar panel angle and tilt optimizer visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Latitude · Seasonal Tilt</h3>
        <p className="tool-viz__subtitle">
          Site latitude sets the baseline; summer and winter goals nudge the
          panel to track the sun&apos;s high or low path for max yield.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-angle-optimizer-viz"
          role="img"
          aria-labelledby="sao-viz-title sao-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sao-viz-title">
            Solar panel angle and tilt optimizer animated diagram
          </title>
          <desc id="sao-viz-desc">
            Geographic latitude and seasonal optimization goal set recommended
            panel tilt and azimuth. Sample: at 40 degrees north latitude for
            winter peak output, recommended tilt is 55 degrees facing true south
            at azimuth 180 degrees. Summer is 25 degrees and year-round is 40
            degrees.
          </desc>

          <defs>
            <pattern
              id="sao-viz-grid"
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
              id="sao-viz-arrow"
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
              id="sao-viz-pulse"
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
              id="sao-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="sao-viz-ray"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#sao-viz-grid)"
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
              height="120"
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
              LATITUDE
            </text>
            <text
              className="sao-viz-lat-value"
              x="56"
              y="114"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40° N
            </text>
            <text
              x="56"
              y="142"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              Northern Hemisphere
            </text>

            <rect
              x="40"
              y="176"
              width="220"
              height="184"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="202"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              OPTIMIZATION GOAL
            </text>
            <text
              className="sao-viz-goal-value"
              x="56"
              y="244"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Winter peak
            </text>
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              |lat| + 15°
            </text>
            <text
              x="56"
              y="304"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              summer: |lat| − 15°
            </text>
            <text
              x="56"
              y="324"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              year-round: ≈ |lat|
            </text>
            <text
              x="56"
              y="344"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              face true south
            </text>
          </g>

          {/* Flow → geometry */}
          <path
            d="M 260 100 L 310 100"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sao-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 100 L 310 100"
            fill="none"
            stroke="url(#sao-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 250 L 290 250 L 290 180 L 310 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sao-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 250 L 290 250 L 290 180 L 310 180"
            fill="none"
            stroke="url(#sao-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Solar geometry —— */}
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
              SOLAR-GEOMETRY PATH
            </text>

            {/* Sun */}
            <circle
              className="sao-viz-sun"
              cx="560"
              cy="100"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              className="sao-viz-sun"
              cx="560"
              cy="100"
              r="6"
              fill="currentColor"
            />

            {/* Low winter sun rays */}
            <path
              className="sao-viz-ray"
              d="M 548 112 L 470 230"
              fill="none"
              stroke="url(#sao-viz-ray)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              className="sao-viz-ray sao-viz-ray--delay"
              d="M 560 116 L 500 240"
              fill="none"
              stroke="url(#sao-viz-ray)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Ground / horizon */}
            <line
              x1="360"
              y1="280"
              x2="640"
              y2="280"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <text
              x="360"
              y="298"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              HORIZON
            </text>

            {/* Panel at ~55° tilt from horizontal
                Pivot at (420, 280). Length ~120.
                Angle from horizontal: 55° → end at
                x = 420 + 120*cos(55°) ≈ 420 + 68.8 = 488.8
                y = 280 - 120*sin(55°) ≈ 280 - 98.3 = 181.7
            */}
            <line
              className="sao-viz-panel"
              x1="420"
              y1="280"
              x2="489"
              y2="182"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle
              className="sao-viz-pivot"
              cx="420"
              cy="280"
              r="5"
              fill="currentColor"
            />

            {/* Tilt arc */}
            <path
              className="sao-viz-arc"
              d="M 460 280 A 40 40 0 0 0 443 247"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              className="sao-viz-angle-label"
              x="472"
              y="262"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              55°
            </text>

            {/* Season comparison chips */}
            <rect
              x="336"
              y="312"
              width="88"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="380"
              y="326"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              SUMMER
            </text>
            <text
              className="sao-viz-summer-chip"
              x="380"
              y="342"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25°
            </text>

            <rect
              x="436"
              y="312"
              width="88"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <text
              x="480"
              y="326"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              WINTER
            </text>
            <text
              className="sao-viz-winter-chip"
              x="480"
              y="342"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              55°
            </text>

            <rect
              x="536"
              y="312"
              width="104"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="588"
              y="326"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              YEAR-ROUND
            </text>
            <text
              className="sao-viz-year-chip"
              x="588"
              y="342"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40°
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sao-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#sao-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 260 L 680 260 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sao-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 260 L 680 260 L 680 280 L 700 280"
            fill="none"
            stroke="url(#sao-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Tilt —— */}
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
              RECOMMENDED TILT
            </text>
            <text
              className="sao-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              55°
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              from horizontal
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
              className="sao-viz-tilt-bar"
              x="726"
              y="168"
              width="99"
              height="12"
              rx="2"
              fill="url(#sao-viz-bar)"
            />
            <text
              className="sao-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              40° + 15° winter boost
            </text>
          </g>

          {/* —— OUTPUT: Azimuth —— */}
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
              ORIENTATION
            </text>
            <text
              className="sao-viz-az-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              180° S
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
              className="sao-viz-az-bar"
              x="726"
              y="324"
              width="130"
              height="10"
              rx="2"
              fill="url(#sao-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              true south · Northern
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
              LOW WINTER SUN · STEEPER TILT · HIGH SUMMER SUN · FLATTER TILT
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0°
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
              className="sao-viz-scale-bar"
              x="100"
              y="442"
              width="318"
              height="14"
              rx="2"
              fill="url(#sao-viz-bar)"
            />
            <text
              x="390"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              55°
            </text>
            <text
              x="640"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              90°
            </text>

            <path
              className="sao-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#sao-viz-pulse)"
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
              S. Hemisphere · face true north (0°)
            </text>
            <text
              className="sao-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              55° tilt · 180° S · winter peak
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

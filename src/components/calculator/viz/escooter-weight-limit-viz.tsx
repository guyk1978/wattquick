"use client";

import { cn } from "@/lib/utils";

interface EscooterWeightLimitVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Rider Weight Limit [VIZ].
 * stress = riderKg / ratedMaxKg; motor load = stress × ratedW.
 * Sample: 110 kg (incl. gear) · 100 kg rated · 500 W → 1.10× · 550 W · +10 kg overload.
 */
export function EscooterWeightLimitViz({
  className,
}: EscooterWeightLimitVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-weight-limit", className)}
      aria-label="E-scooter rider weight limit visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Load Stress &amp; Weight Limit</h3>
        <p className="tool-viz__subtitle">
          Total rider mass — including backpack and gear — against the rated
          payload scales deck stress and effective motor demand.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-weight-limit-viz"
          role="img"
          aria-labelledby="eswl-viz-title eswl-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="eswl-viz-title">
            E-scooter rider weight limit animated flow diagram
          </title>
          <desc id="eswl-viz-desc">
            Rider mass including gear compared to rated maximum scales load
            stress factor and effective motor load. Sample: 110 kilograms on a
            100 kilogram rated deck with a 500 watt motor yields 1.10 times
            stress, 550 watts effective motor load, and 10 kilograms overload.
          </desc>

          <defs>
            <pattern
              id="eswl-viz-grid"
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
              id="eswl-viz-arrow"
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
              id="eswl-viz-pulse"
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
              id="eswl-viz-stress"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="eswl-viz-mass"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#eswl-viz-grid)"
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

          {/* —— INPUT: Rider mass —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="110"
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
              RIDER MASS
            </text>
            <text
              className="eswl-viz-mass-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              110 kg
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              body + backpack / gear
            </text>
          </g>

          {/* —— INPUT: Rated max —— */}
          <g>
            <rect
              x="40"
              y="166"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="192"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATED MAX RIDER
            </text>
            <text
              className="eswl-viz-rated-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 kg
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              manufacturer payload
            </text>
          </g>

          {/* —— INPUT: Gear / motor advanced —— */}
          <g>
            <rect
              x="40"
              y="282"
              width="220"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MOTOR · ADVANCED
            </text>
            <text
              className="eswl-viz-motor-value"
              x="56"
              y="344"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 W
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              rated continuous power
            </text>
            <text
              x="56"
              y="386"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              gear mass folded into rider
            </text>
          </g>

          {/* Flow → stress path */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eswl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#eswl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eswl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="url(#eswl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eswl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="url(#eswl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Structural stress path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="362"
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
              STRUCTURAL STRESS PATH
            </text>

            {/* Mass vs rated bars */}
            <g transform="translate(360, 88)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                MASS vs RATED
              </text>
              {/* Rated limit marker */}
              <line
                x1="200"
                y1="16"
                x2="200"
                y2="100"
                stroke="#555555"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x="200"
                y="114"
                textAnchor="middle"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                100 kg limit
              </text>
              {/* Rider mass bar (110%) */}
              <rect
                x="0"
                y="28"
                width="220"
                height="18"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="eswl-viz-mass-bar"
                x="0"
                y="28"
                width="220"
                height="18"
                rx="2"
                fill="url(#eswl-viz-stress)"
              />
              <text
                x="8"
                y="41"
                fill="#0a0a0a"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                dominantBaseline="middle"
              >
                110 kg rider+gear
              </text>
              {/* Rated capacity fill reference */}
              <rect
                x="0"
                y="56"
                width="200"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="eswl-viz-rated-bar"
                x="0"
                y="56"
                width="200"
                height="12"
                rx="2"
                fill="url(#eswl-viz-mass)"
                opacity="0.55"
              />
              <text
                x="8"
                y="63"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                dominantBaseline="middle"
              >
                rated 100 kg
              </text>
            </g>

            {/* Scooter deck flex schematic */}
            <g className="eswl-viz-deck" transform="translate(360, 220)">
              <ellipse
                className="eswl-viz-rider"
                cx="120"
                cy="8"
                rx="22"
                ry="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="120"
                y1="22"
                x2="120"
                y2="48"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <path
                className="eswl-viz-flex"
                d="M 10 56 Q 120 72 230 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="56"
                x2="230"
                y2="56"
                stroke="#333333"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle
                cx="24"
                cy="72"
                r="12"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <circle
                cx="216"
                cy="72"
                r="12"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <text
                x="120"
                y="98"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                deck flex · +10 kg overload
              </text>
            </g>

            {/* Formula chip */}
            <rect
              x="344"
              y="340"
              width="292"
              height="46"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="eswl-viz-math-value"
              x="360"
              y="368"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              110 ÷ 100 = 1.10× · × 500 W = 550 W
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eswl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#eswl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 280 L 680 280 L 680 300 L 700 300"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#eswl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 280 L 680 280 L 680 300 L 700 300"
            fill="none"
            stroke="url(#eswl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Stress factor —— */}
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
              LOAD STRESS FACTOR
            </text>
            <text
              className="eswl-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.10×
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~10% above rating
            </text>
            <rect
              x="726"
              y="158"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="eswl-viz-stress-bar"
              x="726"
              y="158"
              width="162"
              height="12"
              rx="2"
              fill="url(#eswl-viz-stress)"
            />
            <text
              className="eswl-viz-detail-value"
              x="726"
              y="198"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Within limit: No
            </text>
          </g>

          {/* —— OUTPUT: Motor / chassis load —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="166"
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
              EFFECTIVE MOTOR LOAD
            </text>
            <text
              className="eswl-viz-output-value"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              550 W
            </text>
            <text
              x="726"
              y="328"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              vs 500 W nameplate
            </text>
            <rect
              x="726"
              y="346"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="eswl-viz-motor-bar"
              x="726"
              y="346"
              width="162"
              height="10"
              rx="2"
              fill="url(#eswl-viz-stress)"
            />
            <text
              className="eswl-viz-detail-value"
              x="726"
              y="380"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Overload +10 kg
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="428"
              width="880"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="454"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CAPACITY AT A GLANCE
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
              className="eswl-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="eswl-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <line
              x1="600"
              y1="468"
              x2="600"
              y2="488"
              stroke="#555555"
              strokeWidth="1.5"
            />
            <text
              x="600"
              y="464"
              textAnchor="middle"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              rated
            </text>
            <circle
              className="eswl-viz-tick eswl-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="eswl-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#eswl-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="502"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              0 kg
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              100 kg rated max
            </text>
            <text
              className="eswl-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              110 kg · 1.10× stress
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface EvDeliveryVanEfficiencyVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Delivery Van Stop-and-Go [VIZ].
 * Urban kWh/mi = highway × (1 + stops/mi × penalty%).
 * Sample: 0.45 × (1 + 3 × 0.05) = 0.52 kWh/mi (+15%).
 */
export function EvDeliveryVanEfficiencyViz({
  className,
}: EvDeliveryVanEfficiencyVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-delivery-van-efficiency", className)}
      aria-label="Delivery van stop-and-go efficiency visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Delivery Van · Stop-and-Go</h3>
        <p className="tool-viz__subtitle">
          Highway baseline scales up with stop density—each drop adds accel,
          idle HVAC, and limited regen recovery versus steady cruise.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-delivery-van-efficiency-viz"
          role="img"
          aria-labelledby="edv-viz-title edv-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="edv-viz-title">
            Delivery van stop-and-go efficiency animated flow diagram
          </title>
          <desc id="edv-viz-desc">
            Highway baseline kilowatt-hours per mile multiplied by stop density
            penalty yields urban energy intensity. Sample: 0.45 kilowatt-hours
            per mile with three stops per mile at five percent penalty each
            equals 0.52 kilowatt-hours per mile, a fifteen percent increase.
          </desc>

          <defs>
            <pattern
              id="edv-viz-grid"
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
              id="edv-viz-arrow"
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
              id="edv-viz-pulse"
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
              id="edv-viz-hwy"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="edv-viz-urban"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#edv-viz-grid)"
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
            URBAN DUTY CYCLE
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

          {/* —— INPUT: Highway —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="114"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HIGHWAY BASELINE
            </text>
            <g
              transform="translate(56, 130)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            >
              <path
                d="M4 22 H14 L20 12 H48 L56 22 H66 V34 H4 Z"
                strokeLinejoin="round"
                className="edv-viz-van"
              />
              <circle cx="18" cy="36" r="4" />
              <circle cx="52" cy="36" r="4" />
              <path
                d="M0 48 H72"
                strokeDasharray="8 4"
                className="edv-viz-road-hwy"
              />
            </g>
            <text
              x="56"
              y="208"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.45 kWh/mi
            </text>
          </g>

          {/* —— INPUT: Stops —— */}
          <g>
            <rect
              x="40"
              y="258"
              width="240"
              height="170"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="284"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              STOPS · PENALTY
            </text>
            {/* Stop markers */}
            <g transform="translate(56, 300)">
              <circle
                className="edv-viz-stop"
                cx="10"
                cy="14"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                className="edv-viz-stop"
                style={{ animationDelay: "0.4s" }}
                cx="40"
                cy="14"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                className="edv-viz-stop"
                style={{ animationDelay: "0.8s" }}
                cx="70"
                cy="14"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M0 28 H80"
                fill="none"
                stroke="#333333"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
            </g>
            <text
              x="56"
              y="360"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 /mi
            </text>
            <text
              x="140"
              y="360"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              · 5%
            </text>
            <text
              x="56"
              y="390"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              accel · idle · limited regen
            </text>
            <text
              x="56"
              y="410"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              penalty per stop on baseline
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#edv-viz-arrow)"
          >
            <path d="M 280 163 H 330 V 210 H 360" />
            <path d="M 280 343 H 330 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#edv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 163 H 330 V 210 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 343 H 330 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
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
              BASELINE × STOP LOAD
            </text>

            {/* Cruise vs stop-go strips */}
            <rect
              x="376"
              y="120"
              width="228"
              height="70"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="388"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              HIGHWAY CRUISE
            </text>
            <rect
              x="388"
              y="154"
              width="204"
              height="12"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="edv-viz-hwy-bar"
              x="390"
              y="156"
              width="160"
              height="8"
              rx="1"
              fill="url(#edv-viz-hwy)"
            />
            <text
              x="388"
              y="182"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              0.45 kWh/mi steady
            </text>

            <rect
              x="376"
              y="206"
              width="228"
              height="100"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="388"
              y="228"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              URBAN CYCLE · STOP DENSITY
            </text>
            {/* Sawtooth accel path */}
            <path
              d="M 388 268 L 420 248 L 440 268 L 472 248 L 492 268 L 524 248 L 544 268"
              fill="none"
              stroke="#404040"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              className="edv-viz-cycle"
              d="M 388 268 L 420 248 L 440 268 L 472 248 L 492 268 L 524 248 L 544 268"
              fill="none"
              stroke="url(#edv-viz-pulse)"
              strokeWidth="2"
              strokeLinejoin="round"
              pathLength="100"
            />
            <text
              x="388"
              y="294"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              accel ↑ · regen ↓ · idle HVAC
            </text>

            <rect
              x="376"
              y="322"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="388"
              y="344"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              MULTIPLIER
            </text>
            <text
              x="388"
              y="366"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1 + 3 × 0.05 ={" "}
              <tspan fill="#ededed">1.15×</tspan>
            </text>

            <text
              x="376"
              y="404"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              URBAN INTENSITY BAND
            </text>
            <rect
              x="376"
              y="416"
              width="228"
              height="14"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="edv-viz-urban-bar"
              x="378"
              y="418"
              width="224"
              height="10"
              rx="1"
              fill="url(#edv-viz-urban)"
            />

            <text
              x="490"
              y="452"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              urban = hwy × (1 + n × p%)
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#edv-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#edv-viz-pulse)"
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
              y="120"
              width="220"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="148"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HIGHWAY
            </text>
            <text
              x="716"
              y="184"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.45 kWh/mi
            </text>
          </g>

          <g>
            <rect
              x="700"
              y="228"
              width="220"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INCREASE
            </text>
            <text
              x="716"
              y="292"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="edv-viz-output-delta"
            >
              +15%
            </text>
          </g>

          <g>
            <rect
              x="700"
              y="336"
              width="220"
              height="122"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              URBAN kWh/mi
            </text>
            <text
              x="810"
              y="410"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="edv-viz-output-value"
            >
              0.52
            </text>
            <text
              x="810"
              y="438"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 0.32 kWh/km
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Urban kWh/mi = highway × (1 + stops/mi × penalty%) · regen softens but does not erase mass of stops
          </text>
        </svg>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface EvWinterRangeLossVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Winter Range Loss [VIZ].
 * Winter range = rated × (1 − loss%); Cold + eco heat → 20% loss.
 * Sample: 300 mi rated · Cold 20–40°F · eco heat → 240 mi (−60 · 20%).
 */
export function EvWinterRangeLossViz({ className }: EvWinterRangeLossVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-winter-range-loss", className)}
      aria-label="EV winter range loss visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Winter Range Loss</h3>
        <p className="tool-viz__subtitle">
          Cold ambient slows cell chemistry and cabin heat drains the pack —
          rated miles shrink to a shorter real winter distance.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-winter-range-loss-viz"
          role="img"
          aria-labelledby="ewr-viz-title ewr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ewr-viz-title">
            EV winter range loss animated thermal diagram
          </title>
          <desc id="ewr-viz-desc">
            Rated range is reduced by cold-weather battery loss and cabin
            heating load. Sample: 300 miles rated in cold 20 to 40 Fahrenheit
            with eco heat yields about 240 winter miles, a 20 percent loss.
          </desc>

          <defs>
            <pattern
              id="ewr-viz-grid"
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
              id="ewr-viz-arrow"
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
              id="ewr-viz-pulse"
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
              id="ewr-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ewr-viz-cold"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ewr-viz-grid)"
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
            COLD DERATE
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

          {/* —— INPUT: Rated range —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
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
              RATED RANGE
            </text>
            <text
              className="ewr-viz-rated-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              300 mi
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              EPA / WLTP baseline
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              mild-weather rating
            </text>
          </g>

          {/* —— INPUT: Temperature —— */}
          <g>
            <rect
              x="40"
              y="242"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TEMPERATURE
            </text>
            <text
              className="ewr-viz-temp-value"
              x="56"
              y="310"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Cold
            </text>
            <text
              x="56"
              y="338"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              20–40°F / −7–4°C
            </text>
            <text
              x="56"
              y="368"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              + eco cabin heat
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#ewr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ewr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#ewr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ewr-viz-arrow)"
          />

          {/* —— CENTER: Thermal degradation —— */}
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
              THERMAL PATH
            </text>

            {/* Battery pack with cold overlay */}
            <g transform="translate(360, 118)">
              <rect
                className="ewr-viz-pack"
                x="0"
                y="0"
                width="120"
                height="70"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                className="ewr-viz-cold-fill"
                x="4"
                y="4"
                width="112"
                height="62"
                rx="2"
                fill="url(#ewr-viz-cold)"
              />
              <text
                x="60"
                y="28"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                PACK
              </text>
              <text
                className="ewr-viz-chem-label"
                x="60"
                y="50"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −15%
              </text>
              {/* Snowflake-ish marks */}
              <g
                className="ewr-viz-flake"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.6"
              >
                <line x1="18" y1="14" x2="18" y2="22" />
                <line x1="14" y1="18" x2="22" y2="18" />
                <line x1="102" y1="48" x2="102" y2="56" />
                <line x1="98" y1="52" x2="106" y2="52" />
              </g>
            </g>

            {/* HVAC heat load */}
            <g transform="translate(510, 118)">
              <rect
                className="ewr-viz-hvac"
                x="0"
                y="0"
                width="120"
                height="70"
                rx="4"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <text
                x="60"
                y="28"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                CABIN HEAT
              </text>
              <text
                className="ewr-viz-heat-label"
                x="60"
                y="50"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −5%
              </text>
              {/* Heat waves */}
              <path
                className="ewr-viz-heat-wave"
                d="M 28 58 Q 36 52 44 58 Q 52 64 60 58 Q 68 52 76 58 Q 84 64 92 58"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 490 220 L 490 248"
              fill="none"
              stroke="url(#ewr-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#ewr-viz-arrow)"
            />

            {/* Range bar compare: rated vs winter */}
            <text
              x="340"
              y="268"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RANGE SCALE
            </text>
            <text
              x="340"
              y="290"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              RATED
            </text>
            <rect
              x="400"
              y="280"
              width="230"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ewr-viz-rated-bar"
              x="402"
              y="282"
              width="226"
              height="6"
              rx="1"
              fill="url(#ewr-viz-bar)"
            />
            <text
              x="340"
              y="318"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              WINTER
            </text>
            <rect
              x="400"
              y="308"
              width="230"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ewr-viz-winter-bar"
              x="402"
              y="310"
              width="180"
              height="6"
              rx="1"
              fill="url(#ewr-viz-bar)"
            />

            <text
              className="ewr-viz-math-value"
              x="340"
              y="356"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              300 × (1 − 0.20) = 240
            </text>
            <text
              x="340"
              y="378"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              chemistry 15% + heat 5%
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ewr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ewr-viz-arrow)"
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
              WINTER RANGE
            </text>
            <text
              className="ewr-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              240
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              miles
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
              className="ewr-viz-output-bar"
              x="722"
              y="204"
              width="140"
              height="8"
              rx="1"
              fill="url(#ewr-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RANGE LOSS
            </text>
            <text
              className="ewr-viz-loss-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −60 mi · 20%
            </text>
            <text
              className="ewr-viz-detail-value"
              x="720"
              y="310"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              from 300 mi rated
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              precondition helps
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
              winter = rated × (1 − loss%)
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
              300 mi · Cold · eco → 240 mi
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

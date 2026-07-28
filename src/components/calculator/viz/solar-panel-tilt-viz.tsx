"use client";

import { cn } from "@/lib/utils";

interface SolarPanelTiltVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Panel Tilt [VIZ].
 * Tilt ≈ |latitude| (year-round fixed mount).
 * Sample: 40° N → 40° tilt from horizontal.
 */
export function SolarPanelTiltViz({ className }: SolarPanelTiltVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-panel-tilt", className)}
      aria-label="Solar panel tilt visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Panel Tilt</h3>
        <p className="tool-viz__subtitle">
          Site latitude sets the year-round fixed tilt from horizontal — so the
          panel faces the sun&apos;s average path and harvests more irradiance.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-panel-tilt-viz"
          role="img"
          aria-labelledby="spt-viz-title spt-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="spt-viz-title">
            Solar panel tilt animated geometry diagram
          </title>
          <desc id="spt-viz-desc">
            Absolute latitude in degrees yields the recommended year-round panel
            tilt from horizontal. Sample: 40 degrees north latitude recommends
            about 40 degrees of tilt.
          </desc>

          <defs>
            <pattern
              id="spt-viz-grid"
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
              id="spt-viz-arrow"
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
              id="spt-viz-pulse"
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
              id="spt-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="spt-viz-sun"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#spt-viz-grid)"
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
            INPUT
          </text>
          <text
            x="340"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            LAT → TILT
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

          {/* —— INPUT: Latitude —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="320"
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
              LATITUDE
            </text>
            <text
              className="spt-viz-lat-value"
              x="56"
              y="160"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40°
            </text>
            <text
              x="56"
              y="190"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              N · northern
            </text>
            <text
              x="56"
              y="230"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SIGN
            </text>
            <text
              x="56"
              y="258"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              + north · − south
            </text>
            <text
              x="56"
              y="300"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RULE
            </text>
            <text
              x="56"
              y="328"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              tilt ≈ |latitude|
            </text>
            <text
              x="56"
              y="360"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              year-round fixed
            </text>
          </g>

          {/* —— Flow input → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 232 L 320 232"
            fill="none"
            stroke="url(#spt-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#spt-viz-arrow)"
          />

          {/* —— CENTER: Angular geometry —— */}
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
              PANEL GEOMETRY
            </text>

            {/* Ground / horizon */}
            <line
              x1="360"
              y1="300"
              x2="620"
              y2="300"
              stroke="#444444"
              strokeWidth="1.5"
            />
            <text
              x="490"
              y="318"
              textAnchor="middle"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              HORIZONTAL
            </text>

            {/* Sun */}
            <g className="spt-viz-sun" transform="translate(560, 130)">
              <circle
                cx="0"
                cy="0"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="0" r="6" fill="url(#spt-viz-sun)" />
              <g
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                opacity="0.7"
              >
                <line x1="0" y1="-24" x2="0" y2="-20" />
                <line x1="0" y1="20" x2="0" y2="24" />
                <line x1="-24" y1="0" x2="-20" y2="0" />
                <line x1="20" y1="0" x2="24" y2="0" />
                <line x1="-17" y1="-17" x2="-14" y2="-14" />
                <line x1="14" y1="14" x2="17" y2="17" />
                <line x1="17" y1="-17" x2="14" y2="-14" />
                <line x1="-14" y1="14" x2="-17" y2="17" />
              </g>
            </g>

            {/* Sun rays toward panel */}
            <path
              className="spt-viz-ray"
              d="M 548 145 L 480 230"
              fill="none"
              stroke="url(#spt-viz-pulse)"
              strokeWidth="1.5"
            />
            <path
              className="spt-viz-ray"
              d="M 560 148 L 500 238"
              fill="none"
              stroke="url(#spt-viz-pulse)"
              strokeWidth="1.25"
              opacity="0.7"
            />

            {/*
              Panel at ~40° from horizontal.
              Pivot at (400, 300). Length ~160.
              cos40≈0.766, sin40≈0.643 → end ≈ (400+122, 300-103) = (522, 197)
            */}
            <line
              className="spt-viz-panel"
              x1="400"
              y1="300"
              x2="522"
              y2="197"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Panel thickness / cell lines */}
            <line
              className="spt-viz-panel"
              x1="406"
              y1="306"
              x2="528"
              y2="203"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.45"
            />
            <circle
              className="spt-viz-pivot"
              cx="400"
              cy="300"
              r="5"
              fill="currentColor"
            />

            {/* Tilt angle arc */}
            <path
              className="spt-viz-arc"
              d="M 448 300 A 48 48 0 0 0 437 269"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              className="spt-viz-angle-label"
              x="458"
              y="278"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40°
            </text>

            {/* Latitude callout */}
            <text
              x="340"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              |40°| → TILT
            </text>
            <text
              className="spt-viz-math-value"
              x="340"
              y="372"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              tilt = |latitude| = 40°
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#spt-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#spt-viz-arrow)"
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
              RECOMMENDED TILT
            </text>
            <text
              className="spt-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              ° from horizontal
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
              className="spt-viz-output-bar"
              x="722"
              y="204"
              width="120"
              height="8"
              rx="1"
              fill="url(#spt-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SEASONAL
            </text>
            <text
              className="spt-viz-season-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              summer 25° · winter 55°
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ±15° from latitude
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              face equator
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
              tilt ≈ |latitude|
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
              40° N → 40° year-round tilt
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

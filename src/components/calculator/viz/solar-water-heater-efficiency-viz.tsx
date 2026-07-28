"use client";

import { cn } from "@/lib/utils";

interface SolarWaterHeaterEfficiencyVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Water Heater Efficiency [VIZ].
 * water kWh = L × 4.186 × ΔT ÷ 3600; incident = m² × h × 0.75; η = water ÷ incident.
 * Sample: 200 L · 35 °C · 5 h · 3 m² → 8.14 / 11.25 kWh · 72.4%.
 */
export function SolarWaterHeaterEfficiencyViz({
  className,
}: SolarWaterHeaterEfficiencyVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--solar-water-heater-efficiency",
        className
      )}
      aria-label="Solar water heater efficiency visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Collector · Tank ΔT · η</h3>
        <p className="tool-viz__subtitle">
          Sun on the aperture becomes sensible heat in the store — useful water
          kilowatt-hours over incident solar sets thermal efficiency.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-water-heater-efficiency-viz"
          role="img"
          aria-labelledby="swhe-viz-title swhe-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="swhe-viz-title">
            Solar water heater thermal efficiency diagram
          </title>
          <desc id="swhe-viz-desc">
            Tank volume and temperature rise set water heating energy; collector
            area and sun hours set incident solar. Efficiency is water energy
            divided by incident energy. Sample: 200 liters raised 35 degrees
            Celsius with 5 sun hours on 3 square meters yields 8.14 kilowatt-hours
            to water from 11.25 kilowatt-hours incident, about 72.4 percent
            thermal efficiency.
          </desc>

          <defs>
            <pattern
              id="swhe-viz-grid"
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
              id="swhe-viz-arrow"
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
              id="swhe-viz-pulse"
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
              id="swhe-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient
              id="swhe-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="swhe-viz-yield"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#swhe-viz-grid)"
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
              width="150"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              TANK VOLUME
            </text>
            <text
              className="swhe-viz-vol-value"
              x="56"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              200 L
            </text>
          </g>

          <g>
            <rect
              x="206"
              y="40"
              width="150"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="222"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              TEMP RISE ΔT
            </text>
            <text
              className="swhe-viz-dt-value"
              x="222"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              35 °C
            </text>
          </g>

          <g>
            <rect
              x="372"
              y="40"
              width="150"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PEAK SUN HOURS
            </text>
            <text
              className="swhe-viz-sun-value"
              x="388"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 h
            </text>
          </g>

          <g>
            <rect
              x="538"
              y="40"
              width="142"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="554"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              COLLECTOR
            </text>
            <text
              className="swhe-viz-area-value"
              x="554"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 m²
            </text>
          </g>

          {/* Flow → thermal path */}
          <path
            d="M 115 128 L 115 156 L 360 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#swhe-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 115 128 L 115 156 L 360 156"
            fill="none"
            stroke="url(#swhe-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 281 128 L 281 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 281 128 L 281 156"
            fill="none"
            stroke="url(#swhe-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 447 128 L 447 156 L 360 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            d="M 609 128 L 609 156 L 360 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: Sun → collector → tank —— */}
          <g>
            <rect
              x="40"
              y="176"
              width="640"
              height="220"
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
              THERMAL PATH · 0.75 KW/M² AVG IRRADIANCE
            </text>

            {/* Sun */}
            <g className="swhe-viz-sun" transform="translate(72, 248)">
              <circle
                cx="28"
                cy="28"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 28 + Math.cos(rad) * 22;
                const y1 = 28 + Math.sin(rad) * 22;
                const x2 = 28 + Math.cos(rad) * 30;
                const y2 = 28 + Math.sin(rad) * 30;
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                );
              })}
              <text
                x="28"
                y="72"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                5 h sun
              </text>
            </g>

            {/* Rays to collector */}
            <path
              className="swhe-viz-ray"
              d="M 120 276 L 180 276"
              fill="none"
              stroke="url(#swhe-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#swhe-viz-arrow)"
            />
            <path
              className="swhe-viz-ray swhe-viz-ray--delay"
              d="M 120 260 L 180 268"
              fill="none"
              stroke="url(#swhe-viz-pulse)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              className="swhe-viz-ray"
              d="M 120 292 L 180 284"
              fill="none"
              stroke="url(#swhe-viz-pulse)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
            />

            {/* Collector panel */}
            <g className="swhe-viz-collector" transform="translate(196, 236)">
              <rect
                x="0"
                y="8"
                width="100"
                height="72"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                transform="skewY(-6)"
              />
              <line
                x1="12"
                y1="20"
                x2="88"
                y2="12"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                x1="12"
                y1="36"
                x2="88"
                y2="28"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                x1="12"
                y1="52"
                x2="88"
                y2="44"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                x1="12"
                y1="68"
                x2="88"
                y2="60"
                stroke="#444444"
                strokeWidth="1"
              />
              <text
                x="50"
                y="108"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                3 m² aperture
              </text>
            </g>

            {/* Heat transfer loop */}
            <path
              d="M 310 276 L 380 276"
              fill="none"
              stroke="#444444"
              strokeWidth="2"
              markerEnd="url(#swhe-viz-arrow)"
            />
            <path
              className="swhe-viz-loop"
              d="M 310 276 L 380 276"
              fill="none"
              stroke="url(#swhe-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="345"
              y="264"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              heat
            </text>

            {/* Tank */}
            <g className="swhe-viz-tank" transform="translate(400, 228)">
              <rect
                x="0"
                y="0"
                width="72"
                height="100"
                rx="4"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <rect
                className="swhe-viz-water"
                x="6"
                y="28"
                width="60"
                height="66"
                rx="2"
                fill="url(#swhe-viz-heat)"
                opacity="0.85"
              />
              <text
                className="swhe-viz-dt-chip"
                x="36"
                y="64"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                +35°C
              </text>
              <text
                x="36"
                y="120"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                200 L store
              </text>
            </g>

            {/* Energy chips */}
            <g transform="translate(500, 240)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                ENERGY BALANCE
              </text>
              <text
                className="swhe-viz-incident"
                x="0"
                y="28"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                Incident 11.25 kWh
              </text>
              <text
                className="swhe-viz-absorbed"
                x="0"
                y="52"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                To water 8.14 kWh
              </text>
              <rect
                x="0"
                y="68"
                width="150"
                height="36"
                rx="3"
                fill="#0a0a0a"
                stroke="#2a2a2a"
              />
              <text
                className="swhe-viz-math-value"
                x="75"
                y="91"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                8.14 ÷ 11.25
              </text>
            </g>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#swhe-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#swhe-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#swhe-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#swhe-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Efficiency —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              THERMAL EFFICIENCY
            </text>
            <text
              className="swhe-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              72.4%
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              water ÷ incident solar
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="swhe-viz-eff-bar"
              x="716"
              y="158"
              width="125"
              height="10"
              rx="2"
              fill="url(#swhe-viz-bar)"
            />
            <text
              className="swhe-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              save $1.14 vs electric
            </text>
          </g>

          {/* —— OUTPUT: Daily yield —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY ENERGY YIELD
            </text>
            <text
              className="swhe-viz-yield-out"
              x="716"
              y="318"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8.14 kWh
            </text>
            <rect
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="swhe-viz-yield-bar"
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="url(#swhe-viz-yield)"
            />
            <text
              className="swhe-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              L × 4.186 × ΔT ÷ 3600
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SOLAR THERMAL DAY AT A GLANCE
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
              className="swhe-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="swhe-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="swhe-viz-tick"
              cx="560"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="swhe-viz-tick swhe-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="swhe-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#swhe-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              dawn · cold tank
            </text>
            <text
              x="320"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              peak sun · collector active
            </text>
            <text
              x="560"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +35 °C stored
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              8.14 kWh · 72.4% η
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

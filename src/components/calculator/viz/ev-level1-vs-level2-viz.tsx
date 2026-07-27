"use client";

import { cn } from "@/lib/utils";

interface EvLevel1VsLevel2VizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Level 1 vs Level 2 charge time [VIZ].
 * Same kWh ÷ Level 1 kW vs Level 2 kW → comparative durations.
 * Sample: 50 kWh @ 1.4 kW ≈ 35h 43m · @ 7.2 kW ≈ 6h 56m.
 */
export function EvLevel1VsLevel2Viz({ className }: EvLevel1VsLevel2VizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-level1-vs-level2", className)}
      aria-label="Level 1 versus Level 2 EV charging time visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Level 1 vs Level 2</h3>
        <p className="tool-viz__subtitle">
          The same energy need splits into two charge paths—slow 120 V Level 1
          versus faster 240 V Level 2—so you see the time difference at a
          glance.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-level1-vs-level2-viz"
          role="img"
          aria-labelledby="el12-viz-title el12-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="el12-viz-title">
            Level 1 versus Level 2 EV charging time comparison diagram
          </title>
          <desc id="el12-viz-desc">
            Energy needed in kilowatt-hours is divided by Level 1 charger power
            and by Level 2 charger power to compare charge durations. Sample: 50
            kilowatt-hours takes about 35 hours 43 minutes on 1.4 kilowatts and
            about 6 hours 56 minutes on 7.2 kilowatts.
          </desc>

          <defs>
            <pattern
              id="el12-viz-grid"
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
              id="el12-viz-arrow"
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
              id="el12-viz-pulse"
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
              id="el12-viz-slow"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="el12-viz-fast"
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
            fill="url(#el12-viz-grid)"
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
            DUAL CHARGE PATHS
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            COMPARE
          </text>

          {/* —— INPUT: Energy —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="220"
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
              ENERGY TO ADD
            </text>
            <g transform="translate(56, 112)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="26" height="38" rx="2" strokeWidth="1.3" />
              <rect
                x="6"
                y="3"
                width="14"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="el12-viz-battery-fill"
                x="4"
                y="22"
                width="18"
                height="20"
                rx="1"
                fill="currentColor"
                fillOpacity="0.75"
                stroke="none"
              />
            </g>
            <text
              x="98"
              y="142"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50 kWh
            </text>
            <text
              x="98"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              shared by both paths
            </text>
          </g>

          {/* —— INPUT: L1 —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="220"
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
              LEVEL 1 · 120 V
            </text>
            <text
              x="56"
              y="276"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.4 kW
            </text>
            <text
              x="56"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              outlet · overnight slow
            </text>
          </g>

          {/* —— INPUT: L2 —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="220"
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
              LEVEL 2 · 240 V
            </text>
            <g
              transform="translate(56, 378)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <rect x="0" y="4" width="28" height="28" rx="2" />
              <path
                d="M18 8 L10 22 H16 L12 32 L24 16 H18 Z"
                className="el12-viz-bolt"
                fill="currentColor"
                fillOpacity="0.45"
                strokeLinejoin="round"
              />
            </g>
            <text
              x="100"
              y="408"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              7.2 kW
            </text>
            <text
              x="100"
              y="432"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              home EVSE · daily ready
            </text>
          </g>

          {/* Flow → dual paths */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#el12-viz-arrow)"
          >
            <path d="M 260 131 H 300 V 200 H 320" />
            <path d="M 260 265 H 300 V 220 H 320" />
            <path d="M 260 399 H 300 V 360 H 320" />
          </g>
          <g
            fill="none"
            stroke="url(#el12-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 260 131 H 300 V 200 H 320"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 260 265 H 300 V 220 H 320"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.55s" }}
              d="M 260 399 H 300 V 360 H 320"
              pathLength="100"
            />
          </g>

          {/* —— DUAL PATH PANEL —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="300"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="336"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURS = kWh ÷ kW
            </text>

            {/* Level 1 path */}
            <rect
              x="336"
              y="120"
              width="268"
              height="150"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="352"
              y="146"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PATH A · LEVEL 1
            </text>
            <text
              x="352"
              y="174"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              50 ÷ 1.4 ={" "}
              <tspan fill="#ededed">35.7 h</tspan>
            </text>
            <text
              x="352"
              y="198"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              TIMELINE (SLOW)
            </text>
            <rect
              x="352"
              y="210"
              width="236"
              height="14"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="el12-viz-bar-l1"
              x="354"
              y="212"
              width="232"
              height="10"
              rx="1"
              fill="url(#el12-viz-slow)"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 352 246 H 588"
              fill="none"
              stroke="url(#el12-viz-pulse)"
              strokeWidth="2"
              pathLength="100"
              strokeOpacity="0.7"
            />

            {/* Level 2 path */}
            <rect
              x="336"
              y="288"
              width="268"
              height="150"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            <text
              x="352"
              y="314"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PATH B · LEVEL 2
            </text>
            <text
              x="352"
              y="342"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              50 ÷ 7.2 ={" "}
              <tspan fill="#ededed">6.9 h</tspan>
            </text>
            <text
              x="352"
              y="366"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              TIMELINE (FAST)
            </text>
            <rect
              x="352"
              y="378"
              width="236"
              height="14"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            {/* shorter bar = faster fill visually */}
            <rect
              className="el12-viz-bar-l2"
              x="354"
              y="380"
              width="92"
              height="10"
              rx="1"
              fill="url(#el12-viz-fast)"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 352 414 H 446"
              fill="none"
              stroke="url(#el12-viz-pulse)"
              strokeWidth="2.5"
              pathLength="100"
            />
          </g>

          {/* Flow → compare */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#el12-viz-arrow)"
          >
            <path d="M 620 195 H 680" />
            <path d="M 620 363 H 680" />
          </g>
          <g
            fill="none"
            stroke="url(#el12-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 620 195 H 680"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 363 H 680"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT COMPARE —— */}
          <g>
            <rect
              x="680"
              y="100"
              width="240"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="128"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LEVEL 1 TIME
            </text>
            <g
              transform="translate(696, 142)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="14" cy="14" r="12" />
              <g className="el12-viz-clock-l1">
                <line
                  x1="14"
                  y1="14"
                  x2="14"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            </g>
            <text
              x="740"
              y="168"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="el12-viz-output-l1"
            >
              35h 43m
            </text>
            <text
              x="696"
              y="208"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ~1.5 days on a wall outlet
            </text>
          </g>

          <g>
            <rect
              x="680"
              y="250"
              width="240"
              height="150"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="696"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LEVEL 2 TIME
            </text>
            <g
              transform="translate(696, 292)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="14" cy="14" r="12" />
              <g className="el12-viz-clock-l2">
                <line
                  x1="14"
                  y1="14"
                  x2="14"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            </g>
            <text
              x="740"
              y="318"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="el12-viz-output-l2"
            >
              6h 56m
            </text>
            <text
              x="696"
              y="352"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~5.1× faster than L1
            </text>
            <text
              x="696"
              y="376"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              same 50 kWh energy need
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Hours ≈ kWh ÷ charger kW · add ~10% for losses · L2 needs a 240 V circuit
          </text>
        </svg>
      </div>
    </section>
  );
}

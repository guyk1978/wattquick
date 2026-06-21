"use client";

import { cn } from "@/lib/utils";

interface ElectricityRatePlanGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: kWh split + tariffs → flat vs TOU bills → annual savings.
 * Modal only (not embedded in page DOM by default).
 */
export function ElectricityRatePlanGuideIllustration({
  className,
}: ElectricityRatePlanGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "electricity-rate-plan-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="erplan-guide-title erplan-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="erplan-guide-title">
        Electricity rate plan comparison flow diagram
      </title>
      <desc id="erplan-guide-desc">
        Inputs: monthly kilowatt-hours, usage split across peak, shoulder, and
        off-peak periods, plus flat and time-of-use tariffs. Process: compute
        flat monthly bill and weighted TOU bill, then compare. Output: winning
        plan and annual savings.
      </desc>

      <defs>
        <pattern
          id="bp-erplan-grid-minor"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            opacity="0.12"
          />
        </pattern>
        <pattern
          id="bp-erplan-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-erplan-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter
          id="bp-erplan-pencil"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
            in="noise"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      <rect
        width="720"
        height="420"
        fill="url(#bp-erplan-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="396"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.35"
        rx="1"
      />

      <text
        x="36"
        y="44"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
        opacity="0.55"
      >
        FIG. 1 — TOU VS FLAT RATE
      </text>
      <path
        d="M 34 52 H 300"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUT */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUT
      </text>

      <g
        filter="url(#bp-erplan-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 86 44 86 H 196 Q 202 86 204 92 V 268 Q 202 274 196 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          monthly usage
        </text>
        <text
          x="48"
          y="130"
          fill="currentColor"
          fontSize="20"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          850 kWh
        </text>

        <path d="M 48 142 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="158"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          kWh split
        </text>
        <text
          x="48"
          y="176"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          peak 15% · shoulder 10%
        </text>
        <text
          x="48"
          y="192"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          off-peak 75%
        </text>

        {/* Mini pie sketch */}
        <circle cx="168" cy="218" r="18" strokeWidth="0.9" />
        <path d="M 168 218 L 168 200 A 18 18 0 0 1 185 224 Z" strokeWidth="0.7" />
        <path d="M 168 218 L 185 224 A 18 18 0 0 1 160 234 Z" strokeWidth="0.7" />
        <text
          x="168"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          load profile
        </text>

        <path d="M 48 256 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="268"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          flat $0.14 · peak $0.32
        </text>
        <text
          x="48"
          y="280"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          shoulder $0.18 · off $0.07
        </text>
      </g>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 214 180 H 244" strokeLinecap="round" />
        <path d="M 240 176 L 248 180 L 240 184" strokeLinejoin="round" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-erplan-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 248 92 Q 250 86 258 86 H 468 Q 476 86 478 94 V 268 Q 476 276 468 276 H 258 Q 250 276 248 268 Z"
          strokeWidth="1.2"
        />

        <text
          x="268"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Compare two bills
        </text>

        {/* Flat path */}
        <rect x="262" y="122" width="196" height="52" strokeWidth="0.8" rx="1" />
        <text
          x="272"
          y="138"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          FLAT
        </text>
        <text
          x="272"
          y="154"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          850 × $0.14 = $119
        </text>
        <text
          x="272"
          y="168"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          one rate for all kWh
        </text>

        {/* TOU path */}
        <rect x="262" y="182" width="196" height="72" strokeWidth="0.8" rx="1" />
        <text
          x="272"
          y="198"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          TIME-OF-USE
        </text>
        <text
          x="272"
          y="214"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          128×$0.32 peak
        </text>
        <text
          x="272"
          y="228"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          + 85×$0.18 shoulder
        </text>
        <text
          x="272"
          y="242"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          + 638×$0.07 off = $101
        </text>

        {/* Compare */}
        <path d="M 468 180 H 478" strokeWidth="0.8" />
        <text
          x="268"
          y="268"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          lower bill wins · Δ × 12 = annual
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 180 H 518" strokeLinecap="round" />
        <path d="M 514 176 L 522 180 L 514 184" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-erplan-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <text
          x="611"
          y="118"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          recommended plan
        </text>
        <text
          x="611"
          y="142"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          TOU wins
        </text>

        <path d="M 552 156 H 670" strokeWidth="0.6" opacity="0.35" />

        <text
          x="611"
          y="178"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $18/mo
        </text>
        <text
          x="611"
          y="200"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          monthly savings
        </text>

        <rect x="558" y="214" width="106" height="36" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="236"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $216/yr
        </text>

        <text
          x="611"
          y="264"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          $119 flat vs $101 TOU
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-erplan-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text
          x="48"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          heavy off-peak load favors TOU — shift usage to cheaper windows
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          |$119 − $101|
        </text>
        <text
          x="140"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          × 12 =
        </text>
        <text
          x="180"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $216/yr saved
        </text>
      </g>
    </svg>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface GridFrequencyRewardGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: kW + hours + availability → effective kW → revenue.
 * Modal only (not embedded in page DOM by default).
 */
export function GridFrequencyRewardGuideIllustration({
  className,
}: GridFrequencyRewardGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "grid-frequency-reward-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="gfreq-guide-title gfreq-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="gfreq-guide-title">
        Grid frequency response reward flow diagram
      </title>
      <desc id="gfreq-guide-desc">
        Inputs: available grid-service capacity in kilowatts, daily
        participation hours, program reward rate, and availability percentage.
        Process: compute effective committed capacity, then multiply by the
        program rate. Output: estimated monthly and annual revenue.
      </desc>

      <defs>
        <pattern
          id="bp-gfreq-grid-minor"
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
          id="bp-gfreq-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-gfreq-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter
          id="bp-gfreq-pencil"
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
        fill="url(#bp-gfreq-grid-major)"
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
        FIG. 1 — GRID FREQUENCY RESPONSE
      </text>
      <path
        d="M 34 52 H 340"
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
        filter="url(#bp-gfreq-pencil)"
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
          enrolled capacity
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
          5 kW
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
          participation
        </text>
        <text
          x="48"
          y="176"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          18 hrs/day enrolled
        </text>
        <text
          x="48"
          y="192"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          90% availability
        </text>

        <path d="M 48 204 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="220"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          program rate
        </text>
        <text
          x="48"
          y="240"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          $8/kW-mo
        </text>

        {/* Battery + frequency wave sketch */}
        <rect x="138" y="248" width="44" height="20" strokeWidth="0.9" rx="2" />
        <text
          x="160"
          y="262"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          DER
        </text>
        <path
          d="M 118 256 Q 124 248 130 256 T 142 256"
          strokeWidth="0.7"
          opacity="0.7"
        />
        <text
          x="160"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          FCR / FRR
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
        filter="url(#bp-gfreq-pencil)"
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
          Effective capacity
        </text>
        <text
          x="268"
          y="132"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          kW_eff = kW × avail × hrs÷24
        </text>
        <text
          x="268"
          y="152"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          5 × 0.90 × 0.75
        </text>
        <text
          x="268"
          y="172"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          = 3.4 kW effective
        </text>

        <path d="M 262 184 H 456" strokeWidth="0.6" opacity="0.35" />

        <text
          x="268"
          y="202"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          CAPACITY PATH ($/kW-mo)
        </text>
        <text
          x="268"
          y="220"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          revenue = kW_eff × rate
        </text>
        <text
          x="268"
          y="240"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          3.4 × $8 = $27/mo
        </text>

        <text
          x="268"
          y="262"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          alt: dispatched kWh × $/kWh
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
        filter="url(#bp-gfreq-pencil)"
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
          program revenue
        </text>

        <circle cx="611" cy="152" r="24" strokeWidth="1.2" />
        <path
          d="M 595 152 Q 603 140 611 152 T 627 152"
          strokeWidth="0.8"
          opacity="0.75"
        />

        <text
          x="611"
          y="196"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $27/mo
        </text>
        <text
          x="611"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          monthly revenue
        </text>

        <rect x="558" y="232" width="106" height="36" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $324/yr
        </text>

        <text
          x="611"
          y="268"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          before fees &amp; degradation
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-gfreq-pencil)"
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
          higher availability and enrollment hours raise effective kW and payout
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          $27 × 12 =
        </text>
        <text
          x="130"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $324/yr gross
        </text>
      </g>
    </svg>
  );
}

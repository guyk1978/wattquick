"use client";

import { cn } from "@/lib/utils";

interface CarbonFootprintOffsetGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: clean kWh + grid kg/kWh → CO₂ avoided.
 * Modal only (not embedded in page DOM by default).
 */
export function CarbonFootprintOffsetGuideIllustration({
  className,
}: CarbonFootprintOffsetGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "carbon-footprint-offset-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="coffset-guide-title coffset-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="coffset-guide-title">Carbon offset estimation flow diagram</title>
      <desc id="coffset-guide-desc">
        Inputs: clean energy used in kilowatt-hours and grid emissions intensity
        in kilograms of CO₂ per kilowatt-hour. Process: multiply clean kWh by
        grid factor. Output: kilograms of CO₂ avoided versus grid-supplied power.
      </desc>

      <defs>
        <pattern
          id="bp-coffset-grid-minor"
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
          id="bp-coffset-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-coffset-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter
          id="bp-coffset-pencil"
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
        fill="url(#bp-coffset-grid-major)"
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
        FIG. 1 — CARBON OFFSET
      </text>
      <path
        d="M 34 52 H 260"
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
        filter="url(#bp-coffset-pencil)"
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
          clean energy used
        </text>
        <text
          x="48"
          y="132"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          900 kWh
        </text>
        <text
          x="48"
          y="152"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          solar self-use or EV miles
        </text>

        <path d="M 48 164 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="180"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          grid emissions factor
        </text>
        <text
          x="48"
          y="204"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          0.42 kg/kWh
        </text>
        <text
          x="48"
          y="224"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          regional grid intensity
        </text>

        {/* Solar panel + grid tower sketch */}
        <rect x="130" y="236" width="28" height="16" strokeWidth="0.8" rx="1" />
        <path d="M 134 252 L 154 236" strokeWidth="0.7" />
        <path d="M 168 248 L 168 268" strokeWidth="0.8" />
        <path d="M 160 256 H 176" strokeWidth="0.7" />
        <path d="M 158 262 H 178" strokeWidth="0.7" />
        <text
          x="152"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          clean vs grid
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
        filter="url(#bp-coffset-pencil)"
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
          Displacement model
        </text>
        <text
          x="268"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          CO₂ = clean kWh × kg/kWh
        </text>
        <text
          x="268"
          y="162"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          900 × 0.42
        </text>
        <text
          x="268"
          y="188"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          each clean kWh avoids grid CO₂
        </text>

        {/* Flow blocks */}
        <rect x="360" y="204" width="40" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="380"
          y="220"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          kWh
        </text>
        <text
          x="408"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          ×
        </text>
        <rect x="420" y="208" width="44" height="16" strokeWidth="0.8" rx="1" />
        <text
          x="442"
          y="220"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          kg/kWh
        </text>
        <text
          x="472"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          =
        </text>
        <rect x="484" y="204" width="36" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="502"
          y="220"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          kg
        </text>

        <text
          x="268"
          y="252"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          planning figure — not full lifecycle LCA
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
        filter="url(#bp-coffset-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        {/* CO₂ cloud sketch */}
        <path
          d="M 590 118 Q 598 108 608 118 Q 618 108 626 118 Q 632 128 622 134 Q 628 144 614 142 Q 604 152 594 142 Q 582 144 584 132 Q 574 128 580 118 Q 586 112 590 118"
          strokeWidth="0.9"
        />
        <text
          x="611"
          y="132"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          CO₂ avoided
        </text>

        <text
          x="611"
          y="188"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          378 kg
        </text>
        <text
          x="611"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          CO₂ not emitted
        </text>

        <path d="M 552 228 H 670" strokeWidth="0.6" opacity="0.35" />

        <text
          x="611"
          y="246"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          ≈ 833 lbs · ~936 mi car
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
          equivalent comparisons
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-coffset-pencil)"
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
          solar self-consumption and EV charging displace fossil grid mix
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          900 × 0.42 =
        </text>
        <text
          x="150"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          378 kg CO₂ avoided
        </text>
      </g>
    </svg>
  );
}

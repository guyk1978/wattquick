"use client";

import { cn } from "@/lib/utils";

interface EbikeRangeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Wh, assist, mass, wind/terrain → Wh/km → range km.
 * Modal only (not embedded in page DOM by default).
 */
export function EbikeRangeGuideIllustration({
  className,
}: EbikeRangeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 440"
      className={cn(
        "ebike-range-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="ebike-rt-guide-title ebike-rt-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="ebike-rt-guide-title">E-bike range flow diagram</title>
      <desc id="ebike-rt-guide-desc">
        Inputs: battery watt-hours, pedal-assist level, total rider and bike
        mass, and wind or terrain factor. Process: compute consumption in
        watt-hours per kilometre from base rolling loss, assist multiplier,
        conditions, and weight penalty; divide usable pack energy by
        consumption. Output: estimated range in kilometres.
      </desc>

      <defs>
        <pattern
          id="bp-eb-rt-grid-minor"
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
          id="bp-eb-rt-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-eb-rt-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-eb-rt-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        height="440"
        fill="url(#bp-eb-rt-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="416"
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
        FIG. 1 — E-BIKE RANGE
      </text>
      <path
        d="M 34 52 H 248"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      <g
        filter="url(#bp-eb-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Battery Wh */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 128 Q 174 134 168 134 H 44 Q 38 134 36 128 Z"
          strokeWidth="1.1"
        />
        <rect
          x="48"
          y="104"
          width="56"
          height="22"
          strokeWidth="0.9"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <text
          x="58"
          y="118"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          500 Wh
        </text>

        {/* Assist level */}
        <path
          d="M 36 144 Q 38 140 44 140 H 168 Q 174 140 176 146 V 180 Q 174 186 168 186 H 44 Q 38 186 36 180 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="156"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          assist
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={52 + i * 22}
            y={162}
            width={16}
            height={14}
            strokeWidth={i === 2 ? 1.2 : 0.8}
            fill={i === 2 ? "currentColor" : "none"}
            fillOpacity={i === 2 ? 0.12 : 0}
          />
        ))}
        <text
          x="118"
          y="174"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          L3 ×1.75
        </text>

        {/* Rider weight */}
        <path
          d="M 36 196 Q 38 192 44 192 H 168 Q 174 192 176 198 V 232 Q 174 238 168 238 H 44 Q 38 238 36 232 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="214" r="10" strokeWidth="1" />
        <line x1="72" y1="224" x2="72" y2="228" strokeWidth="1" />
        <line x1="64" y1="220" x2="80" y2="220" strokeWidth="1" />
        <text
          x="92"
          y="218"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          95 kg
        </text>

        {/* Wind / terrain */}
        <path
          d="M 36 248 Q 38 244 44 244 H 168 Q 174 244 176 250 V 284 Q 174 290 168 290 H 44 Q 38 290 36 284 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 268 H 72 M 68 264 L 72 268 L 68 272" strokeWidth="0.9" />
        <path d="M 88 276 L 104 260 L 120 276 L 136 264" strokeWidth="1" />
        <text
          x="48"
          y="262"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          wind
        </text>
        <text
          x="128"
          y="278"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          ×1.0
        </text>
      </g>

      <text
        x="36"
        y="308"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        + base Wh/km, pack η
      </text>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 190 H 218" strokeLinecap="round" />
        <path d="M 214 186 L 222 190 L 214 194" strokeLinejoin="round" />
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
        filter="url(#bp-eb-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 318 Q 476 326 468 326 H 228 Q 220 326 218 318 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1. Consumption (Wh/km)
        </text>
        <text
          x="256"
          y="134"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          base × assist × wind/terrain
        </text>
        <text
          x="256"
          y="154"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          + 0.1 Wh/km per 10 kg &gt; 80 kg
        </text>
        <text
          x="256"
          y="174"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          9 × 1.75 × 1.0 + 0.15 ≈ 15.9
        </text>

        <path d="M 238 188 H 450" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="208"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2. Usable energy
        </text>
        <text
          x="256"
          y="228"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh_use = Wh × η_pack
        </text>
        <text
          x="256"
          y="248"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          500 × 0.92 = 460 Wh
        </text>

        <path d="M 238 262 H 450" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="282"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          3. Range
        </text>
        <text
          x="256"
          y="304"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          km = Wh_use ÷ Wh/km
        </text>
        <text
          x="256"
          y="316"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          460 ÷ 15.9 ≈ 28.9 km
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
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
        filter="url(#bp-eb-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Bike + route */}
        <circle cx="598" cy="148" r="18" strokeWidth="1" />
        <circle cx="632" cy="148" r="18" strokeWidth="1" />
        <path d="M 580 148 H 598 M 616 148 H 632" strokeWidth="1" />
        <line x1="607" y1="148" x2="607" y2="132" strokeWidth="1" />
        <line x1="603" y1="136" x2="611" y2="136" strokeWidth="1" />
        <path d="M 560 200 Q 611 188 662 200" strokeWidth="1.2" strokeDasharray="5 3" />

        <text
          x="611"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          29 km
        </text>
        <text
          x="611"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          estimated range
        </text>
        <text
          x="611"
          y="298"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          physics-based Wh/km model
        </text>
      </g>

      {/* Bottom: factor sensitivity */}
      <g
        filter="url(#bp-eb-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="68"
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
          higher assist / headwind / mass → higher Wh/km → shorter range
        </text>
        <line x1="72" y1="400" x2="640" y2="400" strokeWidth="0.8" />
        <path d="M 72 400 L 200 400 L 320 370 L 440 350 L 560 330 L 640 320" strokeWidth="1.1" />
        <text x="72" y="392" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          L1 calm
        </text>
        <text x="600" y="392" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          L5 + climb
        </text>
      </g>
    </svg>
  );
}

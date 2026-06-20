"use client";

import { cn } from "@/lib/utils";

interface EscooterTirePressureGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: tyre pressure + wheel + mass → rolling mult → Wh/km.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterTirePressureGuideIllustration({
  className,
}: EscooterTirePressureGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-tire-pressure-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="estp-guide-title estp-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="estp-guide-title">E-scooter tyre pressure flow diagram</title>
      <desc id="estp-guide-desc">
        Inputs: current and recommended tyre pressure in bar, wheel diameter in
        inches, and rider mass. Process: under-inflation increases rolling
        resistance multiplier and watt-hours per kilometre. Output: adjusted
        Wh/km and range penalty percentage.
      </desc>

      <defs>
        <pattern
          id="bp-estp-grid-minor"
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
          id="bp-estp-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-estp-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-estp-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-estp-grid-major)"
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
        FIG. 1 — TYRE PRESSURE & ROLLING LOSS
      </text>
      <path
        d="M 34 52 H 360"
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
        filter="url(#bp-estp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Tyre pressure */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 168 Q 174 174 168 174 H 44 Q 38 174 36 168 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="130" r="22" strokeWidth="1" />
        <ellipse cx="72" cy="130" rx="28" ry="14" strokeWidth="0.8" opacity="0.7" />
        <path d="M 52 130 H 92" strokeWidth="0.6" opacity="0.5" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          tyre pressure
        </text>
        <text
          x="108"
          y="124"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2.8 bar
        </text>
        <text
          x="108"
          y="140"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          rec. 3.5 bar
        </text>
        <text
          x="48"
          y="162"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          flat patch ↑
        </text>

        {/* Wheel size */}
        <path
          d="M 36 186 Q 38 182 44 182 H 168 Q 174 182 176 188 V 228 Q 174 234 168 234 H 44 Q 38 234 36 228 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="208" r="16" strokeWidth="1" />
        <circle cx="72" cy="208" r="6" strokeWidth="0.7" />
        <text
          x="48"
          y="196"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          wheel
        </text>
        <text
          x="100"
          y="214"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          10″
        </text>

        {/* Rider mass */}
        <path
          d="M 36 244 Q 38 240 44 240 H 168 Q 174 240 176 246 V 294 Q 174 300 168 300 H 44 Q 38 300 36 294 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="262" r="8" strokeWidth="0.9" />
        <path d="M 72 270 V 284 M 62 276 H 82" strokeWidth="0.8" />
        <text
          x="48"
          y="254"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          rider
        </text>
        <text
          x="48"
          y="288"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          75 kg
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 130 H 218" strokeLinecap="round" />
        <path d="M 214 126 L 222 130 L 214 134" strokeLinejoin="round" />
        <path d="M 186 208 H 218" strokeLinecap="round" />
        <path d="M 214 204 L 222 208 L 214 212" />
        <path d="M 186 268 H 218" strokeLinecap="round" />
        <path d="M 214 264 L 222 268 L 214 272" />
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
        filter="url(#bp-estp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
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
          Rolling resistance
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Δbar = rec. − current
        </text>
        <text
          x="256"
          y="156"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          3.5 − 2.8 = 0.7 bar
        </text>
        <text
          x="256"
          y="180"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          mult = 1 + Δ × 0.35
        </text>
        <text
          x="256"
          y="200"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = 1.25× rolling
        </text>
        <text
          x="256"
          y="224"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh/km = 13 × mult × mass
        </text>
        <text
          x="256"
          y="248"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = 16.5 Wh/km
        </text>

        {/* Contact patch comparison */}
        <ellipse cx="360" cy="272" rx="18" ry="8" strokeWidth="0.9" />
        <text x="360" y="264" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          OK
        </text>
        <ellipse cx="420" cy="272" rx="26" ry="12" strokeWidth="0.9" />
        <text x="420" y="264" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          soft
        </text>
        <path d="M 384 272 H 394" strokeWidth="0.7" opacity="0.5" />
        <path d="M 390 268 L 394 272 L 390 276" strokeWidth="0.6" />

        <text
          x="256"
          y="292"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          small wheels amplify loss
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 190 H 518" strokeLinecap="round" />
        <path d="M 514 186 L 522 190 L 514 194" strokeLinejoin="round" />
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
        filter="url(#bp-estp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text
          x="612"
          y="118"
          textAnchor="middle"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          16.5
        </text>
        <text
          x="612"
          y="138"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Wh/km
        </text>

        {/* Range bar - penalty */}
        <text x="556" y="162" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          range
        </text>
        <path d="M 556 168 H 668" strokeWidth="0.6" opacity="0.4" />
        <path d="M 556 168 H 668" strokeWidth="1" />
        <path d="M 556 168 H 612" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="556" y="182" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          100%
        </text>
        <text x="600" y="182" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          ~75%
        </text>

        <text
          x="612"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          −25%
        </text>
        <text
          x="612"
          y="234"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          range penalty
        </text>
        <text
          x="612"
          y="256"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          vs. recommended PSI
        </text>
        <text
          x="612"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          inflate weekly — free range
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-estp-pencil)"
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
          8–10″ commuter tyres — each 0.7 bar low ≈ +25% Wh/km on small wheels
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          13 Wh/km
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1.25
        </text>
        <text x="175" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          16.5 Wh/km adjusted
        </text>
      </g>
    </svg>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface EscooterMaxSpeedGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: V + KV + wheel mm → RPM → km/h max speed.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterMaxSpeedGuideIllustration({
  className,
}: EscooterMaxSpeedGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-max-speed-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="esms-guide-title esms-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="esms-guide-title">E-scooter max speed flow diagram</title>
      <desc id="esms-guide-desc">
        Inputs: battery voltage, motor KV rating in RPM per volt, and wheel
        diameter in millimetres. Process: compute motor RPM, convert wheel
        rotation to ground distance per minute, then to kilometres per hour.
        Output: theoretical maximum speed.
      </desc>

      <defs>
        <pattern
          id="bp-esms-grid-minor"
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
          id="bp-esms-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-esms-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-esms-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-esms-grid-major)"
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
        FIG. 1 — E-SCOOTER MAX SPEED
      </text>
      <path
        d="M 34 52 H 300"
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
        filter="url(#bp-esms-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Battery voltage */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 132 Q 174 138 168 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="28" height="28" strokeWidth="0.9" rx="2" />
        <path d="M 60 108 H 72 M 60 116 H 72 M 60 124 H 72" strokeWidth="0.5" opacity="0.6" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          pack V
        </text>
        <text
          x="92"
          y="120"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          36 V
        </text>

        {/* Motor KV */}
        <path
          d="M 36 152 Q 38 148 44 148 H 168 Q 174 148 176 154 V 218 Q 174 224 168 224 H 44 Q 38 224 36 218 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="182" r="18" strokeWidth="1" />
        <path d="M 72 164 V 200 M 54 182 H 90" strokeWidth="0.6" opacity="0.5" />
        <path d="M 60 170 L 84 194 M 84 170 L 60 194" strokeWidth="0.5" opacity="0.4" />
        <text
          x="48"
          y="164"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          hub motor
        </text>
        <text
          x="100"
          y="186"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          12 KV
        </text>
        <text
          x="48"
          y="210"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          RPM / volt
        </text>

        {/* Wheel diameter */}
        <path
          d="M 36 238 Q 38 234 44 234 H 168 Q 174 234 176 240 V 294 Q 174 300 168 300 H 44 Q 38 300 36 294 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="264" r="20" strokeWidth="1" />
        <path d="M 52 264 H 92" strokeWidth="0.7" />
        <path d="M 72 244 V 284" strokeWidth="0.7" />
        <text
          x="48"
          y="250"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          wheel Ø
        </text>
        <text
          x="100"
          y="268"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          200 mm
        </text>
        <text
          x="48"
          y="288"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          ≈ 8″
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 115 H 218" strokeLinecap="round" />
        <path d="M 214 111 L 222 115 L 214 119" strokeLinejoin="round" />
        <path d="M 186 186 H 218" strokeLinecap="round" />
        <path d="M 214 182 L 222 186 L 214 190" />
        <path d="M 186 264 H 218" strokeLinecap="round" />
        <path d="M 214 260 L 222 264 L 214 268" />
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
        filter="url(#bp-esms-pencil)"
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
          RPM → ground speed
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          RPM = V × KV × 0.88
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
          36 × 12 × 0.88 = 380 RPM
        </text>
        <text
          x="256"
          y="180"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          C = π × Ø / 1000
        </text>
        <text
          x="256"
          y="200"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          km/h = (RPM÷60) × C × 3.6
        </text>
        <text
          x="256"
          y="224"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = 14.3 km/h
        </text>

        {/* Wheel rotation diagram */}
        <circle cx="380" cy="260" r="24" strokeWidth="1" />
        <path d="M 380 236 V 284 M 356 260 H 404" strokeWidth="0.6" opacity="0.5" />
        <path
          d="M 404 260 A 24 24 0 0 1 380 284"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <path d="M 408 260 H 432 M 432 260 L 428 256 M 432 260 L 428 264" strokeWidth="0.8" />
        <path d="M 440 272 H 460" strokeWidth="0.6" opacity="0.5" />

        <text
          x="256"
          y="288"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          small wheel = high RPM for same km/h
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
        filter="url(#bp-esms-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        {/* Speedometer */}
        <path
          d="M 572 148 Q 612 108 652 148"
          strokeWidth="1"
        />
        <path d="M 612 148 L 612 128" strokeWidth="1.2" />
        <path d="M 612 148 L 632 156" strokeWidth="1" />
        <text
          x="612"
          y="120"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          speedo
        </text>

        <text
          x="612"
          y="208"
          textAnchor="middle"
          fill="currentColor"
          fontSize="32"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          14.3
        </text>
        <text
          x="612"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          km/h
        </text>
        <text
          x="612"
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          theoretical max
        </text>
        <text
          x="612"
          y="274"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          loaded speed is lower
        </text>
        <text
          x="612"
          y="292"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          380 RPM @ 200 mm wheel
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-esms-pencil)"
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
          KV sets RPM per volt; wheel circumference converts spin to ground speed
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          (380÷60)
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          0.628 m
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="215" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          3.6
        </text>
        <text x="240" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="260" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          14.3 km/h
        </text>
      </g>
    </svg>
  );
}

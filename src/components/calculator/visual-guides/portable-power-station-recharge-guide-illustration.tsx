"use client";

import { cn } from "@/lib/utils";

interface PortablePowerStationRechargeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Wh capacity + input watts → wall/car/solar hours.
 * Modal only (not embedded in page DOM by default).
 */
export function PortablePowerStationRechargeGuideIllustration({
  className,
}: PortablePowerStationRechargeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "portable-power-station-recharge-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="pps-guide-title pps-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="pps-guide-title">Portable power station recharge flow diagram</title>
      <desc id="pps-guide-desc">
        Inputs: station capacity in watt-hours, wall AC input watts, car 12V
        input watts, solar MPPT watts, and charge efficiency. Process: divide
        capacity by effective input power for each path. Output: recharge hours
        for wall, car, and solar—fastest source highlighted.
      </desc>

      <defs>
        <pattern
          id="bp-pps-grid-minor"
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
          id="bp-pps-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-pps-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-pps-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-pps-grid-major)"
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
        FIG. 1 — POWER STATION RECHARGE
      </text>
      <path
        d="M 34 52 H 340"
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
        filter="url(#bp-pps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Capacity Wh */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 128 Q 174 134 168 134 H 44 Q 38 134 36 128 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="36" height="24" strokeWidth="0.9" rx="2" />
        <path d="M 60 108 H 80 M 60 116 H 80" strokeWidth="0.6" opacity="0.6" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          capacity
        </text>
        <text
          x="100"
          y="120"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1000 Wh
        </text>

        {/* Three input sources */}
        <path
          d="M 36 144 Q 38 140 44 140 H 168 Q 174 140 176 146 V 248 Q 174 254 168 254 H 44 Q 38 254 36 248 Z"
          strokeWidth="1.1"
        />
        {/* Wall AC */}
        <rect x="52" y="154" width="20" height="16" strokeWidth="0.7" rx="1" />
        <path d="M 58 162 H 66 M 62 158 V 166" strokeWidth="0.5" />
        <text
          x="80"
          y="166"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          600 W wall
        </text>
        {/* Car 12V */}
        <rect x="52" y="182" width="24" height="14" strokeWidth="0.7" rx="1" />
        <circle cx="64" cy="189" r="4" strokeWidth="0.6" />
        <text
          x="84"
          y="194"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          120 W car
        </text>
        {/* Solar MPPT */}
        <rect x="52" y="208" width="20" height="12" strokeWidth="0.7" />
        <path d="M 56 212 H 68 M 56 216 H 68" strokeWidth="0.4" opacity="0.6" />
        <circle cx="78" cy="214" r="6" strokeWidth="0.6" />
        <path d="M 78 206 V 202 M 78 222 V 226 M 70 214 H 66 M 86 214 H 90" strokeWidth="0.4" />
        <text
          x="92"
          y="218"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          200 W solar
        </text>
        <text
          x="48"
          y="152"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          input paths
        </text>

        {/* Charge efficiency */}
        <path
          d="M 36 264 Q 38 260 44 260 H 168 Q 174 260 176 266 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 280 H 156" strokeWidth="0.8" />
        <path d="M 52 280 H 144" strokeWidth="1.2" />
        <text
          x="48"
          y="274"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          charge η
        </text>
        <text
          x="48"
          y="296"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          90%
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 112 H 218" strokeLinecap="round" />
        <path d="M 214 108 L 222 112 L 214 116" strokeLinejoin="round" />
        <path d="M 186 196 H 218" strokeLinecap="round" />
        <path d="M 214 192 L 222 196 L 214 200" />
        <path d="M 186 282 H 218" strokeLinecap="round" />
        <path d="M 214 278 L 222 282 L 214 286" />
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
        filter="url(#bp-pps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 312 Q 476 320 468 320 H 228 Q 220 320 218 312 Z"
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
          Refill rate
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          h = Wh ÷ (W × η)
        </text>

        {/* Three parallel paths */}
        <text x="256" y="162" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.85">
          wall: 1000 ÷ (600 × 0.9)
        </text>
        <path d="M 256 168 H 420" strokeWidth="0.6" opacity="0.4" />
        <path d="M 256 168 H 280" strokeWidth="1.2" />
        <text x="428" y="172" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1.9 h
        </text>

        <text x="256" y="196" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.85">
          car: 1000 ÷ (120 × 0.9)
        </text>
        <path d="M 256 202 H 420" strokeWidth="0.6" opacity="0.4" />
        <path d="M 256 202 H 368" strokeWidth="1" />
        <text x="428" y="206" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          9.3 h
        </text>

        <text x="256" y="230" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.85">
          solar: 1000 ÷ (200 × 0.9)
        </text>
        <path d="M 256 236 H 420" strokeWidth="0.6" opacity="0.4" />
        <path d="M 256 236 H 328" strokeWidth="1" />
        <text x="428" y="240" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          5.6 h
        </text>

        {/* Power station filling */}
        <rect x="300" y="256" width="48" height="32" strokeWidth="0.9" rx="2" />
        <path d="M 308 264 H 340 M 308 272 H 336 M 308 280 H 340" strokeWidth="0.5" opacity="0.6" />
        <path d="M 348 272 H 380 M 380 272 L 376 268 M 380 272 L 376 276" strokeWidth="0.8" />
        <path d="M 388 258 H 420 V 286 H 388 Z" strokeWidth="0.7" />
        <path d="M 392 262 H 416 M 392 270 H 416 M 392 278 H 416" strokeWidth="0.4" opacity="0.5" />

        <text
          x="256"
          y="304"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          higher W = shorter refill time
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
        filter="url(#bp-pps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 312 Q 692 320 684 320 H 538 Q 530 320 528 312 Z"
          strokeWidth="1.3"
        />

        <text
          x="548"
          y="112"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          compare paths
        </text>

        {/* Wall - fastest */}
        <rect x="548" y="124" width="128" height="22" strokeWidth="1" rx="1" />
        <path d="M 556 135 H 620" strokeWidth="1.2" />
        <text x="556" y="130" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          wall AC
        </text>
        <text x="672" y="140" textAnchor="end" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="700">
          1.9 h
        </text>

        {/* Solar */}
        <rect x="548" y="156" width="128" height="22" strokeWidth="0.9" rx="1" />
        <path d="M 556 167 H 600" strokeWidth="1" />
        <text x="556" y="162" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          solar MPPT
        </text>
        <text x="672" y="172" textAnchor="end" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          5.6 h
        </text>

        {/* Car - slowest */}
        <rect x="548" y="188" width="128" height="22" strokeWidth="0.9" rx="1" />
        <path d="M 556 199 H 640" strokeWidth="0.9" />
        <text x="556" y="194" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          car 12V
        </text>
        <text x="672" y="204" textAnchor="end" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          9.3 h
        </text>

        <text
          x="612"
          y="238"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          fastest: wall
        </text>
        <text
          x="612"
          y="258"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          1000 Wh full refill
        </text>
        <text
          x="612"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          solar assumes good sun @ rated W
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-pps-pencil)"
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
          effective power = input W × charge efficiency (heat & conversion loss)
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1000 Wh
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="150" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          540 W eff.
        </text>
        <text x="220" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="240" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          ~1.9 h wall recharge
        </text>
      </g>
    </svg>
  );
}

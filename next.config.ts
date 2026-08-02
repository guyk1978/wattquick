import type { NextConfig } from "next";

/** Set ENABLE_API_ROUTES=1 on Cloudflare Pages for joinmypdf.com (server/API deploy). */
const enableApiRoutes = process.env.ENABLE_API_ROUTES === "1";

/** Parents allowed to embed WattQuick (Device Preview on JoinMyPDF + local dev). */
const FRAME_ANCESTORS = [
  "'self'",
  "https://joinmypdf.com",
  "https://www.joinmypdf.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
].join(" ");

const nextConfig: NextConfig = {
  ...(enableApiRoutes ? {} : { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prefer CSP frame-ancestors (multi-origin). Avoid X-Frame-Options here.
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${FRAME_ANCESTORS}`,
          },
          // Let COEP parents (JoinMyPDF) load this document in an iframe.
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
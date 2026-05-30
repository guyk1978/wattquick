import type { NextConfig } from "next";

/** Set ENABLE_API_ROUTES=1 on Cloudflare Pages for joinmypdf.com (server/API deploy). */
const enableApiRoutes = process.env.ENABLE_API_ROUTES === "1";

const nextConfig: NextConfig = {
  ...(enableApiRoutes ? {} : { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
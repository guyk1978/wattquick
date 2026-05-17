import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mah-to-wh",
        destination: "/ah-to-wh",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

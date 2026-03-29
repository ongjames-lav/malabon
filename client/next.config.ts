import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 🔥 REQUIRED for GitHub Pages

  images: {
    unoptimized: true, // 🔥 REQUIRED
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

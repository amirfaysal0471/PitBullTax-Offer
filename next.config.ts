import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't auto-generate AI agent instruction files during `next dev`.
  agentRules: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;

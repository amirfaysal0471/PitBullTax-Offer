import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't auto-generate AI agent instruction files during `next dev`.
  agentRules: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "embed-ssl.wistia.com", pathname: "/deliveries/**" },
    ],
  },
};

export default nextConfig;

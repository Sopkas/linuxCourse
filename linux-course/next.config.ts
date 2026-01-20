import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Headers required for v86 (SharedArrayBuffer needs COOP/COEP)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

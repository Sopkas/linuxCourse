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

  // Performance optimizations
  experimental: {
    // Use optimized package imports for faster builds
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-dialog', '@radix-ui/react-progress', '@radix-ui/react-tabs'],
  },

  // Disable source maps in development for faster builds
  productionBrowserSourceMaps: false,
};

export default nextConfig;

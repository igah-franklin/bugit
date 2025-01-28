import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
},
typescript: {
    // Warning: This allows production builds to complete even with TypeScript errors.
    ignoreBuildErrors: true,
},
};

export default nextConfig;

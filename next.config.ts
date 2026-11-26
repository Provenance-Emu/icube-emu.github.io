import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@provenance-emu/web-media'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

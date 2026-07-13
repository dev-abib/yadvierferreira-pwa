import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MB
});

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/**",
      },
    ],
  },
};

export default withSerwist(nextConfig);

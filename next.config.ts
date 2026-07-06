import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MB (default is 2 MB)
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
};

export default withSerwist(nextConfig);

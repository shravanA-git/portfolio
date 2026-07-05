import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;

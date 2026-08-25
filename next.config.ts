import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    localPatterns: [{ pathname: "/images/**" }],
  },
  // Both apex and www are attached to the Vercel project, so without this they
  // would serve the same pages under two hostnames. Apex is canonical (it is
  // what SITE_URL, the sitemap, and the JSON-LD all point at).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shravananand.me" }],
        destination: "https://shravananand.me/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

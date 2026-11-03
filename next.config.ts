import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/courses/engineering", destination: "/study-india/engineering-and-technology", permanent: true }];
  },
};

export default nextConfig;

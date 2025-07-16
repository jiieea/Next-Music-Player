import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzuhysklzfdakusuyaen.supabase.co",
        port: "", // Leave empty if no specific port is used
        pathname: "/storage/v1/object/public/**", // This is crucial for Supabase
      },
    ],
  },
};

export default nextConfig;
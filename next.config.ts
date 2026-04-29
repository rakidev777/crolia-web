import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/d",
        destination: "/demo",
        permanent: false, // false = 307, fácil de cambiar destino en el futuro
      },
    ];
  },
};

export default nextConfig;

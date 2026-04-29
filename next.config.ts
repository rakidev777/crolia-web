import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // /d es manejado por app/d/route.ts para loguear escaneos del QR antes de redirigir a /demo
};

export default nextConfig;

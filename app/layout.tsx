import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk-loaded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crolia | IA, Automatización y Desarrollo Web",
  description:
    "Agentes de IA, automatización de procesos, sitios web y sistemas a medida para negocios que quieren crecer. Tecnología accesible para cualquier empresa.",
  icons: {
    icon: "/favicon.svg",
    apple: "/crolia-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full scroll-smooth antialiased ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

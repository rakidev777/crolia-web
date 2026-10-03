import type { Metadata } from "next";
import VigiaLiteLanding from "./vigia-lite-landing";

export const metadata: Metadata = {
  title: "Vigía Lite — Gestión para tu comercio desde $40.000/mes | Crolia",
  description: "Ventas, clientes, créditos, stock y caja en un solo sistema. Probá 7 días gratis, sin tarjeta.",
  openGraph: {
    title: "Vigía Lite — El sistema de gestión para tu comercio",
    description: "Ventas, clientes, créditos, stock y caja. Probá 7 días gratis.",
    url: "https://www.crolia.com.ar/vigia-lite",
  },
};

export default function VigiaLitePage() {
  return <VigiaLiteLanding />;
}

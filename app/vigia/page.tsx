import type { Metadata } from "next";
import VigiaLanding from "./vigia-landing";

export const metadata: Metadata = {
  title: "Vigía — Sistema de gestión inteligente para comercios | Crolia",
  description: "POS, stock, clientes, cuotas, caja, presupuestos y más. Todo en un sistema moderno, rápido y accesible desde cualquier dispositivo.",
  openGraph: {
    title: "Vigía — Gestión inteligente para tu comercio",
    description: "POS, stock, clientes, cuotas, caja y más. El sistema que tu negocio necesitaba.",
    url: "https://www.crolia.com.ar/vigia",
  },
};

export default function VigiaPage() {
  return <VigiaLanding />;
}

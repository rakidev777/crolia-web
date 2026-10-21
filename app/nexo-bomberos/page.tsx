import type { Metadata } from "next";
import NexoLanding from "./nexo-landing";

export const metadata: Metadata = {
  title: "Nexo — Colaboradores con cobro automático para tu cuartel | Crolia",
  description: "Aportes mensuales de tus vecinos, sin intermediarios. Cobro automático por Mercado Pago, directo a la cuenta de tu institución.",
  openGraph: {
    title: "Nexo — Colaboradores con cobro automático para tu cuartel",
    description: "Aportes mensuales de tus vecinos, sin intermediarios. Cobro automático por Mercado Pago, directo a la cuenta de tu institución.",
    url: "https://www.crolia.com.ar/nexo-bomberos",
  },
};

export default function NexoPage() {
  return <NexoLanding />;
}

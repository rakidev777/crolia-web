import type { Metadata } from "next";
import PrimerosPasosContent from "./primeros-pasos-content";

export const metadata: Metadata = {
  title: "Primeros pasos — Vigía Lite | Crolia",
  robots: { index: false },
};

export default function PrimerosPasosPage() {
  return <PrimerosPasosContent />;
}

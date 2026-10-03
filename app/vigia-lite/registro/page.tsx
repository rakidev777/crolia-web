import type { Metadata } from "next";
import RegistroForm from "./registro-form";

export const metadata: Metadata = {
  title: "Creá tu cuenta — Vigía Lite | Crolia",
  robots: { index: false },
};

export default function RegistroPage() {
  return <RegistroForm />;
}

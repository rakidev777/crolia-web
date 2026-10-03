"use client";
import Link from "next/link";

const BRAND = "#8a6448";
const BRAND_DARK = "#5d3e2e";

type Paso = { title: string; desc: string; items: string[] };

const CONFIGURACION: Paso[] = [
  {
    title: "1. Métodos de pago",
    desc: "Andá a Configuración → Formas de pago y activá las que usás en tu negocio.",
    items: [
      "Efectivo, transferencia, débito, crédito y cuotas propias (3, 6, 9, 12 cuotas)",
      "Para cada forma en cuotas, definí la tasa o el coeficiente que aplicás",
      "Podés ocultar las que no usás — solo aparecen en el punto de venta las que estén activas",
    ],
  },
  {
    title: "2. Locales",
    desc: "Si operás en más de un local o depósito, cargalos antes de seguir.",
    items: [
      "Configuración → Locales → + Nuevo local",
      "Cada venta y cada movimiento de stock queda asociado a un local específico",
      "Si tenés un solo local, usá el que ya viene creado por defecto",
    ],
  },
  {
    title: "3. Usuarios y permisos",
    desc: "Cargá a las personas que van a usar el sistema con vos.",
    items: [
      "Usuarios → Nuevo usuario — nombre, email y contraseña inicial",
      "Elegí el rol de cada uno (vendedor, encargado, dueño) según lo que necesite hacer",
      "Permisos → ajustá qué puede ver y hacer cada rol si hace falta algo más específico",
    ],
  },
];

const OPERAR: Paso[] = [
  {
    title: "4. Cargar productos",
    desc: "Productos → Nuevo producto, o importá tu lista existente.",
    items: [
      "Código, nombre, precio de costo y precio de venta",
      "Stock inicial por local (si tenés más de uno)",
      "Opcional: código de barras (EAN) para usar lectora en el punto de venta",
    ],
  },
  {
    title: "5. Hacer tu primera venta",
    desc: "Ventas → Nueva venta — así se ve el día a día real del sistema.",
    items: [
      "Buscá el producto y agregalo al carrito",
      "Elegí la forma de pago (podés combinar varias en la misma venta)",
      "Confirmá — el comprobante queda listo para imprimir o mandar por WhatsApp",
    ],
  },
  {
    title: "6. Vender en cuotas / crear un crédito",
    desc: "Si tu cliente paga en cuotas, el crédito se arma solo al confirmar la venta.",
    items: [
      "El cliente necesita teléfono y DNI/CUIT cargados antes de vender en cuotas",
      "Elegís la forma de pago en cuotas al armar el carrito — el crédito se crea automático",
      "Seguimiento de vencimientos y cobros desde el módulo de Créditos",
    ],
  },
  {
    title: "7. Caja diaria",
    desc: "Abrí la caja al empezar el día y cerrala al terminar.",
    items: [
      "Caja → Abrir caja (con el efectivo inicial de cada local)",
      "Todas las ventas del día quedan reflejadas ahí en tiempo real",
      "Al cerrar, el sistema te muestra el arqueo — lo que debería haber vs. lo que contaste",
    ],
  },
];

export default function PrimerosPasosContent() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#faf9f7", color: "#1a1a1a" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(138,100,72,0.1)", padding: "0 5%",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: BRAND, fontFamily: "'Space Grotesk', sans-serif" }}>Vigía</span>
            <span style={{ fontSize: "0.75rem", color: "#aaa" }}>Primeros pasos</span>
          </div>
          <Link href="/vigia-lite" style={{ fontSize: "0.82rem", color: "#999", textDecoration: "none" }}>Volver a Vigía Lite</Link>
        </div>
      </nav>

      <section style={{
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #3a251c 100%)`,
        padding: "56px 5% 48px", color: "white", textAlign: "center",
      }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, marginBottom: 14 }}>
          Guía de primeros pasos
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
          7 pasos para dejar Vigía listo y empezar a operar hoy mismo. No hace falta hacerlos
          todos de una — podés volver a esta página cuando quieras.
        </p>
      </section>

      <section style={{ padding: "48px 5% 16px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
          Antes de vender — configuración inicial
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {CONFIGURACION.map((p) => (
            <div key={p.title} style={{ background: "white", border: "1px solid rgba(138,100,72,0.12)", borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: "0.88rem", color: "#777", marginBottom: 12 }}>{p.desc}</div>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {p.items.map((it) => (
                  <li key={it} style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6 }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "32px 5% 48px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
          Ya está todo listo — a operar
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {OPERAR.map((p) => (
            <div key={p.title} style={{ background: "white", border: "1px solid rgba(138,100,72,0.12)", borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: "0.88rem", color: "#777", marginBottom: 12 }}>{p.desc}</div>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {p.items.map((it) => (
                  <li key={it} style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6 }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 5% 72px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          background: "#f8f4ef", border: "1px dashed rgba(138,100,72,0.3)", borderRadius: 16,
          padding: "28px 32px", textAlign: "center",
        }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>¿Necesitás más detalle de alguna función?</div>
          <p style={{ fontSize: "0.88rem", color: "#777", lineHeight: 1.6, marginBottom: 18 }}>
            Dentro del sistema tenés el manual completo, con cada módulo explicado paso a paso.
          </p>
          <a href="https://wa.me/5491173729899?text=Hola%2C%20tengo%20una%20duda%20usando%20Vig%C3%ADa" target="_blank" rel="noreferrer" style={{
            display: "inline-block", background: BRAND, color: "white", padding: "12px 26px",
            borderRadius: 999, textDecoration: "none", fontSize: "0.85rem", fontWeight: 700,
          }}>Escribinos por WhatsApp →</a>
        </div>
      </section>
    </div>
  );
}

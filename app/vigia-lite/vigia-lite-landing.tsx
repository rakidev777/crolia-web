"use client";
import { useState } from "react";
import Link from "next/link";

const BRAND = "#8a6448";
const BRAND_DARK = "#5d3e2e";

const MODULOS_LITE = [
  { icon: "🛒", title: "Punto de Venta", desc: "Vendé rápido, con cuotas y varios medios de pago en el mismo ticket." },
  { icon: "👥", title: "Clientes", desc: "Ficha de cada cliente, historial de compras y cuenta corriente." },
  { icon: "🏦", title: "Créditos y cuotas", desc: "Vencimientos, alertas y cupón imprimible por cuota." },
  { icon: "📦", title: "Stock de productos", desc: "Control de inventario con alertas de mínimo en el momento de vender." },
  { icon: "💰", title: "Caja diaria", desc: "Apertura, cierre y arqueo de efectivo, sin planillas aparte." },
];

const FULL_LOCKED = [
  "Facturación ARCA", "Rentabilidad y márgenes", "CRM + Agente IA por WhatsApp",
  "Presupuestos", "Compras y proveedores", "Métricas de equipo",
];

const TIERS = [
  { id: "tier1", nombre: "Lite — Tier 1", precio: "$40.000", sub: "por mes", detalle: "hasta ~100 operaciones/mes", destacado: false },
  { id: "tier2", nombre: "Lite — Tier 2", precio: "$60.000", sub: "por mes", detalle: "hasta ~250 operaciones/mes", destacado: true },
  { id: "tier3", nombre: "Lite — Tier 3", precio: "$90.000", sub: "por mes", detalle: "hasta ~500 operaciones/mes", destacado: false },
];

export default function VigiaLiteLanding() {
  const [scrollY] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#faf9f7", color: "#1a1a1a" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(138,100,72,0.1)",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: BRAND, fontFamily: "'Space Grotesk', sans-serif" }}>Vigía</span>
            <span style={{ fontSize: "0.75rem", color: "#aaa" }}>Lite · by Crolia</span>
          </div>
          <Link href="/vigia-lite/registro" style={{
            background: BRAND, color: "white", padding: "9px 20px", borderRadius: 999,
            textDecoration: "none", fontSize: "0.88rem", fontWeight: 700,
            boxShadow: `0 4px 14px ${BRAND}40`,
          }}>Probar 7 días gratis</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #3a251c 50%, #1a0f08 100%)`,
        padding: "70px 5% 60px", color: "white", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 999, padding: "6px 16px", marginBottom: 22,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>7 días gratis · sin tarjeta · activación inmediata</span>
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
          fontWeight: 800, lineHeight: 1.1, marginBottom: 18, maxWidth: 780, marginLeft: "auto", marginRight: "auto",
        }}>
          El sistema de gestión para tu comercio, <span style={{ color: "#e3c9a8" }}>sin pagar de más</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.6 }}>
          Vigía Lite es la misma tecnología de Vigía, con los módulos que un comercio en crecimiento
          realmente usa todos los días: ventas, clientes, créditos, stock y caja.
        </p>
        <Link href="/vigia-lite/registro" style={{
          display: "inline-block", background: "white", color: BRAND_DARK,
          padding: "14px 32px", borderRadius: 999, textDecoration: "none",
          fontSize: "1rem", fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}>Crear mi cuenta de prueba →</Link>
      </section>

      {/* MÓDULOS INCLUIDOS */}
      <section style={{ padding: "64px 5%", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Qué incluye Lite
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 800 }}>
            Todo lo esencial para operar hoy mismo
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {MODULOS_LITE.map((m) => (
            <div key={m.title} style={{ background: "white", border: "1px solid rgba(138,100,72,0.12)", borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>{m.title}</div>
              <div style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UPSELL FULL */}
      <section style={{ padding: "0 5% 64px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          background: "#f8f4ef", border: "1px dashed rgba(138,100,72,0.3)", borderRadius: 16,
          padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8 }}>
              Cuando tu negocio crezca, está Vigía Full 🔒
            </div>
            <div style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.6 }}>
              {FULL_LOCKED.join(" · ")}
            </div>
          </div>
          <a href="https://wa.me/5491173729899?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20Vig%C3%ADa%20Full" target="_blank" rel="noreferrer" style={{
            background: BRAND, color: "white", padding: "10px 22px", borderRadius: 999,
            textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, whiteSpace: "nowrap",
          }}>Hablar con un asesor</a>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" style={{ padding: "64px 5% 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Precios
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 800, marginBottom: 10 }}>
            Pagás según cuánto operás, no de más
          </h2>
          <p style={{ color: "#777", fontSize: "0.95rem" }}>Subís de escalón cuando tu negocio lo necesita. Nunca te quedamos pagando de más.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {TIERS.map((t) => (
            <div key={t.id} style={{
              background: t.destacado ? BRAND_DARK : "white", color: t.destacado ? "white" : "#1a1a1a",
              border: t.destacado ? "none" : "1px solid rgba(138,100,72,0.12)",
              borderRadius: 18, padding: "28px 24px", textAlign: "center",
              boxShadow: t.destacado ? "0 16px 40px rgba(93,62,46,0.3)" : "none",
              transform: t.destacado ? "scale(1.03)" : "none",
            }}>
              {t.destacado && (
                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e3c9a8", marginBottom: 10 }}>
                  Más elegido
                </div>
              )}
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 14, opacity: t.destacado ? 0.9 : 0.7 }}>{t.nombre}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.2rem", fontWeight: 800 }}>{t.precio}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7, marginBottom: 14 }}>{t.sub}</div>
              <div style={{ fontSize: "0.82rem", opacity: 0.8 }}>{t.detalle}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/vigia-lite/registro" style={{
            display: "inline-block", background: BRAND, color: "white",
            padding: "14px 36px", borderRadius: 999, textDecoration: "none",
            fontSize: "1rem", fontWeight: 700, boxShadow: `0 8px 24px ${BRAND}40`,
          }}>Empezar prueba gratuita de 7 días →</Link>
          <div style={{ fontSize: "0.8rem", color: "#999", marginTop: 12 }}>Sin tarjeta. Accedés al instante.</div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Link from "next/link";

const BRAND = "#8a6448";
const BRAND_DARK = "#5d3e2e";

const MODULOS_LITE = [
  { icon: "🛒", title: "Punto de Venta", desc: "Vendé rápido, con cuotas y varios medios de pago en el mismo ticket." },
  { icon: "👥", title: "Clientes", desc: "Ficha de cada cliente, historial de compras y cuenta corriente. Sin límite de clientes, nunca." },
  { icon: "🏦", title: "Créditos y cuotas", desc: "Vencimientos, alertas y cupón imprimible por cuota." },
  { icon: "📦", title: "Stock de productos", desc: "Control de inventario con alertas de mínimo en el momento de vender." },
  { icon: "💰", title: "Caja diaria", desc: "Apertura, cierre y arqueo de efectivo, sin planillas aparte." },
];

const FULL_LOCKED = [
  { icon: "🧾", title: "Facturación ARCA", desc: "Factura A, B y C con CAE en tiempo real, sin salir de la venta." },
  { icon: "📈", title: "Rentabilidad y márgenes", desc: "Cuánto ganás de verdad, por producto y por período." },
  { icon: "💬", title: "CRM + Agente IA WhatsApp", desc: "Un agente que vende y cobra solo por WhatsApp, 24/7." },
  { icon: "📋", title: "Presupuestos", desc: "Armá, enviá y convertí presupuestos a venta con un clic." },
  { icon: "🏭", title: "Compras y proveedores", desc: "Órdenes de compra y cuenta corriente con tus proveedores." },
  { icon: "🏆", title: "Métricas de equipo", desc: "Ranking de vendedores, ticket promedio y performance." },
  { icon: "🚚", title: "Envíos y retiro en sucursal", desc: "Seguimiento de estado de cada envío o retiro, en tiempo real." },
  { icon: "🤖", title: "Asistente IA", desc: "Preguntale al sistema en lenguaje natural — 'quién me debe más'." },
];

const CATEGORIAS = [
  { id: "cat1", nombre: "Categoría 1", precio: "$45.000", detalle: "hasta 30 ventas por mes", destacado: false },
  { id: "cat2", nombre: "Categoría 2", precio: "$75.000", detalle: "hasta 75 ventas por mes", destacado: true },
  { id: "cat3", nombre: "Categoría 3", precio: "$95.000", detalle: "hasta 200 ventas por mes", destacado: false },
];

export default function VigiaLiteLanding() {
  const waFull = "https://wa.me/5491173729899?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20Vig%C3%ADa%20Full";
  const waAddon = "https://wa.me/5491173729899?text=Hola%2C%20estoy%20usando%20Vig%C3%ADa%20Lite%20y%20quiero%20consultar%20por%20una%20funci%C3%B3n%20de%20Vig%C3%ADa%20Full%20para%20mi%20plan";

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
      <section style={{ padding: "64px 5% 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Qué incluye Lite
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 800 }}>
            Todo lo esencial para operar hoy mismo
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 16 }}>
          {MODULOS_LITE.map((m) => (
            <div key={m.title} style={{ background: "white", border: "1px solid rgba(138,100,72,0.12)", borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>{m.title}</div>
              <div style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ACLARACIÓN DE LÍMITES */}
      <section style={{ padding: "24px 5% 64px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 800 }}>
            ¿Qué cuenta como "operación"?
          </h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <div style={{ background: "#f8f4ef", borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>🛒</div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 6 }}>Solo las ventas</div>
            <div style={{ fontSize: "0.83rem", color: "#777", lineHeight: 1.6 }}>
              Cada venta que registrás cuenta una vez — sea en efectivo o en cuotas. Vender en
              cuotas no suma doble, aunque esa venta genere un crédito automáticamente.
            </div>
          </div>
          <div style={{ background: "#f8f4ef", borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>👥</div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 6 }}>Clientes: ilimitados</div>
            <div style={{ fontSize: "0.83rem", color: "#777", lineHeight: 1.6 }}>
              Sin tope, en cualquier categoría. Cargá todos los clientes que necesites, siempre.
            </div>
          </div>
          <div style={{ background: "#f8f4ef", borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>📦</div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 6 }}>Productos: límite amplio</div>
            <div style={{ fontSize: "0.83rem", color: "#777", lineHeight: 1.6 }}>
              Crece con cada categoría (150 a 800 productos cargados) — pensado para que no te
              quede corto en el uso normal del día a día.
            </div>
          </div>
        </div>
      </section>

      {/* UPSELL FULL — grilla de módulos bloqueados */}
      <section style={{ padding: "0 5% 64px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Cuando tu negocio esté listo
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 800, marginBottom: 10 }}>
            Todo esto te espera en Vigía Full 🔒
          </h2>
          <p style={{ color: "#777", fontSize: "0.95rem", maxWidth: 560, margin: "0 auto" }}>
            Lite te hace arrancar liviano. Full es el sistema completo — el que usan los negocios que
            ya no quieren perder tiempo ni plata en nada manual.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
          {FULL_LOCKED.map((m) => (
            <div key={m.title} style={{
              background: "white", border: "1px solid rgba(138,100,72,0.12)", borderRadius: 14,
              padding: "20px 18px", position: "relative", opacity: 0.92,
            }}>
              <div style={{ position: "absolute", top: 14, right: 14, fontSize: "0.8rem", opacity: 0.4 }}>🔒</div>
              <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 6 }}>{m.title}</div>
              <div style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <a href={waFull} target="_blank" rel="noreferrer" style={{
            display: "inline-block", background: BRAND, color: "white", padding: "13px 30px",
            borderRadius: 999, textDecoration: "none", fontSize: "0.92rem", fontWeight: 700,
            boxShadow: `0 8px 20px ${BRAND}40`,
          }}>Quiero saber más de Vigía Full →</a>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" style={{ padding: "64px 5% 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: BRAND, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Precios
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 800, marginBottom: 10 }}>
            Pagás según cuánto operás, no de más
          </h2>
          <p style={{ color: "#777", fontSize: "0.95rem" }}>Subís de categoría cuando tu negocio lo necesita. Nunca pagás de más.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 20 }}>
          {CATEGORIAS.map((c) => (
            <div key={c.id} style={{
              background: c.destacado ? BRAND_DARK : "white", color: c.destacado ? "white" : "#1a1a1a",
              border: c.destacado ? "none" : "1px solid rgba(138,100,72,0.12)",
              borderRadius: 18, padding: "28px 24px", textAlign: "center",
              boxShadow: c.destacado ? "0 16px 40px rgba(93,62,46,0.3)" : "none",
              transform: c.destacado ? "scale(1.03)" : "none",
            }}>
              {c.destacado && (
                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e3c9a8", marginBottom: 10 }}>
                  Más elegida
                </div>
              )}
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 14, opacity: c.destacado ? 0.9 : 0.7 }}>{c.nombre}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.2rem", fontWeight: 800 }}>{c.precio}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7, marginBottom: 14 }}>por mes</div>
              <div style={{ fontSize: "0.82rem", opacity: 0.8 }}>{c.detalle}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", fontSize: "0.82rem", color: "#888", marginBottom: 32, lineHeight: 1.7 }}>
          + implementación única de <strong>$400.000</strong> — de una vez o en 2 cuotas de $200.000.
        </div>

        {/* CATEGORÍA FULL — color diferenciado */}
        <div style={{
          background: `linear-gradient(135deg, #1a0f08 0%, ${BRAND_DARK} 100%)`, color: "white",
          borderRadius: 18, padding: "28px 32px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 24, flexWrap: "wrap",
          border: `1px solid ${BRAND}50`,
        }}>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e3c9a8", marginBottom: 8 }}>
              Más de 200 operaciones por mes
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 800, marginBottom: 6 }}>
              Vigía Full — el sistema completo
            </div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
              Facturación ARCA, CRM con Agente IA, rentabilidad, compras, métricas de equipo y mucho más.
            </div>
          </div>
          <a href={waFull} target="_blank" rel="noreferrer" style={{
            background: "white", color: BRAND_DARK, padding: "12px 26px", borderRadius: 999,
            textDecoration: "none", fontSize: "0.88rem", fontWeight: 700, whiteSpace: "nowrap",
          }}>Quiero conocer Full →</a>
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

      {/* ¿TE FALTA ALGO? */}
      <section style={{ padding: "0 5% 80px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{
          background: "#f8f4ef", border: "1px dashed rgba(138,100,72,0.3)", borderRadius: 16,
          padding: "28px 32px", textAlign: "center",
        }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>
            ¿Ya tenés tu plan Lite y te falta una función puntual de Full?
          </div>
          <p style={{ fontSize: "0.88rem", color: "#777", lineHeight: 1.6, marginBottom: 18, maxWidth: 560, margin: "0 auto 18px" }}>
            Muchas veces no hace falta pasar a Full completo — con que un emprendedor en crecimiento
            nos cuente qué necesita, podemos ofrecerte esa función suelta sobre tu plan actual.
          </p>
          <a href={waAddon} target="_blank" rel="noreferrer" style={{
            display: "inline-block", background: BRAND, color: "white", padding: "11px 26px",
            borderRadius: 999, textDecoration: "none", fontSize: "0.85rem", fontWeight: 700,
          }}>Contactanos, podemos ofrecerte algo más →</a>
        </div>
      </section>
    </div>
  );
}

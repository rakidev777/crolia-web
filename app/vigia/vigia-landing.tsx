"use client";
import { useEffect, useRef, useState } from "react";

const BRAND = "#8a6448";
const BRAND_DARK = "#5d3e2e";
const BRAND_LIGHT = "#c4a882";

function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) {
  const count = useCountUp(value, 1800, trigger);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2.8rem", fontWeight: 800, color: BRAND, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
        {count.toLocaleString("es-AR")}{suffix}
      </div>
      <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "6px", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

const MODULES = [
  { icon: "🛒", title: "Punto de Venta (POS)", desc: "Buscador instantáneo, cuotas, split de pago, descuentos y comprobante en segundos.", color: "#22c55e" },
  { icon: "👥", title: "Clientes y Cta. Corriente", desc: "Ficha completa, historial, saldo en tiempo real y contacto directo por WhatsApp.", color: "#3b82f6" },
  { icon: "🏦", title: "Préstamos y Cuotas", desc: "Control de cuotas con vencimientos, alertas automáticas y registro de pagos.", color: "#8b5cf6" },
  { icon: "📦", title: "Stock e Inventario", desc: "Stock por local, transferencias, ingresos y alertas de mínimo en el POS.", color: "#f59e0b" },
  { icon: "📊", title: "Dashboard en tiempo real", desc: "Ventas, métodos de pago, top productos, deudores y comparativo semanal.", color: "#ec4899" },
  { icon: "💰", title: "Caja diaria", desc: "Apertura, cierre y arqueo de efectivo por local con historial completo.", color: "#10b981" },
  { icon: "📋", title: "Presupuestos", desc: "Creá, enviá por WhatsApp y convertí a venta con un solo clic.", color: "#f97316" },
  { icon: "🧾", title: "Facturación ARCA", desc: "Facturas A, B y C con CAE en tiempo real integradas al flujo de venta.", color: "#06b6d4" },
  { icon: "💬", title: "CRM + Agente IA WhatsApp", desc: "Agente IA que atiende, vende y cobra por WhatsApp 24/7, con bandeja centralizada y conexión total al sistema.", color: "#a855f7" },
  { icon: "👤", title: "Usuarios y Permisos", desc: "5 roles, permisos por acción, auditoría completa de quién hizo qué.", color: "#64748b" },
  { icon: "🤖", title: "Asistente IA Crolia", desc: "Consultá datos del negocio en lenguaje natural. Respuestas con tus propios datos.", color: "#7c3aed" },
  { icon: "📈", title: "Google Sheets Sync", desc: "Actualizá precios y stock desde tu planilla de Google automáticamente.", color: "#16a34a" },
];

export default function VigiaLanding() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveModule((m) => (m + 1) % MODULES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#faf9f7", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(138,100,72,0.1)" : "none",
        transition: "all 0.3s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="40" viewBox="0 0 36 52" fill="none">
              <line x1="18" y1="6" x2="18" y2="0" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8"/>
              <line x1="18" y1="6" x2="28" y2="1" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
              <line x1="18" y1="6" x2="8" y2="1" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
              <path d="M12 12 L18 6 L24 12 Z" fill={BRAND}/>
              <rect x="11" y="12" width="14" height="7" rx="0.5" fill={BRAND}/>
              <path d="M13 19 L11 42 L25 42 L23 19 Z" fill={BRAND} fillOpacity="0.8"/>
              <rect x="8" y="42" width="20" height="5" rx="1" fill={BRAND}/>
              <rect x="5" y="47" width="26" height="3" rx="1" fill={BRAND} fillOpacity="0.6"/>
            </svg>
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: BRAND, fontFamily: "'Space Grotesk', sans-serif" }}>Vigía</span>
            <span style={{ fontSize: "0.75rem", color: "#aaa", marginLeft: 4 }}>by Crolia</span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#modulos" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Módulos</a>
            <a href="#como-funciona" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>¿Cómo funciona?</a>
            <a href="#contacto" style={{
              background: BRAND, color: "white", padding: "8px 20px", borderRadius: 999,
              textDecoration: "none", fontSize: "0.88rem", fontWeight: 600,
              boxShadow: `0 4px 14px ${BRAND}40`,
            }}>Quiero una demo</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #3a251c 40%, #1a0f08 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "100px 5% 60px",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "15%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: `${BRAND}20`, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "#ffffff08", filter: "blur(60px)", pointerEvents: "none" }} />
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999, padding: "6px 16px", marginBottom: 28,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontWeight: 500 }}>Sistema activo en comercios reales</span>
            </div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
              fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 20,
            }}>
              El sistema que<br />
              <span style={{ color: BRAND_LIGHT }}>tu comercio</span><br />
              necesitaba
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Vigía unifica ventas, stock, clientes, cuotas, caja y más en una sola plataforma. Rápido, moderno y accesible desde cualquier dispositivo.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#contacto" style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                color: "white", padding: "14px 32px", borderRadius: 12,
                textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                boxShadow: `0 8px 30px ${BRAND}50`,
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Quiero una demo →
              </a>
              <a href="#modulos" style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", padding: "14px 28px", borderRadius: 12,
                textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              }}>
                Ver módulos
              </a>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
              {[["Punto de Venta", "✓"], ["Cuotas automáticas", "✓"], ["Multi-local", "✓"], ["IA integrada", "✓"]].map(([label, check]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>{check}</span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            }}>
              {/* Browser bar */}
              <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 22, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>vigia-jys.crolia.com.ar/dashboard</span>
                </div>
              </div>
              {/* Dashboard UI */}
              <div style={{ padding: "16px", background: "#f5f3f0" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#333" }}>Buenos días, Nacho 👋</div>
                    <div style={{ fontSize: "0.68rem", color: "#aaa" }}>Lunes, 8 de junio</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ background: BRAND, borderRadius: 8, padding: "4px 10px" }}>
                      <div style={{ fontSize: "0.65rem", color: "white", fontWeight: 600 }}>+ Nueva venta</div>
                    </div>
                  </div>
                </div>
                {/* KPI cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
                  {[
                    { label: "Ventas hoy", value: "$896.272", color: "#22c55e", sub: "9 ventas" },
                    { label: "Esta semana", value: "$2.7M", color: "#3b82f6", sub: "+12%" },
                    { label: "Préstamos", value: "4 activos", color: "#f59e0b", sub: "2 vencen hoy" },
                  ].map(k => (
                    <div key={k.label} style={{ background: "white", borderRadius: 10, padding: "10px", borderLeft: `3px solid ${k.color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: "0.6rem", color: "#888", marginBottom: 3 }}>{k.label}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1a1a1a" }}>{k.value}</div>
                      <div style={{ fontSize: "0.58rem", color: k.color, marginTop: 2 }}>{k.sub}</div>
                    </div>
                  ))}
                </div>
                {/* Chart bar */}
                <div style={{ background: "white", borderRadius: 10, padding: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 8 }}>
                  <div style={{ fontSize: "0.62rem", color: "#888", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Formas de pago — hoy</div>
                  <div style={{ height: 10, borderRadius: 999, background: "#f0ede8", overflow: "hidden", display: "flex" }}>
                    {[{w:"58%",c:BRAND},{w:"24%",c:"#3b82f6"},{w:"10%",c:"#22c55e"},{w:"8%",c:"#f59e0b"}].map((b,i) => (
                      <div key={i} style={{ width: b.w, background: b.c, height: "100%" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                    {[["Cuotas","58%",BRAND],["Cuenta cte.","24%","#3b82f6"],["Efectivo","10%","#22c55e"],["MP","8%","#f59e0b"]].map(([l,p,c]) => (
                      <div key={l} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: c as string }} />
                        <span style={{ fontSize: "0.58rem", color: "#666" }}>{l} {p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Alert */}
                <div style={{ background: "#fef3c7", borderRadius: 8, padding: "6px 10px", fontSize: "0.62rem", color: "#92400e", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>⚠️</span> 2 cuotas vencidas — <span style={{ textDecoration: "underline", cursor: "pointer" }}>ver préstamos</span>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute", bottom: -16, right: -16,
              background: "white", borderRadius: 12, padding: "10px 14px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: "1.2rem" }}>💳</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#888", fontWeight: 500 }}>Venta confirmada</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: BRAND }}>$84.000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background: "white", padding: "60px 5%", borderBottom: "1px solid #f0ede8" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, textAlign: "center" }}>
          <StatCard value={1087} suffix="+" label="Productos cargados" trigger={statsVisible} />
          <StatCard value={6} suffix="" label="Formas de pago" trigger={statsVisible} />
          <StatCard value={12} suffix="" label="Módulos incluidos" trigger={statsVisible} />
          <StatCard value={5} suffix="" label="Locales gestionados" trigger={statsVisible} />
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" style={{ padding: "100px 5%", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", background: `${BRAND}15`, color: BRAND, padding: "6px 18px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, marginBottom: 16, border: `1px solid ${BRAND}30` }}>
              Todo incluido
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              12 módulos integrados
            </h2>
            <p style={{ color: "#888", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
              No es un software genérico. Vigía fue construido para la operación real de un comercio.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {MODULES.map((m, i) => (
              <div key={m.title}
                onMouseEnter={() => setActiveModule(i)}
                style={{
                  background: "white",
                  border: activeModule === i ? `2px solid ${m.color}40` : "2px solid transparent",
                  borderRadius: 16, padding: "24px 22px",
                  boxShadow: activeModule === i ? `0 8px 30px ${m.color}20` : "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "all 0.25s ease",
                  cursor: "default",
                  transform: activeModule === i ? "translateY(-4px)" : "none",
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem", marginBottom: 14,
                }}>{m.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{m.title}</h3>
                <p style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POS DEMO */}
      <section style={{ padding: "100px 5%", background: `linear-gradient(160deg, ${BRAND_DARK} 0%, #2a1a10 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* POS Mockup */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 6 }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            </div>
            <div style={{ display: "flex", height: 360 }}>
              {/* Products side */}
              <div style={{ flex: 1, padding: "14px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>🔍</span>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>Buscar producto — Enter para agregar</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { code: "ANF-0005", name: "Anafe Star Track Doble", price: "$72.000", qty: 1, color: "#22c55e" },
                    { code: "TEM-0017", name: "Bolso Matero Impermeable", price: "$17.939", qty: 2, color: null },
                    { code: "AML850", name: "Amoladora Lusqtoff 850W", price: "$55.493", qty: 3, color: null },
                  ].map((item, i) => (
                    <div key={item.code} style={{
                      background: item.color ? `${item.color}15` : "rgba(255,255,255,0.04)",
                      border: item.color ? `1px solid ${item.color}30` : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 8, padding: "8px 10px", marginBottom: 6,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)" }}>{item.code}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.7rem", color: BRAND_LIGHT, fontWeight: 700 }}>{item.price}</div>
                        <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.4)" }}>×{item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Summary side */}
              <div style={{ width: 160, padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Resumen</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                    <span>Subtotal</span><span>$896.272</span>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 8, marginBottom: 12 }}>
                    <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>TOTAL</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "white" }}>$896.272</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 8px", marginBottom: 8 }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Forma de pago</div>
                    <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>12 cuotas</div>
                  </div>
                </div>
                <div style={{ background: BRAND, borderRadius: 8, padding: "8px", textAlign: "center", fontSize: "0.72rem", color: "white", fontWeight: 700, cursor: "pointer" }}>
                  Confirmar venta ✓
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
              🛒 Punto de Venta
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
              Vendé más rápido.<br />
              <span style={{ color: BRAND_LIGHT }}>Sin fricción.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 28 }}>
              El POS de Vigía está diseñado para la velocidad del mostrador. Buscá, agregá y cobrá sin tocar el mouse.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["⚡", "Buscador instantáneo con navegación por teclado"],
                ["💳", "6 formas de pago + split hasta en 3 métodos"],
                ["🏷️", "Cuotas en 3, 6, 9 y 12 meses con precio automático"],
                ["📱", "Funciona desde el celular, tablet o PC"],
                ["🖨️", "Comprobante listo para imprimir o enviar por WhatsApp"],
              ].map(([icon, text]) => (
                <div key={String(text)} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Arrancás en horas, no en meses
            </h2>
            <p style={{ color: "#888", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
              Sin instalaciones, sin capacitaciones de días. Subimos tus productos y empezás a vender.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }}>
            {/* Connector line */}
            <div style={{ position: "absolute", top: 36, left: "12%", right: "12%", height: 2, background: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})`, zIndex: 0 }} />
            {[
              { n: "01", title: "Carga inicial", desc: "Importamos tu planilla de productos existente.", icon: "📥" },
              { n: "02", title: "Configuración", desc: "Locales, usuarios y permisos en menos de una hora.", icon: "⚙️" },
              { n: "03", title: "Capacitación", desc: "Video llamada de 30 minutos con tu equipo.", icon: "🎓" },
              { n: "04", title: "En producción", desc: "Vendiendo desde el primer día con soporte directo.", icon: "🚀" },
            ].map((s) => (
              <div key={s.n} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                  background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", boxShadow: `0 8px 24px ${BRAND}40`,
                }}>{s.icon}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: BRAND, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Paso {s.n}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: 8 }}>{s.title}</div>
                <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUOTAS FEATURE */}
      <section style={{ padding: "80px 5%", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "#8b5cf615", color: "#8b5cf6", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 20, border: "1px solid #8b5cf630" }}>
              🏦 Préstamos y cuotas
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: 20 }}>
              El control de cuotas que nunca tuviste
            </h2>
            <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 28 }}>
              Al vender en cuotas, el préstamo se crea automáticamente con cada fecha de vencimiento. Alertas, recordatorios y registro de pagos en un solo lugar.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["📅", "Vencimientos automáticos"],
                ["⚠️", "Alertas de mora"],
                ["💬", "Contacto WA directo"],
                ["↩️", "Deshacer pagos"],
                ["📊", "Dashboard de deudores"],
                ["🔍", "Filtros por urgencia"],
              ].map(([icon, text]) => (
                <div key={String(text)} style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: 10, padding: "10px 14px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: "1rem" }}>{icon}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#444" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Loans mockup */}
          <div style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a" }}>Préstamos activos</div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Hoy","Semana","30 días"].map((f, i) => (
                  <div key={f} style={{ background: i === 0 ? BRAND : "#f5f3f0", color: i === 0 ? "white" : "#888", padding: "4px 10px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 600 }}>{f}</div>
                ))}
              </div>
            </div>
            {[
              { name: "Franco Colapinto", amount: "$37.972", cuota: "$6.000/mes", status: "vencida", n: "0/12" },
              { name: "Ignacio Ferrari", amount: "$72.000", cuota: "$6.000/mes", status: "activa", n: "0/12" },
              { name: "María González", amount: "$456.500", cuota: "$76.083/mes", status: "activa", n: "1/6" },
              { name: "Carlos Rodríguez", amount: "$70.000", cuota: "$7.778/mes", status: "proxima", n: "0/9" },
            ].map(loan => (
              <div key={loan.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f5f3f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${BRAND}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: BRAND }}>
                    {loan.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1a1a" }}>{loan.name}</div>
                    <div style={{ fontSize: "0.65rem", color: "#aaa" }}>{loan.n} cuotas · {loan.cuota}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a1a1a" }}>{loan.amount}</div>
                  <div style={{
                    fontSize: "0.6rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                    background: loan.status === "vencida" ? "#fee2e2" : loan.status === "proxima" ? "#fef3c7" : "#dcfce7",
                    color: loan.status === "vencida" ? "#dc2626" : loan.status === "proxima" ? "#d97706" : "#16a34a",
                  }}>
                    {loan.status === "vencida" ? "Vencida" : loan.status === "proxima" ? "Vence pronto" : "Al día"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE BANNER */}
      <section style={{ padding: "80px 5%", background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>📱</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: "white", marginBottom: 16 }}>
            Funciona desde el celular
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 28 }}>
            Diseño responsive completo. Los vendedores pueden acceder desde su celular, los dueños ven el dashboard desde donde estén, y la caja puede operarse desde una tablet en el mostrador.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {["Bottom nav para acceso rápido", "Sidebar como drawer en mobile", "POS optimizado para touch", "Sin app que instalar"].map(f => (
              <div key={f} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "6px 16px", fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
                ✓ {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IA SECTION */}
      <section style={{ padding: "100px 5%", background: "linear-gradient(135deg, #f3f0ff 0%, #faf9f7 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#7c3aed15", color: "#7c3aed", padding: "6px 18px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, marginBottom: 24, border: "1px solid #7c3aed30" }}>
            🤖 Asistente IA Crolia
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 20 }}>
            Tu negocio, disponible para conversar
          </h2>
          <p style={{ color: "#666", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 48, maxWidth: 560, margin: "0 auto 48px" }}>
            El asistente IA integrado en Vigía responde preguntas sobre tu negocio en lenguaje natural, usando tus propios datos en tiempo real.
          </p>
          {/* Chat mockup */}
          <div style={{ background: "white", borderRadius: 20, padding: 24, maxWidth: 560, margin: "0 auto", boxShadow: "0 20px 60px rgba(124,58,237,0.1)", border: "1px solid #7c3aed20" }}>
            {[
              { from: "user", text: "¿Cuánto vendimos esta semana?" },
              { from: "bot", text: "Esta semana llevan $2.7M en ventas, un 12% más que la semana pasada. El producto más vendido fue la Amoladora Lusqtoff 850W con 15 unidades." },
              { from: "user", text: "¿Qué clientes deben más?" },
              { from: "bot", text: "Los 3 principales deudores son: Franco Colapinto ($37.972), Carlos Rodríguez ($70.000) y María González ($456.500). ¿Querés que te muestre el detalle de cuotas?" },
            ].map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div style={{
                  maxWidth: "75%", padding: "10px 14px", borderRadius: 12,
                  background: msg.from === "user" ? `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)` : "#f5f3f0",
                  color: msg.from === "user" ? "white" : "#333",
                  fontSize: "0.85rem", lineHeight: 1.5,
                  borderBottomRightRadius: msg.from === "user" ? 2 : 12,
                  borderBottomLeftRadius: msg.from === "bot" ? 2 : 12,
                }}>
                  {msg.from === "bot" && <div style={{ fontSize: "0.65rem", color: "#7c3aed", fontWeight: 700, marginBottom: 4 }}>✨ Crolia IA</div>}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM + IA SECTION */}
      <section style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", background: "#a855f715", color: "#a855f7", padding: "6px 18px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, marginBottom: 16, border: "1px solid #a855f730" }}>
              💬 CRM + Agente IA
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Tu negocio atiende solo.<br />
              <span style={{ color: "#a855f7" }}>Las 24 horas.</span>
            </h2>
            <p style={{ color: "#666", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              El agente IA de Vigía está conectado a toda la base de datos del sistema: clientes, precios, stock y préstamos. Responde, vende, cotiza y cobra por WhatsApp de forma completamente autónoma.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left: feature list */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  {
                    icon: "🤖", color: "#a855f7",
                    title: "Atención automática 24/7",
                    desc: "El agente responde consultas de clientes en cualquier horario. Precios, disponibilidad, estado de pedidos — todo en segundos.",
                  },
                  {
                    icon: "💰", color: "#22c55e",
                    title: "Ventas y cotizaciones automáticas",
                    desc: "El agente puede armar presupuestos y cerrar ventas directamente por WhatsApp, conectado a los precios reales del sistema.",
                  },
                  {
                    icon: "💳", color: "#3b82f6",
                    title: "Gestión de cobranzas",
                    desc: "Recuerda cuotas vencidas, envía recordatorios personalizados y registra promesas de pago. Sin intervención humana.",
                  },
                  {
                    icon: "👤", color: "#f59e0b",
                    title: "Conectado a cada cliente",
                    desc: "Reconoce al cliente por su número, consulta su historial de compras, saldo de cuenta corriente y préstamos activos en tiempo real.",
                  },
                  {
                    icon: "📊", color: "#ec4899",
                    title: "Bandeja centralizada con contexto",
                    desc: "Todas las conversaciones en un lugar, con el historial del cliente visible. Escalado a humano cuando el agente detecta que es necesario.",
                  },
                  {
                    icon: "🔄", color: "#10b981",
                    title: "Sincronizado con el sistema",
                    desc: "Cada venta, pago o dato capturado por el agente se registra automáticamente en Vigía. Sin doble carga de información.",
                  },
                ].map(f => (
                  <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1a1a1a", marginBottom: 4 }}>{f.title}</div>
                      <div style={{ fontSize: "0.83rem", color: "#888", lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: conversation mockup */}
            <div style={{ background: "#f5f3f0", borderRadius: 24, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #a855f7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a1a" }}>Agente Vigía — JyS Confort</div>
                  <div style={{ fontSize: "0.65rem", color: "#22c55e", fontWeight: 600 }}>● En línea</div>
                </div>
              </div>
              {/* Messages */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { from: "client", text: "Hola, quería saber el precio del Anafe Star Track a 12 cuotas" },
                  { from: "agent", text: "¡Hola! El Anafe Star Track Doble está a $6.000 por mes en 12 cuotas (total $72.000). ¿Te lo reservo? 🔥" },
                  { from: "client", text: "Sí, me interesa. ¿Puedo pagarlo con tarjeta?" },
                  { from: "agent", text: "¡Claro! Aceptamos débito, transferencia y Mercado Pago. ¿Querés que te arme el presupuesto con tu nombre para que lo puedas mostrar en el local?" },
                  { from: "client", text: "Perfecto, soy Franco Colapinto" },
                  { from: "agent", text: "Ya te encontré en el sistema, Franco 👋 Te tengo el historial completo. Te mando el presupuesto ahora mismo." },
                ].map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.from === "client" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "78%", padding: "9px 13px", borderRadius: 12,
                      background: msg.from === "client" ? "#1a1a1a" : "white",
                      color: msg.from === "client" ? "white" : "#333",
                      fontSize: "0.8rem", lineHeight: 1.5,
                      borderBottomRightRadius: msg.from === "client" ? 2 : 12,
                      borderBottomLeftRadius: msg.from === "agent" ? 2 : 12,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    }}>
                      {msg.from === "agent" && <div style={{ fontSize: "0.6rem", color: "#a855f7", fontWeight: 700, marginBottom: 3 }}>🤖 Agente IA</div>}
                      {msg.text}
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: "white", borderRadius: 12, borderBottomLeftRadius: 2, padding: "10px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", display: "flex", gap: 4, alignItems: "center" }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", opacity: 0.6 }} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Bottom tag */}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.65rem", color: "#aaa" }}>Powered by Crolia IA · Vigía</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["Cliente identificado ✓", "Stock verificado ✓"].map(t => (
                    <div key={t} style={{ background: "#22c55e15", color: "#16a34a", padding: "3px 8px", borderRadius: 20, fontSize: "0.58rem", fontWeight: 600 }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" style={{
        padding: "100px 5%",
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #1a0f08 100%)`,
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>
            <svg width="56" height="80" viewBox="0 0 36 52" fill="none" style={{ margin: "0 auto", display: "block" }}>
              <line x1="18" y1="6" x2="18" y2="0" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
              <line x1="18" y1="6" x2="28" y2="1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
              <line x1="18" y1="6" x2="8" y2="1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
              <path d="M12 12 L18 6 L24 12 Z" fill="white" fillOpacity="0.9"/>
              <rect x="11" y="12" width="14" height="7" rx="0.5" fill="white"/>
              <path d="M13 19 L11 42 L25 42 L23 19 Z" fill="white" fillOpacity="0.75"/>
              <rect x="8" y="42" width="20" height="5" rx="1" fill="white" fillOpacity="0.9"/>
              <rect x="5" y="47" width="26" height="3" rx="1" fill="white" fillOpacity="0.5"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", marginBottom: 16 }}>
            ¿Querés ver Vigía en acción?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 40 }}>
            Te hacemos una demo personalizada con los datos de tu comercio. Sin compromiso.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/5491173729899?text=Hola%2C%20quiero%20ver%20una%20demo%20de%20Vig%C3%ADa"
              target="_blank" rel="noopener noreferrer"
              style={{
                background: "#22c55e", color: "white", padding: "16px 32px", borderRadius: 12,
                textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                display: "inline-flex", alignItems: "center", gap: 10,
                boxShadow: "0 8px 30px rgba(34,197,94,0.3)",
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.428l5.736-1.504A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.51-5.166-1.4l-.371-.22-3.4.893.907-3.32-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Escribinos por WhatsApp
            </a>
            <a href="mailto:contacto@crolia.com.ar?subject=Demo Vigía"
              style={{
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "white", padding: "16px 28px", borderRadius: 12,
                textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              }}>
              contacto@crolia.com.ar
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0808", padding: "32px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: BRAND_LIGHT, fontFamily: "'Space Grotesk', sans-serif" }}>Vigía</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>by Crolia</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
          © 2026 Crolia · crolia.com.ar
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { transition: opacity 0.2s; }
        a:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

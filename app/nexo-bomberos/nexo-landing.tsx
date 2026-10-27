"use client";
import { useEffect, useState } from "react";

const BRAND = "#dc2626";
const BRAND_DARK = "#450a0a";
const BRAND_DARK2 = "#1a0505";
const BRAND_LIGHT = "#fca5a5";
const GREEN = "#22c55e";
const WA_LINK = "https://wa.me/5491173729899?text=Hola%20Crolia%2C%20quiero%20info%20sobre%20Nexo%20para%20mi%20instituci%C3%B3n";
const DEMO_LINK = "https://colaboradores.bvgssanmiguel.org.ar/colaborador-oficial";

const MODULOS = [
  { icon: "🖥️", title: "Página de colaboradores propia", desc: "Formulario de inscripción con el nombre, logo y colores de tu institución, en tu propio dominio.", color: BRAND },
  { icon: "🔄", title: "Cobro automático", desc: "Suscripción recurrente por Mercado Pago, se cobra solo, todos los meses, sin que nadie lo cargue a mano.", color: GREEN },
  { icon: "📊", title: "Panel para el Consejo Directivo", desc: "Activos, altas, bajas, ingresos del mes, comisión de MP y neto disponible, en tiempo real.", color: "#3b82f6" },
  { icon: "💵", title: "Pagos manuales", desc: "Para quien colabora en efectivo o transferencia. Queda registrado y filtrable igual que el resto.", color: "#f59e0b" },
  { icon: "🧾", title: "Historial por colaborador", desc: "Cada vecino ve sus propios aportes; el Consejo Directivo ve el historial completo de cada uno.", color: "#8b5cf6" },
  { icon: "✅", title: "Chequeos diarios recurrentes", desc: "El sistema se sincroniza todos los días con Mercado Pago para que la información que ves esté siempre al día.", color: "#06b6d4" },
];

const EXTRA = [
  { icon: "📣", title: "Convocatoria por WhatsApp", desc: "Alertas automáticas a la dotación ante una emergencia, con confirmación de asistencia.", color: GREEN },
  { icon: "📍", title: "Rastreo de móviles", desc: "Ubicación en tiempo real de las unidades en servicio.", color: "#3b82f6" },
  { icon: "🧑‍🚒", title: "Gestión de personal", desc: "Guardias, legajos, capacitaciones y horas de servicio de la dotación.", color: "#f59e0b" },
  { icon: "🧰", title: "Control de materiales y unidades", desc: "Inventario, mantenimiento preventivo y vencimientos de equipamiento y móviles.", color: "#8b5cf6" },
];


const PLANES = [
  {
    nombre: "Solo Sistema",
    precio: "15%",
    explicacion: "Es lo que Nexo cobra sobre lo que tu institución recauda cada mes a través de los colaboradores.",
    tope: "Tope mensual de comisión: $1.200.000, sin importar cuánto sea tu recaudación total.",
    limite: "Superado ese tope, Nexo no comisiona más: todo lo que sigue queda 100% para tu institución.",
    features: [
      "Página de colaboradores con tu marca y tu dominio",
      "Conexión a tu cuenta de Mercado Pago",
      "Panel para el Consejo Directivo",
      "Pagos manuales + reportes",
      "Recordatorio automático a quien no paga",
      "Soporte por email (48hs)",
    ],
  },
  {
    nombre: "Sistema + Edición",
    precio: "35%",
    explicacion: "Es lo que Nexo cobra sobre lo que tu institución recauda cada mes a través de los colaboradores.",
    tope: "Tope mensual de comisión: $2.800.000, sin importar cuánto sea tu recaudación total.",
    limite: "Superado ese tope, Nexo no comisiona más: todo lo que sigue queda 100% para tu institución.",
    destacado: true,
    features: [
      "Todo lo del plan Solo Sistema",
      "Te armamos el guion y te pedimos las fotos/video que hacen falta",
      "Editamos el contenido del mes y te entregamos un calendario de publicación",
      "La publicación y gestión de tus redes la hace la institución (sin pauta ni publicidad incluida)",
      "Soporte prioritario por WhatsApp",
    ],
  },
];

const PASOS = [
  { n: "01", title: "Nos escribís", desc: "Charla de 10 minutos por WhatsApp para entender tu institución.", icon: "💬" },
  { n: "02", title: "Conectamos tu Mercado Pago", desc: "Con la cuenta oficial de la institución, vos siempre tenés el control.", icon: "🔗" },
  { n: "03", title: "Activamos tu página de colaboradores", desc: "Con tu logo y tus colores, sobre tu propio dominio (si no tenés, te ayudamos a conseguir uno).", icon: "🎨" },
  { n: "04", title: "Ya estás cobrando", desc: "Compartís el link y empezás a sumar colaboradores ese mismo día.", icon: "🚀" },
];

const FAQS = [
  {
    q: "¿Qué pasa si no funciona y no sumamos colaboradores?",
    a: "No perdés nada mes a mes: trabajamos a comisión sobre lo que efectivamente se recauda. Lo único que se abona siempre es la instalación inicial.",
  },
  {
    q: "¿Quién ve los datos de nuestros colaboradores?",
    a: "Son 100% de la institución, en su propio panel. Nexo no accede a ningún otro movimiento de tu cuenta de Mercado Pago.",
  },
  {
    q: "¿Nos podemos ir cuando queramos?",
    a: "Sí, sin permanencia. Pedimos un breve preaviso para coordinar la salida y entregarte tu base de datos completa.",
  },
  {
    q: "¿Cómo se paga la comisión mensual?",
    a: "Te mandamos una factura mensual según lo que muestra tu propio panel. La pagás por transferencia o efectivo, con 15 días de margen.",
  },
  {
    q: "¿Necesitamos saber de tecnología?",
    a: "No. Nosotros configuramos todo y capacitamos al Consejo Directivo para usar el panel.",
  },
  {
    q: "¿Qué pasa si ya tenemos página web institucional, o si no tenemos dominio propio?",
    a: "Si ya tenés un dominio (tucuartel.org.ar, por ejemplo), armamos tu página de colaboradores ahí mismo, con tu marca. Si no tenés dominio, te ayudamos a registrarlo junto con vos; es un costo aparte, orientativo desde unos $6.000 por año según el valor vigente en NIC.ar.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "Nos sentamos con vos, conectamos juntos tu cuenta institucional de Mercado Pago, y en pocos días ya tenés tu propia página lista para compartir. No te dejamos un producto armado para que te las arregles solo: te acompañamos paso a paso hasta que esté funcionando de verdad.",
  },
];

export default function NexoLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [activeModulo, setActiveModulo] = useState(0);
  const [heroScreen, setHeroScreen] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveModulo((m) => (m + 1) % MODULOS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroScreen((s) => (s + 1) % 2), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: "#fafafa", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(220,38,38,0.1)" : "none",
        transition: "all 0.3s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.4rem" }}>🚒</span>
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: scrollY > 50 ? BRAND : "white", fontFamily: "'Oswald', sans-serif" }}>Nexo</span>
            <span style={{ fontSize: "0.75rem", color: scrollY > 50 ? "#aaa" : "rgba(255,255,255,0.5)", marginLeft: 4 }}>by Crolia</span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#como-funciona" style={{ color: scrollY > 50 ? "#666" : "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }} className="nav-link">¿Cómo funciona?</a>
            <a href="#precios" style={{ color: scrollY > 50 ? "#666" : "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }} className="nav-link">Precios</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
              background: BRAND, color: "white", padding: "8px 20px", borderRadius: 999,
              textDecoration: "none", fontSize: "0.88rem", fontWeight: 600,
              boxShadow: `0 4px 14px ${BRAND}40`,
            }}>Contactar</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #2a0a0a 40%, ${BRAND_DARK2} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "100px 5% 60px",
      }}>
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 420, height: 420, borderRadius: "50%", background: `${BRAND}25`, filter: "blur(90px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "8%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "#ffffff08", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            <h1 style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(2.4rem, 4.6vw, 3.4rem)",
              fontWeight: 800, color: "white", lineHeight: 1.18, marginBottom: 22,
            }}>
              Aportes mensuales de tus vecinos
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["Sin intermediarios", "Transparencia total"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: `${BRAND}25`, border: `1px solid ${BRAND}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: BRAND_LIGHT, fontWeight: 800, fontSize: "0.95rem",
                  }}>✓</span>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: BRAND_LIGHT }}>{t}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Nexo es el sistema para sumar colaboradores mensuales con cobro automático por Mercado Pago,
              directo a tu cuenta, sin que un tercero se quede con lo que tu comunidad quiere darle a los
              bomberos.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #991b1b 100%)`,
                color: "white", padding: "14px 32px", borderRadius: 12,
                textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                boxShadow: `0 8px 30px ${BRAND}50`,
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Quiero implementarlo en mi institución →
              </a>
              <a href={DEMO_LINK} target="_blank" rel="noreferrer" style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", padding: "14px 28px", borderRadius: 12,
                textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              }}>
                Ver el sistema en vivo
              </a>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 36, flexWrap: "wrap" }}>
              {[["Aportes directo a la institución", "✓"], ["Porcentaje con límite mensual claro", "✓"], ["Alternativa más fácil y rápida que recorrer puerta a puerta", "✓"]].map(([label, check]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: GREEN, fontWeight: 700 }}>{check}</span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup del formulario real */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              position: "relative",
            }}>
              <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 22, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>colaboradores.tucuartel.org.ar</span>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                {["/nexo-real-screenshot-1.png", "/nexo-real-screenshot-2.png"].map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === 0 ? "Paso 1: datos del colaborador" : "Paso 2: elegir aporte y confirmar"}
                    style={{
                      display: "block", width: "100%",
                      position: i === 0 ? "relative" : "absolute",
                      top: 0, left: 0,
                      opacity: heroScreen === i ? 1 : 0,
                      transition: "opacity 800ms ease",
                    }}
                  />
                ))}
              </div>
              <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
                {[0, 1].map((i) => (
                  <span key={i} style={{
                    width: heroScreen === i ? 18 : 6, height: 6, borderRadius: 999,
                    background: heroScreen === i ? BRAND : "rgba(0,0,0,0.15)",
                    transition: "all 400ms ease",
                  }} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", top: 16, right: -14, background: "#1a1a1a", color: "white", fontSize: "0.68rem", fontWeight: 700, padding: "5px 12px", borderRadius: 999, boxShadow: "0 6px 20px rgba(0,0,0,0.3)" }}>
              Captura real, en producción
            </div>
            <div style={{
              position: "absolute", bottom: -16, right: -16,
              background: "white", borderRadius: 12, padding: "10px 14px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: "1.2rem" }}>✅</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#888", fontWeight: 500 }}>Colaborador activado</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: BRAND }}>automático</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIN INTERMEDIARIOS */}
      <section style={{ background: "white", padding: "70px 5%", borderBottom: "1px solid #f0ede8" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="stack-mobile">
            <div>
              <div style={{ display: "inline-block", background: "#dcfce7", color: "#16a34a", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 18, border: "1px solid #bbf7d0" }}>
                🔒 Sin intermediarios
              </div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.25, marginBottom: 16 }}>
                Los aportes entran directo a la cuenta de tu institución
              </h2>
              <p style={{ color: "#555", fontSize: "1rem", lineHeight: 1.8 }}>
                Sin intermediarios en el medio. Crolia no administra ni retiene fondos en ningún momento,
                solo te damos la herramienta. Eso genera una confianza mayor y un vínculo directo con el
                vecino, asegurando su colaboración mes a mes, con visibilidad constante y transparencia
                contable para el Consejo Directivo.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "#fafafa", borderRadius: 14, padding: "20px 22px", border: "1px solid #eee" }}>
                <div style={{ fontSize: "0.72rem", color: "#888", marginBottom: 4 }}>Nuestra filosofía</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>Una herramienta para la autosustentabilidad de tu institución, no un socio que se queda con tu crecimiento</div>
              </div>
              <div style={{ background: "#fafafa", borderRadius: 14, padding: "20px 22px", border: "1px solid #eee" }}>
                <div style={{ fontSize: "0.72rem", color: "#888", marginBottom: 4 }}>Acompañamiento con límite claro</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>Lo que supere el límite mensual es 100% de la institución, siempre</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VS RIFEROS */}
      <section style={{
        padding: "90px 5%",
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_DARK2} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 18 }}>
              💸 vs. rifas tradicionales
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "white", lineHeight: 1.25, marginBottom: 16 }}>
              ¿Le seguís dando un % de las donaciones<br />de tus vecinos a un rifero?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 680, margin: "0 auto" }}>
              Muchas instituciones hoy dependen de una empresa privada de rifas para armar su campaña de socios,
              y le entregan un porcentaje de todo lo recaudado, sin límite, para siempre. Nosotros ofrecemos
              un acompañamiento sincero y real: un <strong style={{ color: BRAND_LIGHT }}>límite mensual
              claro</strong> (todo lo que supere ese monto es 100% tuyo) y un porcentaje mensual que{" "}
              <strong style={{ color: BRAND_LIGHT }}>baja con el tiempo</strong>, a medida que tu institución se
              consolida y nuestro rol en el día a día va siendo menor.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="stack-mobile">
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 26px" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>Rifero tradicional</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Comisión sin límite sobre todo lo recaudado, para siempre",
                  "Los datos de tus colaboradores quedan en manos de un tercero",
                  "Campaña y marca compartidas con la rifera",
                  "Cuanto más crecés, más le pagás a otro, sin límite",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#f87171", fontWeight: 700, fontSize: "0.85rem", marginTop: 1 }}>✕</span>
                    <span style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 16, padding: "24px 26px" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: GREEN, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>Con Nexo</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Porcentaje con límite mensual claro, siempre transparente",
                  "Los datos de tus colaboradores son 100% tuyos, en tu propio panel",
                  "Tu nombre, tu institución, tu campaña",
                  "El porcentaje baja con el tiempo, hasta un 10% fijo de forma estable",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: GREEN, fontWeight: 700, fontSize: "0.85rem", marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 24, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14, padding: "20px 26px", display: "flex", alignItems: "flex-start", gap: 14,
          }}>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "white", marginBottom: 4 }}>
                Generamos tu propia base de datos para que la sigas usando mucho después
              </div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Cada colaborador que se suma queda registrado en tu propio sistema, nombre, contacto,
                historial de aportes. Esa base es tuya para siempre, y te sirve para mucho más que cobrar:
                armar campañas de sorteos, convocar a eventos o anunciar novedades, sin depender de nadie.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURIDAD MERCADO PAGO */}
      <section style={{ padding: "90px 5%", background: "#fafafa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 18, border: "1px solid #bfdbfe" }}>
              🛡️ Integración con Mercado Pago
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Transparencia y seguridad, de punta a punta
            </h2>
            <p style={{ color: "#666", fontSize: "1rem", lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
              Usamos la integración oficial de Mercado Pago para suscripciones recurrentes, la misma
              tecnología que usan miles de negocios en Argentina.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="pasos-grid">
            <div style={{ background: "white", borderRadius: 14, padding: "24px 22px", border: "1px solid #eee" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 12 }}>👁️</div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>Visibilidad acotada, a propósito</h3>
              <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.7 }}>
                Nexo solo consulta los pagos y suscripciones que se generan a través del programa de
                colaboradores. No accede a ningún otro movimiento de tu cuenta de Mercado Pago, ni falta
                que hace para que el sistema funcione.
              </p>
            </div>
            <div style={{ background: "white", borderRadius: 14, padding: "24px 22px", border: "1px solid #eee" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 12 }}>🔓</div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>El vecino siempre tiene el control</h3>
              <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.7 }}>
                Cualquier colaborador puede dar de baja su suscripción cuando quiera, directamente desde su
                propia cuenta de Mercado Pago, sin trámites, sin depender de nadie de la institución.
              </p>
            </div>
            <div style={{ background: "white", borderRadius: 14, padding: "24px 22px", border: "1px solid #eee" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 12 }}>🏦</div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>La cuenta es siempre de la institución</h3>
              <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.7 }}>
                Conectás tu propia cuenta oficial de Mercado Pago. El dinero nunca pasa por una cuenta de
                Crolia ni de un tercero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="incluye" style={{ padding: "100px 5%", background: "#fafafa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", background: `${BRAND}12`, color: BRAND, padding: "6px 18px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, marginBottom: 16, border: `1px solid ${BRAND}30` }}>
              Qué incluye
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Todo lo que necesita tu Consejo Directivo
            </h2>
            <p style={{ color: "#888", fontSize: "1.05rem", maxWidth: 540, margin: "0 auto" }}>
              No es un formulario suelto. Es un sistema completo, probado con pagos reales de punta a punta.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {MODULOS.map((m, i) => (
              <div key={m.title}
                onMouseEnter={() => setActiveModulo(i)}
                style={{
                  background: "white",
                  borderLeft: `3px solid ${activeModulo === i ? m.color : "#e5e5e5"}`,
                  padding: "20px 22px",
                  boxShadow: activeModulo === i ? `0 6px 20px ${m.color}18` : "none",
                  transition: "all 0.25s ease",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: "1.05rem" }}>{m.icon}</span>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a" }}>{m.title}</h3>
                </div>
                <p style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PANEL MOCKUP */}
      <section style={{ padding: "100px 5%", background: `linear-gradient(160deg, ${BRAND_DARK} 0%, #2a0a0a 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="stack-mobile">
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
              📊 Panel para el Consejo Directivo
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
              Visibilidad total,<br />
              <span style={{ color: BRAND_LIGHT }}>sin pedirle nada a nadie.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 28 }}>
              El Consejo Directivo entra y ve en tiempo real cuánto entró, quién paga, quién se dio de baja y
              cuánto queda neto después de la comisión de Mercado Pago. Nada que armar a mano en Excel.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["👥", "Colaboradores activos, altas y bajas del mes"],
                ["💰", "Ingresos, comisión de MP y neto disponible"],
                ["📅", "Próximos cobros estimados, agrupados por fecha"],
                ["🔎", "Filtros por estado, origen de pago y rango de fechas"],
              ].map(([icon, text]) => (
                <div key={String(text)} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 20, padding: 22, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1a1a1a" }}>Resumen</div>
              <div style={{ background: "#f5f3f0", color: "#888", padding: "4px 10px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 600 }}>Este mes</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 10 }}>
              {[
                { label: "Activos", value: "8", color: GREEN },
                { label: "Altas este mes", value: "2", color: "#3b82f6" },
                { label: "Neto disponible", value: "$9.876", color: BRAND },
                { label: "Comisión MP", value: "-$124", color: "#888" },
              ].map((k) => (
                <div key={k.label} style={{ background: "#fafafa", borderRadius: 10, padding: "12px", borderLeft: `3px solid ${k.color}` }}>
                  <div style={{ fontSize: "0.6rem", color: "#888", marginBottom: 3 }}>{k.label}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1a1a1a" }}>{k.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fafafa", borderRadius: 10, padding: "12px", marginTop: 8 }}>
              <div style={{ fontSize: "0.62rem", color: "#888", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Colaboradores por estado</div>
              <div style={{ height: 10, borderRadius: 999, background: "#f0ede8", overflow: "hidden", display: "flex" }}>
                {[{ w: "67%", c: GREEN }, { w: "25%", c: "#f59e0b" }, { w: "8%", c: "#888" }].map((b, i) => (
                  <div key={i} style={{ width: b.w, background: b.c, height: "100%" }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                {[["Activo", GREEN], ["Pend. pago", "#f59e0b"], ["Baja", "#888"]].map(([l, c]) => (
                  <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c as string }} />
                    <span style={{ fontSize: "0.58rem", color: "#666" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFUSIÓN */}
      <section style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 18, border: "1px solid #bfdbfe" }}>
            📣 Difusión
          </div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
            La difusión también te la facilitamos
          </h2>
          <p style={{ color: "#666", fontSize: "1rem", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 28px" }}>
            Instagram y Facebook te dan el alcance, pero no cobran ni hacen seguimiento por vos. Nexo es el
            complemento que convierte ese alcance en colaboradores reales: con un posteo compartiendo el
            link de inscripción, la campaña ya tiene a dónde llevar a la gente, una página pensada para
            convertir, con cobro automático y sin que nadie tenga que hacer seguimiento manual después. No
            reemplaza tus redes, las potencia.
          </p>
          <div style={{ background: "#fafafa", border: "1px dashed #ddd", borderRadius: 14, padding: "20px 26px", maxWidth: 560, margin: "0 auto", textAlign: "left" }}>
            <div style={{ fontSize: "0.9rem", color: "#1a1a1a", fontWeight: 700, marginBottom: 6 }}>¿No tenés quién arme esos posteos?</div>
            <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.7 }}>
              El plan <strong>Sistema + Edición</strong> incluye justamente eso: te pedimos las fotos y
              videos, armamos los guiones, editamos el contenido del mes y te lo entregamos con un calendario
              de publicación, ver <a href="#precios" style={{ color: BRAND }}>precios</a>.
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "100px 5%", background: "#fafafa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Arrancás en días, no en meses
            </h2>
            <p style={{ color: "#888", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
              Es una solución informática que ya funciona, probada con pagos reales. Solo nos falta contar
              con la información de tu institución para ponerla en marcha.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="pasos-grid">
            <div style={{ position: "absolute", top: 36, left: "12%", right: "12%", height: 2, background: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})`, zIndex: 0 }} className="pasos-line" />
            {PASOS.map((s) => (
              <div key={s.n} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                  background: `linear-gradient(135deg, ${BRAND} 0%, #991b1b 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", boxShadow: `0 8px 24px ${BRAND}40`,
                }}>{s.icon}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: BRAND, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Paso {s.n}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: 8 }}>{s.title}</div>
                <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Precios
            </h2>
            <p style={{ color: "#888", fontSize: "1.05rem", maxWidth: 620, margin: "0 auto" }}>
              Te damos una herramienta para la autosustentabilidad de tu institución, no un socio que se
              queda con tu crecimiento. Por eso nuestro acompañamiento siempre tiene un límite mensual
              claro y un porcentaje que baja con el tiempo.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="stack-mobile">
            {PLANES.map((p) => (
              <div key={p.nombre} style={
                p.destacado
                  ? { background: `linear-gradient(160deg, ${BRAND_DARK} 0%, #2a0a0a 100%)`, borderRadius: 18, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 14, position: "relative", boxShadow: `0 16px 50px ${BRAND}30` }
                  : { background: "#fafafa", border: "1.5px solid #eee", borderRadius: 18, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 14 }
              }>
                {p.destacado && (
                  <div style={{ position: "absolute", top: -12, left: 24, background: BRAND, color: "white", fontFamily: "'Oswald', sans-serif", fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: 0.5, padding: "4px 12px", borderRadius: 999, fontWeight: 700 }}>Más elegido</div>
                )}
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: p.destacado ? "white" : "#1a1a1a" }}>{p.nombre}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.4rem", fontWeight: 800, color: p.destacado ? "white" : "#1a1a1a" }}>{p.precio}</div>
                    <div style={{ fontSize: "0.85rem", color: p.destacado ? "rgba(255,255,255,0.65)" : "#888" }}>de tu recaudación mensual</div>
                  </div>
                  <div style={{ fontSize: "0.84rem", color: p.destacado ? "rgba(255,255,255,0.75)" : "#555", marginTop: 8, lineHeight: 1.6 }}>{p.explicacion}</div>
                  <div style={{
                    marginTop: 10, borderRadius: 10, padding: "12px 14px",
                    background: p.destacado ? "rgba(34,197,94,0.12)" : "#dcfce7",
                    border: p.destacado ? "1px solid rgba(34,197,94,0.3)" : "1px solid #bbf7d0",
                  }}>
                    <div style={{ fontSize: "0.82rem", lineHeight: 1.6, fontWeight: 700, color: p.destacado ? "#86efac" : "#15803d" }}>{p.tope}</div>
                    <div style={{ fontSize: "0.78rem", lineHeight: 1.6, color: p.destacado ? "rgba(255,255,255,0.75)" : "#2d6a4f", marginTop: 6 }}>{p.limite}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
                  {p.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: GREEN, fontWeight: 700, fontSize: "0.85rem", marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: "0.82rem", color: p.destacado ? "rgba(255,255,255,0.75)" : "#555", lineHeight: 1.6 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 24, background: "#fafafa", border: "1px dashed #ddd", borderRadius: 14, padding: "18px 24px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ fontSize: "0.9rem", color: "#1a1a1a", fontWeight: 700, marginBottom: 4 }}>Instalación y puesta en marcha: $400.000 único pago</div>
            <div style={{ fontSize: "0.82rem", color: "#888" }}>
              Incluye conexión de tu cuenta de Mercado Pago, página de colaboradores con tu marca,
              configuración del panel y capacitación al Consejo Directivo, mismo precio para los dos planes.
            </div>
          </div>

          <div style={{ height: 1, background: "#eee", margin: "80px 0 50px" }} />

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-block", background: "#dcfce7", color: "#16a34a", padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 18, border: "1px solid #bbf7d0" }}>
              Se activa solo, no hace falta pedirlo
            </div>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)", fontWeight: 800, maxWidth: 700, margin: "0 auto" }}>
              ¿Qué pasa cuando tu institución logra crecer con ingresos fuertes a lo largo del tiempo?
            </h3>
          </div>

          <div style={{ maxWidth: 560, margin: "0 auto 50px", background: "#fafafa", border: "1px solid #eee", borderRadius: 16, padding: "28px 26px" }}>
            <div style={{ fontSize: "0.85rem", color: "#444", lineHeight: 1.6, marginBottom: 18 }}>
              Nexo cobra 15% o 35% de tu recaudación mensual, según el plan elegido, cada uno con su propio tope.
            </div>

            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 0.5, color: "#aaa", fontWeight: 700, marginBottom: 10 }}>
              Cuando se cumplen estas dos condiciones
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: GREEN, fontWeight: 700, fontSize: "0.85rem" }}>✓</span>
                <span style={{ fontSize: "0.85rem", color: "#444" }}>Pasaron 18 meses desde que empezaste</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: GREEN, fontWeight: 700, fontSize: "0.85rem" }}>✓</span>
                <span style={{ fontSize: "0.85rem", color: "#444" }}>Tu institución recauda $4.000.000 o más por mes de forma sostenida</span>
              </div>
            </div>

            <div style={{ background: `linear-gradient(160deg, ${BRAND_DARK} 0%, #2a0a0a 100%)`, borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: 6 }}>
                Pasás automáticamente a la Fase Consolidada
              </div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                Nexo pasa a cobrar un 10% fijo de tu recaudación mensual, de forma estable, con tope de $800.000.
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#999", fontSize: "0.82rem", maxWidth: 620, margin: "0 auto 50px" }}>
            Se activa sola, sin que tengas que pedirlo, apenas se cumplen las dos condiciones. La edición de
            contenido para redes pasa a presupuestarse aparte, a demanda, si la seguís necesitando.
          </div>

          <div style={{
            background: `linear-gradient(150deg, ${BRAND_DARK} 0%, #2a0a0a 100%)`,
            borderRadius: 18, padding: "32px 30px", maxWidth: 720, marginLeft: "auto", marginRight: "auto",
            textAlign: "center", boxShadow: `0 16px 50px ${BRAND}20`,
          }}>
            <div style={{ fontSize: "1.6rem", marginBottom: 12 }}>🌱</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "white", marginBottom: 12, lineHeight: 1.4 }}>
              Te acompañamos para crecer, no para quedarnos para siempre
            </div>
            <div style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
              Entendemos que llega un momento en el que nuestro aporte se vuelve sostenido a lo largo del
              tiempo. Por eso el porcentaje baja solo, sin que tengas que pedirlo: a partir de ahí, tu mensualidad
              refleja exactamente eso, el sistema de control, gestión, automatización de suscripciones y
              sitio web que seguimos manteniendo activo para vos. El objetivo es que tu institución nunca tenga
              que destinar dinero propio a sostener el sistema; son las propias suscripciones de tus
              colaboradores las que lo sostienen de forma autónoma, y además te generan un ingreso mensual
              sostenido para la institución.
            </div>
          </div>
        </div>
      </section>

      {/* CASO REAL */}
      <section style={{ padding: "90px 5%", background: "#fafafa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            background: "white", borderRadius: 20, padding: "40px 36px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, justifyContent: "space-between",
          }}>
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem", letterSpacing: 1, textTransform: "uppercase", color: BRAND, fontWeight: 700, marginBottom: 8 }}>
                Bomberos Voluntarios de General Sarmiento
              </div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1a1a1a", marginBottom: 10 }}>
                Ya está funcionando, con pagos reales
              </h3>
              <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 480 }}>
                BVGS usa Nexo como una fuente de financiamiento propia y recurrente para la institución.
                El sistema está en producción, cobrando colaboradores todos los meses.
              </p>
            </div>
            <a href={DEMO_LINK} target="_blank" rel="noreferrer" style={{
              background: BRAND, color: "white", padding: "13px 24px", borderRadius: 10,
              textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap",
            }}>
              Probar el formulario real →
            </a>
          </div>
        </div>
      </section>

      {/* ESTO ES SOLO EL PRINCIPIO */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", background: "#f5f3ff", color: "#7c3aed", padding: "6px 18px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, marginBottom: 16, border: "1px solid #ddd6fe" }}>
              Más allá de Nexo
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Esto es solo el principio
            </h2>
            <p style={{ color: "#888", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
              Nexo es un ejemplo de lo que hacemos: sistemas y automatizaciones a medida para instituciones
              como la tuya. Para una institución, además del cobro de colaboradores, también automatizamos:
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {EXTRA.map((m) => (
              <div key={m.title} style={{ background: "#fafafa", borderLeft: `3px solid ${m.color}`, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: "1.05rem" }}>{m.icon}</span>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a" }}>{m.title}</h3>
                </div>
                <p style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, background: "#f5f3ff", border: "1px dashed #ddd6fe", borderRadius: 14, padding: "22px 26px", maxWidth: 760, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            <div style={{ fontSize: "0.92rem", color: "#4c1d95", fontWeight: 700, marginBottom: 6 }}>
              ¿Tenés otra idea o necesidad puntual que no está en esta lista?
            </div>
            <div style={{ fontSize: "0.85rem", color: "#6d28d9", lineHeight: 1.7 }}>
              A eso nos dedicamos en Crolia: convertir cualquier idea o necesidad de tu institución en un
              sistema que funcione solo, automático. Si se puede pensar, lo podemos construir, contanos qué
              necesitás.
            </div>
          </div>

          {/* MOCKUP CENTRO DE COMANDO */}
          <div style={{
            marginTop: 40, background: `linear-gradient(160deg, #0f172a 0%, #1e1b2e 100%)`,
            borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          }}>
            <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 22, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>nexo.tucuartel.org.ar/comando</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 999, padding: "3px 10px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
                <span style={{ color: GREEN, fontSize: "0.65rem", fontWeight: 700 }}>EN VIVO</span>
              </div>
            </div>

            <div style={{ padding: "22px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 18 }} className="stack-mobile">
              {/* Mini mapa estilo Google Maps */}
              <div style={{ position: "relative", borderRadius: 14, minHeight: 240, overflow: "hidden" }}>
                <svg viewBox="0 0 400 240" style={{ display: "block", width: "100%", height: 240 }}>
                  <rect width="400" height="240" fill="#e8e6e1" />

                  {/* manzanas con edificios */}
                  {[
                    [20, 15, 24, 16], [70, 60, 20, 14], [100, 15, 16, 18], [180, 55, 26, 16],
                    [250, 110, 18, 20], [290, 150, 22, 14], [20, 170, 20, 16], [100, 165, 16, 22],
                    [190, 160, 20, 16], [360, 60, 16, 20], [360, 170, 18, 16], [20, 105, 16, 18],
                  ].map(([bx, by, bw, bh], i) => (
                    <rect key={i} x={bx} y={by} width={bw} height={bh} rx="1.5" fill="#d8d4cb" />
                  ))}

                  {/* parque */}
                  <rect x="300" y="15" width="85" height="65" rx="6" fill="#c9e4ca" />
                  <circle cx="320" cy="35" r="7" fill="#a9d1ab" />
                  <circle cx="355" cy="55" r="9" fill="#a9d1ab" />
                  <circle cx="335" cy="65" r="6" fill="#a9d1ab" />

                  {/* calles */}
                  {[40, 95, 150, 205].map((y) => (
                    <rect key={`h${y}`} x="0" y={y - 3} width="400" height="6" fill="#fff" />
                  ))}
                  {[60, 150, 240, 330].map((x) => (
                    <rect key={`v${x}`} x={x - 3} y="0" width="6" height="240" fill="#fff" />
                  ))}

                  {/* ruta activa del cuartel al incendio */}
                  <path d="M 60,150 L 60,95 L 330,95 L 330,70" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" />
                  <path d="M 60,150 L 60,95 L 330,95 L 330,70" stroke="#4285F4" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 10" />

                  {/* pin cuartel */}
                  <g transform="translate(60,150) scale(1.5) translate(-12,-21)">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={BRAND} stroke="white" strokeWidth="1.2" />
                    <circle cx="12" cy="9" r="3.4" fill="white" />
                  </g>

                  {/* foco del incendio */}
                  <circle cx="340" cy="58" r="13" fill="#ef4444" opacity="0.18" />
                  <g transform="translate(340,58)">
                    <circle r="10" fill="white" stroke="#ef4444" strokeWidth="3" />
                    <text textAnchor="middle" dy="4" fontSize="11">🔥</text>
                  </g>

                  {/* unidades: 1 en el lugar, 2 en camino */}
                  <g transform="translate(330,70)">
                    <circle r="11" fill="white" stroke="#ef4444" strokeWidth="3.5" />
                    <text textAnchor="middle" dy="4" fontSize="10">🚒</text>
                  </g>
                  {[
                    { x: 150, y: 95 },
                    { x: 60, y: 110 },
                  ].map((u, i) => (
                    <g key={i} transform={`translate(${u.x},${u.y})`}>
                      <circle r="10" fill="white" stroke="#4285F4" strokeWidth="3" />
                      <text textAnchor="middle" dy="4" fontSize="9">🚒</text>
                    </g>
                  ))}
                </svg>

                {/* etiquetas */}
                {[
                  { left: "15%", top: "62.5%", label: "Cuartel Central" },
                  { left: "78%", top: "29.2%", label: "Móvil A-7 · en el lugar" },
                  { left: "37.5%", top: "39.6%", label: "Móvil A-3 · en camino" },
                  { left: "15%", top: "45.8%", label: "Móvil A-10 · en camino" },
                ].map((l) => (
                  <div key={l.label} style={{
                    position: "absolute", left: l.left, top: l.top, transform: "translate(-50%,0)",
                    fontSize: "0.56rem", fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap",
                    background: "rgba(255,255,255,0.9)", borderRadius: 4, padding: "1px 5px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}>{l.label}</div>
                ))}
              </div>

              {/* KPIs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.55)" }}>Confirmados, convocatoria WhatsApp</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "white" }}>14/22</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{ width: "64%", height: "100%", background: GREEN }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", borderLeft: `3px solid ${BRAND}` }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Choferes</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>3</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", borderLeft: "3px solid #3b82f6" }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Oficiales</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>2</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", borderLeft: "3px solid #8b5cf6" }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Suboficiales</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>4</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", borderLeft: `3px solid ${GREEN}` }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Bomberos</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>5</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", borderLeft: "3px solid #f59e0b" }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>En servicio ahora</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>3</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", borderLeft: "3px solid #9aa0a6" }}>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Unidades disponibles</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>1/4</div>
                  </div>
                </div>
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 10, padding: "10px 12px", fontSize: "0.65rem", color: "#fbbf24", display: "flex", alignItems: "center", gap: 6 }}>
                  🚨 Móvil A-7 en el lugar · A-3 y A-10 en camino; incendio estructural, Av. Rivadavia 1200
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIENES SOMOS */}
      <section style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#fef2f2", color: BRAND, padding: "5px 14px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, marginBottom: 18, border: "1px solid #fecaca" }}>
            ¿Quiénes somos?
          </div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
            Somos Crolia
          </h2>
          <p style={{ color: "#666", fontSize: "1rem", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 24px" }}>
            Crolia es un estudio de consultoría en inteligencia artificial y automatización. Construimos
            agentes de IA, sistemas de gestión y automatizaciones a medida para empresas e instituciones en
            Argentina. Nexo es uno de nuestros productos, pensado específicamente para cuarteles de bomberos
            voluntarios.
          </p>
          <a href="https://www.crolia.com.ar" target="_blank" rel="noreferrer" style={{
            color: BRAND, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
          }}>
            Conocé más sobre lo que hacemos en www.crolia.com.ar →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 5%", background: "#fafafa" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>
              Preguntas frecuentes
            </h2>
            <p style={{ color: "#888", fontSize: "1.05rem" }}>
              Lo que suele preguntar un Consejo Directivo antes de decidir.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ background: "white", border: "1px solid #eee", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.98rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{f.q}</div>
                <div style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{
        padding: "100px 5%",
        background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_DARK2} 100%)`,
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🚒</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", marginBottom: 16 }}>
            ¿Lo llevamos a tu institución?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 40 }}>
            Charla de 10 minutos por WhatsApp, sin compromiso. Te contamos cómo implementarlo paso a paso.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
              background: GREEN, color: "white", padding: "16px 32px", borderRadius: 12,
              textDecoration: "none", fontWeight: 700, fontSize: "1rem",
              display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 8px 30px rgba(34,197,94,0.3)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.428l5.736-1.504A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.51-5.166-1.4l-.371-.22-3.4.893.907-3.32-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0505", padding: "32px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: BRAND_LIGHT, fontFamily: "'Oswald', sans-serif" }}>Nexo</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>by Crolia</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
          © 2026 Crolia · crolia.com.ar
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { transition: opacity 0.2s; }
        a:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .hero-grid, .stack-mobile { grid-template-columns: 1fr !important; }
          .pasos-grid { grid-template-columns: 1fr 1fr !important; }
          .pasos-line { display: none; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const AGENTS = [
  {
    id: "peluqueria",
    icon: "💈",
    name: "Barbería / Peluquería",
    tagline: "Precios, turnos y recordatorios automáticos",
    color: "#8a6448",
    bg: "rgba(138, 100, 72, 0.08)",
    border: "rgba(138, 100, 72, 0.25)",
    welcome: "¡Hola! Soy Bruno de Peluquería Don Ragner 💈 ¿En qué te puedo ayudar hoy?",
    context: "Negocio: Peluquería Don Ragner · Agente: Bruno · Servicios: cortes, barba y coloración · Turnos consultados en tiempo real vía Google Calendar",
  },
  {
    id: "ventas",
    icon: "🛒",
    name: "Ventas de productos",
    tagline: "Consultas, catálogo y cierre de ventas",
    color: "#4f46e5",
    bg: "rgba(79, 70, 229, 0.08)",
    border: "rgba(79, 70, 229, 0.25)",
    welcome: "¡Hola! Soy Nova de Oli Tech Store 🛒 ¿Qué producto estás buscando?",
    context: "Negocio: Oli Tech Store (electrónica) · Agente: Nova · Catálogo de celulares, notebooks, accesorios y más · Cuotas sin interés disponibles",
  },
  {
    id: "seguros",
    icon: "🛡️",
    name: "Productor de seguros",
    tagline: "Cotizaciones y asesoramiento en segundos",
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.08)",
    border: "rgba(5, 150, 105, 0.25)",
    welcome: "¡Hola! Soy Valentina de Cloe Seguros 🛡️ ¿En qué te puedo ayudar hoy?",
    context: "Negocio: Cloe Seguros · Agente: Valentina · Nuevos clientes: cotización y asesoramiento · Clientes existentes: consulta de póliza, denuncia de siniestro, renovaciones y modificaciones",
  },
  {
    id: "restaurante",
    icon: "🍽️",
    name: "Restaurante",
    tagline: "Reservas de mesa, menú y delivery",
    color: "#dc2626",
    bg: "rgba(220, 38, 38, 0.07)",
    border: "rgba(220, 38, 38, 0.22)",
    welcome: "¡Hola! Soy Tomás de Lo de Berta 🍽️ ¿Querés hacer una reserva o consultar el menú?",
    context: "Negocio: Lo de Berta (parrilla/casera) · Agente: Tomás · Menú completo cargado · Reservas de mesa en tiempo real · Delivery por Pedidos Ya y Rappi",
  },
  {
    id: "gimnasio",
    icon: "🏋️",
    name: "Gimnasio / Fitness",
    tagline: "Membresías, clases grupales y personal training",
    color: "#7c3aed",
    bg: "rgba(124, 58, 237, 0.07)",
    border: "rgba(124, 58, 237, 0.22)",
    welcome: "¡Hola! Soy Luca de PipisFit Club 🏋️ ¿Querés info sobre membresías o reservar una clase?",
    context: "Negocio: PipisFit Club · Agente: Luca · Membresías mensuales y trimestrales · Clases grupales incluidas · Clientes existentes: reserva de clases y consulta de membresía",
  },
  {
    id: "clinica",
    icon: "🏥",
    name: "Clínica / Consultorio",
    tagline: "Turnos médicos y consultas de cobertura",
    color: "#0284c7",
    bg: "rgba(2, 132, 199, 0.08)",
    border: "rgba(2, 132, 199, 0.25)",
    welcome: "¡Hola! Soy Sofía de Clínica Integral Salud 🏥 ¿Con qué especialidad querés sacar turno?",
    context: "Negocio: Clínica Integral Salud · Agente: Sofía · Especialidades: clínica, cardiología, ginecología, pediatría, nutrición, psicología, dermatología · Obras sociales: OSDE, Swiss Medical, Galeno, Medicus, IOMA, Pami",
  },
];

type Message = { role: "user" | "assistant"; content: string };
type Step = "select" | "form" | "chat";

export default function DemoPage() {
  const [step, setStep] = useState<Step>("select");
  const [selectedAgent, setSelectedAgent] = useState<(typeof AGENTS)[0] | null>(null);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [formError, setFormError] = useState("");
  const [submittingForm, setSubmittingForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function selectAgent(agent: (typeof AGENTS)[0]) {
    setSelectedAgent(agent);
    setStep("form");
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.telefono.trim()) {
      setFormError("Completá todos los campos para continuar.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setFormError("Ingresá un email válido.");
      return;
    }
    setFormError("");
    setSubmittingForm(true);
    try {
      await fetch("/api/demo/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, agentType: selectedAgent!.id }),
      });
    } catch {
      // Lead save failure is non-blocking
    }
    setMessages([{ role: "assistant", content: selectedAgent!.welcome }]);
    setStep("chat");
    setSubmittingForm(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentType: selectedAgent!.id,
          messages: newMessages,
        }),
      });

      if (!res.ok) {
        setMessages([...newMessages, { role: "assistant", content: "Hubo un error. Intentá de nuevo." }]);
        setIsTyping(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages([...newMessages, { role: "assistant", content: "" }]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: "assistant", content: assistantText }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Hubo un error de conexión. Intentá de nuevo." }]);
      setIsTyping(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        borderBottom: "1px solid rgba(34,26,20,0.06)",
        background: "rgba(249, 245, 239, 0.9)",
        backdropFilter: "blur(16px)",
      }}>
        <div className="section-shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src="/crolia-logo.png" alt="Crolia" style={{ height: 36, width: 36, borderRadius: "50%" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-ink)", fontFamily: "var(--font-display)" }}>Crolia</span>
          </a>
          <a
            href="https://wa.me/5491168556257?text=Hola%20Crolia%2C%20quiero%20info%20sobre%20automatizaci%C3%B3n%20con%20IA"
            target="_blank" rel="noopener noreferrer"
            style={{
              background: "var(--color-ink)", color: "white",
              borderRadius: 999, padding: "0.6rem 1.25rem",
              fontSize: "0.8rem", fontWeight: 500, textDecoration: "none",
            }}
          >
            Hablar por WhatsApp
          </a>
        </div>
      </header>

      <div className="section-shell" style={{ padding: "3rem 0 5rem" }}>

        {/* ── STEP: SELECT AGENT ── */}
        {step === "select" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>Demo online gratuito</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)", lineHeight: 1.08, marginTop: "1rem" }}>
                Probá cómo trabaja<br />un agente de IA real.
              </h1>
              <p style={{ marginTop: "1rem", fontSize: "1.05rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: 520, margin: "1rem auto 0" }}>
                Elegí el tipo de negocio y chateá en tiempo real con el agente. Así es exactamente como lo viven tus clientes.
              </p>
            </div>

            <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", maxWidth: 900, margin: "0 auto" }}>
              {AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => selectAgent(agent)}
                  style={{
                    border: `1px solid ${agent.border}`,
                    borderRadius: "1.75rem",
                    background: agent.bg,
                    padding: "2rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "transform 220ms ease, box-shadow 220ms ease",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)"; }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{agent.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.4rem" }}>{agent.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", lineHeight: 1.6 }}>{agent.tagline}</p>
                  <div style={{
                    marginTop: "1rem",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "0.75rem",
                    background: "rgba(0,0,0,0.04)",
                    fontSize: "0.72rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.6,
                  }}>
                    <span style={{ fontWeight: 600, color: agent.color }}>Información del negocio:</span>
                    {agent.context}
                  </div>
                  <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", fontWeight: 600, color: agent.color }}>
                    Probar demo →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP: LEAD FORM ── */}
        {step === "form" && selectedAgent && (
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <button
              onClick={() => setStep("select")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "2rem", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              ← Volver
            </button>

            <div style={{
              border: `1px solid ${selectedAgent.border}`,
              borderRadius: "2rem",
              background: "rgba(255,255,255,0.85)",
              padding: "2.5rem",
              boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{selectedAgent.icon}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.5rem" }}>
                Agente de {selectedAgent.name}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Dejanos tus datos para acceder al demo gratuito. Te contactaremos si querés implementarlo en tu negocio.
              </p>

              <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  required
                />
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  className="form-input"
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                  required
                />

                {formError && (
                  <p style={{ fontSize: "0.82rem", color: "#dc2626", margin: 0 }}>{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submittingForm}
                  style={{
                    background: "var(--color-ink)", color: "white",
                    border: "none", borderRadius: 999,
                    padding: "1rem 2rem", fontSize: "0.9rem", fontWeight: 600,
                    cursor: submittingForm ? "not-allowed" : "pointer",
                    opacity: submittingForm ? 0.7 : 1,
                    transition: "opacity 200ms",
                    marginTop: "0.5rem",
                  }}
                >
                  {submittingForm ? "Cargando..." : "Empezar el demo →"}
                </button>

                <p style={{ fontSize: "0.72rem", color: "var(--color-muted)", textAlign: "center", lineHeight: 1.6 }}>
                  Tus datos no se comparten con terceros. Solo los usamos para contactarte si te interesa.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* ── STEP: CHAT ── */}
        {step === "chat" && selectedAgent && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <button
                onClick={() => { setStep("select"); setMessages([]); setSelectedAgent(null); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: "0.85rem", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                ← Probar otro agente
              </button>
              <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", background: "rgba(0,0,0,0.04)", borderRadius: 999, padding: "0.3rem 0.85rem" }}>
                Demo en vivo · IA real
              </span>
            </div>

            {/* Chat window */}
            <div style={{
              border: "1px solid rgba(34,26,20,0.08)",
              borderRadius: "2rem",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.1)",
              background: "#f0ebe3",
              display: "flex",
              flexDirection: "column",
              height: "clamp(480px, 70vh, 640px)",
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "var(--color-ink)", padding: "1rem 1.25rem", flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: selectedAgent.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                  {selectedAgent.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", lineHeight: 1.2, margin: 0 }}>{selectedAgent.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", margin: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
                    En línea ahora
                  </p>
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>Demo Crolia</div>
              </div>

              {/* Context banner */}
              <div style={{
                padding: "0.55rem 1.1rem",
                background: "rgba(0,0,0,0.03)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                lineHeight: 1.5,
                flexShrink: 0,
              }}>
                <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Información del negocio:</span>
                {selectedAgent.context}
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    maxWidth: "78%",
                    padding: "0.7rem 1rem",
                    borderRadius: "1.25rem",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    wordBreak: "break-word",
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    background: msg.role === "user" ? "white" : "var(--color-accent-soft)",
                    color: "var(--color-ink)",
                    borderBottomRightRadius: msg.role === "user" ? "0.35rem" : "1.25rem",
                    borderBottomLeftRadius: msg.role === "assistant" ? "0.35rem" : "1.25rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}>
                    {msg.content
                    ? <ReactMarkdown
                        components={{
                          p: ({ children }) => <p style={{ margin: "0 0 0.4em" }}>{children}</p>,
                          strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
                          ol: ({ children }) => <ol style={{ margin: "0.4em 0", paddingLeft: "1.2em" }}>{children}</ol>,
                          ul: ({ children }) => <ul style={{ margin: "0.4em 0", paddingLeft: "1.2em" }}>{children}</ul>,
                          li: ({ children }) => <li style={{ marginBottom: "0.25em" }}>{children}</li>,
                        }}
                      >{msg.content}</ReactMarkdown>
                    : <span style={{ opacity: 0.4 }}>...</span>
                  }
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-typing" style={{ alignSelf: "flex-start" }}>
                    <span /><span /><span />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={sendMessage}
                style={{
                  display: "flex", gap: "0.6rem",
                  padding: "0.85rem 1rem",
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                  background: "rgba(255,255,255,0.7)",
                  flexShrink: 0,
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Escribí tu mensaje..."
                  disabled={isTyping}
                  style={{
                    flex: 1,
                    border: "1px solid rgba(34,26,20,0.1)",
                    borderRadius: 999,
                    padding: "0.7rem 1.1rem",
                    fontSize: "0.88rem",
                    background: "white",
                    color: "var(--color-ink)",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  style={{
                    width: 42, height: 42,
                    borderRadius: "50%",
                    background: input.trim() && !isTyping ? "var(--color-ink)" : "rgba(0,0,0,0.1)",
                    border: "none",
                    cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 200ms",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* CTA debajo del chat */}
            <div style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              borderRadius: "1.5rem",
              background: "var(--color-ink)",
              color: "white",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.5rem", fontFamily: "var(--font-display)" }}>
                ¿Querés esto para tu negocio?
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", margin: "0 0 1.25rem" }}>
                Lo implementamos en días. Sin contrato largo ni grandes inversiones.
              </p>
              <a
                href="https://wa.me/5491168556257?text=Hola%20Crolia%2C%20probé%20el%20demo%20y%20me%20interesa%20implementarlo%20en%20mi%20negocio"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#25d366", color: "white",
                  borderRadius: 999, padding: "0.75rem 1.5rem",
                  fontSize: "0.88rem", fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 200ms",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablar con Crolia por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

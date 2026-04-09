"use client";

import { useEffect, useState, useCallback } from "react";
import type { AgentStats } from "../api/admin/stats/route";
import type { DemoLead } from "../api/demo/lead/route";

interface Summary {
  total_clientes: number;
  clientes_online: number;
  total_conversaciones_mes: number;
  total_costo_usd_mes: number;
  mrr_usd: number;
}

interface StatsResponse {
  agents: AgentStats[];
  summary: Summary;
  warning?: string;
}

const PLAN_LABELS: Record<string, string> = {
  esencial: "Esencial",
  "esencial+": "Esencial+",
  profesional: "Profesional",
  escala: "Escala",
  // legacy
  starter: "Esencial",
  growth: "Esencial+",
  pro: "Profesional",
};

const PLAN_COLORS: Record<string, string> = {
  esencial: "#6d6057",
  "esencial+": "#8a6448",
  profesional: "#221a14",
  escala: "#4f46e5",
  starter: "#6d6057",
  growth: "#8a6448",
  pro: "#221a14",
};

// Features disponibles por plan
const PLAN_FEATURES: Record<string, { audio: boolean; imagenes: boolean; crm: boolean }> = {
  esencial:     { audio: false, imagenes: false, crm: false },
  "esencial+":  { audio: true,  imagenes: true,  crm: false },
  profesional:  { audio: true,  imagenes: true,  crm: false },
  escala:       { audio: true,  imagenes: true,  crm: true  },
  starter:      { audio: false, imagenes: false, crm: false },
  growth:       { audio: true,  imagenes: true,  crm: false },
  pro:          { audio: true,  imagenes: true,  crm: true  },
};

function pct(conv: number, limit: number) {
  return Math.min(100, Math.round((conv / limit) * 100));
}

function barColor(p: number) {
  if (p >= 90) return "#ef4444";
  if (p >= 70) return "#f59e0b";
  return "#4ade80";
}

function fmtDate(iso: string | null) {
  if (!iso) return "Sin actividad";
  const d = new Date(iso);
  return d.toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function fmtRelative(iso: string | null) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  const hs = Math.floor(mins / 60);
  if (hs < 24) return `Hace ${hs}h`;
  return `Hace ${Math.floor(hs / 24)} días`;
}

const AGENT_LABELS: Record<string, string> = {
  peluqueria:  "💈 Peluquería",
  ventas:      "🛒 Ventas",
  seguros:     "🛡️ Seguros",
  clinica:     "🏥 Clínica",
  restaurante: "🍽️ Restaurante",
  gimnasio:    "🏋️ Gimnasio",
};

export default function AdminPanel() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [tab, setTab] = useState<"agentes" | "leads">("agentes");
  const [leads, setLeads] = useState<DemoLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = await res.json();
      setData(json);
      setLastUpdate(new Date());
    } catch {
      // silenciar errores de red
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/admin/demo-leads");
      if (res.ok) {
        const json = await res.json();
        setLeads(json.leads ?? []);
      }
    } catch {
      // silenciar
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => {
    if (tab === "leads") loadLeads();
  }, [tab, loadLeads]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f1ea", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <header style={{
        background: "#221a14",
        padding: "0 2rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>Crolia</span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.8rem" }}>/</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "white" }}>Panel Admin</span>
          <div style={{ display: "flex", gap: "0.25rem", marginLeft: "1rem" }}>
            {(["agentes", "leads"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? "rgba(255,255,255,0.12)" : "transparent",
                  border: tab === t ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                  borderRadius: "0.5rem",
                  padding: "0.3rem 0.85rem",
                  color: tab === t ? "white" : "rgba(255,255,255,0.45)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {t === "agentes" ? "🤖 Agentes" : "🎯 Leads Demo"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {lastUpdate && (
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
              Actualizado: {lastUpdate.toLocaleTimeString("es-AR")}
            </span>
          )}
          <button
            onClick={load}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "0.5rem",
              padding: "0.35rem 0.75rem",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            ↻ Refrescar
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ── TAB: LEADS DEMO ── */}
        {tab === "leads" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#221a14", margin: 0 }}>Leads del Demo Online</h2>
                <p style={{ fontSize: "0.78rem", color: "#6d6057", marginTop: "0.25rem" }}>{leads.length} {leads.length === 1 ? "persona probó" : "personas probaron"} el demo</p>
              </div>
              <button
                onClick={loadLeads}
                style={{ background: "white", border: "1px solid rgba(34,26,20,0.1)", borderRadius: "0.5rem", padding: "0.4rem 0.9rem", fontSize: "0.75rem", cursor: "pointer", color: "#6d6057" }}
              >
                ↻ Refrescar
              </button>
            </div>

            {leadsLoading && (
              <div style={{ textAlign: "center", padding: "3rem", color: "#6d6057" }}>Cargando leads...</div>
            )}

            {!leadsLoading && leads.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem", background: "white", borderRadius: "1.5rem", border: "1px solid rgba(34,26,20,0.07)", color: "#6d6057" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
                <p style={{ fontWeight: 600, color: "#221a14" }}>Aún no hay leads</p>
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Cuando alguien complete el form del demo, van a aparecer acá.</p>
                <a href="/demo" target="_blank" style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.82rem", color: "#8a6448" }}>Ver el demo →</a>
              </div>
            )}

            {!leadsLoading && leads.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {leads.map(lead => {
                  // createdAt viene del Sheet ya formateado ("09/04/2026, 02:21") — mostrar directo
                  const fecha = lead.createdAt || "—";
                  return (
                    <div key={lead.id} style={{
                      background: "white",
                      border: "1px solid rgba(34,26,20,0.07)",
                      borderRadius: "1.25rem",
                      padding: "1.25rem 1.5rem",
                      boxShadow: "0 4px 24px rgba(34,26,20,0.05)",
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                    }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#221a14", fontFamily: "'Space Grotesk', sans-serif" }}>{lead.nombre}</div>
                        <div style={{ fontSize: "0.78rem", color: "#6d6057", marginTop: "0.2rem" }}>{AGENT_LABELS[lead.agentType] ?? lead.agentType} · {fecha}</div>
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#6d6057" }}>{lead.email}</div>
                      <div style={{ fontSize: "0.82rem", color: "#6d6057" }}>{lead.telefono}</div>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <a
                          href={`https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=Hola%20${encodeURIComponent(lead.nombre)}%2C%20soy%20Fran%20de%20Crolia.%20Vi%20que%20probaste%20nuestro%20demo%20de%20agentes%20IA%20%F0%9F%A4%96%20%C2%BFTe%20interesa%20implementarlo%20en%20tu%20negocio%3F`}
                          target="_blank" rel="noopener noreferrer"
                          style={{ background: "#25d366", color: "white", borderRadius: "0.5rem", padding: "0.4rem 0.85rem", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
                        >
                          💬 WA
                        </a>
                        <a
                          href={`mailto:${lead.email}?subject=Tu%20demo%20de%20Crolia&body=Hola%20${encodeURIComponent(lead.nombre)}%2C`}
                          style={{ background: "#221a14", color: "white", borderRadius: "0.5rem", padding: "0.4rem 0.85rem", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
                        >
                          ✉️ Email
                        </a>
                        {lead.id && (
                          <a
                            href={`/admin/conversacion/${lead.id}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ background: "#f6f1ea", color: "#221a14", border: "1px solid rgba(34,26,20,0.15)", borderRadius: "0.5rem", padding: "0.4rem 0.85rem", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
                          >
                            🗒 Ver chat
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "agentes" && (
          <>
            {loading && (
              <div style={{ textAlign: "center", padding: "4rem", color: "#6d6057" }}>
                Cargando métricas...
              </div>
            )}

            {data?.warning && (
              <div style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "1rem",
                padding: "1rem 1.5rem",
                marginBottom: "1.5rem",
                fontSize: "0.85rem",
                color: "#92400e",
              }}>
                ⚠️ {data.warning} — Configurá <code>AGENTS_CONFIG</code> en las variables de entorno.
              </div>
            )}

            {/* Summary cards */}
            {data?.summary && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            {[
              { label: "Clientes activos", value: `${data.summary.clientes_online} / ${data.summary.total_clientes}`, sub: "online ahora" },
              { label: "Conversaciones este mes", value: data.summary.total_conversaciones_mes.toLocaleString("es-AR"), sub: "mensajes de usuarios" },
              { label: "Costo API este mes", value: `$${data.summary.total_costo_usd_mes.toFixed(3)} USD`, sub: "Claude API total" },
              { label: "MRR", value: `$${data.summary.mrr_usd.toLocaleString("es-AR")} USD`, sub: "ingresos recurrentes" },
            ].map(card => (
              <div key={card.label} style={{
                background: "white",
                border: "1px solid rgba(34,26,20,0.07)",
                borderRadius: "1.25rem",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 4px 24px rgba(34,26,20,0.05)",
              }}>
                <div style={{ fontSize: "0.7rem", color: "#6d6057", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: "0.5rem" }}>{card.label}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#221a14", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em", lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontSize: "0.72rem", color: "#6d6057", marginTop: "0.3rem" }}>{card.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Agent cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {data?.agents.map(agent => {
            const p = pct(agent.conversaciones_mes, agent.limite_plan);
            const color = barColor(p);
            const isAlert = p >= 80;

            return (
              <div key={agent.id} style={{
                background: "white",
                border: `1px solid ${isAlert ? "rgba(239,68,68,0.25)" : "rgba(34,26,20,0.07)"}`,
                borderRadius: "1.5rem",
                padding: "1.5rem 1.75rem",
                boxShadow: "0 4px 24px rgba(34,26,20,0.05)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>

                  {/* Left: nombre + plan */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <div style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: agent.online ? "#4ade80" : "#ef4444",
                      boxShadow: agent.online ? "0 0 0 3px rgba(74,222,128,0.2)" : "none",
                      flexShrink: 0,
                    }} />
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#221a14",
                      margin: 0,
                    }}>{agent.nombre}</h3>
                    <span style={{
                      background: `rgba(${agent.plan === "pro" ? "34,26,20" : "138,100,72"},0.1)`,
                      color: PLAN_COLORS[agent.plan],
                      borderRadius: "999px",
                      padding: "0.2rem 0.7rem",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}>{PLAN_LABELS[agent.plan]}</span>
                    {isAlert && (
                      <span style={{
                        background: "rgba(239,68,68,0.1)",
                        color: "#dc2626",
                        borderRadius: "999px",
                        padding: "0.2rem 0.7rem",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}>⚠ Cerca del límite</span>
                    )}
                  </div>

                  {/* Right: última actividad */}
                  <div style={{ textAlign: "right", fontSize: "0.78rem", color: "#6d6057" }}>
                    <div style={{ fontWeight: 600, color: "#221a14" }}>{fmtRelative(agent.ultima_actividad)}</div>
                    <div>{fmtDate(agent.ultima_actividad)}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#6d6057", marginBottom: "0.4rem" }}>
                    <span>Conversaciones este mes</span>
                    <span style={{ fontWeight: 600, color: p >= 80 ? "#dc2626" : "#221a14" }}>
                      {agent.conversaciones_mes.toLocaleString("es-AR")} / {agent.limite_plan === 999999 ? "∞" : agent.limite_plan.toLocaleString("es-AR")} ({p}%)
                    </span>
                  </div>
                  <div style={{ height: "8px", background: "rgba(34,26,20,0.07)", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${p}%`,
                      background: color,
                      borderRadius: "999px",
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>

                {/* Feature badges */}
                {(() => {
                  const f = PLAN_FEATURES[agent.plan] ?? { audio: false, imagenes: false, crm: false };
                  return (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "999px", background: f.audio ? "rgba(16,185,129,0.1)" : "rgba(34,26,20,0.05)", color: f.audio ? "#059669" : "#9ca3af", fontWeight: 600 }}>
                        🎤 Audio {f.audio ? "✓" : "—"}
                      </span>
                      <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "999px", background: f.imagenes ? "rgba(16,185,129,0.1)" : "rgba(34,26,20,0.05)", color: f.imagenes ? "#059669" : "#9ca3af", fontWeight: 600 }}>
                        📷 Imágenes {f.imagenes ? "✓" : "—"}
                      </span>
                      <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "999px", background: f.crm ? "rgba(16,185,129,0.1)" : "rgba(34,26,20,0.05)", color: f.crm ? "#059669" : "#9ca3af", fontWeight: 600 }}>
                        📋 CRM {f.crm ? "✓" : "—"}
                      </span>
                    </div>
                  );
                })()}

                {/* Stats row */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1rem",
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(34,26,20,0.06)",
                }}>
                  {[
                    { label: "Usuarios únicos", value: agent.usuarios_unicos_mes.toLocaleString("es-AR") },
                    { label: "Costo API", value: `$${agent.costo_usd_mes.toFixed(3)} USD` },
                    { label: "Tokens entrada", value: agent.tokens_input_mes.toLocaleString("es-AR") },
                    { label: "Tokens salida", value: agent.tokens_output_mes.toLocaleString("es-AR") },
                    { label: "Estado", value: agent.online ? "Online" : (agent.error ?? "Offline"), color: agent.online ? "#16a34a" : "#dc2626" },
                  ].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontSize: "0.68rem", color: "#6d6057", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: stat.color ?? "#221a14", fontFamily: "'Space Grotesk', sans-serif", marginTop: "0.2rem" }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

            {data?.agents.length === 0 && !loading && (
              <div style={{
                textAlign: "center",
                padding: "4rem",
                background: "white",
                borderRadius: "1.5rem",
                border: "1px solid rgba(34,26,20,0.07)",
                color: "#6d6057",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🤖</div>
                <p style={{ fontWeight: 600, color: "#221a14" }}>No hay agentes configurados</p>
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Configurá <code>AGENTS_CONFIG</code> en las variables de entorno para ver los clientes acá.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

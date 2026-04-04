import { NextRequest, NextResponse } from "next/server";

export interface AgentConfig {
  id: string;
  nombre: string;
  plan: "starter" | "growth" | "pro";
  url: string;      // URL pública del agente en Railway
  apiKey: string;   // Valor de ADMIN_API_KEY configurado en ese agente
}

export interface AgentStats {
  id: string;
  nombre: string;
  plan: "starter" | "growth" | "pro";
  online: boolean;
  periodo: string;
  conversaciones_mes: number;
  limite_plan: number;
  usuarios_unicos_mes: number;
  costo_usd_mes: number;
  tokens_input_mes: number;
  tokens_output_mes: number;
  ultima_actividad: string | null;
  error?: string;
}

const PLAN_LIMITS: Record<string, number> = {
  starter: 500,
  growth:  3000,
  pro:     999999,
};

const PLAN_PRICES_USD: Record<string, number> = {
  starter: 80,
  growth:  130,
  pro:     280,
};

function getAgentsConfig(): AgentConfig[] {
  const raw = process.env.AGENTS_CONFIG;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AgentConfig[];
  } catch {
    console.error("AGENTS_CONFIG mal formateado");
    return [];
  }
}

async function fetchAgentStats(agent: AgentConfig): Promise<AgentStats> {
  const base: AgentStats = {
    id: agent.id,
    nombre: agent.nombre,
    plan: agent.plan,
    online: false,
    periodo: "",
    conversaciones_mes: 0,
    limite_plan: PLAN_LIMITS[agent.plan] ?? 1500,
    usuarios_unicos_mes: 0,
    costo_usd_mes: 0,
    tokens_input_mes: 0,
    tokens_output_mes: 0,
    ultima_actividad: null,
  };

  try {
    const res = await fetch(`${agent.url}/stats`, {
      headers: { "X-Admin-Key": agent.apiKey },
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { ...base, online: false, error: `HTTP ${res.status}` };
    }

    const data = await res.json();
    return {
      ...base,
      online: true,
      periodo: data.periodo ?? "",
      conversaciones_mes: data.conversaciones_mes ?? 0,
      usuarios_unicos_mes: data.usuarios_unicos_mes ?? 0,
      costo_usd_mes: data.costo_usd_mes ?? 0,
      tokens_input_mes: data.tokens_input_mes ?? 0,
      tokens_output_mes: data.tokens_output_mes ?? 0,
      ultima_actividad: data.ultima_actividad ?? null,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    return { ...base, online: false, error: msg };
  }
}

export async function GET(request: NextRequest) {
  // Verificar que viene del middleware (cookie ya validada)
  const session = request.cookies.get("admin_session")?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;
  if (!session || session !== secretToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agents = getAgentsConfig();
  if (agents.length === 0) {
    return NextResponse.json({ agents: [], warning: "AGENTS_CONFIG no configurado" });
  }

  const results = await Promise.all(agents.map(fetchAgentStats));

  const totalConv  = results.reduce((s, a) => s + a.conversaciones_mes, 0);
  const totalCosto = results.reduce((s, a) => s + a.costo_usd_mes, 0);
  const online     = results.filter(a => a.online).length;

  const mrr = results.reduce((s, a) => s + (PLAN_PRICES_USD[a.plan] ?? 0), 0);

  return NextResponse.json({
    agents: results,
    summary: {
      total_clientes: results.length,
      clientes_online: online,
      total_conversaciones_mes: totalConv,
      total_costo_usd_mes: Math.round(totalCosto * 10000) / 10000,
      mrr_usd: mrr,
    },
  });
}

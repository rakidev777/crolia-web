import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { appendRowToSheet, fechaArgentina } from "@/lib/sheets";

export const runtime = "nodejs";

const RUBROS: Record<string, string> = {
  comercio: "Comercio / retail (indumentaria, electro, muebles, etc.)",
  mayoristas: "Mayoristas",
  industria: "Industrias",
  construccion: "Construcción",
  gastronomia: "Gastronomía",
  salud: "Salud y estética",
  seguros: "Seguros y finanzas",
  inmobiliaria: "Inmobiliaria",
  servicios: "Servicios profesionales",
  ecommerce: "E-commerce",
  agro: "Agro",
  otro: "Otro",
};

const DOLORES: Record<string, string> = {
  atencion_ventas: "Atención y ventas por WhatsApp/redes",
  agendamiento: "Agendamiento y turnos",
  seguimiento: "Seguimiento de clientes que no compraron",
  reportes: "Reportes y administración",
  stock: "Stock y gestión interna",
  otro: "Otro",
};

const RUBROS_CON_VIGIA = new Set(["comercio", "mayoristas", "gastronomia", "ecommerce"]);

const VIGIA_CONTEXTO = `Vigía es el sistema de gestión propio de Crolia, ya activo en comercios reales.
Unifica en una sola plataforma: punto de venta (POS), stock e inventario multi-local,
clientes y cuenta corriente, créditos y cuotas, caja diaria, facturación ARCA, compras
y proveedores, rentabilidad, y un asistente/agente IA por WhatsApp que atiende, cotiza,
vende y cobra 24hs conectado en tiempo real a los datos reales del negocio (stock,
precios, cuenta corriente) — sin doble carga ni planillas paralelas.`;

function construirPrompt(rubroKey: string, dolorKey: string, comentario: string) {
  const rubro = RUBROS[rubroKey] ?? rubroKey;
  const dolor = DOLORES[dolorKey] ?? dolorKey;
  const incluirVigia = RUBROS_CON_VIGIA.has(rubroKey);

  return `Sos el asistente de diagnóstico de Crolia, una consultora de IA y automatización
para PyMEs en Argentina. Con estos datos del negocio:

- Rubro: ${rubro}
- Principal punto de dolor: ${dolor}
- En sus palabras: "${comentario || "(no agregó comentario adicional)"}"

${incluirVigia ? VIGIA_CONTEXTO : ""}

Generá un diagnóstico breve (120-150 palabras, corto y fácil de leer en una
pantalla chica) que:
1. Nombre el problema puntual que describió, en sus términos — no genérico.
2. Explique qué convendría automatizar primero y por qué, priorizando UNO
   solo (no listar todo).
3. ${incluirVigia
      ? "Mencioná a Vigía como el sistema de Crolia que ya está en producción y podría resolver su operación completa — sin sonar a catálogo, solo como ejemplo concreto de que ya existe y funciona."
      : "Conectá con el pilar de Crolia que más aplique (agentes IA conversacionales, automatización de procesos, o sistema a medida) sin forzar productos que no correspondan a este rubro."}
4. Cerrá con una frase corta y realista: inversión accesible, resultados
   visibles en poco tiempo. NO menciones plazos exactos (nada de "3
   semanas", "un mes", etc.) ni prometas transformaciones grandes — hablá
   de una mejora concreta y alcanzable, sin exagerar.

Tono: cercano, directo, sobrio — como un socio que ya vio este problema
antes en otro negocio parecido y te lo explica sin venderte humo. Evitá
adjetivos grandilocuentes ("revolucionar", "disruptivo", "transformar",
"potenciar al máximo") y evitá sonar a publicidad. Texto corrido en 2
párrafos cortos, sin bullets, sin saludo inicial — arrancá directo con el
diagnóstico.`;
}

interface DiagnosticoLead {
  nombre: string;
  negocio: string;
  whatsapp: string;
  rubroKey: string;
  dolorKey: string;
  comentario: string;
  createdAt: string;
}

async function guardarLead(lead: DiagnosticoLead, diagnostico: string) {
  await appendRowToSheet("Diagnosticos!A:H", [
    lead.nombre,
    lead.negocio,
    lead.whatsapp,
    RUBROS[lead.rubroKey] ?? lead.rubroKey,
    DOLORES[lead.dolorKey] ?? lead.dolorKey,
    lead.comentario,
    diagnostico,
    fechaArgentina(lead.createdAt),
  ]);
}

export async function POST(req: NextRequest) {
  const { nombre, negocio, whatsapp, rubro, dolor, comentario } = await req.json();

  if (!nombre || !negocio || !whatsapp || !rubro || !dolor) {
    return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes("REEMPLAZAR")) {
    return new Response(JSON.stringify({ error: "API key no configurada" }), { status: 500 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = construirPrompt(rubro, dolor, String(comentario ?? "").trim());

  const lead: DiagnosticoLead = {
    nombre: String(nombre).trim(),
    negocio: String(negocio).trim(),
    whatsapp: String(whatsapp).trim(),
    rubroKey: rubro,
    dolorKey: dolor,
    comentario: String(comentario ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  let textoCompleto = "";

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          textoCompleto += chunk.delta.text;
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
      guardarLead(lead, textoCompleto).catch((e) => console.error("[SHEET ERROR]", e?.message ?? e));
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}

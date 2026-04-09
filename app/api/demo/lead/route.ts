import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

const AGENT_LABELS: Record<string, string> = {
  peluqueria:  "💈 Barbería / Peluquería",
  ventas:      "🛒 Ventas de productos",
  seguros:     "🛡️ Productor de seguros",
  clinica:     "🏥 Clínica / Consultorio",
  restaurante: "🍽️ Restaurante",
  gimnasio:    "🏋️ Gimnasio / Fitness",
};

export interface DemoLead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  agentType: string;
  createdAt: string;
}

async function appendToSheet(lead: DemoLead) {
  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;
  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) return;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const fecha = new Date(lead.createdAt).toLocaleString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Leads!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[lead.nombre, lead.email, lead.telefono, AGENT_LABELS[lead.agentType] ?? lead.agentType, fecha, lead.id]],
    },
  });
}

async function sendNotificationEmail(lead: DemoLead) {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes("REEMPLAZAR")) return;

  const resend = new Resend(key);
  const agentLabel = AGENT_LABELS[lead.agentType] ?? lead.agentType;
  const fecha = new Date(lead.createdAt).toLocaleString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  await resend.emails.send({
    from: "Crolia <noreply@crolia.com.ar>",
    to: ["contacto@crolia.com.ar"],
    subject: `🎯 Nuevo lead del demo — ${lead.nombre}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #f6f1ea; border-radius: 16px; overflow: hidden;">
        <div style="background: #221a14; padding: 24px 28px;">
          <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5);">Crolia</p>
          <h1 style="margin: 8px 0 0; font-size: 20px; font-weight: 700; color: white;">Nuevo lead del demo</h1>
        </div>
        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Nombre</td><td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #221a14;">${lead.nombre}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Email</td><td style="padding: 8px 0; font-size: 15px; color: #221a14;"><a href="mailto:${lead.email}" style="color: #8a6448;">${lead.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Teléfono</td><td style="padding: 8px 0; font-size: 15px; color: #221a14;"><a href="https://wa.me/${lead.telefono.replace(/\D/g, "")}" style="color: #25d366;">${lead.telefono}</a></td></tr>
            <tr><td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Demo usado</td><td style="padding: 8px 0; font-size: 15px; color: #221a14;">${agentLabel}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Fecha</td><td style="padding: 8px 0; font-size: 15px; color: #221a14;">${fecha}</td></tr>
          </table>
          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <a href="https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=Hola%20${encodeURIComponent(lead.nombre)}%2C%20soy%20Fran%20de%20Crolia.%20Vi%20que%20probaste%20nuestro%20demo%20de%20agentes%20IA%20%F0%9F%A4%96%20%C2%BFTen%C3%A9s%20alguna%20duda%20o%20te%20interesa%20implementarlo%20en%20tu%20negocio%3F"
              style="display: inline-block; background: #25d366; color: white; text-decoration: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 600;">
              💬 Escribirle por WhatsApp
            </a>
            <a href="mailto:${lead.email}?subject=Tu%20demo%20de%20Crolia&body=Hola%20${encodeURIComponent(lead.nombre)}%2C"
              style="display: inline-block; background: #221a14; color: white; text-decoration: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 600;">
              ✉️ Responder por email
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  const { nombre, email, telefono, agentType, id: clientId } = await req.json();

  if (!nombre || !email || !telefono || !agentType) {
    return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
  }

  const lead: DemoLead = {
    id: clientId || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    telefono: telefono.trim(),
    agentType,
    createdAt: new Date().toISOString(),
  };

  await Promise.all([
    appendToSheet(lead).catch((e) => console.error("[SHEET ERROR]", e?.message ?? e)),
    sendNotificationEmail(lead).catch((e) => console.error("[EMAIL ERROR]", e?.message ?? e)),
  ]);

  return NextResponse.json({ ok: true });
}

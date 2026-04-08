import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import type { DemoLead } from "../../demo/lead/route";

async function getLeadsFromSheet(): Promise<DemoLead[]> {
  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;
  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) return [];

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Leads!A:F",
  });

  const rows = res.data.values ?? [];
  // Ignorar fila de encabezado si existe
  const dataRows = rows[0]?.[0] === "Nombre" ? rows.slice(1) : rows;

  return dataRows
    .filter(r => r[0]) // descartar filas vacías
    .map(r => ({
      nombre:    r[0] ?? "",
      email:     r[1] ?? "",
      telefono:  r[2] ?? "",
      agentType: r[3] ?? "",
      createdAt: r[4] ?? "",
      id:        r[5] ?? "",
    }))
    .reverse(); // más recientes primero
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;
  if (!session || session !== secretToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getLeadsFromSheet();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ leads: [], error: "Error al leer el sheet" });
  }
}

import { NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers";

export interface QrScan {
  fecha: string;
  dispositivo: string;
  os: string;
  navegador: string;
  ubicacion: string;
  ip: string;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;

  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) {
    return NextResponse.json({ scans: [], total: 0 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credsJson),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "QR Scans!A:F",
    });

    const rows = res.data.values ?? [];
    const scans: QrScan[] = rows
      .filter((r) => r[0])
      .map((r) => ({ fecha: r[0], dispositivo: r[1] ?? "", os: r[2] ?? "", navegador: r[3] ?? "", ubicacion: r[4] ?? "", ip: r[5] ?? "" }))
      .reverse(); // más recientes primero

    return NextResponse.json({ scans, total: scans.length });
  } catch (e) {
    console.error("[QR SCANS ERROR]", e);
    return NextResponse.json({ scans: [], total: 0 });
  }
}

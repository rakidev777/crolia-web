import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  const { leadId, messages } = await req.json();
  if (!leadId || !messages) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;
  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credsJson),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Conversaciones!A:B",
      valueInputOption: "RAW",
      requestBody: {
        values: [[leadId, JSON.stringify(messages)]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[CONV SAVE ERROR]", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

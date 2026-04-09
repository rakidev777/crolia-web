import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = request.cookies.get("admin_session")?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;
  if (!session || session !== secretToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;
  if (!credsJson || !spreadsheetId) {
    return NextResponse.json({ error: "Sheets no configurado" }, { status: 503 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credsJson),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Conversaciones!A:B",
    });

    const rows = res.data.values ?? [];
    // Tomar la última fila que coincida con el id (la más actualizada)
    const match = [...rows].reverse().find(r => r[0] === id);

    if (!match) {
      return NextResponse.json({ messages: null });
    }

    const messages = JSON.parse(match[1]);
    return NextResponse.json({ messages });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

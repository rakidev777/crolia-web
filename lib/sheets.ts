import { google } from "googleapis";

export async function appendRowToSheet(range: string, row: (string | number)[]) {
  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;
  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) {
    console.warn("[SHEETS SKIP]", {
      hasCreds: Boolean(credsJson),
      hasSpreadsheetId: Boolean(spreadsheetId),
      spreadsheetIdIsPlaceholder: spreadsheetId?.includes("REEMPLAZAR") ?? null,
    });
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export function fechaArgentina(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

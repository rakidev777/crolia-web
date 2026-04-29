import { NextResponse } from "next/server";
import { google } from "googleapis";

// GET /api/health — chequea integraciones clave
// Usado por monitores externos (UptimeRobot, etc.)
// Responde 200 si todo OK, 503 si algo falla

async function checkSheets(): Promise<{ ok: boolean; error?: string }> {
  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;

  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) {
    return { ok: false, error: "env vars no configuradas" };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credsJson),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.get({ spreadsheetId, fields: "spreadsheetId" });
    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : "error desconocido" };
  }
}

function checkEnvVars(): { ok: boolean; missing: string[] } {
  const required = [
    "ANTHROPIC_API_KEY",
    "RESEND_API_KEY",
    "GOOGLE_CREDENTIALS_JSON",
    "DEMO_LEADS_SPREADSHEET_ID",
  ];
  const missing = required.filter(
    (k) => !process.env[k] || process.env[k]!.includes("REEMPLAZAR")
  );
  return { ok: missing.length === 0, missing };
}

export async function GET() {
  const start = Date.now();

  const [envCheck, sheetsCheck] = await Promise.all([
    Promise.resolve(checkEnvVars()),
    checkSheets(),
  ]);

  const allOk = envCheck.ok && sheetsCheck.ok;
  const latency = Date.now() - start;

  const body = {
    status: allOk ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    latency_ms: latency,
    checks: {
      env_vars: envCheck.ok ? "ok" : `missing: ${envCheck.missing.join(", ")}`,
      google_sheets: sheetsCheck.ok ? "ok" : sheetsCheck.error,
    },
  };

  return NextResponse.json(body, { status: allOk ? 200 : 503 });
}

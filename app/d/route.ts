import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

interface Scan {
  fecha: string;
  dispositivo: string;
  os: string;
  navegador: string;
  ubicacion: string;
  ip: string;
}

function parseUserAgent(ua: string): { dispositivo: string; os: string; navegador: string } {
  const isMobile = /mobile|android|iphone|ipad|tablet/i.test(ua);
  const dispositivo = isMobile ? "📱 Móvil" : "💻 Desktop";

  let os = "Desconocido";
  if (/iphone/i.test(ua))        os = "iPhone";
  else if (/ipad/i.test(ua))     os = "iPad";
  else if (/android/i.test(ua))  os = `Android`;
  else if (/windows/i.test(ua))  os = "Windows";
  else if (/mac os/i.test(ua))   os = "macOS";
  else if (/linux/i.test(ua))    os = "Linux";

  let navegador = "Desconocido";
  if (/edg\//i.test(ua))         navegador = "Edge";
  else if (/opr\//i.test(ua))    navegador = "Opera";
  else if (/chrome/i.test(ua))   navegador = "Chrome";
  else if (/safari/i.test(ua))   navegador = "Safari";
  else if (/firefox/i.test(ua))  navegador = "Firefox";

  return { dispositivo, os, navegador };
}

async function logToSheet(scan: Scan) {
  const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  const spreadsheetId = process.env.DEMO_LEADS_SPREADSHEET_ID;
  if (!credsJson || !spreadsheetId || spreadsheetId.includes("REEMPLAZAR")) return;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "QR Scans!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        scan.fecha,
        scan.dispositivo,
        scan.os,
        scan.navegador,
        scan.ubicacion,
        scan.ip,
      ]],
    },
  });
}

async function sendScanEmail(scan: Scan) {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes("REEMPLAZAR")) return;

  const resend = new Resend(key);

  await resend.emails.send({
    from: "Crolia <noreply@crolia.com.ar>",
    to: ["contacto@crolia.com.ar"],
    subject: `📱 Nuevo escaneo del QR de tarjeta`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 420px; margin: 0 auto; background: #f6f1ea; border-radius: 16px; overflow: hidden;">
        <div style="background: #221a14; padding: 20px 24px;">
          <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5);">Crolia</p>
          <h1 style="margin: 6px 0 0; font-size: 18px; font-weight: 700; color: white;">📱 Alguien escaneó el QR</h1>
        </div>
        <div style="padding: 20px 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Fecha y hora</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #221a14;">${scan.fecha}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Dispositivo</td>
              <td style="padding: 8px 0; font-size: 15px; color: #221a14;">${scan.dispositivo} · ${scan.os}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Navegador</td>
              <td style="padding: 8px 0; font-size: 15px; color: #221a14;">${scan.navegador}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; color: #6d6057; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Ubicación</td>
              <td style="padding: 8px 0; font-size: 15px; color: #221a14;">${scan.ubicacion}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <a href="https://www.crolia.com.ar/admin"
              style="display: inline-block; background: #221a14; color: white; text-decoration: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 600;">
              Ver en el admin →
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "desconocida";

  // Geo — headers que Vercel inyecta automáticamente
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  const city    = req.headers.get("x-vercel-ip-city") ?? "";
  const ubicacion = [city, country].filter(Boolean).join(" · ") || "Desconocida";

  const { dispositivo, os, navegador } = parseUserAgent(ua);

  const fecha = new Date().toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const scan: Scan = { fecha, dispositivo, os, navegador, ubicacion, ip };

  // Redirect inmediato — logs corren en background sin bloquear al usuario
  Promise.all([
    logToSheet(scan).catch((e) => console.error("[QR SHEET ERROR]", e?.message ?? e)),
    sendScanEmail(scan).catch((e) => console.error("[QR EMAIL ERROR]", e?.message ?? e)),
  ]);

  return NextResponse.redirect(new URL("/demo", req.url));
}

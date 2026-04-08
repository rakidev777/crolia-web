import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "demo-leads.json");

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  agentType: string;
  createdAt: string;
}

function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveLeads(leads: Lead[]) {
  fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(req: NextRequest) {
  const { nombre, email, telefono, agentType } = await req.json();

  if (!nombre || !email || !telefono || !agentType) {
    return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
  }

  const lead: Lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    telefono: telefono.trim(),
    agentType,
    createdAt: new Date().toISOString(),
  };

  const leads = readLeads();
  leads.push(lead);
  saveLeads(leads);

  return NextResponse.json({ ok: true });
}

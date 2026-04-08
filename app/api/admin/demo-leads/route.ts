import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { DemoLead } from "../../demo/lead/route";

const LEADS_FILE = path.join(process.cwd(), "data", "demo-leads.json");

function readLeads(): DemoLead[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;
  if (!session || session !== secretToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = readLeads().reverse(); // más recientes primero
  return NextResponse.json({ leads });
}

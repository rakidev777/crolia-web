import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-ops-secret");
  if (secret !== process.env.OPS_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agentUrl = process.env.AGENTKIT_URL?.replace(/\/$/, "");
  const adminKey = process.env.AGENTKIT_ADMIN_KEY ?? process.env.ADMIN_API_KEY;

  if (!agentUrl || !adminKey) {
    return NextResponse.json({ error: "Agentkit not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(`${agentUrl}/stats-history`, {
      headers: { "X-Admin-Key": adminKey },
      next: { revalidate: 300 },
    });
    if (!res.ok) return NextResponse.json({ error: "Agentkit error" }, { status: 502 });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "Connection failed" }, { status: 502 });
  }
}

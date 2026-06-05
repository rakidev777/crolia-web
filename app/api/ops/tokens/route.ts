import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-ops-secret");
  if (secret !== process.env.OPS_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agentUrl = process.env.AGENTKIT_URL;
  const adminKey = process.env.AGENTKIT_ADMIN_KEY;

  if (!agentUrl || !adminKey) {
    return NextResponse.json({ error: "Agentkit not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(`${agentUrl}/stats`, {
      headers: { "X-Admin-Key": adminKey },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Agentkit error", status: res.status }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Connection failed" }, { status: 502 });
  }
}

import { NextRequest, NextResponse } from "next/server";

function getVigiaConfig() {
  const url = process.env.VIGIA_API_URL?.replace(/\/$/, "");
  const key = process.env.VIGIA_ADMIN_KEY;
  return { url, key };
}

async function forward(req: NextRequest, path: string[]) {
  const { url, key } = getVigiaConfig();
  if (!url || !key) {
    return NextResponse.json({ error: "Vigía no configurado (VIGIA_API_URL/VIGIA_ADMIN_KEY)" }, { status: 503 });
  }

  const target = `${url}/api/v1/admin/${path.join("/")}`;
  const hasBody = req.method === "POST" || req.method === "PATCH" || req.method === "PUT";

  try {
    const res = await fetch(target, {
      method: req.method,
      headers: {
        "x-admin-key": key,
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
      body: hasBody ? await req.text() : undefined,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Error conectando con Vigía" }, { status: 502 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return forward(req, path);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return forward(req, path);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return forward(req, path);
}

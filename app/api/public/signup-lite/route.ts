import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = process.env.VIGIA_API_URL?.replace(/\/$/, "");
  if (!url) {
    return NextResponse.json({ detail: "Vigía no configurado (VIGIA_API_URL)" }, { status: 503 });
  }

  try {
    const res = await fetch(`${url}/api/public/signup-lite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await req.text(),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ detail: "Error conectando con Vigía" }, { status: 502 });
  }
}

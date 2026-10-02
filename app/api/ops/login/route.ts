import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const opsPassword = process.env.OPS_PASSWORD;
  const secretToken = process.env.OPS_SECRET_TOKEN;

  if (!opsPassword || !secretToken) {
    return NextResponse.json({ error: "Ops no configurado" }, { status: 500 });
  }

  if (password !== opsPassword) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("ops_session", secretToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 horas
    path: "/",
  });
  return response;
}

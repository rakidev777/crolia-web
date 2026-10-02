import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger API de presentación
  if (pathname.startsWith("/api/admin/presentacion")) {
    const session = request.cookies.get("admin_session")?.value;
    if (!session || session !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
  }

  // Solo proteger rutas /admin (excepto /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session")?.value;
    if (!session || session !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Proteger API de /ops (excepto login/logout)
  if (
    pathname.startsWith("/api/ops") &&
    !pathname.startsWith("/api/ops/login") &&
    !pathname.startsWith("/api/ops/logout")
  ) {
    const session = request.cookies.get("ops_session")?.value;
    if (!session || session !== process.env.OPS_SECRET_TOKEN) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
  }

  // Solo proteger /ops (excepto /ops/login)
  if (pathname.startsWith("/ops") && !pathname.startsWith("/ops/login")) {
    const session = request.cookies.get("ops_session")?.value;
    if (!session || session !== process.env.OPS_SECRET_TOKEN) {
      return NextResponse.redirect(new URL("/ops/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/ops/:path*", "/api/ops/:path*"],
};

import { readFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

const BLOB_PATHNAME = "presentacion/contenido.html";

async function cargarHtml(): Promise<string> {
  try {
    // Intentar leer desde Vercel Blob
    const { blobs } = await list({ prefix: "presentacion/" });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (blob) {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (res.ok) return await res.text();
    }
  } catch {
    // Blob no disponible — usar archivo local por defecto
  }
  // Fallback: archivo estático incluido en el repo
  return readFileSync(join(process.cwd(), "public", "presentacion-default.html"), "utf-8");
}

// GET — devuelve el HTML actual de la presentación
export async function GET() {
  const html = await cargarHtml();
  return new NextResponse(html, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// PUT — guarda HTML actualizado en Vercel Blob
export async function PUT(request: NextRequest) {
  const html = await request.text();
  if (!html || html.length < 100) {
    return NextResponse.json({ error: "Contenido inválido" }, { status: 400 });
  }

  try {
    await put(BLOB_PATHNAME, html, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "text/html; charset=utf-8",
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar. Verificá BLOB_READ_WRITE_TOKEN en Vercel." },
      { status: 500 }
    );
  }
}

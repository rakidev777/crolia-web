import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

const BLOB_PATHNAME = "presentacion/contenido.html";

export async function GET() {
  let html: string;

  try {
    const { blobs } = await list({ prefix: "presentacion/" });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (blob) {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (res.ok) {
        html = await res.text();
        return new NextResponse(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    }
  } catch {
    // Blob no disponible — usar fallback
  }

  // Fallback: archivo por defecto del repo
  html = readFileSync(join(process.cwd(), "public", "presentacion-default.html"), "utf-8");
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

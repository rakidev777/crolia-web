"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function PresentacionEditor() {
  const [html, setHtml] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: "ok" | "error" } | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar HTML actual al montar
  useEffect(() => {
    fetch("/api/admin/presentacion")
      .then((r) => r.text())
      .then(setHtml)
      .catch(() => setMensaje({ texto: "Error al cargar la presentación.", tipo: "error" }));
  }, []);

  // Auto-guardar con debounce de 2 segundos
  const guardar = useCallback(async (contenido: string) => {
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/admin/presentacion", {
        method: "PUT",
        headers: { "Content-Type": "text/html" },
        body: contenido,
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje({ texto: "Guardado ✓", tipo: "ok" });
      } else {
        setMensaje({ texto: data.error || "Error al guardar.", tipo: "error" });
      }
    } catch {
      setMensaje({ texto: "Error de red.", tipo: "error" });
    } finally {
      setGuardando(false);
    }
  }, []);

  const handleChange = (valor: string) => {
    setHtml(valor);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => guardar(valor), 2000);
  };

  // Actualizar preview iframe
  useEffect(() => {
    if (vistaPrevia && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [vistaPrevia, html]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0f172a", color: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.25rem", borderBottom: "1px solid #1e293b", background: "#0f172a" }}>
        <a href="/admin" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.8rem" }}>← Admin</a>
        <span style={{ color: "#334155", fontSize: "0.8rem" }}>|</span>
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#e2e8f0" }}>Editor de Presentación</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {mensaje && (
            <span style={{
              fontSize: "0.78rem",
              color: mensaje.tipo === "ok" ? "#4ade80" : "#f87171",
              background: mensaje.tipo === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
            }}>
              {guardando ? "Guardando..." : mensaje.texto}
            </span>
          )}
          <button
            onClick={() => setVistaPrevia(!vistaPrevia)}
            style={{
              background: vistaPrevia ? "#334155" : "#1e40af",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "0.4rem 0.9rem",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {vistaPrevia ? "Cerrar preview" : "Vista previa"}
          </button>
          <button
            onClick={() => guardar(html)}
            disabled={guardando}
            style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "0.4rem 0.9rem",
              fontSize: "0.8rem",
              cursor: "pointer",
              opacity: guardando ? 0.6 : 1,
            }}
          >
            Guardar ahora
          </button>
          <a
            href="/presentacion"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#166534",
              color: "#fff",
              borderRadius: "6px",
              padding: "0.4rem 0.9rem",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Ver en vivo ↗
          </a>
        </div>
      </div>

      {/* Cuerpo: editor + preview */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Editor de código */}
        <textarea
          value={html}
          onChange={(e) => handleChange(e.target.value)}
          spellCheck={false}
          style={{
            flex: vistaPrevia ? "0 0 50%" : "1",
            background: "#020617",
            color: "#e2e8f0",
            border: "none",
            outline: "none",
            padding: "1rem 1.25rem",
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: "0.78rem",
            lineHeight: "1.6",
            resize: "none",
            overflowY: "auto",
            tabSize: 2,
            borderRight: vistaPrevia ? "1px solid #1e293b" : "none",
          }}
          placeholder="Cargando presentación..."
        />

        {/* Vista previa en iframe */}
        {vistaPrevia && (
          <iframe
            ref={iframeRef}
            style={{ flex: "0 0 50%", border: "none", background: "#fff" }}
            title="Vista previa de la presentación"
          />
        )}
      </div>

      {/* Pie de página con tips */}
      <div style={{ padding: "0.5rem 1.25rem", borderTop: "1px solid #1e293b", fontSize: "0.72rem", color: "#475569", display: "flex", gap: "2rem" }}>
        <span>💡 Auto-guarda 2 segundos después de cada cambio</span>
        <span>📋 La URL pública es <strong style={{ color: "#94a3b8" }}>crolia.com.ar/presentacion</strong></span>
        <span>⌨️ Tab inserta espacios normalmente en el textarea</span>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

const BRAND = "#8a6448";
const BRAND_DARK = "#5d3e2e";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Resultado = {
  url: string;
  email: string;
  password: string;
  trial_expires_at: string;
};

export default function RegistroForm() {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEditadoAMano, setSlugEditadoAMano] = useState(false);
  const [nombreContacto, setNombreContacto] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function onEmpresaChange(v: string) {
    setNombreEmpresa(v);
    if (!slugEditadoAMano) setSlug(slugify(v));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nombreEmpresa.trim() || !nombreContacto.trim() || !email.trim() || !whatsapp.trim()) {
      setError("Completá todos los campos.");
      return;
    }
    if (!SLUG_RE.test(slug)) {
      setError("La URL elegida solo puede tener letras minúsculas, números y guiones, entre 3 y 50 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch("/api/public/signup-lite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_empresa: nombreEmpresa.trim(),
          slug,
          nombre_contacto: nombreContacto.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.detail || "No pudimos crear tu cuenta. Probá de nuevo.");
        setLoading(false);
        return;
      }
      setResultado(data);
    } catch {
      setError("Error de conexión. Probá de nuevo en un momento.");
    } finally {
      setLoading(false);
    }
  }

  if (resultado) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#faf9f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5%" }}>
        <div style={{ maxWidth: 480, width: "100%", background: "white", borderRadius: 20, padding: "40px 36px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: 10 }}>
            ¡Tu cuenta ya está lista!
          </h1>
          <p style={{ color: "#777", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: 24 }}>
            Guardá estos datos — también te los mandamos por mail a <strong>{resultado.email}</strong> para que no los pierdas.
          </p>
          <div style={{ background: "#f8f4ef", borderRadius: 14, padding: "18px 20px", marginBottom: 24 }}>
            <Campo label="URL de acceso" value={resultado.url} link />
            <Campo label="Email" value={resultado.email} />
            <Campo label="Contraseña" value={resultado.password} />
          </div>
          <p style={{ fontSize: "0.82rem", color: "#999", marginBottom: 24 }}>
            Tu prueba gratuita dura 7 días (hasta el{" "}
            {new Date(resultado.trial_expires_at).toLocaleDateString("es-AR")}). Antes de que termine te
            vamos a contactar por WhatsApp para ayudarte a elegir el plan que mejor se adapte a tu negocio.
          </p>
          <a href={resultado.url} target="_blank" rel="noreferrer" style={{
            display: "block", textAlign: "center", background: BRAND, color: "white",
            padding: "14px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
          }}>Entrar a mi sistema →</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#faf9f7", minHeight: "100vh", padding: "40px 5%" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Link href="/vigia-lite" style={{ fontSize: "0.82rem", color: "#999", textDecoration: "none" }}>← Volver</Link>

        <div style={{ textAlign: "center", margin: "24px 0 32px" }}>
          <span style={{ fontSize: "1.3rem", fontWeight: 800, color: BRAND, fontFamily: "'Space Grotesk', sans-serif" }}>Vigía Lite</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 800, marginTop: 10 }}>
            Creá tu cuenta de prueba
          </h1>
          <p style={{ color: "#777", fontSize: "0.88rem", marginTop: 6 }}>7 días gratis, acceso inmediato, sin tarjeta.</p>
        </div>

        <form onSubmit={onSubmit} style={{ background: "white", borderRadius: 18, padding: "28px 26px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
          <Label text="Nombre de tu negocio *" />
          <Input value={nombreEmpresa} onChange={onEmpresaChange} placeholder="Ej: Ferretería Don José" />

          <Label text="URL de tu sistema *" />
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <input
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugEditadoAMano(true); }}
              placeholder="tu-negocio"
              style={inputStyle}
            />
          </div>
          <div style={{ fontSize: "0.78rem", color: "#999", marginTop: -12, marginBottom: 16 }}>
            Tu acceso va a ser: <strong>{slug || "tu-negocio"}.vigia.crolia.com.ar</strong>
          </div>

          <Label text="Tu nombre *" />
          <Input value={nombreContacto} onChange={setNombreContacto} placeholder="Ej: José García" />

          <Label text="Email *" />
          <Input value={email} onChange={setEmail} placeholder="jose@ferreteria.com" type="email" />

          <Label text="WhatsApp *" />
          <Input value={whatsapp} onChange={setWhatsapp} placeholder="11 2233-4455" />

          {error && (
            <div style={{ background: "#fee2e2", color: "#991b1b", fontSize: "0.85rem", padding: "10px 14px", borderRadius: 8, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", background: loading ? "#c4a882" : BRAND, color: "white",
            border: "none", borderRadius: 999, padding: "14px", fontSize: "0.95rem", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif",
          }}>
            {loading ? "Creando tu cuenta…" : "Crear mi cuenta gratis →"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#999", marginTop: 20 }}>
          Al registrarte, un asesor de Crolia se va a poner en contacto para acompañarte durante la prueba.
        </p>
      </div>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#555", marginBottom: 6 }}>{text}</div>;
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#faf9f7", border: "1px solid rgba(138,100,72,0.15)",
  borderRadius: 10, padding: "11px 14px", fontSize: "0.92rem", fontFamily: "'Inter', sans-serif",
  outline: "none", color: "#1a1a1a",
};

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <input
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputStyle, marginBottom: 16 }}
    />
  );
}

function Campo({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      {link ? (
        <a href={value} target="_blank" rel="noreferrer" style={{ color: BRAND_DARK, fontWeight: 700, fontSize: "0.9rem", wordBreak: "break-all" }}>{value}</a>
      ) : (
        <div style={{ fontWeight: 700, fontSize: "0.9rem", wordBreak: "break-all" }}>{value}</div>
      )}
    </div>
  );
}

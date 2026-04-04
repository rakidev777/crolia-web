"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Contraseña incorrecta.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#221a14",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1.5rem",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "380px",
      }}>
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            marginBottom: "0.75rem",
          }}>Crolia</div>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "white",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}>Panel Admin</h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "0.4rem" }}>
            Ingresá tu contraseña para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            required
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.75rem",
              padding: "0.85rem 1rem",
              color: "white",
              fontSize: "0.95rem",
              outline: "none",
              width: "100%",
            }}
          />
          {error && (
            <p style={{ fontSize: "0.8rem", color: "#f87171", margin: 0 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#8a6448",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.85rem",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ConversacionPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/conversacion/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.messages) {
          setMessages(data.messages);
        } else {
          setError("No se encontró la conversación.");
        }
      })
      .catch(() => setError("Error al cargar la conversación."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ background: "#f6f1ea", minHeight: "100vh", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#221a14", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <a
          href="/admin"
          style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none" }}
        >
          ← Panel
        </a>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>·</div>
        <div style={{ color: "white", fontSize: "0.9rem", fontWeight: 600 }}>
          Conversación del demo
        </div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginLeft: "auto", fontFamily: "monospace" }}>
          {id}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6d6057", fontSize: "0.9rem" }}>
            Cargando conversación...
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6d6057", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        {messages && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {messages.map((msg, i) => {
              const esBot = msg.role === "assistant";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: esBot ? "flex-start" : "flex-end",
                  }}
                >
                  <div style={{
                    maxWidth: "78%",
                    background: esBot ? "white" : "#221a14",
                    color: esBot ? "#221a14" : "white",
                    borderRadius: esBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                    padding: "0.75rem 1rem",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    boxShadow: "0 2px 8px rgba(34,26,20,0.08)",
                  }}>
                    <div style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                      opacity: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {esBot ? "Agente IA" : "Usuario"}
                    </div>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

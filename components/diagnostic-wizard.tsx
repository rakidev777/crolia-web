"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

const RUBROS = [
  { key: "comercio", icon: "🛍️", label: "Comercio / retail" },
  { key: "mayoristas", icon: "📦", label: "Mayoristas" },
  { key: "industria", icon: "🏭", label: "Industrias" },
  { key: "construccion", icon: "🏗️", label: "Construcción" },
  { key: "gastronomia", icon: "🍽️", label: "Gastronomía" },
  { key: "salud", icon: "💆", label: "Salud y estética" },
  { key: "seguros", icon: "🛡️", label: "Seguros y finanzas" },
  { key: "inmobiliaria", icon: "🏠", label: "Inmobiliaria" },
  { key: "servicios", icon: "💼", label: "Servicios profesionales" },
  { key: "ecommerce", icon: "🛒", label: "E-commerce" },
  { key: "agro", icon: "🌱", label: "Agro" },
  { key: "otro", icon: "✳️", label: "Otro" },
];

const DOLORES = [
  { key: "atencion_ventas", icon: "💬", label: "Atención y ventas por WhatsApp/redes" },
  { key: "agendamiento", icon: "📅", label: "Agendamiento y turnos" },
  { key: "seguimiento", icon: "🔁", label: "Seguimiento de clientes que no compraron" },
  { key: "reportes", icon: "📊", label: "Reportes y administración" },
  { key: "stock", icon: "📦", label: "Stock y gestión interna" },
  { key: "otro", icon: "✳️", label: "Otro" },
];

type Step = 1 | 2 | 3 | 4 | "loading" | "result";

const OPEN_EVENT = "crolia:open-diagnostico";

export function abrirDiagnostico() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

export function OpenDiagnosticoButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={abrirDiagnostico} className={className}>
      {children}
    </button>
  );
}

export function DiagnosticoWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed inset-x-0 top-0 z-40 block w-full bg-[color:var(--color-ink)] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]"
      >
        ✨ Generá tu diagnóstico gratis — descubrí cómo Crolia puede potenciar tu negocio <span className="underline underline-offset-2">→ (2 min)</span>
      </button>
      <DiagnosticoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function useDiagnostico() {
  const [step, setStep] = useState<Step>(1);
  const [rubro, setRubro] = useState("");
  const [rubroOtro, setRubroOtro] = useState("");
  const [dolor, setDolor] = useState("");
  const [dolorOtro, setDolorOtro] = useState("");
  const [comentario, setComentario] = useState("");
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [resultado, setResultado] = useState("");

  function reset() {
    setStep(1);
    setRubro("");
    setRubroOtro("");
    setDolor("");
    setDolorOtro("");
    setComentario("");
    setNombre("");
    setNegocio("");
    setWhatsapp("");
    setResultado("");
  }

  const rubroFinal = rubro === "otro" ? rubroOtro.trim() : rubro;

  async function generarDiagnostico(e: FormEvent) {
    e.preventDefault();
    setStep("loading");

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          negocio,
          whatsapp,
          rubro,
          dolor,
          comentario: [
            dolor === "otro" ? `Dolor principal: ${dolorOtro}` : "",
            rubro === "otro" ? `Rubro: ${rubroOtro}` : "",
            comentario,
          ].filter(Boolean).join(" · "),
        }),
      });

      if (!res.body) throw new Error("Sin respuesta");
      setStep("result");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acumulado = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acumulado += decoder.decode(value, { stream: true });
        setResultado(acumulado);
      }
    } catch {
      setResultado("Hubo un error generando tu diagnóstico. Escribinos directo por WhatsApp y lo vemos juntos.");
      setStep("result");
    }
  }

  const whatsappHref = `https://wa.me/5491173729899?text=${encodeURIComponent(
    [
      "Hola Crolia, generé mi diagnóstico gratis y quiero conversar sobre mi negocio.",
      `Nombre: ${nombre}`,
      `Negocio: ${negocio}`,
      `Rubro: ${rubroFinal}`,
      "",
      "Diagnóstico:",
      resultado,
    ].join("\n")
  )}`;

  return {
    step, setStep,
    rubro, setRubro, rubroOtro, setRubroOtro,
    dolor, setDolor, dolorOtro, setDolorOtro,
    comentario, setComentario,
    nombre, setNombre, negocio, setNegocio, whatsapp, setWhatsapp,
    resultado, generarDiagnostico, whatsappHref, reset,
  };
}

type DiagnosticoState = ReturnType<typeof useDiagnostico>;

function StepsBody({ d }: { d: DiagnosticoState }) {
  return (
    <>
      {typeof d.step === "number" && (
        <div className="mt-4 flex gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`h-1 flex-1 rounded-full ${n <= (d.step as number) ? "bg-[color:var(--color-accent)]" : "bg-black/10"}`} />
          ))}
        </div>
      )}

      {d.step === 1 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold text-[color:var(--color-ink)] md:text-2xl">¿En qué rubro está tu negocio?</h3>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
            {RUBROS.map((r) => (
              <button
                key={r.key}
                onClick={() => d.setRubro(r.key)}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-sm transition ${
                  d.rubro === r.key
                    ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 font-medium text-[color:var(--color-accent)]"
                    : "border-black/10 text-[color:var(--color-ink)] hover:border-black/20"
                }`}
              >
                <span className="text-lg leading-none">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>
          {d.rubro === "otro" && (
            <input
              autoFocus
              autoComplete="off"
              value={d.rubroOtro}
              onChange={(e) => d.setRubroOtro(e.target.value)}
              placeholder="Contanos tu rubro"
              className="form-input"
            />
          )}
          <button
            disabled={!d.rubro || (d.rubro === "otro" && !d.rubroOtro.trim())}
            onClick={() => d.setStep(2)}
            className="w-full rounded-full bg-[color:var(--color-ink)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      )}

      {d.step === 2 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold text-[color:var(--color-ink)] md:text-2xl">¿Dónde perdés más tiempo o plata hoy?</h3>
          <div className="grid gap-2.5 md:grid-cols-2">
            {DOLORES.map((dl) => (
              <button
                key={dl.key}
                onClick={() => d.setDolor(dl.key)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  d.dolor === dl.key
                    ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 font-medium text-[color:var(--color-accent)]"
                    : "border-black/10 text-[color:var(--color-ink)] hover:border-black/20"
                }`}
              >
                <span className="text-lg leading-none shrink-0">{dl.icon}</span>
                {dl.label}
              </button>
            ))}
          </div>
          {d.dolor === "otro" && (
            <input
              autoFocus
              autoComplete="off"
              value={d.dolorOtro}
              onChange={(e) => d.setDolorOtro(e.target.value)}
              placeholder="Contanos qué te consume más tiempo"
              className="form-input"
            />
          )}
          <div className="flex gap-3">
            <button onClick={() => d.setStep(1)} className="rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium text-[color:var(--color-muted)] transition hover:border-black/20">
              ← Atrás
            </button>
            <button
              disabled={!d.dolor || (d.dolor === "otro" && !d.dolorOtro.trim())}
              onClick={() => d.setStep(3)}
              className="flex-1 rounded-full bg-[color:var(--color-ink)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {d.step === 3 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold text-[color:var(--color-ink)] md:text-2xl">Contanos con tus palabras</h3>
          <p className="text-sm text-[color:var(--color-muted)]">
            ¿Qué te gustaría automatizar o mejorar? Cuanto más nos cuentes, más específico va a ser tu diagnóstico. (Opcional)
          </p>
          <textarea
            autoFocus
            autoComplete="off"
            value={d.comentario}
            onChange={(e) => d.setComentario(e.target.value)}
            rows={5}
            placeholder="Ej: perdemos ventas porque tardamos en responder por WhatsApp los fines de semana..."
            className="form-input min-h-32 resize-y"
          />
          <div className="flex gap-3">
            <button onClick={() => d.setStep(2)} className="rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium text-[color:var(--color-muted)] transition hover:border-black/20">
              ← Atrás
            </button>
            <button
              onClick={() => d.setStep(4)}
              className="flex-1 rounded-full bg-[color:var(--color-ink)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {d.step === 4 && (
        <form onSubmit={d.generarDiagnostico} className="mt-6 space-y-4">
          <h3 className="text-xl font-bold text-[color:var(--color-ink)] md:text-2xl">¿A quién le armamos el diagnóstico?</h3>
          <input required autoComplete="name" value={d.nombre} onChange={(e) => d.setNombre(e.target.value)} placeholder="Tu nombre" className="form-input" />
          <input required autoComplete="off" value={d.negocio} onChange={(e) => d.setNegocio(e.target.value)} placeholder="Nombre del negocio" className="form-input" />
          <input required autoComplete="tel" value={d.whatsapp} onChange={(e) => d.setWhatsapp(e.target.value)} placeholder="WhatsApp (con código de área)" className="form-input" />
          <div className="flex gap-3">
            <button type="button" onClick={() => d.setStep(3)} className="rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium text-[color:var(--color-muted)] transition hover:border-black/20">
              ← Atrás
            </button>
            <button type="submit" className="flex-1 rounded-full bg-[color:var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90">
              Generar mi diagnóstico →
            </button>
          </div>
        </form>
      )}

      {d.step === "loading" && (
        <div className="mt-10 flex flex-col items-center gap-4 py-8 text-center">
          <div className="chat-typing"><span /><span /><span /></div>
          <p className="text-sm text-[color:var(--color-muted)]">Armando tu diagnóstico a medida...</p>
        </div>
      )}

      {d.step === "result" && (
        <div className="mt-6 space-y-5">
          <h3 className="text-xl font-bold text-[color:var(--color-ink)] md:text-2xl">Tu diagnóstico</h3>
          <div className="rounded-2xl border border-black/7 bg-white p-5 text-base leading-7 text-[color:var(--color-ink)] whitespace-pre-line">
            {d.resultado || "..."}
          </div>
          <a
            href={d.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-[color:var(--color-ink)] px-6 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]"
          >
            Seguir la conversación por WhatsApp →
          </a>
        </div>
      )}
    </>
  );
}

function DiagnosticoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const d = useDiagnostico();

  useEffect(() => {
    if (!open) d.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-[#f9f5ef] p-8 shadow-2xl md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">Diagnóstico gratuito</span>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]">
            ×
          </button>
        </div>
        <StepsBody d={d} />
      </div>
    </div>
  );
}

export function DiagnosticoSeccion() {
  const d = useDiagnostico();

  return (
    <section id="diagnostico" className="section-shell py-16 md:py-24">
      <div className="section-heading reveal">
        <div className="eyebrow">Diagnóstico gratuito</div>
        <h2 className="section-title mt-4">Descubrí cómo Crolia puede potenciar tu negocio.</h2>
        <p className="section-copy">
          Respondé unas preguntas rápidas y en 2 minutos te decimos qué conviene automatizar primero en tu operación.
        </p>
      </div>
      <div className="mt-10 mx-auto max-w-2xl rounded-[2rem] bg-white/70 border border-black/7 p-8 reveal md:p-12">
        <StepsBody d={d} />
      </div>
    </section>
  );
}

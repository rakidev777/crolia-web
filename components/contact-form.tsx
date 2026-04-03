"use client";

import { FormEvent, useState } from "react";

const whatsappBaseUrl = "https://wa.me/5491168556257";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const business = String(form.get("business") ?? "").trim();
    const channel = String(form.get("channel") ?? "").trim();
    const need = String(form.get("need") ?? "").trim();

    const message = [
      "Hola Crolia, quiero conversar sobre automatización con IA.",
      `Nombre: ${name}`,
      `Negocio: ${business}`,
      `Canal prioritario: ${channel}`,
      `Objetivo principal: ${need}`,
    ].join("\n");

    const url = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`; // número ya incluido en base URL
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="card-surface p-8 md:p-10">
      <div className="eyebrow">Diagnóstico inicial</div>
      <h3 className="mt-6 text-3xl font-semibold tracking-tight text-[color:var(--color-ink)]">
        Cuéntanos tu operación y abrimos el contacto por WhatsApp.
      </h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--color-muted)]">
        Este formulario genera un mensaje listo para enviar con el contexto mínimo necesario para evaluar el caso.
      </p>

      <form className="mt-10 grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--color-ink)]">Nombre</span>
          <input
            required
            name="name"
            type="text"
            placeholder="Tu nombre"
            className="form-input"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--color-ink)]">Negocio</span>
          <input
            required
            name="business"
            type="text"
            placeholder="Nombre del negocio o rubro"
            className="form-input"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--color-ink)]">Canal prioritario</span>
          <select required name="channel" className="form-input">
            <option value="">Seleccionar canal</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Google y procesos internos">Google y procesos internos</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--color-ink)]">Qué quieres automatizar</span>
          <textarea
            required
            name="need"
            rows={5}
            placeholder="Consultas, ventas, cobranzas, recordatorios, seguimiento de clientes..."
            className="form-input min-h-32 resize-y"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-[color:var(--color-ink)] px-6 py-4 text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]"
        >
          Abrir WhatsApp con mensaje
        </button>

        {submitted ? (
          <p className="text-sm text-[color:var(--color-muted)]">
            Se abrió WhatsApp en una nueva pestaña con el mensaje prearmado.
          </p>
        ) : null}
      </form>
    </div>
  );
}

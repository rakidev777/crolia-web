import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";

const pillars = [
  {
    icon: "🤖",
    id: "agentes",
    label: "Agentes de IA",
    tagline: "Tu negocio trabaja solo, las 24 horas.",
    description: "Agentes conversacionales que venden, agendan y atienden por WhatsApp, Instagram y Facebook — con el tono y el conocimiento de tu negocio.",
    items: ["Agente de ventas", "Agendamiento de turnos", "Seguimiento de clientes", "Cobranzas automáticas"],
    cta: "Ver soluciones de IA",
    href: "#servicios",
    featured: true,
  },
  {
    icon: "⚙️",
    id: "automatizacion",
    label: "Automatización de procesos",
    tagline: "Menos tareas repetitivas, más foco en lo que importa.",
    description: "Convertimos flujos manuales en procesos automáticos: presupuestos, reportes, onboarding, notificaciones y todo lo que hoy consume tiempo de tu equipo.",
    items: ["Flujos de cotización", "Reportes automáticos", "Onboarding de clientes", "Notificaciones inteligentes"],
    cta: "Ver ejemplos",
    href: "#a-medida",
    featured: true,
  },
  {
    icon: "🌐",
    id: "sitios",
    label: "Desarrollo de sitios web",
    tagline: "Tu presencia digital, rápida y profesional.",
    description: "Diseñamos y desarrollamos sitios web modernos, rápidos y orientados a convertir visitantes en clientes. Desde landing pages hasta sitios institucionales completos.",
    items: ["Landing pages de alto impacto", "Sitios institucionales", "E-commerce", "Portafolios y catálogos"],
    cta: "Hablar de tu proyecto",
    href: "#contacto",
    featured: false,
  },
  {
    icon: "💻",
    id: "sistemas",
    label: "Sistemas a medida",
    tagline: "Tecnología que se adapta a tu operación, no al revés.",
    description: "Desarrollamos sistemas y aplicaciones diseñados exactamente para tu negocio: paneles de gestión, CRMs, plataformas internas o cualquier herramienta que necesites.",
    items: ["Paneles de gestión", "CRM personalizados", "Integraciones entre plataformas", "Apps internas"],
    cta: "Consultar desarrollo",
    href: "#contacto",
    featured: false,
  },
];

const services = [
  {
    featured: true,
    tag: "Más solicitado",
    title: "Agente de ventas con IA",
    description:
      "Responde consultas, presenta productos y cierra ventas en WhatsApp, Instagram y Facebook — las 24 horas, con la velocidad y el conocimiento que tu negocio necesita.",
    examples: ["Tiendas", "Servicios profesionales", "E-commerce"],
  },
  {
    featured: true,
    tag: "Alta demanda",
    title: "Agendamiento automático de turnos",
    description:
      "Tus clientes reservan, modifican y reciben recordatorios por WhatsApp — con confirmación automática y sincronización con Google Calendar. Cero llamadas, cero olvidos.",
    examples: ["Consultorios", "Peluquerías", "Estética"],
  },
  {
    featured: false,
    title: "Seguimiento y reactivación",
    description:
      "Secuencias automáticas que recuerdan, reactivan y fidelizan. El agente sabe cuándo y cómo contactar a cada cliente para maximizar cada oportunidad.",
  },
  {
    featured: false,
    title: "Automatización de cobranzas",
    description:
      "Avisos de vencimiento, confirmación de pagos y recordatorios consistentes que liberan tu tiempo y mejoran el flujo de caja.",
  },
];

const customProcesses = [
  {
    icon: "📋",
    title: "Presupuestos y cotizaciones",
    problem: "Responder cotizaciones lleva horas y muchas quedan sin seguimiento.",
    solution: "El agente envía el presupuesto, hace seguimiento automático y avisa cuando el cliente lo vio.",
  },
  {
    icon: "🧾",
    title: "Onboarding de nuevos clientes",
    problem: "Incorporar un cliente implica intercambiar decenas de mensajes para pedir datos y documentos.",
    solution: "Un flujo guía al cliente paso a paso, recopila todo y lo carga en tu sistema.",
  },
  {
    icon: "📊",
    title: "Reportes automáticos",
    problem: "Armar informes semanales consume tiempo valioso del equipo.",
    solution: "El agente extrae datos, arma el reporte y lo envía por mail o WhatsApp en el horario que definás.",
  },
  {
    icon: "📩",
    title: "Seguimiento post-venta",
    problem: "Nadie tiene tiempo para escribirle a cada cliente después de la compra.",
    solution: "Secuencias de felicitación, reseña y recompra activadas automáticamente por comportamiento del cliente.",
  },
];

const industries = [
  "Peluquerías y barberías",
  "Consultorios y clínicas",
  "Centros de estética",
  "Tiendas y comercios",
  "Restaurantes",
  "Mayoristas",
  "Gimnasios",
  "Inmobiliarias",
  "Academias y cursos",
  "Talleres mecánicos",
];

const processSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description: "Mapeamos canales, puntos de fricción y las tareas que más tiempo consumen o ventas hacen perder.",
  },
  {
    step: "02",
    title: "Diseño e implementación",
    description: "Construimos el agente, configuramos integraciones y validamos con escenarios reales.",
  },
  {
    step: "03",
    title: "Mejora continua",
    description: "Ajustamos mensajes y flujos según métricas reales y nuevas necesidades del negocio.",
  },
];

const stats = [
  { value: "24/7", label: "Tu negocio activo siempre" },
  { value: "×3", label: "Más consultas respondidas" },
  { value: "Bajo costo", label: "Accesible para cualquier negocio" },
];

const chatMessages = [
  { from: "client", text: "Hola! cuánto cuesta el corte + barba?" },
  { from: "agent", text: "Hola Martín 👋 El corte + barba son $8.500. ¿Reservamos turno directo?" },
  { from: "client", text: "Sí dale, para mañana si hay lugar" },
  { from: "agent", text: "✅ Turno confirmado — Mañana 11:00am. Te mando recordatorio 1h antes 🙌", success: true },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <ScrollReveal />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/5491168556257?text=Hola%20Crolia%2C%20quiero%20info%20sobre%20automatizaci%C3%B3n%20con%20IA"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Escribinos por WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>WhatsApp</span>
      </a>

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-black/6 bg-[color:var(--color-surface-soft)]/85 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <img src="/crolia-logo.svg" alt="Crolia" className="h-9 w-9 rounded-full" />
            <span className="text-sm font-semibold tracking-[0.22em] text-[color:var(--color-ink)] uppercase" style={{ fontFamily: "var(--font-display)" }}>Crolia</span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-7 text-sm text-[color:var(--color-muted)] md:flex">
            <a href="#que-hacemos" className="transition hover:text-[color:var(--color-ink)]">Servicios</a>
            <a href="#a-medida" className="transition hover:text-[color:var(--color-ink)]">A medida</a>
            <a href="#industrias" className="transition hover:text-[color:var(--color-ink)]">Industrias</a>
            <a href="#proceso" className="transition hover:text-[color:var(--color-ink)]">Proceso</a>
          </nav>
          <a
            href="https://wa.me/5491168556257?text=Hola%20Crolia%2C%20quiero%20info%20sobre%20automatizaci%C3%B3n%20con%20IA"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 bg-[color:var(--color-ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="inicio" className="section-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="space-y-8">
          <div className="eyebrow reveal">Tecnología accesible para negocios que quieren escalar</div>
          <h1 className="display-title max-w-4xl reveal delay-100">
            Hacé crecer tu negocio con IA, automatización y tecnología a tu medida.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[color:var(--color-muted)] reveal delay-200">
            Más ventas, más turnos, más tiempo libre — con soluciones accesibles que se adaptan a cualquier negocio que quiera dar el siguiente paso.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row reveal delay-300">
            <a href="#contacto" className="rounded-full bg-[color:var(--color-ink)] px-7 py-4 text-center text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]">
              Agendar diagnóstico gratuito
            </a>
            <a href="#servicios" className="rounded-full border border-black/10 px-7 py-4 text-center text-sm font-medium text-[color:var(--color-ink)] transition hover:border-black/20 hover:bg-white/70">
              Ver soluciones
            </a>
          </div>
          <div className="grid gap-4 grid-cols-3 reveal delay-400">
            {stats.map((stat) => (
              <div key={stat.label} className="card-surface p-5">
                <div className="text-2xl font-bold text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
                <p className="mt-1 text-xs leading-5 text-[color:var(--color-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat mockup */}
        <div className="reveal-scale delay-200">
          <div className="chat-mockup">
            <div className="chat-mockup-header">
              <div className="chat-mockup-avatar">
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div>
                <p className="chat-mockup-name">Agente Crolia</p>
                <p className="chat-mockup-status">
                  <span className="chat-online-dot" />
                  En línea ahora
                </p>
              </div>
              <div className="ml-auto text-xs text-white/60">2:47 am</div>
            </div>
            <div className="chat-mockup-body">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-bubble chat-bubble-${msg.from}${(msg as { success?: boolean }).success ? " chat-bubble-success" : ""} delay-${(i + 1) * 150}`}
                  style={{ animationDelay: `${(i + 1) * 0.25}s` }}
                >
                  {msg.text}
                </div>
              ))}
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            </div>
            <div className="chat-mockup-footer">
              <p>Respondió en <strong>4 segundos</strong> · sin intervención humana</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars / What we offer ── */}
      <section id="que-hacemos" className="section-shell py-16 md:py-24">
        <div className="section-heading reveal">
          <div className="eyebrow">Qué hacemos</div>
          <h2 className="section-title mt-4">Una sola empresa para todo lo que tu negocio necesita crecer.</h2>
          <p className="section-copy">
            Desde un agente de IA hasta un sistema completo a medida — con la misma lógica: tecnología accesible, resultados concretos y bajo costo de entrada.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <article key={p.id} className={`${p.featured ? "card-featured" : "card-surface"} flex flex-col p-8 reveal delay-${(i % 2 + 1) * 100}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="text-4xl">{p.icon}</div>
                {p.featured && <span className="badge-accent shrink-0">Popular</span>}
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{p.label}</h3>
              <p className="mt-1 text-sm font-semibold text-[color:var(--color-accent)]">{p.tagline}</p>
              <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">{p.description}</p>
              <ul className="mt-5 space-y-2 flex-1">
                {p.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[color:var(--color-ink)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={p.href} className="mt-7 self-start rounded-full border border-[color:var(--color-accent)]/30 bg-white/70 px-5 py-2.5 text-sm font-medium text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)] hover:text-white">
                {p.cta} →
              </a>
            </article>
          ))}
        </div>
        {/* Low cost callout */}
        <div className="mt-8 rounded-[2rem] bg-[color:var(--color-ink)] p-8 text-white reveal md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">¿Por qué Crolia?</p>
              <p className="text-2xl font-bold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                Tecnología de punta, accesible para cualquier negocio — sin grandes inversiones.
              </p>
              <p className="text-base text-white/65 max-w-2xl">
                No hace falta ser una gran empresa para tener un agente de IA o un sistema propio. Diseñamos soluciones que se adaptan a tu presupuesto y escalan con vos.
              </p>
            </div>
            <a href="#contacto" className="shrink-0 rounded-full bg-[color:var(--color-accent)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 whitespace-nowrap">
              Consultar precios →
            </a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="servicios" className="section-shell py-16 md:py-24">
        <div className="section-heading reveal">
          <div className="eyebrow">Soluciones</div>
          <h2 className="section-title mt-4">Empezamos por donde más impacto genera.</h2>
          <p className="section-copy">Ventas y agendamiento primero. Después sumamos lo que tu operación necesite.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.filter(s => s.featured).map((service, i) => (
            <article key={service.title} className={`card-featured p-8 reveal delay-${(i + 1) * 100}`}>
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold">Servicio principal</div>
                {service.tag && <span className="badge-accent">{service.tag}</span>}
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{service.title}</h3>
              <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">{service.description}</p>
              {service.examples && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.examples.map(ex => (
                    <span key={ex} className="rounded-full border border-black/8 bg-white/60 px-3 py-1 text-xs text-[color:var(--color-muted)]">{ex}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {services.filter(s => !s.featured).map((service, i) => (
            <article key={service.title} className={`card-surface p-7 reveal delay-${(i + 1) * 100}`}>
              <h3 className="text-lg font-bold tracking-tight text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── A medida ── */}
      <section id="a-medida" className="section-shell py-16 md:py-24">
        <div className="section-heading reveal">
          <div className="eyebrow">Agentes a medida</div>
          <h2 className="section-title mt-4">Si hay un proceso manual que te roba tiempo, lo automatizamos.</h2>
          <p className="section-copy">
            Más allá de ventas y turnos, cualquier flujo repetitivo se puede delegar a un agente. Algunos ejemplos:
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {customProcesses.map((p, i) => (
            <article key={p.title} className={`card-surface flex gap-5 p-7 reveal delay-${(i % 2 + 1) * 100}`}>
              <div className="text-3xl shrink-0">{p.icon}</div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{p.problem}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-ink)] font-medium">→ {p.solution}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center reveal">
          <a href="#contacto" className="inline-flex rounded-full bg-[color:var(--color-ink)] px-8 py-4 text-sm font-medium text-white transition hover:bg-[color:var(--color-accent)]">
            Contanos tu proceso →
          </a>
        </div>
      </section>

      {/* ── Industries (compact) ── */}
      <section id="industrias" className="divider-grid border-y border-black/6">
        <div className="section-shell py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Funciona para</p>
            <div className="flex flex-wrap gap-2">
              {industries.map(ind => (
                <span key={ind} className="rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm text-[color:var(--color-ink)] backdrop-blur">
                  {ind}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-black/15 bg-transparent px-4 py-2 text-sm text-[color:var(--color-muted)]">
                y mucho más →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="proceso" className="section-shell py-16 md:py-24">
        <div className="section-heading reveal">
          <div className="eyebrow">Cómo funciona</div>
          <h2 className="section-title mt-4">De cero a operando en días.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {processSteps.map((item, i) => (
            <article key={item.step} className={`card-surface p-7 reveal delay-${(i + 1) * 150}`}>
              <div className="text-5xl font-bold text-[color:var(--color-accent)]/20" style={{ fontFamily: "var(--font-display)" }}>{item.step}</div>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contacto" className="section-shell py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.5rem] border border-black/7 bg-[color:var(--color-ink)] p-8 text-white md:p-12 reveal-left">
            <img src="/crolia-logo.svg" alt="Crolia" className="h-20 w-20 rounded-full mb-6 opacity-90" />
            <div className="eyebrow !border-white/12 !bg-white/8 !text-white/70">Contacto</div>
            <h2 className="mt-6 max-w-lg text-4xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Empezá con un diagnóstico gratuito.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
              Contanos cómo funciona tu negocio y en menos de 24 horas te decimos qué automatizar primero y qué resultado podés esperar.
            </p>
            <div className="mt-10 space-y-3 text-sm text-white/60">
              <p>WhatsApp: <a href="https://wa.me/5491168556257" target="_blank" rel="noopener noreferrer" className="text-white/90 underline underline-offset-2">+54 9 11 6855-6257</a></p>
              <p>Email: <a href="mailto:contacto@crolia.com.ar" className="text-white/90 underline underline-offset-2">contacto@crolia.com.ar</a></p>
              <p>Respuesta: dentro del mismo día hábil.</p>
            </div>
          </div>
          <div className="reveal delay-200">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-black/6">
        <div className="section-shell flex flex-col gap-6 py-8 text-sm text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/crolia-logo.svg" alt="Crolia" className="h-9 w-9 rounded-full opacity-80" />
            <span className="font-semibold text-[color:var(--color-ink)]">Crolia</span><span> — agentes de IA para negocios que quieren crecer.</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#servicios" className="transition hover:text-[color:var(--color-ink)]">Servicios</a>
            <a href="#a-medida" className="transition hover:text-[color:var(--color-ink)]">A medida</a>
            <a href="#contacto" className="transition hover:text-[color:var(--color-ink)]">Contacto</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

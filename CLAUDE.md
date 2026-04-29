# CLAUDE.md — crolia-web

## Qué es este proyecto
Landing page + plataforma de demostración de servicios de Crolia (consultoría de IA y automatización).

Incluye:
- Landing marketing con los 4 pilares de servicio de Crolia
- Demo interactiva de chatbot impulsado por Claude API
- Admin dashboard para ver conversaciones y estadísticas de leads
- Captura de leads integrada con Google Sheets + emails via Resend

## Stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Estilos**: Tailwind CSS v4 + Bootstrap 5.3
- **IA**: `@anthropic-ai/sdk` v0.85 (demo chatbot)
- **Email**: Resend v6 (notificaciones y captura de leads)
- **Leads**: Google Sheets via `googleapis`
- **Deploy**: Vercel (automático desde GitHub)

## Estructura clave
```
app/
├── page.tsx                         # Landing principal
├── layout.tsx                       # Root layout
├── demo/page.tsx                    # Demo interactivo del chatbot
├── admin/
│   ├── page.tsx                     # Dashboard (requiere auth)
│   ├── login/page.tsx               # Login admin
│   └── conversacion/[id]/page.tsx  # Detalle de conversación
└── api/
    ├── admin/
    │   ├── login/route.ts
    │   ├── logout/route.ts
    │   ├── stats/route.ts
    │   ├── demo-leads/route.ts
    │   └── conversacion/[id]/route.ts
    └── demo/
        ├── chat/route.ts            # Streaming con Claude
        ├── conversacion/route.ts
        └── lead/route.ts
components/                          # contact-form, scroll-reveal
config/                              # agents.example.json
data/                                # Archivos de datos estáticos
```

## Variables de entorno (.env.local)
```
ANTHROPIC_API_KEY         # Claude API — demo chatbot
RESEND_API_KEY            # Resend — envío de emails
GOOGLE_CREDENTIALS_JSON   # JSON de service account de Google
DEMO_LEADS_SPREADSHEET_ID # ID del Google Sheet donde van los leads
```

## Deploy
- **Vercel** — deploy automático al pushear a main
- Variables de entorno se configuran en el dashboard de Vercel (no en Railway)

## Auth admin
- `middleware.ts` protege todas las rutas `/admin`
- Autenticación via cookie de sesión

## Convenciones
- App Router de Next.js (nunca Pages Router)
- TypeScript estricto
- Tailwind v4 — config via CSS, no `tailwind.config.ts`
- No hay ORM ni base de datos local — los datos van a Google Sheets

## Tarjeta personal y QR
- `public/tarjeta-crolia.html` — diseño de tarjeta personal imprimible (85×55mm), dos caras
- `public/qr-crolia-demo.svg` — QR generado con `npx qrcode` apuntando a `https://www.crolia.com.ar/d`
- La ruta `/d` redirige a `/demo` via `next.config.ts` (redirect 307)
- El QR es dinámico por diseño: si cambia la URL destino, solo se actualiza el redirect en `next.config.ts` — el QR impreso sigue funcionando para siempre
- Para regenerar el QR: `npx qrcode -t svg -o public/qr-crolia-demo.svg "https://www.crolia.com.ar/d"`

## Approach
- Leer el archivo antes de editarlo
- Preferir edición sobre reescritura completa
- Soluciones simples y directas
- Las instrucciones del usuario tienen prioridad sobre este archivo

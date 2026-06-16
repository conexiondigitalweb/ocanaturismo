# OcanaTurismo — CLAUDE.md

Sitio web oficial de turismo del municipio de **Ocaña, Norte de Santander, Colombia**.
Dominio: `www.ocanaturismo.com`

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| CMS | Payload CMS v3 (headless, panel en `/admin`) |
| Base de datos | PostgreSQL — Neon (free tier) |
| Estilos | Tailwind CSS v3 |
| Despliegue | Vercel (cuenta `conexiondigitalweb`) |

---

## Repositorios

| Remoto | Repo | Uso |
|---|---|---|
| `personal` | `conexiondigitalweb/ocanaturismo` | Conectado a Vercel (deploy automático) |
| `origin` | `secretariadeeducacion-ocana/ocanaturismo` | Repositorio institucional |

---

## Despliegue

Siempre hacer push a **ambos** remotos:

```bash
git add -A
git commit -m "descripción del cambio"
git push origin main
git push personal main
```

Vercel detecta el push a `conexiondigitalweb/ocanaturismo` y despliega automáticamente.

---

## Variables de entorno (Vercel + local)

```env
DATABASE_URI=postgresql://...@...neon.tech/neondb?sslmode=require
DATABASE_URL=postgresql://...@...neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=https://www.ocanaturismo.com
```

> En desarrollo local usar `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`.
> `DATABASE_URI` y `DATABASE_URL` deben tener el mismo valor (Payload usa `DATABASE_URI`, algunas herramientas usan `DATABASE_URL`).

---

## Seed de datos

El seed usa la REST API — el servidor debe estar corriendo:

```bash
# Terminal 1
npm run dev

# Terminal 2
$env:SEED_EMAIL="correo@admin.com"; $env:SEED_PASSWORD="contraseña"; npm run seed
```

---

## Panel de administración

URL: `www.ocanaturismo.com/admin`

Colecciones disponibles: Atractivos · Rutas · Eventos · Prestadores · Noticias · Páginas · Galerías · Medios

---

## Estado del MVP

### Completado ✅

- 25 atractivos turísticos (religiosos, históricos, naturales, gastronómicos)
- 5 rutas turísticas
- 7 eventos culturales y religiosos
- 15 prestadores de servicios (hoteles y artesanos)
- Páginas públicas: inicio, descubre, atractivos, rutas, eventos, directorio, noticias, institucional, contacto
- SEO básico: metadatos, sitemap.xml, robots.txt
- Panel admin funcional con Payload CMS v3

### Pendientes ⏳

- [ ] Logos PNG con fondo transparente (header y footer)
- [ ] Fotografías oficiales de los atractivos
- [ ] Traducir panel CMS al español (labels de Payload)
- [ ] Enriquecer textos descriptivos de atractivos y rutas
- [ ] Formulario de contacto funcional (backend de email)
- [ ] Mapa interactivo (campos de coordenadas ya existen en la colección `atractivos`)
- [ ] Multilenguaje (estructura lista para `next-intl`)

---

## Equipo institucional

| Cargo | Nombre |
|---|---|
| Alcalde de Ocaña | Emiro Cañizares Plata |
| Secretario de Educación, Cultura y Turismo | Doiler Alfonso Sanjuán Sánchez |
| Coordinación Cultura y Turismo | Jazmine Beatriz Ibáñez Lozano |

---

## Estructura de archivos clave

```
src/
├── app/
│   ├── (frontend)/          # Páginas públicas
│   └── (payload)/admin/     # Panel CMS
│       ├── layout.tsx        # RootLayout de Payload (providers)
│       ├── serverActions.ts  # Server Actions para Payload ('use server')
│       └── importMap.js      # Auto-generado por Payload
├── collections/             # Esquemas de Payload CMS
├── components/              # Header, Footer, Cards
└── lib/
    ├── payload.ts           # Cliente Payload (server-side)
    ├── seedData.ts          # Datos oficiales Plan 2023-2034
    └── seed.ts              # Script seed vía REST API
payload.config.ts            # Configuración central de Payload
```

---

## Notas técnicas

- El `importMap.js` es **auto-generado** por Payload al correr `npm run dev`. No editar manualmente.
- El seed script **no** usa `getPayload()` directamente (incompatible con Node.js v24 + tsx). Usa `fetch` a la REST API.
- El admin layout requiere `serverActions.ts` con `'use server'` para pasar `handleServerFunctions` como Server Action a Next.js 15.

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

### Roles y control de acceso

- **Admin**: acceso total, incluye Users y Páginas, único rol que puede pasar `estado` a "Publicado".
- **Colaborador**: puede crear/editar en Atractivos, Rutas, Eventos, Medios, Prestadores, Noticias, Galerías, pero no puede publicar directo (hook `restrictPublishToAdmin` en todas). Users y Páginas quedan ocultos/solo lectura.
- Atractivos, Rutas y Eventos tienen campo `estado` (`borrador` · `revision` · `publicado`).

### Imágenes y video

- Storage vía `@payloadcms/storage-vercel-blob`, URLs directas del CDN (`disablePayloadAccessControl: true`).
- 4 variantes por imagen: `thumbnail` · `card` · `hero` · `gallery` (crop + focal point). Usar `getMediaUrl()` en el frontend.
- Atractivos y Eventos soportan video embebido de YouTube (componente `YouTubeEmbed`, validado con `isValidYouTubeUrl`).

### Revalidación

Los `afterChange`/`afterDelete` hooks de Atractivos, Rutas, Eventos y Noticias llaman `revalidatePath` para las páginas estáticas que dependen de esos datos (helpers en `src/collections/hooks/revalidate.ts`).

---

## Estado del MVP

### Completado ✅

- 25 atractivos turísticos (religiosos, históricos, naturales, gastronómicos)
- 5 rutas turísticas
- 7 eventos culturales y religiosos
- 15 prestadores de servicios (hoteles y artesanos)
- Páginas públicas: inicio, descubre, atractivos, rutas, eventos, directorio, noticias, institucional, contacto
- SEO básico: metadatos, sitemap.xml, robots.txt
- Panel admin funcional con Payload CMS v3, roles admin/colaborador, imágenes vía Vercel Blob, video YouTube, revalidación automática
- Logo institucional de la Alcaldía con soporte de tema claro/oscuro en el login del panel

### En curso 🔧

- **Categoría de Atractivos → multi-selección**: el campo `categoria` (single-select) fue reemplazado por `categorias` (`hasMany: true`), ya migrado en producción (los 25 atractivos conservan su categoría original en el array). El campo `categoria` viejo se dejó **oculto** (`admin.hidden: true`) pero intacto en la base de datos como respaldo — no eliminar hasta confirmar que `categorias` funciona sin sorpresas por un tiempo. Script de migración de datos: `src/lib/migrateCategorias.ts` (`npm run migrate-categorias`).

### Pendientes ⏳

- [ ] Eliminar definitivamente el campo legacy `categoria` de Atractivos (columna y dato) una vez validado `categorias` en producción
- [ ] Logos PNG con fondo transparente (header y footer)
- [ ] Fotografías oficiales de los atractivos
- [ ] Traducir panel CMS al español (labels de Payload)
- [ ] Enriquecer textos descriptivos de atractivos y rutas
- [ ] Formulario de contacto funcional (backend de email, evaluar Resend)
- [ ] Mapa interactivo (campos de coordenadas ya existen en la colección `atractivos`)
- [ ] Multilenguaje (estructura lista para `next-intl`)
- [ ] Confirmar quién tiene acceso a `secretariadeeducacion@ocana-nortedesantander.gov.co` (admin existente sin dueño confirmado)

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
- El seed script **no** usa `getPayload()` directamente (incompatible con Node.js v24 + tsx). Usa `fetch` a la REST API. Por la misma razón, `npm run generate:types` (usa `payload generate:types`, que sí llama `getPayload()`) falla en Node v24 — si se agrega/cambia un campo, editar `src/payload-types.ts` a mano en vez de regenerarlo.
- El admin layout requiere `serverActions.ts` con `'use server'` para pasar `handleServerFunctions` como Server Action a Next.js 15.
- **No hay migraciones versionadas** (`migrationDir` sin configurar, sin carpeta `src/migrations`). Payload/Drizzle corre en modo *push*: cualquier cambio en `src/collections/*.ts` se aplica directo a la base de datos la primera vez que Payload se inicializa (p. ej. al correr `npm run dev` o pegarle a cualquier ruta `/admin` o `/api/*`) — y como `DATABASE_URI` local apunta a la **misma Neon de producción**, ese push es contra datos reales. Para cambios de esquema no aditivos (rename, drop de columnas) evaluar el riesgo antes de tocar campos existentes; preferir agregar campos nuevos y migrar datos con un script antes de eliminar los viejos.

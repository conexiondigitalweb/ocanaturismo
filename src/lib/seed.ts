/**
 * Seed script — usa la REST API de Payload (requiere que npm run dev esté corriendo).
 *
 * Uso:
 *   npm run seed
 *
 * Variables de entorno opcionales:
 *   SEED_EMAIL    — correo del admin (default: admin@ocanaturismo.com)
 *   SEED_PASSWORD — contraseña del admin (default: Admin1234!)
 *   NEXT_PUBLIC_SERVER_URL — URL base (default: http://localhost:3000)
 */

import {
  atractivosReligiosos,
  atractivosHistoricos,
  atractivosNaturaleza,
  atractivosGastronomia,
  rutasData,
  eventosData,
  prestadoresData,
  toSlug,
} from './seedData'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const API = `${BASE_URL}/api`
const EMAIL = process.env.SEED_EMAIL || 'admin@ocanaturismo.com'
const PASSWORD = process.env.SEED_PASSWORD || 'Admin1234!'

// ─── helpers ───────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Login fallido (${res.status}): ${body}\n\nAsegúrate de haber creado el usuario admin en /admin/create-first-user`)
  }
  const data = await res.json()
  return data.token as string
}

async function findBySlug(collection: string, slug: string, token: string): Promise<string | null> {
  const res = await fetch(
    `${API}/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0]?.id ?? null
}

async function createOne(
  collection: string,
  body: Record<string, unknown>,
  token: string,
): Promise<string | null> {
  const res = await fetch(`${API}/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`    ❌ Error POST /${collection}: ${res.status} — ${text.slice(0, 200)}`)
    return null
  }
  const data = await res.json()
  return data.doc?.id ?? null
}

function richText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [{ type: 'text', text, version: 1 }],
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ─── seed functions ────────────────────────────────────────────────────────

async function seedAtractivos(token: string) {
  const todos = [
    ...atractivosReligiosos,
    ...atractivosHistoricos,
    ...atractivosNaturaleza,
    ...atractivosGastronomia,
  ]
  console.log(`\n📍 Creando ${todos.length} atractivos...`)

  for (const a of todos) {
    const slug = toSlug(a.nombre)
    const existing = await findBySlug('atractivos', slug, token)
    if (existing) {
      console.log(`  ⏭️  Ya existe: ${a.nombre}`)
      continue
    }
    const id = await createOne(
      'atractivos',
      {
        nombre: a.nombre,
        slug,
        categoria: a.categoria,
        categorias: [a.categoria],
        descripcion: richText(a.descripcion || ''),
        ubicacion: a.ubicacion,
        declaratoria: (a as { declaratoria?: string }).declaratoria,
        puntaje: a.puntaje || undefined,
        destacado: a.destacado || false,
        estado: 'publicado',
        orden: 0,
      },
      token,
    )
    console.log(id ? `  ✅ ${a.nombre}` : `  ❌ Falló: ${a.nombre}`)
  }
}

async function seedRutas(token: string) {
  console.log(`\n🗺️  Creando ${rutasData.length} rutas...`)
  for (const r of rutasData) {
    const slug = toSlug(r.nombre)
    const existing = await findBySlug('rutas', slug, token)
    if (existing) {
      console.log(`  ⏭️  Ya existe: ${r.nombre}`)
      continue
    }
    const id = await createOne(
      'rutas',
      {
        nombre: r.nombre,
        slug,
        descripcion: richText(r.descripcion),
        duracion: r.duracion,
        dificultad: r.dificultad,
        destacado: r.destacado,
        estado: 'publicado',
      },
      token,
    )
    console.log(id ? `  ✅ ${r.nombre}` : `  ❌ Falló: ${r.nombre}`)
  }
}

async function seedEventos(token: string) {
  console.log(`\n📅 Creando ${eventosData.length} eventos...`)
  for (const e of eventosData) {
    const slug = toSlug(e.nombre)
    const existing = await findBySlug('eventos', slug, token)
    if (existing) {
      console.log(`  ⏭️  Ya existe: ${e.nombre}`)
      continue
    }
    const id = await createOne(
      'eventos',
      {
        nombre: e.nombre,
        slug,
        descripcion: richText(e.descripcion),
        fechaInicio: e.fechaInicio,
        fechaFin: (e as { fechaFin?: string }).fechaFin,
        tipo: e.tipo,
        organizador: (e as { organizador?: string }).organizador,
        destacado: e.destacado,
        estado: 'publicado',
      },
      token,
    )
    console.log(id ? `  ✅ ${e.nombre}` : `  ❌ Falló: ${e.nombre}`)
  }
}

async function seedPrestadores(token: string) {
  console.log(`\n🏨 Creando ${prestadoresData.length} prestadores...`)
  for (const p of prestadoresData) {
    const slug = toSlug(p.nombre)
    const existing = await findBySlug('prestadores', slug, token)
    if (existing) {
      console.log(`  ⏭️  Ya existe: ${p.nombre}`)
      continue
    }
    const id = await createOne(
      'prestadores',
      {
        nombre: p.nombre,
        slug,
        tipo: p.tipo,
        direccion: p.direccion,
        telefono: p.telefono,
        descripcion: p.descripcion,
        estado: 'publicado',
      },
      token,
    )
    console.log(id ? `  ✅ ${p.nombre}` : `  ❌ Falló: ${p.nombre}`)
  }
}

// ─── main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 OcanaTurismo — Seed via REST API')
  console.log(`   Servidor: ${BASE_URL}`)
  console.log(`   Usuario:  ${EMAIL}\n`)

  // Verificar que el servidor esté corriendo
  try {
    await fetch(`${BASE_URL}`)
  } catch {
    console.error('❌ El servidor no está disponible en', BASE_URL)
    console.error('   Ejecuta primero: npm run dev')
    process.exit(1)
  }

  let token: string
  try {
    token = await login()
    console.log('✅ Autenticado correctamente\n')
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }

  await seedAtractivos(token)
  await seedRutas(token)
  await seedEventos(token)
  await seedPrestadores(token)

  console.log('\n✅ Seed completado.')
}

main().catch((e) => {
  console.error('Error inesperado:', e)
  process.exit(1)
})

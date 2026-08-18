/**
 * Migración uno-off: copia el valor del campo legacy `categoria` (single-select)
 * al nuevo campo `categorias` (multi-select) para los atractivos existentes.
 *
 * Usa la REST API — el servidor debe estar corriendo (npm run dev).
 *
 * Uso:
 *   $env:SEED_EMAIL="correo@admin.com"; $env:SEED_PASSWORD="contraseña"; npm run migrate-categorias
 */

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const API = `${BASE_URL}/api`
const EMAIL = process.env.SEED_EMAIL || 'admin@ocanaturismo.com'
const PASSWORD = process.env.SEED_PASSWORD || 'Admin1234!'

interface AtractivoDoc {
  id: string | number
  nombre: string
  categoria?: string
  categorias?: string[]
}

async function login(): Promise<string> {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Login fallido (${res.status}): ${body}`)
  }
  const data = await res.json()
  return data.token as string
}

async function fetchAll(token: string): Promise<AtractivoDoc[]> {
  const docs: AtractivoDoc[] = []
  let page = 1
  let hasNextPage = true
  while (hasNextPage) {
    const res = await fetch(`${API}/atractivos?limit=100&page=${page}&depth=0`, {
      headers: { Authorization: `JWT ${token}` },
    })
    if (!res.ok) throw new Error(`Error listando atractivos: ${res.status}`)
    const data = await res.json()
    docs.push(...data.docs)
    hasNextPage = data.hasNextPage
    page += 1
  }
  return docs
}

async function main() {
  console.log('🔄 Migración categoria → categorias')
  console.log(`   Servidor: ${BASE_URL}`)

  const token = await login()
  const atractivos = await fetchAll(token)
  console.log(`   ${atractivos.length} atractivos encontrados\n`)

  let migrados = 0
  let saltados = 0

  for (const a of atractivos) {
    if (a.categorias && a.categorias.length > 0) {
      console.log(`  ⏭️  Ya tiene categorías: ${a.nombre}`)
      saltados += 1
      continue
    }
    if (!a.categoria) {
      console.log(`  ⚠️  Sin categoria legacy, se omite: ${a.nombre}`)
      continue
    }
    const res = await fetch(`${API}/atractivos/${a.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ categorias: [a.categoria] }),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error(`  ❌ Error actualizando ${a.nombre}: ${res.status} — ${text.slice(0, 200)}`)
      continue
    }
    console.log(`  ✅ ${a.nombre} → [${a.categoria}]`)
    migrados += 1
  }

  console.log(`\n✅ Migración completada. ${migrados} migrados, ${saltados} ya tenían datos.`)
}

main().catch((e) => {
  console.error('Error inesperado:', e)
  process.exit(1)
})

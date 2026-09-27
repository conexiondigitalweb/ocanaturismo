import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/media'
import AtractivosExplorer from '@/components/ui/AtractivosExplorer'
import Reveal from '@/components/ui/Reveal'
import type { Atractivo } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Atractivos Turísticos',
  description:
    'Conoce los 93 atractivos turísticos inventariados de Ocaña: religiosos, históricos, naturales, culturales y gastronómicos.',
}

interface Props {
  searchParams: Promise<{ cat?: string }>
}

async function getAtractivos() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'atractivos',
      where: { estado: { equals: 'publicado' } },
      limit: 100,
      sort: '-puntaje',
    })
    // Ver comentario equivalente en Home: Postgres ordena NULLS FIRST en un
    // `ORDER BY ... DESC`, así que sin este re-sort los atractivos sin
    // puntaje (aún sin valorar) aparecerían antes que los mejor valorados.
    return [...result.docs].sort((a, b) => (b.puntaje ?? -1) - (a.puntaje ?? -1)) as Atractivo[]
  } catch {
    return []
  }
}

export default async function AtractivosPage({ searchParams }: Props) {
  const params = await searchParams
  const atractivos = await getAtractivos()

  const items = atractivos.map((a) => ({
    id: a.id,
    nombre: a.nombre,
    slug: a.slug,
    categorias: a.categorias || [],
    puntaje: a.puntaje || undefined,
    imagen: getMediaUrl(a.imagenPrincipal, 'card'),
  }))

  return (
    <>
      <div className="bg-gradient-to-r from-amber-700 to-terracota-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Atractivos Turísticos
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto">
              93 atractivos inventariados en el Plan de Desarrollo Turístico 2023-2034: patrimonio
              cultural material, sitios naturales, festividades y más.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length > 0 ? (
          <AtractivosExplorer atractivos={items} initialCat={params.cat || ''} />
        ) : (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No hay atractivos disponibles aún</p>
            <p className="text-sm mt-1">Ejecuta el seed para cargar los datos oficiales</p>
          </div>
        )}
      </div>
    </>
  )
}

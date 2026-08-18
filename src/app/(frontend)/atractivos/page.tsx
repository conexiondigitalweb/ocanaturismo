import type { Metadata } from 'next'
import type { Where } from 'payload'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/media'
import AtractivoCard from '@/components/ui/AtractivoCard'
import type { Atractivo } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Atractivos Turísticos',
  description: 'Conoce los 93 atractivos turísticos inventariados de Ocaña: religiosos, históricos, naturales, culturales y gastronómicos.',
}

const categorias = [
  { value: '', label: 'Todos' },
  { value: 'turismo-religioso', label: 'Religioso' },
  { value: 'turismo-historico', label: 'Histórico' },
  { value: 'turismo-naturaleza', label: 'Naturaleza' },
  { value: 'cultura-patrimonio', label: 'Patrimonio' },
  { value: 'gastronomia', label: 'Gastronomía' },
]

interface Props {
  searchParams: Promise<{ cat?: string }>
}

async function getAtractivos(cat?: string) {
  try {
    const payload = await getPayloadClient()
    const where: Where = cat
      ? { and: [{ estado: { equals: 'publicado' } }, { categorias: { contains: cat } }] }
      : { estado: { equals: 'publicado' } }
    const result = await payload.find({
      collection: 'atractivos',
      where,
      limit: 100,
      sort: '-puntaje',
    })
    return result.docs as Atractivo[]
  } catch {
    return []
  }
}

export default async function AtractivosPage({ searchParams }: Props) {
  const params = await searchParams
  const cat = params.cat || ''
  const atractivos = await getAtractivos(cat)

  return (
    <>
      <div className="bg-gradient-to-r from-amber-700 to-terracota-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Atractivos Turísticos</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            93 atractivos inventariados en el Plan de Desarrollo Turístico 2023-2034:
            patrimonio cultural material, sitios naturales, festividades y más.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categorias.map((c) => (
            <a
              key={c.value}
              href={c.value ? `?cat=${c.value}` : '/atractivos'}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === c.value
                  ? 'bg-terracota-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-terracota-100 hover:text-terracota-700'
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>

        {atractivos.length > 0 ? (
          <>
            <p className="text-gray-500 text-sm mb-6">{atractivos.length} atractivos encontrados</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {atractivos.map((a) => (
                <AtractivoCard
                  key={a.id}
                  nombre={a.nombre}
                  slug={a.slug}
                  categorias={a.categorias || []}
                  puntaje={a.puntaje || undefined}
                  imagen={getMediaUrl(a.imagenPrincipal, 'card')}
                />
              ))}
            </div>
          </>
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

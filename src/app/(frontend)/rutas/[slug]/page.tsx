import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/media'
import AtractivoCard from '@/components/ui/AtractivoCard'
import type { Ruta, Atractivo } from '@/payload-types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getRuta(slug: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'rutas',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    return result.docs[0] as Ruta | undefined
  } catch {
    return undefined
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ruta = await getRuta(slug)
  if (!ruta) return { title: 'No encontrado' }
  return { title: ruta.nombre, description: `Ruta turística de Ocaña: ${ruta.nombre}` }
}

export default async function RutaPage({ params }: Props) {
  const { slug } = await params
  const ruta = await getRuta(slug)
  if (!ruta) notFound()

  const atractivos = (ruta.atractivos || []).filter((a): a is Atractivo => typeof a === 'object')

  return (
    <>
      <div className="bg-gradient-to-r from-bosque-700 to-bosque-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          <nav className="text-sm text-bosque-300 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/rutas" className="hover:text-white">Rutas</Link>
            <span>/</span>
            <span className="text-white">{ruta.nombre}</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">{ruta.nombre}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            {ruta.duracion && (
              <span className="bg-white/20 px-3 py-1 rounded-full">⏱ {ruta.duracion}</span>
            )}
            {ruta.dificultad && (
              <span className="bg-white/20 px-3 py-1 rounded-full capitalize">
                {ruta.dificultad === 'baja' ? '🟢' : ruta.dificultad === 'media' ? '🟡' : '🔴'} Dificultad {ruta.dificultad}
              </span>
            )}
            {ruta.distancia && (
              <span className="bg-white/20 px-3 py-1 rounded-full">📏 {ruta.distancia}</span>
            )}
            {atractivos.length > 0 && (
              <span className="bg-white/20 px-3 py-1 rounded-full">📍 {atractivos.length} atractivos</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {ruta.descripcion && (
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Sobre esta ruta</h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <RichTextRenderer content={ruta.descripcion as Record<string, unknown>} />
            </div>
          </div>
        )}

        {atractivos.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">Atractivos en esta ruta</h2>
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
          </div>
        )}

        <div className="bg-bosque-50 rounded-2xl p-8 border border-bosque-100">
          <h3 className="font-display font-semibold text-xl text-gray-800 mb-2">¿Necesitas un guía?</h3>
          <p className="text-gray-600 mb-4">Consulta las agencias de turismo registradas en el directorio oficial</p>
          <Link href="/directorio?tipo=agencia" className="btn-secondary text-sm inline-block">
            Ver directorio de agencias
          </Link>
        </div>
      </div>
    </>
  )
}

function RichTextRenderer({ content }: { content: Record<string, unknown> }) {
  try {
    const root = content as { root?: { children?: Array<{ type: string; children?: Array<{ text?: string }> }> } }
    const children = root.root?.children || []
    return (
      <>
        {children.map((node, i) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((c) => c.text || '').join('') || ''
            return text ? <p key={i}>{text}</p> : null
          }
          return null
        })}
      </>
    )
  } catch {
    return null
  }
}

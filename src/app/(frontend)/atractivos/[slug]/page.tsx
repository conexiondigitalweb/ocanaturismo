import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'
import type { Atractivo } from '@/payload-types'

const categoryLabel: Record<string, string> = {
  'turismo-religioso': 'Turismo Religioso',
  'turismo-historico': 'Turismo Histórico',
  'turismo-naturaleza': 'Turismo de Naturaleza',
  'cultura-patrimonio': 'Cultura y Patrimonio',
  gastronomia: 'Gastronomía',
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getAtractivo(slug: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'atractivos',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] as Atractivo | undefined
  } catch {
    return undefined
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const atractivo = await getAtractivo(slug)
  if (!atractivo) return { title: 'No encontrado' }
  return {
    title: atractivo.nombre,
    description: `Atractivo turístico de Ocaña: ${atractivo.nombre}. Categoría: ${categoryLabel[atractivo.categoria] || atractivo.categoria}.`,
  }
}

export default async function AtractivoPage({ params }: Props) {
  const { slug } = await params
  const atractivo = await getAtractivo(slug)
  if (!atractivo) notFound()

  const catLabel = categoryLabel[atractivo.categoria] || atractivo.categoria

  return (
    <>
      {/* Breadcrumb + Hero */}
      <div className="bg-gradient-to-r from-terracota-800 to-amber-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          <nav className="text-sm text-terracota-200 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/atractivos" className="hover:text-white">Atractivos</Link>
            <span>/</span>
            <span className="text-white">{atractivo.nombre}</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            {catLabel}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">{atractivo.nombre}</h1>
          {atractivo.puntaje && (
            <span className="text-dorado-300 font-semibold">★ Valoración: {atractivo.puntaje}/100</span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Imagen placeholder */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-terracota-100 to-dorado-100 h-72 flex items-center justify-center">
              <div className="text-center text-terracota-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Imagen próximamente</p>
              </div>
            </div>

            {/* Descripción */}
            {atractivo.descripcion && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                  <RichTextRenderer content={atractivo.descripcion} />
                </div>
              </div>
            )}

            {/* Videos (debajo de la galería de imágenes) */}
            {atractivo.videos && atractivo.videos.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Videos</h2>
                <div className="space-y-6">
                  {atractivo.videos.map((v, i) => (
                    <div key={i}>
                      <YouTubeEmbed url={v.url} titulo={v.titulo} />
                      {v.titulo && <p className="mt-2 text-sm text-gray-500">{v.titulo}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Información práctica</h3>
              <dl className="space-y-4">
                {atractivo.ubicacion && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Ubicación
                    </dt>
                    <dd className="text-gray-700 text-sm">{atractivo.ubicacion}</dd>
                  </div>
                )}
                {atractivo.horarios && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Horarios</dt>
                    <dd className="text-gray-700 text-sm">{atractivo.horarios}</dd>
                  </div>
                )}
                {atractivo.costo && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Costo de entrada</dt>
                    <dd className="text-gray-700 text-sm">{atractivo.costo}</dd>
                  </div>
                )}
                {atractivo.declaratoria && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Declaratoria</dt>
                    <dd className="text-gray-700 text-sm italic">{atractivo.declaratoria}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-terracota-50 rounded-2xl p-6 border border-terracota-100">
              <h3 className="font-semibold text-gray-800 mb-3">¿Necesitas información?</h3>
              <p className="text-sm text-gray-600 mb-4">
                La Secretaría de Turismo de Ocaña puede orientarte
              </p>
              <Link href="/contacto" className="btn-primary text-sm w-full text-center block">
                Contactar
              </Link>
            </div>
          </aside>
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

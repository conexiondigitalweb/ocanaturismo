import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'
import type { Evento } from '@/payload-types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getEvento(slug: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'eventos',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] as Evento | undefined
  } catch {
    return undefined
  }
}

const tipoLabel: Record<string, string> = {
  cultural: 'Cultural',
  religioso: 'Religioso',
  deportivo: 'Deportivo',
  gastronomico: 'Gastronómico',
  folclorico: 'Folclórico',
  otro: 'Otro',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const evento = await getEvento(slug)
  if (!evento) return { title: 'No encontrado' }
  return { title: evento.nombre, description: `Evento en Ocaña: ${evento.nombre}` }
}

export default async function EventoPage({ params }: Props) {
  const { slug } = await params
  const evento = await getEvento(slug)
  if (!evento) notFound()

  const fechaInicio = evento.fechaInicio
    ? new Date(evento.fechaInicio).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const fechaFin = evento.fechaFin
    ? new Date(evento.fechaFin).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <>
      <div className="bg-gradient-to-r from-purple-800 to-terracota-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          <nav className="text-sm text-purple-300 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/eventos" className="hover:text-white">Eventos</Link>
            <span>/</span>
            <span className="text-white">{evento.nombre}</span>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {evento.tipo && (
            <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {tipoLabel[evento.tipo] || evento.tipo}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">{evento.nombre}</h1>
          {fechaInicio && (
            <p className="text-purple-200 text-lg capitalize">{fechaInicio}{fechaFin ? ` — ${fechaFin}` : ''}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {evento.descripcion && (
              <div className="prose prose-gray max-w-none text-gray-600">
                <RichTextRenderer content={evento.descripcion as Record<string, unknown>} />
              </div>
            )}

            {/* Videos (debajo de la galería de imágenes) */}
            {evento.videos && evento.videos.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Videos</h2>
                <div className="space-y-6">
                  {evento.videos.map((v, i) => (
                    <div key={i}>
                      <YouTubeEmbed url={v.url} titulo={v.titulo} />
                      {v.titulo && <p className="mt-2 text-sm text-gray-500">{v.titulo}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Detalles</h3>
              <dl className="space-y-4">
                {fechaInicio && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fecha</dt>
                    <dd className="text-gray-700 text-sm capitalize">{fechaInicio}</dd>
                  </div>
                )}
                {evento.lugar && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lugar</dt>
                    <dd className="text-gray-700 text-sm">{evento.lugar}</dd>
                  </div>
                )}
                {evento.organizador && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Organiza</dt>
                    <dd className="text-gray-700 text-sm">{evento.organizador}</dd>
                  </div>
                )}
              </dl>
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
    return (
      <>
        {(root.root?.children || []).map((node, i) => {
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

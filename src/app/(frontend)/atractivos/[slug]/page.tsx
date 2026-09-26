import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/media'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'
import GalleryLightbox from '@/components/ui/GalleryLightbox'
import CategoryBadge from '@/components/ui/CategoryBadge'
import AtractivoPlaceholder from '@/components/ui/AtractivoPlaceholder'
import Reveal from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { getCategoriaConfig } from '@/lib/categorias'
import type { Atractivo, Media } from '@/payload-types'

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
  const catLabels = (atractivo.categorias || []).map((c) => getCategoriaConfig(c).label)
  return {
    title: atractivo.nombre,
    description: `Atractivo turístico de Ocaña: ${atractivo.nombre}. Categoría: ${catLabels.join(', ')}.`,
  }
}

export default async function AtractivoPage({ params }: Props) {
  const { slug } = await params
  const atractivo = await getAtractivo(slug)
  if (!atractivo) notFound()

  const categorias = atractivo.categorias || []
  const heroUrl = getMediaUrl(atractivo.imagenPrincipal, 'hero')
  const heroAlt =
    (typeof atractivo.imagenPrincipal === 'object' && atractivo.imagenPrincipal?.alt) || atractivo.nombre

  const galeria = (atractivo.imagenes || []).filter(
    (item): item is { imagen: Media; id?: string | null } => typeof item.imagen === 'object',
  )
  const galeriaImages = galeria
    .map((item) => ({ src: getMediaUrl(item.imagen, 'gallery'), alt: item.imagen.alt || atractivo.nombre }))
    .filter((img): img is { src: string; alt: string } => !!img.src)

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
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-4">
              {categorias.map((cat) => (
                <CategoryBadge key={cat} categoria={cat} className="!bg-white/20 !text-white backdrop-blur-sm" />
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">{atractivo.nombre}</h1>
            {!!atractivo.puntaje && (
              <span className="text-dorado-300 font-semibold">★ Valoración: {atractivo.puntaje}/100</span>
            )}
          </Reveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Imagen principal */}
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-lg">
                {heroUrl ? (
                  <Image
                    src={heroUrl}
                    alt={heroAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <AtractivoPlaceholder categoria={categorias[0]} iconSize={72} />
                )}
              </div>
            </Reveal>

            {/* Descripción */}
            {atractivo.descripcion && (
              <Reveal delay={0.05}>
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
                <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed prose-p:leading-relaxed first:prose-p:text-xl first:prose-p:font-display first:prose-p:text-gray-700">
                  <RichTextRenderer content={atractivo.descripcion} />
                </div>
              </Reveal>
            )}

            {/* Galería de imágenes con lightbox */}
            {galeriaImages.length > 0 && (
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Galería</h2>
                <GalleryLightbox images={galeriaImages} />
              </Reveal>
            )}

            {/* Videos (debajo de la galería de imágenes) */}
            {atractivo.videos && atractivo.videos.length > 0 && (
              <Reveal delay={0.15}>
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Videos</h2>
                <div className="space-y-6">
                  {atractivo.videos.map((v, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-md bg-black">
                      <YouTubeEmbed url={v.url} titulo={v.titulo} />
                      {v.titulo && (
                        <p className="p-3 text-sm text-gray-500 bg-white">{v.titulo}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <Reveal delay={0.05}>
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
                <ButtonLink href="/contacto" size="sm" className="w-full">
                  Contactar
                </ButtonLink>
              </div>
            </aside>
          </Reveal>
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

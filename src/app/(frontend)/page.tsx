import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/media'
import AtractivoCard from '@/components/ui/AtractivoCard'
import EventoCard from '@/components/ui/EventoCard'
import Reveal from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { categoriasList, getCategoriaConfig } from '@/lib/categorias'
import type { Atractivo, Evento, Ruta } from '@/payload-types'

async function getHomeData() {
  try {
    const payload = await getPayloadClient()
    const [atractivos, eventos, rutas] = await Promise.all([
      payload.find({
        collection: 'atractivos',
        where: { and: [{ estado: { equals: 'publicado' } }, { destacado: { equals: true } }] },
        limit: 6,
        sort: '-puntaje',
      }),
      payload.find({
        collection: 'eventos',
        where: { and: [{ estado: { equals: 'publicado' } }, { destacado: { equals: true } }] },
        limit: 3,
        sort: 'fechaInicio',
      }),
      payload.find({
        collection: 'rutas',
        where: { and: [{ estado: { equals: 'publicado' } }, { destacado: { equals: true } }] },
        limit: 3,
      }),
    ])
    // Postgres ordena NULLS FIRST en un `ORDER BY ... DESC`, así que un
    // atractivo sin puntaje (aún sin valorar) terminaría antes que uno con
    // 100 y se llevaría la casilla destacada del bento. Los mandamos al final.
    const sortedAtractivos = [...atractivos.docs].sort(
      (a, b) => (b.puntaje ?? -1) - (a.puntaje ?? -1),
    )
    return { atractivos: sortedAtractivos, eventos: eventos.docs, rutas: rutas.docs }
  } catch {
    return { atractivos: [], eventos: [], rutas: [] }
  }
}

// Cada casilla del bento define cómo ocupa el grid de 4 columnas en desktop.
// La primera (mejor puntaje) es la destacada: 2 columnas x 2 filas.
const bentoSpan = (i: number) => (i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : '')
const bentoSizes = (i: number) =>
  i === 0
    ? '(min-width: 1024px) 48vw, 100vw'
    : '(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw'

export default async function HomePage() {
  const { atractivos, eventos, rutas } = await getHomeData()

  return (
    <>
      {/* Hero full-bleed */}
      <section className="relative min-h-[100svh] sm:min-h-[92vh] flex items-center sm:items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/catedral-hero.jpg"
            alt="Catedral Santa Ana de Ocaña vista desde el parque principal"
            fill
            priority
            sizes="100vw"
            // object-position con sesgo hacia arriba: la foto original tiene
            // mucho piso de la plaza y poco margen sobre la torre, así que un
            // center parejo recorta la torre en heros anchos/bajos (desktop).
            className="object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-terracota-950/40 via-transparent to-bosque-950/30" />
        </div>

        <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto sm:pb-20 md:pb-28 w-full">
          <Reveal>
            <div className="inline-block bg-terracota-600/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium mb-6 tracking-widest uppercase">
              Norte de Santander, Colombia
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.05] max-w-3xl">
              Ocaña, <span className="text-dorado-400 italic">Potencia Regional</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl leading-relaxed mb-10">
              Ciudad histórica, religiosa y natural. Cuna de la Gran Convención de 1828, tierra de
              fe, cultura y biodiversidad.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonLink href="/atractivos">Explorar Atractivos</ButtonLink>
              <ButtonLink href="/directorio" variant="outline">
                Directorio Turístico
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce z-10">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-terracota-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '93', label: 'Atractivos inventariados' },
              { num: '78', label: 'Establecimientos hoteleros' },
              { num: '1.012', label: 'Habitaciones disponibles' },
              { num: '2034', label: 'Plan turístico hasta' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-dorado-300">
                    {stat.num}
                  </div>
                  <div className="text-sm text-terracota-100 mt-1">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Atractivos destacados — bento */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <Reveal>
              <div>
                <p className="text-terracota-600 font-semibold text-sm uppercase tracking-wider mb-2">
                  Lo mejor de Ocaña
                </p>
                <h2 className="section-title">Atractivos Turísticos Destacados</h2>
              </div>
            </Reveal>
            <Link
              href="/atractivos"
              className="mt-4 md:mt-0 text-terracota-600 hover:text-terracota-700 font-medium flex items-center gap-1"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {atractivos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5">
              {(atractivos as Atractivo[]).map((a, i) => (
                <Reveal key={a.id} delay={i * 0.07} className={bentoSpan(i)}>
                  <AtractivoCard
                    nombre={a.nombre}
                    slug={a.slug}
                    categorias={a.categorias || []}
                    puntaje={a.puntaje || undefined}
                    imagen={getMediaUrl(a.imagenPrincipal, i === 0 ? 'hero' : 'card')}
                    featured={i === 0}
                    sizes={bentoSizes(i)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <AtractivosFallback />
          )}
        </div>
      </section>

      {/* Visión del plan */}
      <section className="py-20 bg-bosque-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <svg className="w-10 h-10 text-dorado-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed text-gray-200 mb-8">
              &ldquo;Para el año 2034, Ocaña se consolidará como principal destino turístico de
              connotación histórica, religiosa y natural del departamento Norte de Santander,
              asociado a la fortaleza de su clima y amabilidad de su gente.&rdquo;
            </blockquote>
            <p className="text-bosque-300 text-sm">
              Plan de Desarrollo Turístico Convencional del Municipio de Ocaña 2023-2034
            </p>
            <Link
              href="/institucional"
              className="mt-6 inline-block text-dorado-400 hover:text-dorado-300 font-medium text-sm"
            >
              Conocer más sobre el Plan Turístico →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Rutas — narrativa visual */}
      {rutas.length > 0 && (
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <p className="text-bosque-600 font-semibold text-sm uppercase tracking-wider mb-2">
                    Recorridos diseñados
                  </p>
                  <h2 className="section-title">Rutas Turísticas</h2>
                </div>
                <Link
                  href="/rutas"
                  className="mt-4 md:mt-0 text-bosque-600 hover:text-bosque-700 font-medium flex items-center gap-1"
                >
                  Ver todas las rutas
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>

            <div className="space-y-4">
              {(rutas as Ruta[]).map((r, i) => (
                <Reveal key={r.id} delay={i * 0.08}>
                  <Link
                    href={`/rutas/${r.slug}`}
                    className="group flex items-center gap-6 bg-bosque-50/60 hover:bg-bosque-50 rounded-2xl p-6 sm:p-8 transition-colors"
                  >
                    <span className="font-display text-4xl sm:text-6xl font-bold text-bosque-200 group-hover:text-bosque-300 transition-colors shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-gray-800 group-hover:text-bosque-700 transition-colors truncate">
                        {r.nombre}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                        {r.duracion && <span>{r.duracion}</span>}
                        {r.dificultad && (
                          <span className="capitalize">Dificultad {r.dificultad}</span>
                        )}
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-bosque-400 group-hover:text-bosque-600 group-hover:translate-x-1 transition-all shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Eventos */}
      {eventos.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <p className="text-terracota-600 font-semibold text-sm uppercase tracking-wider mb-2">
                    Agenda cultural
                  </p>
                  <h2 className="section-title">Próximos Eventos</h2>
                </div>
                <Link
                  href="/eventos"
                  className="mt-4 md:mt-0 text-terracota-600 hover:text-terracota-700 font-medium flex items-center gap-1"
                >
                  Ver agenda completa
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(eventos as Evento[]).map((e, i) => (
                <Reveal key={e.id} delay={i * 0.07}>
                  <EventoCard
                    nombre={e.nombre}
                    slug={e.slug}
                    tipo={e.tipo || undefined}
                    fechaInicio={e.fechaInicio}
                    lugar={e.lugar || undefined}
                    organizador={e.organizador || undefined}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categorías CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="section-title text-center mb-4">Explora por Categoría</h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Ocaña ofrece experiencias únicas en turismo religioso, histórico, natural y cultural
            </p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categoriasList.map((cat, i) => {
              const config = getCategoriaConfig(cat.value)
              const Icon = config.icon
              return (
                <Reveal key={cat.value} delay={i * 0.06}>
                  <Link
                    href={`/atractivos?cat=${cat.value}`}
                    className={`group relative overflow-hidden bg-gradient-to-br ${config.gradient} text-white rounded-2xl p-6 text-center card-hover block`}
                  >
                    <Icon className="mx-auto mb-3 drop-shadow-sm" size={36} strokeWidth={1.5} />
                    <div className="font-display font-semibold text-lg">{cat.label}</div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-terracota-50 border-t border-terracota-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-4">
              ¿Planeas visitar Ocaña?
            </h2>
            <p className="text-gray-600 mb-8">
              Consulta el directorio de alojamientos, restaurantes y servicios turísticos
              disponibles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/directorio">Ver Directorio Turístico</ButtonLink>
              <ButtonLink href="/contacto" variant="secondary">
                Contactar Secretaría de Turismo
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function AtractivosFallback() {
  const fallback = [
    { nombre: 'Santuario de Torcoroma', slug: 'santuario-de-nuestra-senora-de-las-gracias-de-torcoroma', categorias: ['turismo-religioso'], puntaje: 100 },
    { nombre: 'Columna Libertad de los Esclavos', slug: 'columna-de-la-libertad-de-los-esclavos', categorias: ['turismo-historico'], puntaje: 90 },
    { nombre: 'Reserva Natural ProAves Torcoroma', slug: 'reserva-natural-proaves-hormiguero-de-torcoroma', categorias: ['turismo-naturaleza'], puntaje: 85 },
    { nombre: 'Complejo Histórico Gran Convención', slug: 'complejo-historico-de-la-gran-convencion', categorias: ['turismo-historico'], puntaje: 87 },
    { nombre: 'Jardín Botánico UFPSO', slug: 'jardin-botanico-jorge-enrique-quintero-arenas', categorias: ['turismo-naturaleza'], puntaje: 82 },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5">
      {fallback.map((a, i) => (
        <div key={a.slug} className={bentoSpan(i)}>
          <AtractivoCard {...a} puntaje={a.puntaje || undefined} featured={i === 0} sizes={bentoSizes(i)} />
        </div>
      ))}
    </div>
  )
}

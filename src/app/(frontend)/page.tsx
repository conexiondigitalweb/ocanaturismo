import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/media'
import AtractivoCard from '@/components/ui/AtractivoCard'
import EventoCard from '@/components/ui/EventoCard'
import RutaCard from '@/components/ui/RutaCard'
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
    return { atractivos: atractivos.docs, eventos: eventos.docs, rutas: rutas.docs }
  } catch {
    return { atractivos: [], eventos: [], rutas: [] }
  }
}

export default async function HomePage() {
  const { atractivos, eventos, rutas } = await getHomeData()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracota-900 via-gray-900 to-bosque-900" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-block bg-terracota-600/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium mb-6 tracking-widest uppercase">
            Norte de Santander, Colombia
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Ocaña,{' '}
            <span className="text-dorado-400">Potencia Regional</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
            Ciudad histórica, religiosa y natural. Cuna de la Gran Convención de 1828,
            tierra de fe, cultura y biodiversidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/atractivos" className="btn-primary text-base">
              Explorar Atractivos
            </Link>
            <Link href="/descubre" className="btn-outline text-base">
              Descubre Ocaña
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
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
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-display font-bold text-dorado-300">{stat.num}</div>
                <div className="text-sm text-terracota-100 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atractivos destacados */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-terracota-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Lo mejor de Ocaña
              </p>
              <h2 className="section-title">Atractivos Turísticos Destacados</h2>
            </div>
            <Link href="/atractivos" className="mt-4 md:mt-0 text-terracota-600 hover:text-terracota-700 font-medium flex items-center gap-1">
              Ver todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {atractivos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(atractivos as Atractivo[]).map((a) => (
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
          ) : (
            <AtractivosFallback />
          )}
        </div>
      </section>

      {/* Visión del plan */}
      <section className="py-20 bg-bosque-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="w-10 h-10 text-dorado-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed text-gray-200 mb-8">
            "Para el año 2034, Ocaña se consolidará como principal destino turístico de connotación
            histórica, religiosa y natural del departamento Norte de Santander, asociado a la
            fortaleza de su clima y amabilidad de su gente."
          </blockquote>
          <p className="text-bosque-300 text-sm">
            Plan de Desarrollo Turístico Convencional del Municipio de Ocaña 2023-2034
          </p>
          <Link href="/institucional" className="mt-6 inline-block text-dorado-400 hover:text-dorado-300 font-medium text-sm">
            Conocer más sobre el Plan Turístico →
          </Link>
        </div>
      </section>

      {/* Rutas */}
      {rutas.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="text-bosque-600 font-semibold text-sm uppercase tracking-wider mb-2">
                  Recorridos diseñados
                </p>
                <h2 className="section-title">Rutas Turísticas</h2>
              </div>
              <Link href="/rutas" className="mt-4 md:mt-0 text-bosque-600 hover:text-bosque-700 font-medium flex items-center gap-1">
                Ver todas las rutas
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(rutas as Ruta[]).map((r) => (
                <RutaCard
                  key={r.id}
                  nombre={r.nombre}
                  slug={r.slug}
                  duracion={r.duracion || undefined}
                  dificultad={r.dificultad as 'baja' | 'media' | 'alta' | undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Eventos */}
      {eventos.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="text-terracota-600 font-semibold text-sm uppercase tracking-wider mb-2">
                  Agenda cultural
                </p>
                <h2 className="section-title">Próximos Eventos</h2>
              </div>
              <Link href="/eventos" className="mt-4 md:mt-0 text-terracota-600 hover:text-terracota-700 font-medium flex items-center gap-1">
                Ver agenda completa
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(eventos as Evento[]).map((e) => (
                <EventoCard
                  key={e.id}
                  nombre={e.nombre}
                  slug={e.slug}
                  tipo={e.tipo || undefined}
                  fechaInicio={e.fechaInicio}
                  lugar={e.lugar || undefined}
                  organizador={e.organizador || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categorías CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">Explora por Categoría</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Ocaña ofrece experiencias únicas en turismo religioso, histórico, natural y cultural
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/atractivos?cat=turismo-religioso', emoji: '⛪', label: 'Turismo Religioso', color: 'from-purple-500 to-purple-700' },
              { href: '/atractivos?cat=turismo-historico', emoji: '🏛️', label: 'Turismo Histórico', color: 'from-amber-500 to-amber-700' },
              { href: '/atractivos?cat=turismo-naturaleza', emoji: '🌿', label: 'Naturaleza', color: 'from-green-500 to-green-700' },
              { href: '/atractivos?cat=gastronomia', emoji: '🍽️', label: 'Gastronomía', color: 'from-red-500 to-red-700' },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href}
                className={`bg-gradient-to-br ${cat.color} text-white rounded-xl p-6 text-center card-hover`}
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <div className="font-display font-semibold text-lg">{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-terracota-50 border-t border-terracota-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-800 mb-4">
            ¿Planeas visitar Ocaña?
          </h2>
          <p className="text-gray-600 mb-8">
            Consulta el directorio de alojamientos, restaurantes y servicios turísticos disponibles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/directorio" className="btn-primary">Ver Directorio Turístico</Link>
            <Link href="/contacto" className="btn-secondary">Contactar Secretaría de Turismo</Link>
          </div>
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
    { nombre: 'Gastronomía Ocañera', slug: 'gastronomia-ocanera-patrimonio-inmaterial', categorias: ['gastronomia'], puntaje: 0 },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fallback.map((a) => (
        <AtractivoCard key={a.slug} {...a} puntaje={a.puntaje || undefined} />
      ))}
    </div>
  )
}

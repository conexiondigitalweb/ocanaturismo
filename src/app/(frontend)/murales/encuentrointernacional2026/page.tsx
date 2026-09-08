import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const BASE = '/murales/encuentro-2026'

const TITLE = 'Ocaña Explora: Murales que Cuentan'
const SHARE_DESCRIPTION =
  'Segundo Encuentro Internacional de Muralismo Ocaña 2026 — Murales al Barrio. Descubre la historia detrás del mural del Barrio Llano Chávez.'

export const metadata: Metadata = {
  title: `${TITLE} — Encuentro Internacional de Muralismo 2026`,
  description:
    'Segundo Encuentro Internacional de Muralismo Ocaña 2026. Murales al Barrio: arte urbano para preservar la memoria, fortalecer la identidad y rescatar el patrimonio histórico y cultural de Ocaña.',
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: '/murales/encuentrointernacional2026',
    siteName: 'OcanaTurismo',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: `${BASE}/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: 'Mural terminado del Barrio Llano Chávez, Encuentro Internacional de Muralismo Ocaña 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: [`${BASE}/og-cover.jpg`],
  },
}

const objetivos = [
  'Recuperar y embellecer espacios públicos y fachadas de la ciudad.',
  'Rescatar y divulgar la memoria histórica y cultural de Ocaña.',
  'Fortalecer el sentido de pertenencia de las comunidades.',
  'Utilizar el muralismo como herramienta de educación y transformación social.',
  'Promover el intercambio cultural entre artistas locales, nacionales e internacionales.',
  'Vincular a niños, jóvenes, instituciones educativas, artistas y comunidad en procesos culturales.',
  'Convertir los murales en atractivos para el turismo cultural y urbano.',
]

const jornadasEstudiantes = [
  {
    fecha: 'Miércoles 26 de agosto · 10:00 a. m.',
    lugar: 'Institución Educativa Carlos Hernández Yaruro',
    sublugar: 'Corregimiento de La Ermita',
    tema: '"El arte que nace del campo y protege nuestras tradiciones"',
    puntos: [
      'La naturaleza como fuente de inspiración artística',
      'La conservación de tradiciones rurales',
      'Las abejas y apiarios como patrimonio ambiental',
      'El muralismo como herramienta de identidad comunitaria',
      'Taller creativo de dibujo sobre el futuro del territorio',
    ],
    imagenes: [
      { src: '14-encuentro-ermita-cercano.jpeg', alt: 'Estudiantes de la Institución Educativa Carlos Hernández Yaruro en la jornada de muralismo' },
      { src: '15-encuentro-ermita-auditorio.jpeg', alt: 'Auditorio de la Institución Educativa Carlos Hernández Yaruro durante el encuentro' },
    ],
  },
  {
    fecha: 'Jueves 27 de agosto · 10:00 a. m.',
    lugar: 'Colegio Artístico Rafael Contreras Navarro',
    sublugar: null,
    tema: '"El muralismo como herramienta para contar la historia de un pueblo"',
    puntos: [
      'Historia del muralismo',
      'El arte como constructor de identidad',
      'La investigación como punto de partida para un mural',
      'El proceso creativo del boceto a la obra',
      'Experiencias de muralismo en México',
      'Taller de dibujo inspirado en el patrimonio de Ocaña',
    ],
    imagenes: [
      { src: '12-encuentro-artistico-presentacion.jpeg', alt: 'Presentación en el Colegio Artístico Rafael Contreras Navarro' },
      { src: '13-encuentro-artistico-audiencia.jpeg', alt: 'Estudiantes del Colegio Artístico Rafael Contreras Navarro durante la charla' },
    ],
  },
]

const procesoGaleria = [
  { src: '02-proceso-boceto-fachada.jpeg', alt: 'Boceto del mural sobre la fachada antes de pintar' },
  { src: '03-proceso-detalle-abeja-1.jpeg', alt: 'Detalle en proceso de una abeja del mural' },
  { src: '04-proceso-detalle-abeja-2.jpeg', alt: 'Detalle en proceso de una abeja del mural' },
  { src: '05-proceso-flor-abejas.jpeg', alt: 'Detalle en proceso de flores y abejas del mural' },
  { src: '06-proceso-artistas-pintando.jpeg', alt: 'Artistas muralistas pintando la fachada' },
  { src: '07-proceso-retrato-letras.jpeg', alt: 'Detalle en proceso de retrato y letras del mural' },
  { src: '08-proceso-artistas-accion-1.jpeg', alt: 'Artistas muralistas trabajando en la obra' },
  { src: '09-proceso-artistas-accion-2.jpeg', alt: 'Artistas muralistas trabajando en la obra' },
]

export default function EncuentroMuralismo2026Page() {
  return (
    <div className="bg-[#fbf6ee]">
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={`${BASE}/20-resultado-mural-terminado-1.jpeg`}
          alt="Mural terminado del Barrio Llano Chávez, Encuentro Internacional de Muralismo Ocaña 2026"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-turquesa-900/40 via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-end max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <p className="text-dorado-300 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Segundo Encuentro Internacional de Muralismo · Ocaña 2026
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white leading-tight mb-4">
            Ocaña Explora:
            <br />
            <span className="text-turquesa-300">Murales que Cuentan</span>
          </h1>
          <p className="text-white/90 text-lg sm:text-xl font-display italic">
            Murales al Barrio — Un reencuentro con la historia.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
          <p>
            El Programa <strong className="text-terracota-700">Murales al Barrio</strong>, liderado por{' '}
            <strong>Alexander Motta Pallares</strong>, artista muralista, y{' '}
            <strong>Mario Castellanos Chinchilla</strong>, gestor cultural del municipio de Ocaña, presenta
            el Segundo Encuentro Internacional de Muralismo Ocaña 2026, una iniciativa que convierte el
            arte urbano en una herramienta para preservar la memoria, fortalecer la identidad y rescatar
            el patrimonio histórico y cultural de nuestra ciudad.
          </p>
          <p>
            Este encuentro reúne el talento, la creatividad y las experiencias de artistas de diferentes
            territorios, generando espacios de intercambio con estudiantes, artistas, cultores, vigías del
            patrimonio, instituciones y comunidad.
          </p>
        </div>
      </section>

      {/* ¿CÓMO NACIÓ? */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={`${BASE}/01-antes-casa-original.jpeg`}
              alt="Fachada del Barrio Llano Chávez antes de la intervención del mural"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-terracota-800 mb-6">
              ¿Cómo nació Murales al Barrio?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Murales al Barrio nació de una necesidad: recuperar espacios públicos que se encontraban
                deteriorados o habían perdido su valor, transformar fachadas, mejorar el entorno de lugares
                reconocidos y patrimoniales y, sobre todo, generar sentido de pertenencia por Ocaña.
              </p>
              <p>
                A través del muralismo se encontró una manera de contar nuestras historias, recuperar
                personajes, tradiciones, costumbres y lugares que hacen parte de nuestra memoria colectiva.
              </p>
              <p>
                Cada mural se convierte así en una ventana hacia el pasado y, al mismo tiempo, en una
                oportunidad para construir identidad hacia el futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OBJETIVOS */}
      <section className="bg-bosque-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10 text-dorado-300">Objetivos</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {objetivos.map((obj) => (
              <li key={obj} className="flex gap-3 text-bosque-50 leading-relaxed">
                <svg className="w-5 h-5 text-turquesa-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border-t-4 border-terracota-500 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-terracota-700 mb-4">Misión</h3>
            <p className="text-gray-600 leading-relaxed">
              Murales al Barrio tiene como misión rescatar, preservar y divulgar la memoria histórica y
              cultural de Ocaña mediante el arte mural, transformando espacios urbanos en escenarios de
              encuentro, educación, identidad, participación comunitaria y turismo cultural.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border-t-4 border-turquesa-500 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-turquesa-700 mb-4">Visión</h3>
            <p className="text-gray-600 leading-relaxed">
              Consolidar a Ocaña como un referente regional y nacional del muralismo cultural y patrimonial,
              donde las calles, barrios y fachadas se conviertan en espacios vivos para contar historias y
              donde el arte contribuya al desarrollo cultural y turístico del municipio.
            </p>
          </div>
        </div>
      </section>

      {/* SEGUNDO ENCUENTRO — hero de sección con afiche */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracota-50 via-dorado-50 to-turquesa-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
              <Image
                src={`${BASE}/11-pieza-promocional-afiche.jpeg`}
                alt="Afiche promocional del Segundo Encuentro Internacional de Muralismo Ocaña 2026"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-3 order-first lg:order-none">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                Segundo Encuentro Internacional de Muralismo
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  En esta segunda edición, Ocaña recibe artistas invitados de gran trayectoria y
                  sensibilidad artística: <strong>John Ojeda</strong>, artista muralista del municipio de
                  Chinácota, Norte de Santander, y <strong>América Álvarez Sepúlveda</strong>, artista
                  muralista proveniente de México.
                </p>
                <p>
                  Su participación permitió compartir experiencias, conocimientos y técnicas con la
                  comunidad ocañera, especialmente con estudiantes y jóvenes que tuvieron la oportunidad de
                  conocer de cerca el muralismo como una expresión artística, cultural y también como una
                  posibilidad profesional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENCUENTROS CON ESTUDIANTES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-turquesa-600 text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Formación y comunidad
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-800">
            Encuentros con estudiantes
          </h2>
        </div>

        <div className="space-y-12">
          {jornadasEstudiantes.map((jornada) => (
            <div
              key={jornada.lugar}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                {jornada.imagenes.map((img) => (
                  <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={`${BASE}/${img.src}`}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3">
                <span className="inline-block bg-terracota-100 text-terracota-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {jornada.fecha}
                </span>
                <h3 className="font-display text-xl font-bold text-gray-800">{jornada.lugar}</h3>
                {jornada.sublugar && <p className="text-sm text-gray-500 mb-2">{jornada.sublugar}</p>}
                <p className="text-terracota-700 italic mb-4">{jornada.tema}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {jornada.puntos.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-turquesa-500 mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONVERSATORIO MUSEO */}
      <section className="bg-terracota-900 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-dorado-300">
                Conversatorio en el Museo de la Gran Convención
              </h2>
              <p className="text-terracota-50 leading-relaxed">
                Como parte de la programación, se realizó un conversatorio en el Museo de la Gran
                Convención sobre cómo, a través de la historia, el arte y el muralismo han sido una
                herramienta de reconocimiento cultural y de creación de identidad — precisamente la idea
                detrás de <em>&ldquo;Ocaña Explora: Murales que Cuentan&rdquo;</em>. Participó{' '}
                <strong>América Álvarez Sepúlveda</strong> junto a representantes institucionales.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={`${BASE}/16-charla-museo-1.jpeg`}
                  alt="Conversatorio en el Museo de la Gran Convención"
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-6">
                <Image
                  src={`${BASE}/17-charla-museo-2.jpeg`}
                  alt="Conversatorio en el Museo de la Gran Convención"
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICULACIÓN INSTITUCIONAL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          Una gran articulación por la cultura
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl mx-auto text-center mb-10">
          <p>
            Este encuentro fue posible gracias a la articulación con la Alcaldía Municipal de Ocaña,{' '}
            <strong>Emiro Cañizares Plata</strong>, alcalde, a través de la Secretaría de Educación, Cultura
            y Turismo, <strong>Doiler Sanjuán</strong>, secretario, que respaldaron esta iniciativa cultural.
          </p>
          <p>
            También se contó con la participación y acompañamiento de: instituciones educativas como
            Carlos Hernández Yaruro del corregimiento de la Ermita, del Artístico Rafael Contreras Navarro,
            Academia de Historia de Ocaña, vigías del patrimonio, cultores, artistas, comunidad, la{' '}
            <strong>familia Trillos Mora</strong> y medios de comunicación.
          </p>
          <p className="italic text-terracota-700">
            Esta unión demuestra que cuando las instituciones y la comunidad trabajan juntas, la cultura
            puede convertirse en una verdadera herramienta de transformación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden sm:col-span-1">
            <Image
              src={`${BASE}/10-cobertura-prensa.jpeg`}
              alt="Cobertura de prensa del Encuentro Internacional de Muralismo"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={`${BASE}/18-reconocimiento-america-alvarez.jpeg`}
              alt="Reconocimiento a la artista América Álvarez Sepúlveda"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={`${BASE}/19-reconocimiento-john-ojeda.jpeg`}
              alt="Reconocimiento al artista John Ojeda"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* EL MURAL DEL BARRIO LLANO CHÁVEZ + EL PROCESO */}
      <section className="bg-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-turquesa-300 text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              La obra
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              El mural del Barrio Llano Chávez
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-left sm:text-center">
              <p>
                Uno de los momentos centrales del encuentro fue la creación del mural en la fachada de la
                familia Trillos Mora, en el barrio Llano Echávez. Esta obra nace como un homenaje a{' '}
                <strong className="text-white">don Saúl Trillos</strong>, a su familia y a su legado
                relacionado con la apicultura y los apiarios, convirtiendo una historia familiar en parte
                de la memoria cultural de Ocaña.
              </p>
              <p>
                El mural también integra elementos representativos del territorio, como el árbol de Ubito,
                la naturaleza, las abejas, los apiarios, la fachada de la capilla del barrio Llano Echávez,
                además de referencias a espacios y símbolos que hacen parte de la identidad de esta
                comunidad.
              </p>
              <p>
                La obra busca que quienes transiten por este lugar no solamente observen una pintura, sino
                que puedan conocer y comprender una parte de la historia de Ocaña.
              </p>
            </div>
          </div>

          {/* Resultado final */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-14 shadow-2xl">
            <Image
              src={`${BASE}/21-resultado-mural-terminado-2.jpeg`}
              alt="Mural terminado del Barrio Llano Chávez, homenaje a don Saúl Trillos"
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
          </div>

          {/* El proceso */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-6 text-dorado-300">El proceso</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed text-left sm:text-center">
              <p>
                El muralismo no comenzó con un pincel sobre la pared. Detrás de cada imagen hubo un proceso
                de investigación, diálogo, interpretación, diseño, elaboración del boceto y trabajo de
                campo. Los artistas conocieron la historia, conversaron sobre los elementos que debían
                estar representados y posteriormente llevaron esas ideas a la pared, convirtiendo la
                fachada en un espacio de memoria viva.
              </p>
              <p>
                El resultado es una obra construida desde el arte, pero también desde la historia, la
                familia y la comunidad.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {procesoGaleria.map((img) => (
              <div key={img.src} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={`${BASE}/${img.src}`}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRÉDITOS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
          Con el talento y la memoria de
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
          {[
            { nombre: 'Alexander Motta Pallares', rol: 'Artista muralista, líder de Murales al Barrio' },
            { nombre: 'Mario Castellanos Chinchilla', rol: 'Gestor cultural municipal' },
            { nombre: 'John Ojeda', rol: 'Artista muralista invitado · Chinácota' },
            { nombre: 'América Álvarez Sepúlveda', rol: 'Artista muralista invitada · México' },
            { nombre: 'Familia Trillos Mora', rol: 'Homenaje a don Saúl Trillos' },
          ].map((c) => (
            <div key={c.nombre} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
              <p className="font-display font-semibold text-gray-800 text-sm sm:text-base">{c.nombre}</p>
              <p className="text-xs text-gray-500 mt-1">{c.rol}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OCAÑA EXPLORA: MURALES QUE CUENTAN — cierre */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <Image
          src={`${BASE}/22-resultado-foto-grupal-familia.jpeg`}
          alt="Foto grupal de artistas, familia Trillos Mora y comunidad al cierre del encuentro"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-turquesa-900/95 via-turquesa-900/80 to-terracota-900/70" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-dorado-300">
            Ocaña Explora: Murales que Cuentan
          </h2>
          <div className="space-y-4 text-white/90 leading-relaxed">
            <p>
              Este encuentro hace parte de una visión más amplia: convertir los murales de Ocaña en
              escenarios para conocer nuestra historia. Por eso nace la proyección de{' '}
              <em>&ldquo;Ocaña Explora: Murales que Cuentan&rdquo;</em>, una propuesta que busca crear
              recorridos turísticos urbanos que conecten los diferentes murales realizados por Murales al
              Barrio y otros colectivos.
            </p>
            <p>
              La intención es que propios y visitantes puedan caminar por Ocaña, observar sus obras,
              conocer a sus personajes, descubrir sus historias y entender que detrás de cada mural existe
              una memoria que merece ser preservada.
            </p>
            <p className="text-lg font-display italic text-dorado-200">
              Porque un mural no es solamente una pintura en una pared. Es una historia que permanece, una
              memoria que se comparte y un patrimonio que se transmite a las nuevas generaciones.
            </p>
          </div>

          <div className="mt-10">
            <Link href="/atractivos" className="btn-primary inline-block">
              Descubre más atractivos de Ocaña
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Información Institucional',
  description: 'Secretaría de Educación, Cultura y Turismo de Ocaña. Plan de Desarrollo Turístico 2023-2034 y Consejo Municipal de Turismo.',
}

const lineasEstrategicas = [
  { num: '1', titulo: 'Desarrollo de productos turísticos', desc: 'Creación y fortalecimiento de productos turísticos diferenciados con base en el patrimonio cultural, religioso y natural.' },
  { num: '2', titulo: 'Marketing turístico', desc: 'Estrategias de posicionamiento y promoción del destino Ocaña a nivel regional, nacional e internacional.' },
  { num: '3', titulo: 'Recursos Humanos y Capacitación', desc: 'Formación y cualificación del talento humano vinculado al sector turístico municipal.' },
  { num: '4', titulo: 'Infraestructura turística', desc: 'Mejoramiento y adecuación de la infraestructura para la prestación de servicios turísticos de calidad.' },
  { num: '5', titulo: 'Fortalecimiento institucional', desc: 'Consolidación del marco normativo, institucional y financiero del turismo en el municipio.' },
]

const consejo = [
  'Sector hotelero',
  'Restaurantes y bares',
  'Agencias de viajes',
  'Artesanos',
  'Transporte terrestre',
  'UFPSO (Universidad Francisco de Paula Santander Ocaña)',
  'Policía de Turismo',
]

const superestructura = [
  { nombre: 'SENA', desc: 'Formación técnica en turismo' },
  { nombre: 'Cámara de Comercio de Ocaña', desc: 'Registro y apoyo empresarial' },
  { nombre: 'UFPSO', desc: 'Universidad Francisco de Paula Santander Ocaña' },
  { nombre: 'CORPONOR', desc: 'Corporación Autónoma Regional de Norte de Santander' },
  { nombre: 'COMFANORTE', desc: 'Carrera en Administración Turística y Hotelera' },
  { nombre: 'Museo de la Gran Convención', desc: 'Red Nacional de Museos' },
  { nombre: 'Museo Antón García de Bonilla', desc: 'Historia y patrimonio de Ocaña' },
]

export default function InstitucionalPage() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-bosque-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Información Institucional</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Conoce la estructura institucional del turismo en Ocaña y el marco del
            Plan de Desarrollo Turístico 2023-2034.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Secretaría */}
        <section>
          <h2 className="section-title mb-6">Secretaría de Educación, Cultura y Turismo</h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Contacto</h3>
                <address className="not-italic text-gray-600 space-y-2 text-sm">
                  <p><strong>Secretario:</strong> Doiler Alfonso Sanjuán Sánchez</p>
                  <p><strong>Coordinación Cultura y Turismo:</strong> Jazmine Beatriz Ibáñez Lozano</p>
                  <p><strong>Dependencia:</strong> Secretaría de Educación, Cultura y Turismo</p>
                  <p><strong>Ubicación:</strong> Complejo Histórico de la Gran Convención</p>
                  <p>Calle 11 con Carrera 9, Barrio San Francisco</p>
                  <p>Ocaña, Norte de Santander</p>
                </address>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Misión institucional</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  La Secretaría de Educación, Cultura y Turismo es la dependencia responsable del
                  fomento, regulación y promoción del turismo en el municipio de Ocaña, en
                  articulación con los planes de desarrollo municipal y las políticas nacionales
                  de turismo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plan turístico */}
        <section>
          <h2 className="section-title mb-3">Plan de Desarrollo Turístico Convencional 2023-2034</h2>
          <p className="text-gray-600 mb-8">
            Hoja de ruta oficial del turismo en Ocaña, formulado para proyectar el municipio como
            el principal destino turístico del departamento Norte de Santander en el horizonte 2034.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: 'Alcalde vigente', valor: 'Emiro Cañizares Plata' },
              { label: 'Horizonte', valor: '2023-2034' },
            ].map((d) => (
              <div key={d.label} className="bg-terracota-50 rounded-xl p-4 border border-terracota-100">
                <div className="text-xs font-semibold text-terracota-600 uppercase tracking-wider mb-1">{d.label}</div>
                <div className="text-gray-800 font-medium text-sm">{d.valor}</div>
              </div>
            ))}
          </div>

          <div className="bg-bosque-900 text-white rounded-2xl p-6 mb-8">
            <h3 className="font-display font-semibold text-lg mb-3 text-dorado-300">Visión 2034</h3>
            <blockquote className="italic text-bosque-100 leading-relaxed text-sm">
              "Para el año 2034, Ocaña se consolidará como principal destino turístico de connotación
              histórica, religiosa y natural del departamento Norte de Santander, asociado a la fortaleza
              de su clima y amabilidad de su gente; con reconocimiento nacional e internacional por el
              aprovechamiento responsable de sus recursos naturales y culturales."
            </blockquote>
          </div>

          <h3 className="font-display text-xl font-bold text-gray-800 mb-4">5 Líneas Estratégicas</h3>
          <div className="space-y-3">
            {lineasEstrategicas.map((l) => (
              <div key={l.num} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-terracota-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                  {l.num}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{l.titulo}</h4>
                  <p className="text-sm text-gray-600 mt-1">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: '93', label: 'Atractivos inventariados' },
              { num: '72', label: 'Patrimonio Cultural Material' },
              { num: '14', label: 'Festividades y eventos' },
              { num: '3', label: 'Patrimonio Cultural Inmaterial' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-display font-bold text-terracota-600">{s.num}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejo de turismo */}
        <section>
          <h2 className="section-title mb-4">Consejo Municipal de Turismo</h2>
          <p className="text-gray-600 mb-6">
            Organismo encargado de impulsar el desarrollo, promoción y competitividad del sector turístico.
            Integrado por representantes de:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {consejo.map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                <svg className="w-4 h-4 text-terracota-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Superestructura */}
        <section>
          <h2 className="section-title mb-6">Superestructura Turística</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {superestructura.map((s) => (
              <div key={s.nombre} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 text-sm">{s.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA contacto */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
          <h3 className="font-display text-2xl font-bold text-gray-800 mb-3">¿Tienes preguntas?</h3>
          <p className="text-gray-600 mb-6">Comunícate con la Secretaría de Educación, Cultura y Turismo</p>
          <Link href="/contacto" className="btn-primary inline-block">Ir a Contacto</Link>
        </div>
      </div>
    </>
  )
}

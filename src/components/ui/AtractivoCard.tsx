import Link from 'next/link'
import Image from 'next/image'

const categoryConfig: Record<string, { label: string; color: string }> = {
  'turismo-religioso': { label: 'Religioso', color: 'bg-purple-100 text-purple-800' },
  'turismo-historico': { label: 'Histórico', color: 'bg-amber-100 text-amber-800' },
  'turismo-naturaleza': { label: 'Naturaleza', color: 'bg-green-100 text-green-800' },
  'cultura-patrimonio': { label: 'Patrimonio', color: 'bg-blue-100 text-blue-800' },
  gastronomia: { label: 'Gastronomía', color: 'bg-red-100 text-red-800' },
}

interface AtractivoCardProps {
  nombre: string
  slug: string
  categorias: string[]
  descripcionCorta?: string
  imagen?: string
  puntaje?: number
}

export default function AtractivoCard({
  nombre,
  slug,
  categorias,
  descripcionCorta,
  imagen,
  puntaje,
}: AtractivoCardProps) {
  const cats = categorias.map(
    (categoria) => categoryConfig[categoria] || { label: categoria, color: 'bg-gray-100 text-gray-800' },
  )

  return (
    <Link href={`/atractivos/${slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover h-full flex flex-col">
        {/* Imagen */}
        <div className="relative h-52 bg-gradient-to-br from-terracota-200 to-dorado-200 overflow-hidden">
          {imagen ? (
            <Image
              src={imagen}
              alt={nombre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-terracota-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {puntaje && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-terracota-700">
              ★ {puntaje}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1 mb-2">
            {cats.map((cat) => (
              <span key={cat.label} className={`category-badge ${cat.color}`}>
                {cat.label}
              </span>
            ))}
          </div>
          <h3 className="font-display font-semibold text-gray-800 text-lg leading-tight group-hover:text-terracota-600 transition-colors">
            {nombre}
          </h3>
          {descripcionCorta && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1">{descripcionCorta}</p>
          )}
          <span className="mt-3 text-terracota-600 text-sm font-medium flex items-center gap-1">
            Ver más
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CategoryBadge from '@/components/ui/CategoryBadge'
import AtractivoPlaceholder from '@/components/ui/AtractivoPlaceholder'
import { cn } from '@/lib/utils'

interface AtractivoCardProps {
  nombre: string
  slug: string
  categorias: string[]
  descripcionCorta?: string
  imagen?: string
  puntaje?: number
  /** Tarjeta grande dentro de un grid tipo bento (Home). */
  featured?: boolean
  /** sizes de next/image; por defecto asume grid estándar de 3 columnas. */
  sizes?: string
}

export default function AtractivoCard({
  nombre,
  slug,
  categorias,
  descripcionCorta,
  imagen,
  puntaje,
  featured = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: AtractivoCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="h-full">
      <Link href={`/atractivos/${slug}`} className="group block h-full">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
          <div
            className={cn(
              'relative overflow-hidden',
              featured ? 'h-64 sm:h-full sm:min-h-[20rem]' : 'h-52',
            )}
          >
            {imagen ? (
              <Image
                src={imagen}
                alt={nombre}
                fill
                sizes={sizes}
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="group-hover:scale-110 transition-transform duration-700 ease-out absolute inset-0">
                <AtractivoPlaceholder categoria={categorias[0]} iconSize={featured ? 64 : 44} />
              </div>
            )}
            {featured ? (
              // Scrim permanente: el texto va siempre sobre la imagen en el modo
              // destacado, así que necesita contraste aunque no haya hover (y
              // aunque no haya foto real y el fondo sea el placeholder claro).
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            {puntaje && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-terracota-700 shadow-sm">
                ★ {puntaje}
              </div>
            )}

            {/* En modo featured el texto vive sobre la imagen para un tratamiento más editorial */}
            {featured && (
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {categorias.map((cat) => (
                    <CategoryBadge key={cat} categoria={cat} className="!bg-white/20 !text-white backdrop-blur-sm" />
                  ))}
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight drop-shadow-sm">
                  {nombre}
                </h3>
                {descripcionCorta && (
                  <p className="text-white/85 text-sm mt-2 line-clamp-2 max-w-md">{descripcionCorta}</p>
                )}
              </div>
            )}
          </div>

          {!featured && (
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {categorias.map((cat) => (
                  <CategoryBadge key={cat} categoria={cat} />
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
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

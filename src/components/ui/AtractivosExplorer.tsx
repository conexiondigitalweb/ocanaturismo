'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import AtractivoCard from '@/components/ui/AtractivoCard'
import { categoriasList, getCategoriaConfig } from '@/lib/categorias'
import { cn } from '@/lib/utils'

interface AtractivoItem {
  id: string
  nombre: string
  slug: string
  categorias: string[]
  puntaje?: number
  imagen?: string
}

const filtros = [{ value: '', label: 'Todos' }, ...categoriasList]

export default function AtractivosExplorer({
  atractivos,
  initialCat,
}: {
  atractivos: AtractivoItem[]
  initialCat: string
}) {
  const router = useRouter()
  const [cat, setCat] = useState(initialCat)

  const filtered = useMemo(
    () => (cat ? atractivos.filter((a) => a.categorias.includes(cat)) : atractivos),
    [atractivos, cat],
  )

  function selectCat(value: string) {
    setCat(value)
    router.replace(value ? `/atractivos?cat=${value}` : '/atractivos', { scroll: false })
  }

  return (
    <div>
      <LayoutGroup id="atractivos-filtros">
        <div className="flex flex-wrap gap-3 mb-10">
          {filtros.map((f) => {
            const active = cat === f.value
            return (
              <button
                key={f.value || 'todos'}
                type="button"
                onClick={() => selectCat(f.value)}
                className={cn(
                  'relative px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  active ? 'text-white' : 'text-gray-700 hover:text-terracota-700',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filtro-activo"
                    className="absolute inset-0 bg-terracota-600 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {!active && <span className="absolute inset-0 bg-gray-100 rounded-full" />}
                <span className="relative z-10">{f.label}</span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>

      <p className="text-gray-500 text-sm mb-6">
        {filtered.length} {filtered.length === 1 ? 'atractivo encontrado' : 'atractivos encontrados'}
      </p>

      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <AtractivoCard
                  nombre={a.nombre}
                  slug={a.slug}
                  categorias={a.categorias}
                  puntaje={a.puntaje}
                  imagen={a.imagen}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          {(() => {
            const Icon = getCategoriaConfig(cat).icon
            return <Icon className="mx-auto mb-4 opacity-40" size={56} strokeWidth={1} />
          })()}
          <p className="text-lg font-medium">No hay atractivos en esta categoría todavía</p>
        </div>
      )}
    </div>
  )
}

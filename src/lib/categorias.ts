import { Church, Landmark, Trees, Gem, UtensilsCrossed, type LucideIcon } from 'lucide-react'

export type CategoriaValue =
  | 'turismo-religioso'
  | 'turismo-historico'
  | 'turismo-naturaleza'
  | 'cultura-patrimonio'
  | 'gastronomia'

interface CategoriaConfig {
  label: string
  icon: LucideIcon
  badge: 'dorado' | 'terracota' | 'bosque' | 'turquesa' | 'amber' | 'neutral'
  dot: string
  /** Gradiente usado como fondo cuando el atractivo no tiene imagen. */
  gradient: string
  iconColor: string
}

export const categoriasConfig: Record<CategoriaValue, CategoriaConfig> = {
  'turismo-religioso': {
    label: 'Religioso',
    icon: Church,
    badge: 'dorado',
    dot: 'bg-dorado-500',
    gradient: 'from-dorado-200 via-dorado-300 to-dorado-500',
    iconColor: 'text-dorado-700/70',
  },
  'turismo-historico': {
    label: 'Histórico',
    icon: Landmark,
    badge: 'terracota',
    dot: 'bg-terracota-500',
    gradient: 'from-terracota-200 via-terracota-300 to-terracota-500',
    iconColor: 'text-terracota-700/70',
  },
  'turismo-naturaleza': {
    label: 'Naturaleza',
    icon: Trees,
    badge: 'bosque',
    dot: 'bg-bosque-500',
    gradient: 'from-bosque-200 via-bosque-300 to-bosque-500',
    iconColor: 'text-bosque-700/70',
  },
  'cultura-patrimonio': {
    label: 'Patrimonio',
    icon: Gem,
    badge: 'turquesa',
    dot: 'bg-turquesa-500',
    gradient: 'from-turquesa-200 via-turquesa-300 to-turquesa-500',
    iconColor: 'text-turquesa-700/70',
  },
  gastronomia: {
    label: 'Gastronomía',
    icon: UtensilsCrossed,
    badge: 'amber',
    dot: 'bg-amber-500',
    gradient: 'from-amber-200 via-amber-300 to-amber-500',
    iconColor: 'text-amber-800/70',
  },
}

export const categoriasList: { value: CategoriaValue; label: string }[] = (
  Object.entries(categoriasConfig) as [CategoriaValue, CategoriaConfig][]
).map(([value, c]) => ({ value, label: c.label }))

export function getCategoriaConfig(categoria: string): CategoriaConfig {
  return (
    categoriasConfig[categoria as CategoriaValue] || {
      label: categoria,
      icon: Gem,
      badge: 'neutral',
      dot: 'bg-gray-400',
      gradient: 'from-gray-200 via-gray-300 to-gray-400',
      iconColor: 'text-gray-600/70',
    }
  )
}

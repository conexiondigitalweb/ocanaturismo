import Badge from '@/components/ui/Badge'
import { getCategoriaConfig } from '@/lib/categorias'

export default function CategoryBadge({ categoria, className }: { categoria: string; className?: string }) {
  const config = getCategoriaConfig(categoria)
  return (
    <Badge variant={config.badge} dotClassName={config.dot} className={className}>
      {config.label}
    </Badge>
  )
}

import { getCategoriaConfig } from '@/lib/categorias'

/** Fondo de reemplazo cuando el atractivo aún no tiene fotografía oficial. */
export default function AtractivoPlaceholder({
  categoria,
  iconSize = 48,
}: {
  categoria?: string
  iconSize?: number
}) {
  const config = getCategoriaConfig(categoria || 'cultura-patrimonio')
  const Icon = config.icon
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.523 4.477-10 10-10v2c-4.418 0-8 3.582-8 8h-2zm-10 0c0-5.523-4.477-10-10-10v2c4.418 0 8 3.582 8 8h2z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <Icon className={config.iconColor} size={iconSize} strokeWidth={1.25} />
    </div>
  )
}

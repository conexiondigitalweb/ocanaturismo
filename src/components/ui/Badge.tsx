import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-wider px-3 py-1',
  {
    variants: {
      variant: {
        terracota: 'bg-terracota-50 text-terracota-800',
        dorado: 'bg-dorado-50 text-dorado-900',
        bosque: 'bg-bosque-50 text-bosque-800',
        turquesa: 'bg-turquesa-50 text-turquesa-900',
        amber: 'bg-amber-50 text-amber-900',
        neutral: 'bg-gray-100 text-gray-700',
        solid: 'bg-terracota-600 text-white',
        glass: 'bg-white/20 backdrop-blur-sm text-white',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dotClassName?: string
}

export default function Badge({ className, variant, dotClassName, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dotClassName && <span className={cn('w-1.5 h-1.5 rounded-full', dotClassName)} />}
      {children}
    </span>
  )
}

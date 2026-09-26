import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg px-6 py-3 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-terracota-600 hover:bg-terracota-700 text-white',
        secondary: 'bg-bosque-700 hover:bg-bosque-800 text-white',
        outline: 'border-2 border-white text-white hover:bg-white hover:text-terracota-700',
        ghost: 'text-terracota-700 hover:bg-terracota-50',
      },
      size: {
        default: 'text-base',
        sm: 'text-sm px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  href: string
  className?: string
  children: React.ReactNode
}

export function ButtonLink({ href, variant, size, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </Link>
  )
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

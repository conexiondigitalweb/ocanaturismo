import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'OcanaTurismo — Ocaña, Potencia Regional',
    template: '%s | OcanaTurismo',
  },
  description:
    'Sitio oficial de turismo de Ocaña, Norte de Santander. Descubre la ciudad histórica, religiosa y natural, cuna de la Gran Convención de 1828.',
  keywords: ['Ocaña', 'turismo', 'Norte de Santander', 'Colombia', 'Torcoroma', 'Gran Convención'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'OcanaTurismo',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

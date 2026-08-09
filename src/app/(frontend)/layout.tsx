import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Root layout del grupo de rutas (frontend). Payload usa su propio root
// layout independiente en (payload)/admin/layout.tsx — por eso globals.css
// (y el Preflight de Tailwind) solo se cargan aquí, nunca en /admin. Antes
// vivían en un layout.tsx compartido en la raíz de app/, lo que filtraba el
// reset de Tailwind al panel de admin y rompía el estilo del botón de login
// (Tailwind resetea `button { padding: 0; background-color: transparent }`
// sin @layer, así que le gana en cascada a los estilos de Payload, que sí
// están en @layer payload-default/payload).
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

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

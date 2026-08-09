'use client'

import React from 'react'
import { useTheme } from '@payloadcms/ui'

/**
 * Logo institucional del panel de admin (admin.components.graphics.Logo en
 * payload.config.ts). Cambia según el tema activo de Payload (claro/oscuro):
 * - Oscuro: versión blanca (contrasta sobre fondo oscuro).
 * - Claro: versión a color (contrasta sobre fondo blanco).
 */
export const Logo: React.FC = () => {
  const { theme } = useTheme()
  const src =
    theme === 'dark'
      ? '/branding/Logo_Blanco_Alcaldia_Mesa_de_trabajo_1_copia.png'
      : '/branding/logo-fullcolor-institucional-horizontal.png'

  return (
    // eslint-disable-next-line @next/next/no-img-element -- logo estático servido desde /public, no necesita next/image aquí
    <img
      alt="Alcaldía de Ocaña"
      src={src}
      style={{ height: '42px', width: 'auto', maxWidth: '100%' }}
    />
  )
}

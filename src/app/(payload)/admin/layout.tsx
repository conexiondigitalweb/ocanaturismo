import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './importMap'
import { serverAction } from './serverActions'
import type { SanitizedConfig } from 'payload'
import React from 'react'

const configPromise = import('@payload-config').then(
  (m) => m.default,
) as Promise<SanitizedConfig>

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverAction}
    >
      {children}
    </RootLayout>
  )
}

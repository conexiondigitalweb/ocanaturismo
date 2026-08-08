import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['monaco-editor', '@monaco-editor/react'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Vercel Blob (colección Medios)
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // @payloadcms/storage-vercel-blob siempre registra su client upload
      // handler en el importMap del admin (aunque no usemos clientUploads).
      // Ese handler importa un barrel de @payloadcms/plugin-cloud-storage
      // que arrastra utilidades server-only (undici, vía payload/uploads/
      // getExternalFile) al bundle del navegador y rompe el build de
      // producción con "node:buffer"/"node:console" sin manejar. undici
      // nunca se ejecuta realmente en el cliente, así que se alía a un
      // módulo vacío solo para el bundle del navegador.
      config.resolve.alias = {
        ...config.resolve.alias,
        // Corta la fuga en su origen: resolveSignedURLKey.js (server-only,
        // solo usado para clientUploads con signed URLs, que no usamos)
        // importa 'payload/internal', que arrastra el core entero de
        // Payload (fs, undici, etc.) al bundle del navegador.
        'payload/internal': false,
        undici: false,
      }
    }
    return config
  },
}

export default withPayload(nextConfig)

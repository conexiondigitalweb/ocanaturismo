import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Usuarios } from './src/collections/Usuarios'
import { Medios } from './src/collections/Medios'
import { Atractivos } from './src/collections/Atractivos'
import { Rutas } from './src/collections/Rutas'
import { Eventos } from './src/collections/Eventos'
import { Prestadores } from './src/collections/Prestadores'
import { Noticias } from './src/collections/Noticias'
import { Paginas } from './src/collections/Paginas'
import { Galerias } from './src/collections/Galerias'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    meta: {
      titleSuffix: '— OcanaTurismo Admin',
    },
  },
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es, en },
  },
  collections: [
    Usuarios,
    Medios,
    Atractivos,
    Rutas,
    Eventos,
    Prestadores,
    Noticias,
    Paginas,
    Galerias,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-cambia-esto',
  // Requerido para que Payload genere los imageSizes de Medios (recorte,
  // punto focal y las variantes thumbnail/card/hero/gallery).
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  upload: {
    limits: {
      // 15MB — ver colección Medios para el detalle de formatos aceptados.
      fileSize: 15 * 1024 * 1024,
    },
  },
  plugins: [
    // Vercel Blob evita perder los archivos subidos: el filesystem local no
    // persiste entre invocaciones serverless. Se activa solo si existe el
    // token, para no romper el desarrollo local antes de provisionar el Blob
    // Store en Vercel (Storage → Create → Blob).
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: {
                // Las imágenes se sirven directo desde el CDN de Blob
                // (*.public.blob.vercel-storage.com) en vez de proxearlas
                // por /api/media/file/... — Medios es de lectura pública,
                // no hay control de acceso que perder al saltarse el proxy.
                disablePayloadAccessControl: true,
              },
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})

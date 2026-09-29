import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'

export const Medios: CollectionConfig = {
  slug: 'media',
  upload: {
    // Miniatura usada en listados del panel admin
    adminThumbnail: 'thumbnail',
    // Habilita el editor de recorte y el selector de punto focal al subir/editar
    focalPoint: true,
    crop: true,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    imageSizes: [
      {
        // Miniatura de administración / listados densos
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        // Tarjetas de listado (AtractivoCard, RutaCard, EventoCard, directorio)
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        // Portada / banner de detalle (atractivo, ruta, evento, noticia)
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
      {
        // Hero grande sin recorte forzado — solo restringe el ancho,
        // conserva la proporción natural de la foto (vertical u horizontal).
        name: 'heroLarge',
        width: 2400,
      },
      {
        // Galerías de fotos — ya no fuerza cuadrado, conserva proporción natural
        name: 'gallery',
        width: 1200,
      },
    ],
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Imágenes del sitio (jpg, png, webp — máx. 15MB)',
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
    },
    {
      name: 'credito',
      type: 'text',
      label: 'Crédito fotográfico',
    },
  ],
}

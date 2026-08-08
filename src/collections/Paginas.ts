import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access'

export const Paginas: CollectionConfig = {
  slug: 'paginas',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'slug', 'estado'],
    description: 'Páginas estáticas del sitio',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
    },
    {
      name: 'contenido',
      type: 'richText',
      label: 'Contenido',
    },
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      defaultValue: 'borrador',
      options: [
        { label: 'Borrador', value: 'borrador' },
        { label: 'Publicado', value: 'publicado' },
      ],
    },
  ],
}

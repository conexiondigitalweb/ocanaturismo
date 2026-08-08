import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access'

export const Galerias: CollectionConfig = {
  slug: 'galerias',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'estado'],
    description: 'Galerías fotográficas del municipio',
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
      label: 'Título de la galería',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'imagenes',
      type: 'array',
      label: 'Imágenes',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'pie',
          type: 'text',
          label: 'Pie de foto',
        },
      ],
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

import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'
import { restrictPublishToAdmin } from './hooks/restrictPublish'

export const Galerias: CollectionConfig = {
  slug: 'galerias',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'estado'],
    description: 'Galerías fotográficas del municipio',
  },
  access: {
    read: () => true,
    // Admin y colaborador pueden crear/editar; solo admin elimina.
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [restrictPublishToAdmin],
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

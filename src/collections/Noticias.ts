import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'
import { restrictPublishToAdmin } from './hooks/restrictPublish'

export const Noticias: CollectionConfig = {
  slug: 'noticias',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'categoria', 'fecha', 'destacado', 'estado'],
    description: 'Noticias y blog del portal de turismo',
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
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.titulo) {
              return data.titulo
                .toLowerCase()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'extracto',
      type: 'textarea',
      label: 'Extracto / Resumen',
    },
    {
      name: 'contenido',
      type: 'richText',
      label: 'Contenido completo',
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen destacada',
    },
    {
      name: 'autor',
      type: 'text',
      label: 'Autor',
    },
    {
      name: 'fecha',
      type: 'date',
      label: 'Fecha de publicación',
    },
    {
      name: 'categoria',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Noticias', value: 'noticias' },
        { label: 'Turismo', value: 'turismo' },
        { label: 'Cultura', value: 'cultura' },
        { label: 'Naturaleza', value: 'naturaleza' },
        { label: 'Gastronomía', value: 'gastronomia' },
      ],
    },
    {
      name: 'destacado',
      type: 'checkbox',
      label: 'Mostrar en destacados',
      defaultValue: false,
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

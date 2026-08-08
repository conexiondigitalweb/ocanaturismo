import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'
import { restrictPublishToAdmin } from './hooks/restrictPublish'

export const Atractivos: CollectionConfig = {
  slug: 'atractivos',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'categoria', 'puntaje', 'destacado', 'estado'],
    description: 'Atractivos turísticos del municipio de Ocaña',
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [restrictPublishToAdmin],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: {
        description: 'Se genera automáticamente desde el nombre',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.nombre) {
              return data.nombre
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
      name: 'categoria',
      type: 'select',
      label: 'Categoría',
      required: true,
      options: [
        { label: 'Turismo Religioso', value: 'turismo-religioso' },
        { label: 'Turismo Histórico', value: 'turismo-historico' },
        { label: 'Turismo de Naturaleza', value: 'turismo-naturaleza' },
        { label: 'Cultura y Patrimonio', value: 'cultura-patrimonio' },
        { label: 'Gastronomía', value: 'gastronomia' },
      ],
    },
    {
      name: 'descripcion',
      type: 'richText',
      label: 'Descripción',
    },
    {
      name: 'imagenPrincipal',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen principal',
    },
    {
      name: 'imagenes',
      type: 'array',
      label: 'Galería de imágenes',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'ubicacion',
      type: 'text',
      label: 'Ubicación / Dirección',
    },
    {
      name: 'coordenadas',
      type: 'group',
      label: 'Coordenadas geográficas',
      fields: [
        {
          name: 'latitud',
          type: 'number',
          label: 'Latitud',
        },
        {
          name: 'longitud',
          type: 'number',
          label: 'Longitud',
        },
      ],
    },
    {
      name: 'horarios',
      type: 'text',
      label: 'Horarios de atención',
    },
    {
      name: 'costo',
      type: 'text',
      label: 'Costo de entrada',
    },
    {
      name: 'recomendaciones',
      type: 'richText',
      label: 'Recomendaciones para visitantes',
    },
    {
      name: 'declaratoria',
      type: 'text',
      label: 'Declaratoria de protección',
      admin: {
        description: 'Acto administrativo que lo protege (ej: Decreto 1425 de 1972)',
      },
    },
    {
      name: 'puntaje',
      type: 'number',
      label: 'Valoración MinCIT (0-100)',
      min: 0,
      max: 100,
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
      admin: {
        description: 'Solo un administrador puede pasar el estado a "Publicado".',
      },
      options: [
        { label: 'Borrador', value: 'borrador' },
        { label: 'En revisión', value: 'revision' },
        { label: 'Publicado', value: 'publicado' },
      ],
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de visualización',
      defaultValue: 0,
    },
  ],
}

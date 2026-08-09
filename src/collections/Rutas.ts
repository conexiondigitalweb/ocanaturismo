import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'
import { restrictPublishToAdmin } from './hooks/restrictPublish'
import { makeRevalidateAfterChange, makeRevalidateAfterDelete } from './hooks/revalidate'

// Rutas aparece en el home ("Rutas Turísticas") y en su propio listado
// estático /rutas (/rutas/[slug] ya es dinámica).
const revalidatePaths = ['/', '/rutas']

export const Rutas: CollectionConfig = {
  slug: 'rutas',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'dificultad', 'duracion', 'destacado', 'estado'],
    description: 'Rutas turísticas del municipio de Ocaña',
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [restrictPublishToAdmin],
    afterChange: [makeRevalidateAfterChange(revalidatePaths)],
    afterDelete: [makeRevalidateAfterDelete(revalidatePaths)],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de la ruta',
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
      name: 'descripcion',
      type: 'richText',
      label: 'Descripción',
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },
    {
      name: 'atractivos',
      type: 'relationship',
      relationTo: 'atractivos',
      hasMany: true,
      label: 'Atractivos incluidos',
    },
    {
      name: 'duracion',
      type: 'text',
      label: 'Duración estimada',
      admin: {
        description: 'Ej: 3 horas, Medio día, Día completo',
      },
    },
    {
      name: 'dificultad',
      type: 'select',
      label: 'Dificultad',
      options: [
        { label: 'Baja', value: 'baja' },
        { label: 'Media', value: 'media' },
        { label: 'Alta', value: 'alta' },
      ],
    },
    {
      name: 'distancia',
      type: 'text',
      label: 'Distancia total',
      admin: {
        description: 'Ej: 2.5 km, 15 km',
      },
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
  ],
}

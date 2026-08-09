import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'
import { restrictPublishToAdmin } from './hooks/restrictPublish'
import { makeRevalidateAfterChange, makeRevalidateAfterDelete } from './hooks/revalidate'
import { isValidYouTubeUrl } from '@/lib/youtube'

// Eventos aparece en el home ("Próximos Eventos") y en su propio listado
// estático /eventos (/eventos/[slug] ya es dinámica).
const revalidatePaths = ['/', '/eventos']

export const Eventos: CollectionConfig = {
  slug: 'eventos',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'tipo', 'fechaInicio', 'destacado', 'estado'],
    description: 'Agenda de eventos culturales y turísticos de Ocaña',
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
      label: 'Nombre del evento',
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
      label: 'Imagen del evento',
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      labels: { singular: 'Video', plural: 'Videos' },
      admin: {
        description: 'Videos de YouTube del evento (se muestran debajo de la galería de imágenes).',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'URL de YouTube',
          required: true,
          validate: (value: string | null | undefined) => {
            if (!value) return 'La URL es obligatoria'
            if (!isValidYouTubeUrl(value)) {
              return 'Debe ser un enlace válido de YouTube (youtube.com/watch, youtu.be o youtube.com/embed)'
            }
            return true
          },
        },
        {
          name: 'titulo',
          type: 'text',
          label: 'Título / descripción corta',
          admin: {
            description: 'Para accesibilidad (title del iframe). Opcional.',
          },
        },
      ],
    },
    {
      name: 'fechaInicio',
      type: 'date',
      label: 'Fecha de inicio',
      required: true,
    },
    {
      name: 'fechaFin',
      type: 'date',
      label: 'Fecha de finalización',
    },
    {
      name: 'lugar',
      type: 'text',
      label: 'Lugar / Sede',
    },
    {
      name: 'tipo',
      type: 'select',
      label: 'Tipo de evento',
      options: [
        { label: 'Cultural', value: 'cultural' },
        { label: 'Religioso', value: 'religioso' },
        { label: 'Deportivo', value: 'deportivo' },
        { label: 'Gastronómico', value: 'gastronomico' },
        { label: 'Folclórico', value: 'folclorico' },
        { label: 'Otro', value: 'otro' },
      ],
    },
    {
      name: 'organizador',
      type: 'text',
      label: 'Organizador',
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

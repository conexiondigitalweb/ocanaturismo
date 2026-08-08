import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '@/access'
import { restrictPublishToAdmin } from './hooks/restrictPublish'

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

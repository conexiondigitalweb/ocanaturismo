import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access'

export const Prestadores: CollectionConfig = {
  slug: 'prestadores',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'tipo', 'telefono', 'destacado', 'estado'],
    description: 'Directorio de prestadores de servicios turísticos',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del establecimiento',
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
      name: 'tipo',
      type: 'select',
      label: 'Tipo de prestador',
      required: true,
      options: [
        { label: 'Hotel / Alojamiento', value: 'hotel' },
        { label: 'Restaurante', value: 'restaurante' },
        { label: 'Agencia de viajes', value: 'agencia' },
        { label: 'Artesano', value: 'artesano' },
        { label: 'Transporte', value: 'transporte' },
        { label: 'Otro', value: 'otro' },
      ],
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'direccion',
      type: 'text',
      label: 'Dirección',
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Teléfono / WhatsApp',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo electrónico',
    },
    {
      name: 'sitioWeb',
      type: 'text',
      label: 'Sitio web',
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto del establecimiento',
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

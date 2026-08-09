import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldAccess, isAdminOrSelf } from '@/access'

export const Usuarios: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'nombre', 'rol'],
    // Colaborador no ve la colección Usuarios en el menú lateral (sigue
    // pudiendo editar su propio perfil vía Account, que no pasa por esta
    // ruta — ver AccountView de Payload). Access control abajo ya
    // restringe lectura/escritura; esto es solo la visibilidad del nav.
    hidden: ({ user }) => user?.rol === 'colaborador',
  },
  access: {
    // Solo admin puede crear usuarios nuevos.
    create: isAdmin,
    // Admin ve/edita todos los usuarios; colaborador solo su propio perfil.
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    // Solo admin puede eliminar usuarios.
    delete: isAdmin,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre completo',
    },
    {
      name: 'rol',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'colaborador',
      // Solo un admin puede asignar o cambiar el rol de un usuario
      // (evita que un colaborador se autopromueva a admin).
      access: {
        update: isAdminFieldAccess,
      },
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Colaborador', value: 'colaborador' },
      ],
    },
  ],
}

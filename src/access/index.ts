import type { Access, FieldAccess } from 'payload'

/**
 * Control de acceso reutilizable basado en el campo `rol` de Usuarios.
 * Ver PASO 1 de la sesión de CMS (roles admin / colaborador).
 */

/** Solo usuarios autenticados con rol 'admin'. */
export const isAdmin: Access = ({ req }) => req.user?.rol === 'admin'

/** Cualquier usuario autenticado (admin o colaborador). */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

/**
 * Admins pueden todo; el resto solo puede leer/editar su propio documento.
 * Útil para la colección Usuarios.
 */
export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.rol === 'admin') return true
  return {
    id: {
      equals: req.user.id,
    },
  }
}

/** Field-level: solo admin puede leer/escribir el campo. */
export const isAdminFieldAccess: FieldAccess = ({ req }) => req.user?.rol === 'admin'

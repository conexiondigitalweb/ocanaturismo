import { APIError, type CollectionBeforeChangeHook } from 'payload'

/**
 * Solo un usuario con rol 'admin' puede hacer la transición de un documento
 * hacia estado 'publicado'. Un colaborador puede seguir moviéndose libremente
 * entre 'borrador' y 'revision', y puede seguir editando un documento que ya
 * está publicado sin que esto lo bloquee (mientras no intente ser quien lo
 * publica por primera vez).
 */
export const restrictPublishToAdmin: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  const isAdminUser = req.user?.rol === 'admin'
  const wasPublished = originalDoc?.estado === 'publicado'
  const wantsPublished = data?.estado === 'publicado'

  if (wantsPublished && !wasPublished && !isAdminUser) {
    throw new APIError(
      'Solo un administrador puede publicar este contenido. Guárdalo como borrador o en revisión.',
      403,
    )
  }

  return data
}

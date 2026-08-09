import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Revalida rutas públicas ESTÁTICAS del frontend cuando se guarda o elimina
 * un documento. Solo hace falta para páginas que Next prerenderiza en build
 * (○ Static en el output de `next build`) — las páginas dinámicas (detalle
 * de Atractivos/Rutas/Eventos/Noticias, /atractivos, /directorio) ya
 * consultan Payload en cada request y no necesitan esto.
 *
 * Payload corre embebido en el mismo proceso de Next (no es un servidor
 * aparte), así que el hook puede llamar `revalidatePath` directo — sin
 * necesitar una ruta /api/revalidate ni un secreto compartido.
 */
const doRevalidate = (paths: string[]) => {
  for (const path of paths) {
    try {
      revalidatePath(path)
    } catch {
      // Fuera de un request de Next (scripts, seed) revalidatePath no
      // aplica — no debe romper el guardado del documento.
    }
  }
}

export const makeRevalidateAfterChange = (paths: string[]): CollectionAfterChangeHook => () => {
  doRevalidate(paths)
}

export const makeRevalidateAfterDelete = (paths: string[]): CollectionAfterDeleteHook => () => {
  doRevalidate(paths)
}

import type { Media } from '@/payload-types'

type MediaSizeKey = 'thumbnail' | 'card' | 'hero' | 'gallery'

/**
 * Resuelve la URL pública de un campo `upload` de Payload. Los queries del
 * frontend usan el depth por defecto (2), así que la relación ya viene
 * poblada como objeto `Media` — pero por las dudas (depth:0, o el campo
 * vacío) esto también maneja el caso de solo-ID o `null`/`undefined`.
 *
 * `preferredSize` intenta primero el imageSize correspondiente (ver
 * Medios.ts: thumbnail/card/hero/gallery) y cae a la imagen original si ese
 * size no existe (por ejemplo, imágenes subidas antes de definir los
 * imageSizes, o archivos más pequeños que el size pedido).
 */
export function getMediaUrl(
  media: Media | string | null | undefined,
  preferredSize?: MediaSizeKey,
): string | undefined {
  if (!media || typeof media === 'string') return undefined
  if (preferredSize) {
    const sizedUrl = media.sizes?.[preferredSize]?.url
    if (sizedUrl) return sizedUrl
  }
  return media.url || undefined
}

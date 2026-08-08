/**
 * Utilidades para el campo `videos` (Atractivos/Eventos) y el componente
 * YouTubeEmbed. Soporta youtube.com/watch?v=, youtu.be/ y youtube.com/embed/.
 */

const ID_RE = /^[a-zA-Z0-9_-]{11}$/

function stripWww(hostname: string): string {
  return hostname.replace(/^www\./, '').replace(/^m\./, '')
}

/** Extrae el video ID de una URL de YouTube en cualquiera de los formatos soportados, o null si no es válida. */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url.trim())
  } catch {
    return null
  }

  const host = stripWww(parsed.hostname.toLowerCase())

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0]
    return id && ID_RE.test(id) ? id : null
  }

  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v')
      return id && ID_RE.test(id) ? id : null
    }
    if (parsed.pathname.startsWith('/embed/')) {
      const id = parsed.pathname.slice('/embed/'.length).split('/')[0]
      return id && ID_RE.test(id) ? id : null
    }
  }

  return null
}

/** true si la URL es un enlace de YouTube reconocible (watch, youtu.be o embed) con un video ID válido. */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null
}

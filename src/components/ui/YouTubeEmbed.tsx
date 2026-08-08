import { extractYouTubeId } from '@/lib/youtube'

interface YouTubeEmbedProps {
  url: string
  titulo?: string | null
}

/**
 * Embed responsive (16:9) de un video de YouTube usando el dominio de
 * privacidad ampliada youtube-nocookie.com. Acepta youtube.com/watch,
 * youtu.be y youtube.com/embed — ver src/lib/youtube.ts.
 */
export default function YouTubeEmbed({ url, titulo }: YouTubeEmbedProps) {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-100">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={titulo || 'Video de YouTube'}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

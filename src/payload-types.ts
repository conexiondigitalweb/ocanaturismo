/**
 * This file was generated automatically by Payload CMS.
 * Run `npm run generate:types` after starting the dev server to regenerate.
 */

export interface Config {
  collections: {
    users: Usuario
    media: Media
    atractivos: Atractivo
    rutas: Ruta
    eventos: Evento
    prestadores: Prestador
    noticias: Noticia
    paginas: Pagina
    galerias: Galeria
  }
  globals: Record<string, never>
}

export interface Usuario {
  id: string
  email: string
  nombre?: string | null
  rol: 'admin' | 'colaborador'
  updatedAt: string
  createdAt: string
}

export interface Media {
  id: string
  alt: string
  credito?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  sizes?: {
    thumbnail?: MediaSize | null
    card?: MediaSize | null
    hero?: MediaSize | null
    gallery?: MediaSize | null
  }
}

interface MediaSize {
  url?: string | null
  width?: number | null
  height?: number | null
  mimeType?: string | null
  filesize?: number | null
  filename?: string | null
}

export interface Atractivo {
  id: string
  nombre: string
  slug: string
  categoria: 'turismo-religioso' | 'turismo-historico' | 'turismo-naturaleza' | 'cultura-patrimonio' | 'gastronomia'
  descripcion?: Record<string, unknown> | null
  imagenPrincipal?: Media | string | null
  imagenes?: Array<{ imagen: Media | string; id?: string | null }> | null
  videos?: Array<{ url: string; titulo?: string | null; id?: string | null }> | null
  ubicacion?: string | null
  coordenadas?: {
    latitud?: number | null
    longitud?: number | null
  } | null
  horarios?: string | null
  costo?: string | null
  recomendaciones?: Record<string, unknown> | null
  declaratoria?: string | null
  puntaje?: number | null
  destacado?: boolean | null
  estado?: 'borrador' | 'revision' | 'publicado' | null
  orden?: number | null
  updatedAt: string
  createdAt: string
}

export interface Ruta {
  id: string
  nombre: string
  slug: string
  descripcion?: Record<string, unknown> | null
  imagen?: Media | string | null
  atractivos?: (Atractivo | string)[] | null
  duracion?: string | null
  dificultad?: 'baja' | 'media' | 'alta' | null
  distancia?: string | null
  destacado?: boolean | null
  estado?: 'borrador' | 'revision' | 'publicado' | null
  updatedAt: string
  createdAt: string
}

export interface Evento {
  id: string
  nombre: string
  slug: string
  descripcion?: Record<string, unknown> | null
  imagen?: Media | string | null
  videos?: Array<{ url: string; titulo?: string | null; id?: string | null }> | null
  fechaInicio: string
  fechaFin?: string | null
  lugar?: string | null
  tipo?: 'cultural' | 'religioso' | 'deportivo' | 'gastronomico' | 'folclorico' | 'otro' | null
  organizador?: string | null
  destacado?: boolean | null
  estado?: 'borrador' | 'revision' | 'publicado' | null
  updatedAt: string
  createdAt: string
}

export interface Prestador {
  id: string
  nombre: string
  slug: string
  tipo: 'hotel' | 'restaurante' | 'agencia' | 'artesano' | 'transporte' | 'otro'
  descripcion?: string | null
  direccion?: string | null
  telefono?: string | null
  email?: string | null
  sitioWeb?: string | null
  imagen?: Media | string | null
  destacado?: boolean | null
  estado?: 'borrador' | 'publicado' | null
  updatedAt: string
  createdAt: string
}

export interface Noticia {
  id: string
  titulo: string
  slug: string
  extracto?: string | null
  contenido?: Record<string, unknown> | null
  imagen?: Media | string | null
  autor?: string | null
  fecha?: string | null
  categoria?: 'noticias' | 'turismo' | 'cultura' | 'naturaleza' | 'gastronomia' | null
  destacado?: boolean | null
  estado?: 'borrador' | 'publicado' | null
  updatedAt: string
  createdAt: string
}

export interface Pagina {
  id: string
  titulo: string
  slug: string
  contenido?: Record<string, unknown> | null
  estado?: 'borrador' | 'publicado' | null
  updatedAt: string
  createdAt: string
}

export interface Galeria {
  id: string
  titulo: string
  descripcion?: string | null
  imagenes?: Array<{ imagen: Media | string; pie?: string | null; id?: string | null }> | null
  estado?: 'borrador' | 'publicado' | null
  updatedAt: string
  createdAt: string
}

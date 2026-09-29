'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Dialog } from 'radix-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Grid de miniaturas + visor ampliado (Radix Dialog) con navegación por
 * teclado y flechas. El grid lo pinta este mismo componente para poder
 * abrir el visor en el índice correcto al hacer clic en cualquier miniatura.
 */
export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const goTo = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        return (current + delta + images.length) % images.length
      })
    },
    [images.length],
  )

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goTo(1)
      if (e.key === 'ArrowLeft') goTo(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, goTo])

  return (
    <>
      {/* Columnas tipo masonry: cada foto conserva su proporción natural
          (vertical, horizontal o cuadrada) en vez de forzar un recorte. */}
      <div className="columns-2 sm:columns-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full mb-3 break-inside-avoid rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota-500"
            aria-label={`Ver imagen ampliada: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 640px) 33vw, 50vw"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay asChild forceMount>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="fixed inset-0 bg-black/90 z-[100]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </Dialog.Overlay>
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8 focus:outline-none"
          >
            <Dialog.Title className="sr-only">
              {openIndex !== null ? images[openIndex].alt : 'Galería'}
            </Dialog.Title>
            {openIndex !== null && (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={openIndex}
                    className="relative w-full h-full max-w-5xl max-h-[85vh]"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={images[openIndex].src}
                      alt={images[openIndex].alt}
                      fill
                      sizes="90vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <Dialog.Close
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={24} />
                </Dialog.Close>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goTo(-1)}
                      className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3 transition-colors"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(1)}
                      className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3 transition-colors"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={28} />
                    </button>
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tabular-nums">
                      {openIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

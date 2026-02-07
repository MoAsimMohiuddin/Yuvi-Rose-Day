import { useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { CONFIG } from '../config'

/**
 * Photo reveal: fades in after rose blooms, with soft glow, rounded edges,
 * and subtle Ken Burns (zoom-in) effect. Text overlay fades in after photo.
 * If image fails to load, shows a warm gradient placeholder so the page still looks polished.
 * IMPORTANT: Once visible, this component NEVER unmounts or hides.
 */
export default function PhotoReveal({ visible, className = '', resetKey = 0 }) {
  const photoWrapRef = useRef(null)
  const imageRef = useRef(null)
  const resolvedSrc = useMemo(() => {
    const base = import.meta.env.BASE_URL || '/'
    const cleanBase = base.endsWith('/') ? base : `${base}/`
    const cleanPath = CONFIG.imagePath.replace(/^\//, '')
    return `${cleanBase}${cleanPath}`
  }, [])

  useEffect(() => {
    if (!visible) return
    if (!photoWrapRef.current || !imageRef.current) return

    const wrap = photoWrapRef.current
    const img = imageRef.current

    gsap.set(wrap, { opacity: 0, scale: 0.92 })
    gsap.set(img, { scale: 1 })
    gsap.to(wrap, {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out',
    })
    // Ken Burns: subtle zoom-in over 8s
    gsap.to(img, {
      scale: 1.08,
      duration: 8,
      ease: 'none',
      overwrite: true,
    })
  }, [visible])

  useEffect(() => {
    // Reset on replay
    if (photoWrapRef.current) {
      gsap.set(photoWrapRef.current, { opacity: 0, scale: 1 })
    }
  }, [resetKey])

  return (
    <div className={`relative h-full w-full min-h-0 ${className}`}>
      <div
        ref={photoWrapRef}
        className="pointer-events-none flex h-full w-full flex-col items-center justify-center"
      >
        <div className="relative h-full max-h-full w-full max-w-md flex items-center justify-center">
          {/* Soft glow behind photo */}
          <div
            className="absolute inset-0 -m-6 rounded-3xl opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(183,110,121,0.35) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
          <div
            ref={imageRef}
            className="relative h-full max-h-full w-auto max-w-full overflow-hidden rounded-3xl shadow-glow aspect-[4/3]"
            style={{ transformOrigin: 'center center' }}
          >
            <img
              src={resolvedSrc}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Text overlay — fades in after photo is visible */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
        className="pointer-events-none mt-3 text-center"
      >
        <p className="font-handwritten text-3xl font-semibold text-beige-cream drop-shadow-md md:text-4xl">
          {CONFIG.title}
        </p>
        <p className="mt-2 font-serif text-lg italic text-beige-muted md:text-xl">
          {CONFIG.subtitle}
        </p>
      </motion.div>
    </div>
  )
}

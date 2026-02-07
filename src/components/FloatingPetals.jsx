import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Subtle floating rose petals in the background for nostalgic wedding-edit vibe.
 */
const PETAL_COUNT = 8

export default function FloatingPetals() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const petals = containerRef.current.querySelectorAll('.petal')
    const ctx = gsap.context(() => {
      petals.forEach((petal, i) => {
        const x = (i / PETAL_COUNT) * 100 - 10
        const duration = 12 + i * 2
        const delay = i * 0.8
        gsap.set(petal, {
          left: `${x}%`,
          opacity: 0.15 + (i % 3) * 0.05,
          rotation: Math.random() * 360,
        })
        gsap.to(petal, {
          y: -window.innerHeight - 60,
          rotation: `+=${120 + i * 30}`,
          duration,
          delay,
          ease: 'none',
          repeat: -1,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="petal absolute bottom-0 h-4 w-3 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${i % 2 ? '#8b3a3a' : '#b76e79'} 0%, #6b2d2d 100%)`,
            transformOrigin: 'center center',
          }}
        />
      ))}
    </div>
  )
}

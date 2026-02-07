import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Rose animation: bud → stem + petals grow → full bloom.
 * Uses GSAP timeline for slow, emotional, cinematic feel.
 * SVG-based (no GIFs); all timing is configurable at top of effect.
 */
const STEM_DURATION = 2.2
const BUD_GROW_DURATION = 1.8
const BLOOM_DURATION = 3.5
const STAGGER_PETALS = 0.12

export default function RoseAnimation({ progress = 0, onBloomComplete }) {
  const containerRef = useRef(null)
  const stemRef = useRef(null)
  const leaf1Ref = useRef(null)
  const leaf2Ref = useRef(null)
  const budRef = useRef(null)
  const petalsRef = useRef([])
  const timelineRef = useRef(null)
  const completedRef = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stem = stemRef.current
      const leaf1 = leaf1Ref.current
      const leaf2 = leaf2Ref.current
      const bud = budRef.current
      const petals = petalsRef.current.filter(Boolean)

      if (!stem || !bud || petals.length === 0) return

      // Start with stem scaled to 0 (hidden), bud small, petals scaled 0
      gsap.set(stem, { scaleY: 0, transformOrigin: 'bottom center' })
      gsap.set([leaf1, leaf2], { scale: 0, transformOrigin: 'left center' })
      gsap.set(bud, { scale: 0.3, opacity: 1 })
      gsap.set(petals, { scale: 0, opacity: 0, transformOrigin: 'center bottom' })

      const tl = gsap.timeline()

      // 1) Stem grows up
      tl.to(stem, {
        scaleY: 1,
        duration: STEM_DURATION,
        ease: 'power2.out',
      })

      // 2) Leaves appear
      tl.to(
        [leaf1, leaf2],
        {
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
        },
        `-=${STEM_DURATION * 0.4}`
      )

      // 3) Bud grows slightly (still closed)
      tl.to(
        bud,
        {
          scale: 0.85,
          duration: BUD_GROW_DURATION,
          ease: 'sine.inOut',
        },
        `-=${STEM_DURATION * 0.5}`
      )

      // 4) Bud fades out as petals bloom
      tl.to(
        bud,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in',
        },
        `+=0.2`
      )

      // 5) Petals open one by one for emotional effect (staggered)
      petals.forEach((petal, i) => {
        tl.to(
          petal,
          {
            scale: 1,
            opacity: 1,
            duration: BLOOM_DURATION * 0.35,
            ease: 'back.out(1.1)',
          },
          i * STAGGER_PETALS
        )
      })

      tl.pause(0)
      timelineRef.current = tl
    }, containerRef)

    return () => ctx.revert()
  }, [onBloomComplete])

  useEffect(() => {
    const tl = timelineRef.current
    if (!tl) return
    const safeProgress = Math.max(0, Math.min(1, progress))
    tl.progress(safeProgress)
    if (safeProgress >= 1 && !completedRef.current) {
      completedRef.current = true
      onBloomComplete?.()
    }
  }, [progress, onBloomComplete])

  // SVG rose: stem, two leaves, central bud (circle), and petal layers
  const petalCount = 12
  const petalAngles = Array.from({ length: petalCount }, (_, i) => (i * 360) / petalCount)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <svg
        viewBox="0 0 200 280"
        className="h-[70vmin] w-[50vmin] max-h-[420px] max-w-[260px] flex-shrink-0"
      >
        <g transform="translate(100, 260)">
          {/* Stem */}
          <line
            ref={stemRef}
            x1="0"
            y1="0"
            x2="0"
            y2="-180"
            stroke="#2d5a2d"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <ellipse
            ref={leaf1Ref}
            cx="-25"
            cy="-100"
            rx="28"
            ry="12"
            fill="#3d7a3d"
            transform="rotate(-30 -25 -100)"
          />
          <ellipse
            ref={leaf2Ref}
            cx="22"
            cy="-150"
            rx="26"
            ry="11"
            fill="#3d7a3d"
            transform="rotate(25 22 -150)"
          />

          {/* Flower center: bud (hidden when petals show) */}
          <circle ref={budRef} cx="0" cy="-180" r="18" fill="#6b2d2d" />

          {/* Petal layers — drawn as ellipses rotated around center */}
          {petalAngles.map((angle, i) => (
            <ellipse
              key={i}
              ref={(el) => {
                petalsRef.current[i] = el
              }}
              cx="0"
              cy="-180"
              rx="14"
              ry="22"
              fill={i % 3 === 0 ? '#8b3a3a' : i % 3 === 1 ? '#a64d4d' : '#6b2d2d'}
              transform={`rotate(${angle} 0 -180)`}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

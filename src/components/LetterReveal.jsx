import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Folded paper that unfolds, then paged lines appear like handwriting.
 */
export default function LetterReveal({ pages = [], visible, onComplete, className = '' }) {
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    if (visible) setPageIndex(0)
  }, [visible])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 1 }}
      className={`flex h-full w-full items-end justify-center ${className}`}
    >
      <motion.div
        initial={{ scaleY: 0.2 }}
        animate={{ scaleY: visible ? 1 : 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-md origin-top rounded-3xl bg-beige-cream/90 p-6 shadow-soft"
        style={{ filter: 'sepia(0.25)' }}
      >
        <div className="absolute inset-x-0 top-0 h-4 rounded-t-3xl bg-beige-warm/80" />
        <div className="pt-4">
          {(pages[pageIndex] || []).map((line, i) => (
            <motion.p
              key={`${pageIndex}-${line}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.7, duration: 0.6 }}
              className="mb-3 font-handwritten text-xl text-maroon-deep"
            >
              {line}
            </motion.p>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-maroon-soft/80">
            Page {pageIndex + 1} / {Math.max(pages.length, 1)}
          </span>
          <button
            type="button"
            onClick={() => {
              if (navigator?.vibrate) navigator.vibrate(10)
              if (pageIndex >= pages.length - 1) {
                onComplete?.()
              } else {
                setPageIndex((prev) => prev + 1)
              }
            }}
            className="rounded-full bg-maroon-warm/80 px-4 py-2 text-sm font-serif text-beige-cream shadow-soft transition active:scale-[0.98] touch-manipulation"
          >
            {pageIndex >= pages.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-maroon-soft/30" />
      </motion.div>
    </motion.div>
  )
}

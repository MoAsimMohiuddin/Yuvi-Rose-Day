import { motion, AnimatePresence } from 'framer-motion'

/**
 * Tap/click-through micro-moments to build anticipation before the rose.
 */
export default function PreludeScreens({ messages, index, onNext }) {
  const message = messages[index] || ''

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
      <button
        type="button"
        onClick={onNext}
        className="group w-full max-w-md rounded-3xl border border-rosegold/30 bg-maroon-warm/70 px-6 py-10 font-serif text-2xl text-beige-cream shadow-soft backdrop-blur-sm transition active:scale-[0.98] touch-manipulation"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="block"
          >
            {message}
          </motion.span>
        </AnimatePresence>
        <span className="mt-6 block text-sm text-beige-muted/90">Tap to continue</span>
      </button>
    </div>
  )
}

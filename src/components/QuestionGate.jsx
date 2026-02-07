import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config'

/**
 * Multi-question entry gate. No localStorage — access is state-based only.
 * Each correct answer shows a cute acknowledgement, then advances to next question.
 * After the final correct answer, the gate fades out and unlocks the main page.
 */
export default function QuestionGate({ onUnlock }) {
  const [input, setInput] = useState('')
  const [isWrong, setIsWrong] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAck, setShowAck] = useState(false)
  const [ackText, setAckText] = useState('')

  const triggerHaptic = useCallback(() => {
    if (navigator?.vibrate) {
      navigator.vibrate(10)
    }
  }, [])

  const current = useMemo(() => {
    return CONFIG.questions[currentIndex] || CONFIG.questions[0]
  }, [currentIndex])

  const normalizedAnswer = current.answer.trim().toLowerCase()

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (showAck || isUnlocking) return
      const normalized = input.trim().toLowerCase()
      if (!normalized) return

      if (normalized === normalizedAnswer) {
        triggerHaptic()
        setInput('')
        setIsWrong(false)
        setAckText(current.successMessage || 'Sweet memory 💖')
        setShowAck(true)

        const isLast = currentIndex >= CONFIG.questions.length - 1
        const ackDelay = 1200

        setTimeout(() => {
          if (isLast) {
            setIsUnlocking(true)
            // Let fade-out play, then call onUnlock
            setTimeout(() => {
              onUnlock()
            }, 800)
          } else {
            setShowAck(false)
            setCurrentIndex((prev) => prev + 1)
          }
        }, ackDelay)
      } else {
        setIsWrong(true)
        triggerHaptic()
        setInput('')
        // Reset shake state after animation
        setTimeout(() => setIsWrong(false), 600)
      }
    },
    [input, normalizedAnswer, onUnlock, current.successMessage, currentIndex, showAck, isUnlocking, triggerHaptic]
  )

  return (
    <AnimatePresence mode="wait">
      {!isUnlocking ? (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon-deep px-4"
        >
          <div className="w-full max-w-md">
            <motion.form
              onSubmit={handleSubmit}
              animate={isWrong ? { x: [-8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="rounded-2xl border border-rosegold/30 bg-maroon-warm/80 p-8 shadow-soft backdrop-blur-sm"
            >
              <p className="font-serif text-2xl font-medium text-beige-cream md:text-3xl">
                {current.question}
              </p>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Your answer..."
                disabled={showAck || isUnlocking}
                className="mt-6 w-full rounded-xl border border-beige-muted/40 bg-beige-cream/10 px-4 py-4 text-lg font-serif text-beige-cream placeholder-beige-muted/60 outline-none transition focus:border-rosegold/60 focus:ring-1 focus:ring-rosegold/40 disabled:opacity-60"
                autoFocus
                autoComplete="off"
              />
              <AnimatePresence>
                {showAck && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-sm text-beige-cream/90"
                  >
                    {ackText}
                  </motion.p>
                )}
                {isWrong && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-sm text-rosegold/90"
                  >
                    {CONFIG.wrongMessage}
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={showAck || isUnlocking}
                className="mt-6 w-full rounded-xl bg-rosegold/80 py-4 text-lg font-serif text-beige-cream transition hover:bg-rosegold focus:outline-none focus:ring-2 focus:ring-rosegold/50 active:scale-[0.98] touch-manipulation"
              >
                {currentIndex >= CONFIG.questions.length - 1 ? 'Enter' : 'Next'}
              </button>
            </motion.form>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

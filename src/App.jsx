import { useState, useCallback, useEffect, useRef } from 'react'
import QuestionGate from './components/QuestionGate'
import RoseAnimation from './components/RoseAnimation'
import PhotoReveal from './components/PhotoReveal'
import FloatingPetals from './components/FloatingPetals'
import PreludeScreens from './components/PreludeScreens'
import LetterReveal from './components/LetterReveal'
import Garlands from './components/Garlands'
import MusicButton from './components/MusicButton'
import { CONFIG } from './config'

/**
 * Single-page Valentine Rose Day experience.
 * No router: QuestionGate controls access; main page shows rose → photo → text.
 */
export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [preludeIndex, setPreludeIndex] = useState(0)
  const [preludeDone, setPreludeDone] = useState(false)
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [roseComplete, setRoseComplete] = useState(false)
  const [photoRevealVisible, setPhotoRevealVisible] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const [replayVisible, setReplayVisible] = useState(false)
  const [runKey, setRunKey] = useState(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)

  const handleUnlock = useCallback(() => {
    setUnlocked(true)
    setPreludeIndex(0)
    setPreludeDone(false)
  }, [])

  const triggerHaptic = useCallback(() => {
    if (navigator?.vibrate) {
      navigator.vibrate(10)
    }
  }, [])

  const handlePreludeNext = useCallback(() => {
    triggerHaptic()
    if (preludeIndex >= CONFIG.preludeMessages.length - 1) {
      setPreludeDone(true)
    } else {
      setPreludeIndex((prev) => prev + 1)
    }
  }, [preludeIndex, triggerHaptic])

  const handleBloomComplete = useCallback(() => {
    setRoseComplete((prev) => prev || true)
  }, [])

  const handleReplay = useCallback(() => {
    triggerHaptic()
    setPreludeIndex(0)
    setPreludeDone(false)
    setHolding(false)
    setProgress(0)
    setRoseComplete(false)
    setPhotoRevealVisible(false)
    setLetterVisible(false)
    setReplayVisible(false)
    setRunKey((prev) => prev + 1)
  }, [triggerHaptic])

  useEffect(() => {
    if (!holding || roseComplete) return
    const step = (time) => {
      if (!holding) return
      const last = lastTimeRef.current || time
      const delta = (time - last) / 1000
      lastTimeRef.current = time
      setProgress((prev) => {
        const next = Math.min(1, prev + delta * CONFIG.holdSpeed)
        if (next >= 1) {
          setHolding(false)
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = 0
    }
  }, [holding, roseComplete])

  useEffect(() => {
    if (!roseComplete) return
    setPhotoRevealVisible((prev) => prev || true)
    const timer = setTimeout(() => {
      setLetterVisible(true)
    }, 1800)
    return () => clearTimeout(timer)
  }, [roseComplete])

  return (
    <div className="relative min-h-screen overflow-hidden bg-maroon-deep">
      {/* Music button (tap to play) */}
      {unlocked && <MusicButton />}

      {/* Entry: question gate — blocks main content until correct answer */}
      <QuestionGate onUnlock={handleUnlock} />

      {/* Main Valentine page: only after correct answer */}
      {unlocked && (
        <>
          {/* Warm gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 60%, #6b2d2d 0%, #4a1c1c 50%, #2d1212 100%)',
            }}
          />

          <Garlands />
          <FloatingPetals />

          {/* Prelude micro-moments */}
          {!preludeDone && (
            <PreludeScreens
              messages={CONFIG.preludeMessages}
              index={preludeIndex}
              onNext={handlePreludeNext}
            />
          )}

          {/* Hold-to-bloom interaction */}
          {preludeDone && !roseComplete && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
              {!roseComplete && (
                <div className="mb-4 text-center">
                  <p className="font-serif text-2xl text-beige-cream md:text-3xl">
                    {CONFIG.holdMessage}
                  </p>
                  <p className="mt-2 text-sm text-beige-muted/90">
                    Press and hold anywhere below for the rose to bloom
                  </p>
                </div>
              )}
              <div
                className={`relative flex h-[60vh] w-full max-w-md items-center justify-center touch-manipulation ${
                  roseComplete ? 'pointer-events-none' : ''
                }`}
                onPointerDown={(e) => {
                  e.preventDefault()
                  triggerHaptic()
                  setHolding(true)
                }}
                onPointerUp={() => setHolding(false)}
                onPointerLeave={() => setHolding(false)}
                onPointerCancel={() => setHolding(false)}
              >
                <RoseAnimation
                  key={runKey}
                  progress={progress}
                  onBloomComplete={handleBloomComplete}
                />
              </div>
            </div>
          )}

          {roseComplete && (
            <>
              <div className="absolute left-0 right-0 top-[6vh] z-30 h-[40vh] px-4">
                <PhotoReveal
                  visible={photoRevealVisible}
                  resetKey={runKey}
                  className="h-full"
                />
              </div>
              <div className="absolute left-0 right-0 bottom-[6vh] z-20 h-[40vh] px-4">
                <LetterReveal
                  pages={CONFIG.letterPages}
                  visible={letterVisible}
                  onComplete={() => setReplayVisible(true)}
                  className="h-full"
                />
              </div>
            </>
          )}

          {replayVisible && (
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center px-4">
              <button
                type="button"
                onClick={handleReplay}
                className="rounded-full border border-rosegold/50 bg-maroon-warm/70 px-6 py-3 text-lg font-serif text-beige-cream shadow-soft backdrop-blur-sm transition active:scale-[0.98]"
              >
                🔁 Watch again
              </button>
            </div>
          )}

          {/* Film grain + tint + vignette for retro wedding edit feel */}
          <div className="grain-overlay" />
          <div className="tint-overlay" />
          <div className="vignette" />
        </>
      )}
    </div>
  )
}

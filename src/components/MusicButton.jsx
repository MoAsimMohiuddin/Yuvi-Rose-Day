import { useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config'

/**
 * Small unobtrusive tap-to-play music control.
 * Audio must be placed in /public and referenced via CONFIG.musicPath.
 */
export default function MusicButton({ onToggle }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.6
  }, [])

  const triggerHaptic = () => {
    if (navigator?.vibrate) {
      navigator.vibrate(10)
    }
  }

  const toggle = async () => {
    if (!audioRef.current) return
    const audio = audioRef.current
    try {
      triggerHaptic()
      if (playing) {
        audio.pause()
        setPlaying(false)
        onToggle?.(false)
      } else {
        await audio.play()
        setPlaying(true)
        onToggle?.(true)
      }
    } catch (err) {
      // Some mobile browsers block auto-play; user can tap again.
      setPlaying(false)
    }
  }

  return (
    <div className="absolute bottom-4 right-4 z-30">
      <button
        type="button"
        onClick={toggle}
        className="rounded-full border border-rosegold/40 bg-maroon-warm/70 px-4 py-2 text-sm font-serif text-beige-cream shadow-soft backdrop-blur-sm transition active:scale-[0.98]"
      >
        {playing ? '🔊 Music on' : '🔊 Play music'}
      </button>
      <audio ref={audioRef} src={CONFIG.musicPath} preload="auto" />
    </div>
  )
}

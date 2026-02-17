import { useState, useEffect, useCallback, CSSProperties } from 'react'

interface BoopConfig {
  x?: number
  y?: number
  rotation?: number
  scale?: number
  timing?: number
}

/**
 * Josh Comeau's "Boop" animation hook
 * Creates a brief, playful animation that auto-resets
 * @see https://www.joshwcomeau.com/react/boop/
 */
export function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
}: BoopConfig = {}) {
  const [isBooped, setIsBooped] = useState(false)

  const style: CSSProperties = {
    display: 'inline-block',
    transform: isBooped
      ? `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`
      : `translate(0px, 0px) rotate(0deg) scale(1)`,
    transition: `transform 300ms var(--spring-bounce)`,
  }

  useEffect(() => {
    if (!isBooped) return

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped, timing])

  const trigger = useCallback(() => {
    setIsBooped(true)
  }, [])

  return { style, trigger }
}

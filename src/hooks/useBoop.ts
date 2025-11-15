import { useState, useEffect, useCallback } from 'react'
import { useSpring } from '@react-spring/web'

interface BoopConfig {
  x?: number
  y?: number
  rotation?: number
  scale?: number
  timing?: number
  springConfig?: {
    tension: number
    friction: number
  }
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
  springConfig = { tension: 300, friction: 10 },
}: BoopConfig = {}) {
  const [isBooped, setIsBooped] = useState(false)

  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`
      : `translate(0px, 0px) rotate(0deg) scale(1)`,
    config: springConfig,
  })

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

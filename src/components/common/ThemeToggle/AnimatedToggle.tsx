'use client'

import { useState, useEffect } from 'react'
import { animated, useSpring, to } from '@react-spring/web'

interface AnimatedToggleProps {
  isDark: boolean
}

export default function AnimatedToggle({ isDark }: AnimatedToggleProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Theme transition spring config (from Josh's dark mode example)
  const themeSpringConfig = { mass: 4, tension: 250, friction: 35 }

  // Combined theme and boop animation
  const props = useSpring({
    themeRotation: isDark ? 40 : 90,
    boopRotation: isHovered ? 15 : 0,
    centerR: isDark ? 9 : 5,
    maskCx: isDark ? 12 : 30,
    maskCy: isDark ? 4 : 0,
    sunOpacity: isDark ? 0 : 1,
    config: themeSpringConfig,
  })

  // Boop reset effect
  useEffect(() => {
    if (!isHovered) return
    const timeoutId = window.setTimeout(() => {
      setIsHovered(false)
    }, 150)
    return () => window.clearTimeout(timeoutId)
  }, [isHovered])

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onMouseEnter={() => setIsHovered(true)}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        transformOrigin: 'center center',
        transform: to(
          [props.themeRotation, props.boopRotation],
          (theme, boop) => `rotate(${theme + boop}deg)`
        ),
      }}
    >
      {/* Mask for creating the moon crescent */}
      <mask id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle
          r="9"
          fill="black"
          cx={props.maskCx}
          cy={props.maskCy}
        />
      </mask>

      {/* Center circle (sun or moon) */}
      <animated.circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask="url(#moon-mask)"
        r={props.centerR}
      />

      {/* Sun rays */}
      <animated.g stroke="currentColor" opacity={props.sunOpacity}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>
  )
}

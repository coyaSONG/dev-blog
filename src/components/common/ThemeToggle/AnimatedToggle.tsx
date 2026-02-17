'use client'

import { useState, useEffect, CSSProperties } from 'react'

interface AnimatedToggleProps {
  isDark: boolean
}

export default function AnimatedToggle({ isDark }: AnimatedToggleProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Boop reset effect
  useEffect(() => {
    if (!isHovered) return
    const timeoutId = window.setTimeout(() => {
      setIsHovered(false)
    }, 150)
    return () => window.clearTimeout(timeoutId)
  }, [isHovered])

  const themeRotation = isDark ? 40 : 90
  const boopRotation = isHovered ? 15 : 0
  const centerR = isDark ? 9 : 5
  const maskCx = isDark ? 12 : 30
  const maskCy = isDark ? 4 : 0
  const sunOpacity = isDark ? 0 : 1

  const svgStyle: CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    transformOrigin: 'center center',
    transform: `rotate(${themeRotation + boopRotation}deg)`,
    transition: 'transform 600ms var(--spring-gentle)',
  }

  const circleTransition = 'cx 600ms var(--spring-gentle), cy 600ms var(--spring-gentle), r 600ms var(--spring-gentle)'
  const opacityTransition = 'opacity 300ms ease'

  return (
    <svg
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
      style={svgStyle}
    >
      {/* Mask for creating the moon crescent */}
      <mask id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle
          r="9"
          fill="black"
          cx={maskCx}
          cy={maskCy}
          style={{ transition: circleTransition }}
        />
      </mask>

      {/* Center circle (sun or moon) */}
      <circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask="url(#moon-mask)"
        r={centerR}
        style={{ transition: circleTransition }}
      />

      {/* Sun rays */}
      <g stroke="currentColor" opacity={sunOpacity} style={{ transition: opacityTransition }}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  )
}

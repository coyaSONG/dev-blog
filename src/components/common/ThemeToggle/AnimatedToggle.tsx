'use client'

import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

interface AnimatedToggleProps {
  isDark: boolean
  onClick: () => void
}

// Animation properties for dark and light modes
const properties = {
  dark: {
    r: 9,
    transform: 'rotate(40deg)',
    cx: 12,
    cy: 4,
    opacity: 0,
  },
  light: {
    r: 5,
    transform: 'rotate(90deg)',
    cx: 30,
    cy: 0,
    opacity: 1,
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
}

export default function AnimatedToggle({ isDark, onClick }: AnimatedToggleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const { r, transform, cx, cy, opacity } = properties[isDark ? 'dark' : 'light']

  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  })

  const centerCircleProps = useSpring({
    r,
    config: properties.springConfig,
  })

  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  })

  const linesProps = useSpring({
    opacity,
    config: properties.springConfig,
  })

  // Hover/focus scale effect
  const scaleProps = useSpring({
    transform: isHovered || isFocused ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 300, friction: 20 },
  })

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        cursor: 'pointer',
        ...svgContainerProps,
        ...scaleProps,
        transition: 'opacity 0.2s ease',
        opacity: isHovered || isFocused ? 0.8 : 1,
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Mask for creating the moon crescent effect */}
      <mask id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle style={maskedCircleProps} r="9" fill="black" />
      </mask>

      {/* Center circle - becomes sun or moon based on mask */}
      <animated.circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask="url(#moon-mask)"
        style={centerCircleProps}
      />

      {/* Sun rays - fade out in dark mode */}
      <animated.g stroke="currentColor" style={linesProps}>
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

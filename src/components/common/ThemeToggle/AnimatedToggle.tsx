'use client'

import { animated, useSpring, to } from '@react-spring/web'
import { useBoop } from '@/hooks/useBoop'

interface AnimatedToggleProps {
  isDark: boolean
}

export default function AnimatedToggle({ isDark }: AnimatedToggleProps) {
  // Theme transition spring config (from Josh's dark mode example)
  const themeSpringConfig = { mass: 4, tension: 250, friction: 35 }

  // Main theme animation
  const themeProps = useSpring({
    rotation: isDark ? 40 : 90,
    centerR: isDark ? 9 : 5,
    maskCx: isDark ? 12 : 30,
    maskCy: isDark ? 4 : 0,
    sunOpacity: isDark ? 0 : 1,
    config: themeSpringConfig,
  })

  // Boop animation - brief rotation on hover
  const { style: boopStyle, trigger: triggerBoop } = useBoop({
    rotation: 15,
    timing: 150,
  })

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
      onMouseEnter={triggerBoop}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        transformOrigin: 'center center',
        transform: to(
          [themeProps.rotation, boopStyle.transform],
          (themeRot: number, boopTransform) => {
            // Extract rotation from boop transform string
            const boopRotMatch = boopTransform.toString().match(/rotate\((-?\d+(?:\.\d+)?)deg\)/)
            const boopRot = boopRotMatch ? parseFloat(boopRotMatch[1]) : 0
            return `rotate(${themeRot + boopRot}deg)`
          }
        ),
      }}
    >
      {/* Mask for creating the moon crescent */}
      <mask id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle
          r="9"
          fill="black"
          cx={themeProps.maskCx}
          cy={themeProps.maskCy}
        />
      </mask>

      {/* Center circle (sun or moon) */}
      <animated.circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask="url(#moon-mask)"
        r={themeProps.centerR}
      />

      {/* Sun rays */}
      <animated.g stroke="currentColor" opacity={themeProps.sunOpacity}>
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

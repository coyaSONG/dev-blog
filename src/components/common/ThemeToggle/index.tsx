'use client'

import { useTheme } from '@/components/common/ThemeProvider'
import { Button } from '@/components/common/Button'
import AnimatedToggle from './AnimatedToggle'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 flex items-center justify-center"
    >
      <span className="inline-flex items-center justify-center">
        <AnimatedToggle isDark={theme === 'dark'} />
      </span>
    </Button>
  )
} 
'use client'

import { useTheme } from '@/components/common/ThemeProvider'
import AnimatedToggle from './AnimatedToggle'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-center p-2 rounded-lg hover:bg-accent/50 transition-colors">
      <AnimatedToggle isDark={theme === 'dark'} onClick={toggleTheme} />
    </div>
  )
} 
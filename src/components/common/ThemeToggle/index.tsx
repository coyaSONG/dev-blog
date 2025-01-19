'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/common/ThemeProvider'
import { Button } from '@/components/common/Button'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  )
} 
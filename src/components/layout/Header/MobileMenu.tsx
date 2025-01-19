'use client'

import { Sun, Moon } from 'lucide-react'
import { NAV_ITEMS } from '@/constants/layout'
import { Button } from '@/components/common/Button'
import { Link } from '@/components/common/Link'

interface MobileMenuProps {
  isOpen: boolean
  theme: string
  toggleTheme: () => void
}

export default function MobileMenu({ isOpen, theme, toggleTheme }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            external={item.external}
            className="block px-3 py-2"
          >
            {item.label}
          </Link>
        ))}
        <Button
          onClick={toggleTheme}
          variant="ghost"
          className="w-full text-left px-3 py-2"
          aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === 'dark' ? (
            <div className="flex items-center">
              <Sun size={20} className="mr-3" />
              <span>Light Mode</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Moon size={20} className="mr-3" />
              <span>Dark Mode</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  )
} 
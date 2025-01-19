'use client'

import { Menu, X, Sun, Moon, Search } from 'lucide-react'
import { useState, useMemo, useCallback } from 'react'
import { useTheme } from '@/components/common/ThemeProvider'
import MobileMenu from './MobileMenu'
import SearchModal from './SearchModal'
import { LAYOUT, NAV_ITEMS } from '@/constants/layout'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { ThemeContextType } from '@/types/theme'
import { Button } from '@/components/common/Button'
import { Link } from '@/components/common/Link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, toggleTheme }: ThemeContextType = useTheme()
  const scrollProgress = useScrollProgress()

  const handleSearchOpen = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const memoizedMobileMenu = useMemo(() => (
    <MobileMenu 
      isOpen={isMenuOpen} 
      theme={theme} 
      toggleTheme={toggleTheme} 
    />
  ), [isMenuOpen, theme, toggleTheme])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b backdrop-blur-sm bg-opacity-80 dark:border-gray-800 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                coyaSONG
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Button
                onClick={handleSearchOpen}
                variant="ghost"
                aria-label="Search posts"
              >
                <Search size={LAYOUT.iconSize} />
              </Button>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  external={item.external}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </nav>

            <Button
              onClick={handleMenuToggle}
              variant="ghost"
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {memoizedMobileMenu}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  )
} 
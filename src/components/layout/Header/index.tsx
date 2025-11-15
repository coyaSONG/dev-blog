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
          className="h-full bg-gradient-to-r from-brand-primary to-brand-primary-light transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b backdrop-blur-md bg-white/80 dark:bg-gray-900/80 dark:border-gray-800 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-primary to-brand-primary-light rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent hover:scale-105 transition-transform">
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
'use client'

import { Menu, X, Search } from 'lucide-react'
import { useState, useMemo, useCallback } from 'react'
import ThemeToggle from '@/components/common/ThemeToggle'
import MobileMenu from './MobileMenu'
import SearchModal from './SearchModal'
import { LAYOUT, NAV_ITEMS } from '@/constants/layout'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useBoop } from '@/hooks/useBoop'
import { Button } from '@/components/common/Button'
import { Link } from '@/components/common/Link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const scrollProgress = useScrollProgress()

  // Boop animation for search icon
  const { style: searchBoopStyle, trigger: triggerSearchBoop } = useBoop({
    y: -2,
    scale: 1.1,
    timing: 150,
  })

  // Boop animation for mobile menu icon
  const { style: menuBoopStyle, trigger: triggerMenuBoop } = useBoop({
    rotation: 20,
    timing: 150,
  })

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
    />
  ), [isMenuOpen])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-primary to-brand-primary-light transition-all duration-150"
          role="progressbar"
          aria-label="페이지 읽기 진행률"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
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

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    external={item.external}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Search - visible on all screens */}
              <div className="flex items-center space-x-1">
                <Button
                  onClick={handleSearchOpen}
                  variant="ghost"
                  aria-label="Search posts"
                  onMouseEnter={triggerSearchBoop}
                  className="p-2 flex items-center justify-center"
                >
                  <span style={searchBoopStyle} className="inline-flex items-center justify-center">
                    <Search size={20} />
                  </span>
                </Button>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <Button
                onClick={handleMenuToggle}
                variant="ghost"
                className="md:hidden p-2 flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                onMouseEnter={triggerMenuBoop}
              >
                <span style={menuBoopStyle} className="inline-flex items-center justify-center">
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {memoizedMobileMenu}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  )
}

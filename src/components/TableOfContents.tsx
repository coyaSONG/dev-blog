'use client'

import { useEffect, useState } from 'react'
import { TocItem } from '@/utils/toc'
import { BookOpen, X } from 'lucide-react'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    // 모든 헤딩 요소 관찰
    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  // ESC 키로 모바일 패널 닫기
  useEffect(() => {
    if (!isMobileOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // 헤더 높이만큼 오프셋
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    handleClick(e, id)
    setIsMobileOpen(false)
  }

  // Calculate the currently active H2 section
  const activeParentId = items.reduce((acc, item, index) => {
    if (item.level === 2) {
      return item.id === activeId ? item.id : acc
    }
    // If it's an H3 and active, its parent H2 is the active parent
    if (item.level === 3 && item.id === activeId) {
      // Find the parent H2 by looking backwards
      for (let i = index; i >= 0; i--) {
        if (items[i].level === 2) return items[i].id
      }
    }
    return acc
  }, '') || items[0]?.id // Default to first item if nothing active

  if (items.length === 0) {
    return null
  }

  return (
    <>
      {/* Desktop ToC */}
      <nav className="hidden xl:block fixed top-32 right-[max(2rem,calc(50%-45rem))] w-64 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="py-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-3">목차</h2>
          <ul className="space-y-2 text-sm">
            {(() => {
              let currentParentId = ''
              return items.map((item) => {
                if (item.level === 2) {
                  currentParentId = item.id
                }

                const isVisible = item.level === 2 || (item.level === 3 && currentParentId === activeParentId)

                if (!isVisible) return null

                return (
                  <li
                    key={item.id}
                    style={{
                      paddingLeft: `${(item.level - 2) * 12}px`,
                    }}
                    className="animate-fade-in-down"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(e, item.id)}
                      className={`block py-1 border-l-2 pl-3 transition-colors ${activeId === item.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                      {item.text}
                    </a>
                  </li>
                )
              })
            })()}
          </ul>
        </div>
      </nav>

      {/* Mobile FAB */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 bg-brand-primary text-white rounded-full shadow-lg px-4 py-3 flex items-center gap-2 hover:bg-brand-primary-dark transition-colors"
        aria-label="목차 열기"
        aria-expanded={isMobileOpen}
      >
        <BookOpen size={20} />
        <span className="text-sm font-medium">목차</span>
      </button>

      {/* Mobile Slide-up Panel */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="xl:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-2xl max-h-[70vh] overflow-y-auto shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="목차"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 pt-4 pb-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">목차</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="목차 닫기"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="px-6 py-4 space-y-2 text-sm">
              {(() => {
                let currentParentId = ''
                return items.map((item) => {
                  if (item.level === 2) {
                    currentParentId = item.id
                  }

                  const isVisible = item.level === 2 || (item.level === 3 && currentParentId === activeParentId)

                  if (!isVisible) return null

                  return (
                    <li
                      key={item.id}
                      style={{
                        paddingLeft: `${(item.level - 2) * 12}px`,
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleMobileClick(e, item.id)}
                        className={`block py-2 border-l-2 pl-3 transition-colors ${activeId === item.id
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  )
                })
              })()}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

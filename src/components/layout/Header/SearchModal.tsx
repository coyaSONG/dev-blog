'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { X, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Link } from 'next-view-transitions'
import { useDebounce } from '@/hooks/useDebounce'
import { searchIndexItems } from '@/utils/search'
import type { SearchIndexItem, SearchIndexResponse } from '@/types/search'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const MODAL_TITLE_ID = 'search-modal-title'
type IndexStatus = 'idle' | 'loading' | 'loaded' | 'error'

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstResultRef = useRef<HTMLAnchorElement>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [indexItems, setIndexItems] = useState<SearchIndexItem[]>([])
  const [indexStatus, setIndexStatus] = useState<IndexStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(searchQuery, 300)
  const isIndexLoading = indexStatus === 'loading'

  // Fetch search index (trimmed fields only) once when modal opens
  useEffect(() => {
    if (!isOpen) return
    if (indexItems.length > 0) return // Already loaded

    let cancelled = false

    const loadIndex = async () => {
      setIndexStatus('loading')
      setError(null)

      try {
        const response = await fetch('/api/search/index')
        if (!response.ok) {
          throw new Error('검색 인덱스를 불러오지 못했습니다.')
        }

        const data: SearchIndexResponse = await response.json()
        if (cancelled) return

        setIndexItems(data.items ?? [])
        setIndexStatus('loaded')
      } catch (err) {
        if (cancelled) return
        setIndexStatus('error')
        setError(
          err instanceof Error
            ? err.message
            : '검색 인덱스 로드 중 오류가 발생했습니다.'
        )
      }
    }

    loadIndex()

    return () => {
      cancelled = true
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Focus management when modal opens
  useEffect(() => {
    if (isOpen) {
      const previouslyFocused = document.activeElement as HTMLElement

      searchInputRef.current?.focus()
      setSearchQuery('')

      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = ''
        previouslyFocused?.focus()
      }
    }
  }, [isOpen])

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    if (indexItems.length === 0) return []
    return searchIndexItems(indexItems, debouncedQuery)
  }, [debouncedQuery, indexItems])

  // Handle keyboard navigation and focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      // Arrow key navigation for search results
      if (e.key === 'ArrowDown' && searchResults.length > 0) {
        e.preventDefault()
        firstResultRef.current?.focus()
      }
    },
    [onClose, searchResults.length]
  )

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  // Handle result click
  const handleResultClick = useCallback(() => {
    onClose()
  }, [onClose])

  const handleRetry = useCallback(() => {
    setIndexStatus('idle')
    setError(null)
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={MODAL_TITLE_ID}
      onKeyDown={handleKeyDown}
    >
      <div
        className="min-h-screen px-4 flex items-start justify-center pt-[10vh]"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Content */}
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl animate-scale-in"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              id={MODAL_TITLE_ID}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              검색
            </h2>
            <Button
              ref={closeButtonRef}
              onClick={onClose}
              variant="ghost"
              aria-label="검색창 닫기"
              className="p-2"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="제목, 설명, 태그로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-primary-light transition-shadow"
              aria-label="검색어 입력"
              aria-describedby="search-hint"
            />
            {isIndexLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <Loader2
                  className="text-gray-400 animate-spin"
                  size={20}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>

          {/* Search Hint */}
          <p id="search-hint" className="sr-only">
            검색어를 입력하면 결과가 자동으로 표시됩니다
          </p>

          {/* Results Container */}
          <div
            className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            role="region"
            aria-live="polite"
            aria-busy={isIndexLoading}
          >
            {/* Loading State */}
            {isIndexLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  검색 인덱스를 불러오는 중...
                </span>
              </div>
            )}

            {/* Error State */}
            {indexStatus === 'error' && error && !isIndexLoading && (
              <div className="text-center py-8">
                <p className="text-red-500 dark:text-red-400">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-2 text-sm text-brand-primary hover:underline"
                >
                  다시 시도
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isIndexLoading && indexStatus !== 'error' && searchQuery.trim() === '' && (
              <div className="text-center py-12">
                <Search
                  className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                  size={48}
                  aria-hidden="true"
                />
                <p className="text-gray-500 dark:text-gray-400">
                  검색어를 입력해주세요
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  제목, 설명, 태그로 검색할 수 있습니다
                </p>
              </div>
            )}

            {/* No Results */}
            {!isIndexLoading &&
              indexStatus !== 'error' &&
              searchQuery.trim() !== '' &&
              debouncedQuery === searchQuery &&
              searchResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    &ldquo;{searchQuery}&rdquo;에 대한 검색 결과가 없습니다
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    다른 검색어를 입력해보세요
                  </p>
                </div>
              )}

            {/* Results List */}
            {!isIndexLoading && indexStatus !== 'error' && searchResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {searchResults.length}개의 결과
                </p>
                <ul role="listbox" aria-label="검색 결과">
                  {searchResults.map((item, index) => (
                    <li key={item.slug} role="option">
                      <Link
                        ref={index === 0 ? firstResultRef : undefined}
                        href={`/posts/${item.slug}`}
                        onClick={handleResultClick}
                        className="block p-4 rounded-xl border dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-primary-light"
                      >
                        <div className="flex flex-col gap-2">
                          {/* Tags */}
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs rounded-full bg-brand-primary/10 dark:bg-brand-primary-light/20 text-brand-primary dark:text-brand-primary-light"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary transition-colors">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                  ESC
                </kbd>{' '}
                닫기
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                  ↓
                </kbd>{' '}
                결과 이동
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                  Enter
                </kbd>{' '}
                선택
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { X, Search } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { allPosts } from 'contentlayer2/generated'
import type { Post } from '@/types/post'
import { Link } from 'next-view-transitions'
import { sortPostsByDate, searchPosts } from '@/utils/posts'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus()
      setSearchQuery('')
    }
  }, [isOpen])

  // Sort posts by date
  const sortedPosts = useMemo(() => {
    return sortPostsByDate(allPosts as Post[])
  }, [])

  // Search logic
  const searchResults = useMemo(() => {
    return searchPosts(sortedPosts, searchQuery)
  }, [searchQuery, sortedPosts])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Search Posts</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              aria-label="Close search"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by title, description, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === '' ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                Type to search posts...
              </p>
            ) : searchResults.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No results found for &quot;{searchQuery}&quot;
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                </p>
                {searchResults.map((post) => (
                  <Link
                    key={post._id}
                    href={post.url}
                    onClick={onClose}
                    className="block p-4 rounded-lg border dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex flex-col gap-2">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.description}
                      </p>
                      <time className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
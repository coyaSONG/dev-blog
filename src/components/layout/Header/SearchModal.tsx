'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/common/Button'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
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
          
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search posts..."
            className="w-full p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  )
} 
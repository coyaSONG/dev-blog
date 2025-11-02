'use client'

import { useEffect, useState } from 'react'
import { TocItem } from '@/utils/toc'
import { BookOpen } from 'lucide-react'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

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

  if (items.length === 0) {
    return null
  }

  return (
    <nav className="hidden xl:block fixed top-24 right-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 dark:text-white">
          <BookOpen size={16} />
          <span>목차</span>
        </div>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                paddingLeft: `${(item.level - 2) * 12}px`,
              }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1 border-l-2 pl-3 transition-colors ${
                  activeId === item.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

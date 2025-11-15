'use client'

import Giscus from '@giscus/react'
import { useTheme } from '@/components/common/ThemeProvider'

export function Comments() {
  const { theme } = useTheme()

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        💬 댓글
      </h2>
      <Giscus
        repo="coyaSONG/dev-blog"
        repoId="R_kgDONsXiQg"
        category="General"
        categoryId="DIC_kwDONsXiQs4Cx0U3"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="ko"
        loading="lazy"
      />
    </div>
  )
}

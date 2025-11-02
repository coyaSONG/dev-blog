'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ReadingProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 z-50 transition-all duration-150 ease-out"
      style={{
        width: `${progress}%`,
        opacity: progress > 0 ? 1 : 0,
      }}
      aria-label={`Reading progress: ${Math.round(progress)}%`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

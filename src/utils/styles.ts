export const styles = {
  button: {
    base: 'p-2 rounded-lg transition-colors',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800'
  },
  link: {
    base: 'relative group',
    text: 'hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors',
    underline: 'absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary dark:bg-brand-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'
  }
} as const

// Tag/Category to accent color mapping
const tagColorMap: Record<string, string> = {
  'react': 'accent-react',
  'next.js': 'accent-nextjs',
  'nextjs': 'accent-nextjs',
  'typescript': 'accent-typescript',
  'css': 'accent-css',
  'web': 'accent-web',
  'javascript': 'accent-typescript',
  'frontend': 'accent-web',
  'backend': 'accent-default',
}

export const getTagColor = (tag: string): string => {
  const normalizedTag = tag.toLowerCase()
  return tagColorMap[normalizedTag] || 'accent-default'
}

export const getTagClasses = (tag: string): string => {
  const color = getTagColor(tag)

  const colorClasses: Record<string, string> = {
    'accent-react': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    'accent-nextjs': 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'accent-typescript': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'accent-css': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    'accent-web': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'accent-default': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  }

  return colorClasses[color] || colorClasses['accent-default']
}

export const getCardAccentColor = (tags: string[]): string => {
  if (!tags || tags.length === 0) return 'border-gray-200 dark:border-gray-800'

  const primaryTag = tags[0]
  const color = getTagColor(primaryTag)

  const accentClasses: Record<string, string> = {
    'accent-react': 'border-l-4 border-l-indigo-500 hover:border-l-indigo-600 dark:hover:border-l-indigo-400',
    'accent-nextjs': 'border-l-4 border-l-sky-500 hover:border-l-sky-600 dark:hover:border-l-sky-400',
    'accent-typescript': 'border-l-4 border-l-blue-500 hover:border-l-blue-600 dark:hover:border-l-blue-400',
    'accent-css': 'border-l-4 border-l-pink-500 hover:border-l-pink-600 dark:hover:border-l-pink-400',
    'accent-web': 'border-l-4 border-l-purple-500 hover:border-l-purple-600 dark:hover:border-l-purple-400',
    'accent-default': 'border-l-4 border-l-gray-400 hover:border-l-gray-500 dark:hover:border-l-gray-600',
  }

  return accentClasses[color] || accentClasses['accent-default']
} 
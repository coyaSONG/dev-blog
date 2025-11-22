import { getLanguageConfig } from '@/constants/languageIcons'

interface LanguageIconProps {
  language: string
  showLabel?: boolean
  className?: string
}

export function LanguageIcon({
  language,
  showLabel = true,
  className = ''
}: LanguageIconProps) {
  const config = getLanguageConfig(language)

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      <span style={{ color: config.color }}>
        {config.icon}
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 font-mono">
          {config.label}
        </span>
      )}
    </span>
  )
}

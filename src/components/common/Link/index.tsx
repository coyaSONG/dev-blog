import NextLink from 'next/link'
import { LinkProps } from './types'
import { styles } from '@/utils/styles'

export const Link = ({ 
  href, 
  children, 
  external,
  className = '',
  ...props 
}: LinkProps) => {
  const linkContent = (
    <>
      <span className={styles.link.text}>{children}</span>
      <span className={styles.link.underline} />
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.link.base} ${className}`}
        {...props}
      >
        {linkContent}
      </a>
    )
  }

  return (
    <NextLink
      href={href}
      className={`${styles.link.base} ${className}`}
      {...props}
    >
      {linkContent}
    </NextLink>
  )
} 
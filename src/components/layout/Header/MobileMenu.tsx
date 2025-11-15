'use client'

import { NAV_ITEMS } from '@/constants/layout'
import { Link } from '@/components/common/Link'

interface MobileMenuProps {
  isOpen: boolean
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            external={item.external}
            className="block px-3 py-2"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
} 